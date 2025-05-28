
import React, { useEffect, useRef, useState, MutableRefObject, FC } from "react";
import { mat4, vec3, quat } from "gl-matrix";
import { mockUsers } from "@/data/mockData";

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

// Convert mock users to menu items
const userMenuItems: MenuItem[] = mockUsers.slice(0, 8).map(user => ({
  image: `https://picsum.photos/400/400?random=${user.id}`,
  link: `/profile/${user.id}`,
  title: user.name,
  description: user.dream
}));

// WebGL Shaders
const vertexShader = `
  attribute vec3 aPosition;
  attribute vec2 aUV;
  attribute mat4 aInstanceMatrix;
  
  uniform mat4 uWorldMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform float uFrames;
  uniform float uScaleFactor;
  
  varying vec2 vUV;
  varying vec3 vWorldPosition;
  
  void main() {
    vec4 worldPosition = aInstanceMatrix * vec4(aPosition, 1.0);
    vec4 viewPosition = uViewMatrix * worldPosition;
    gl_Position = uProjectionMatrix * viewPosition;
    
    vUV = aUV;
    vWorldPosition = worldPosition.xyz;
  }
`;

const fragmentShader = `
  precision mediump float;
  
  uniform sampler2D uTex;
  uniform int uItemCount;
  uniform int uAtlasSize;
  uniform vec3 uCameraPosition;
  uniform vec4 uRotationAxisVelocity;
  uniform float uFrames;
  uniform float uScaleFactor;
  
  varying vec2 vUV;
  varying vec3 vWorldPosition;
  
  void main() {
    vec2 uv = vUV;
    vec4 color = texture2D(uTex, uv);
    
    // Add some glow effect
    float dist = distance(vWorldPosition, uCameraPosition);
    float glow = 1.0 - smoothstep(2.0, 5.0, dist);
    color.rgb += glow * 0.2;
    
    gl_FragColor = color;
  }
`;

class InfiniteGridMenu {
  private gl: WebGLRenderingContext | null = null;
  private items: MenuItem[] = [];
  private SPHERE_RADIUS = 2.5;
  private DISC_INSTANCE_COUNT = 20;
  private TARGET_FRAME_DURATION = 16.67;
  private _frames = 0;
  private scaleFactor = 1;
  private atlasSize = 1;
  
  // Camera and matrices
  private camera = {
    position: vec3.fromValues(0, 0, 3),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create()
    },
    matrix: mat4.create(),
    up: vec3.fromValues(0, 1, 0),
    aspect: 1,
    fov: Math.PI / 4,
    near: 0.1,
    far: 100
  };
  
  private worldMatrix = mat4.create();
  private instancePositions: vec3[] = [];
  private control: any = {
    orientation: quat.create(),
    rotationAxis: vec3.fromValues(0, 1, 0),
    rotationVelocity: 0,
    isPointerDown: false,
    snapDirection: vec3.fromValues(0, 0, 1),
    snapTargetDirection: vec3.fromValues(0, 0, 1)
  };
  private smoothRotationVelocity = 0;
  private movementActive = false;
  
  // WebGL resources
  private discProgram: WebGLProgram | null = null;
  private discVAO: WebGLVertexArrayObject | null = null;
  private discBuffers: any = {};
  private discInstances: any = {};
  private discLocations: any = {};
  private tex: WebGLTexture | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    items: MenuItem[],
    onActiveItemChange: (index: number) => void,
    onMovementChange: (isMoving: boolean) => void,
    onReady: (sketch: InfiniteGridMenu) => void
  ) {
    this.items = items;
    this.gl = canvas.getContext("webgl");
    
    if (!this.gl) {
      console.error("WebGL not supported");
      return;
    }

    this.init().then(() => {
      onReady(this);
    });
  }

  private async init() {
    if (!this.gl) return;
    
    // Create shaders and program
    this.discProgram = this.createProgram(vertexShader, fragmentShader);
    if (!this.discProgram) return;
    
    this.gl.useProgram(this.discProgram);
    
    // Get uniform locations
    this.discLocations = {
      uWorldMatrix: this.gl.getUniformLocation(this.discProgram, "uWorldMatrix"),
      uViewMatrix: this.gl.getUniformLocation(this.discProgram, "uViewMatrix"),
      uProjectionMatrix: this.gl.getUniformLocation(this.discProgram, "uProjectionMatrix"),
      uCameraPosition: this.gl.getUniformLocation(this.discProgram, "uCameraPosition"),
      uRotationAxisVelocity: this.gl.getUniformLocation(this.discProgram, "uRotationAxisVelocity"),
      uItemCount: this.gl.getUniformLocation(this.discProgram, "uItemCount"),
      uAtlasSize: this.gl.getUniformLocation(this.discProgram, "uAtlasSize"),
      uFrames: this.gl.getUniformLocation(this.discProgram, "uFrames"),
      uScaleFactor: this.gl.getUniformLocation(this.discProgram, "uScaleFactor"),
      uTex: this.gl.getUniformLocation(this.discProgram, "uTex")
    };
    
    // Create geometry
    this.createDiscGeometry();
    this.generateInstancePositions();
    this.createInstanceData();
    await this.createTexture();
    
    this.updateCameraMatrix();
    this.updateProjectionMatrix();
  }

  private createProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null {
    if (!this.gl) return null;
    
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
    
    if (!vertexShader || !fragmentShader) return null;
    
    const program = this.gl.createProgram();
    if (!program) return null;
    
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error("Program linking failed:", this.gl.getProgramInfoLog(program));
      return null;
    }
    
    return program;
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compilation failed:", this.gl.getShaderInfoLog(shader));
      return null;
    }
    
    return shader;
  }

  private createDiscGeometry() {
    if (!this.gl) return;
    
    // Create a simple quad
    const vertices = new Float32Array([
      -1, -1, 0,  0, 0,
       1, -1, 0,  1, 0,
       1,  1, 0,  1, 1,
      -1,  1, 0,  0, 1
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    
    this.discBuffers = {
      vertices: this.gl.createBuffer(),
      indices: indices
    };
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discBuffers.vertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  }

  private generateInstancePositions() {
    this.instancePositions = [];
    
    // Generate positions on a sphere
    for (let i = 0; i < this.DISC_INSTANCE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      
      const x = this.SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = this.SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = this.SPHERE_RADIUS * Math.cos(phi);
      
      this.instancePositions.push(vec3.fromValues(x, y, z));
    }
  }

  private createInstanceData() {
    if (!this.gl) return;
    
    const matrices = new Float32Array(this.DISC_INSTANCE_COUNT * 16);
    
    this.discInstances = {
      buffer: this.gl.createBuffer(),
      matrices: [],
      matricesArray: matrices
    };
    
    // Create matrix array
    for (let i = 0; i < this.DISC_INSTANCE_COUNT; i++) {
      const matrix = mat4.create();
      this.discInstances.matrices.push(matrix);
    }
  }

  private async createTexture() {
    if (!this.gl) return;
    
    this.tex = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex);
    
    // Create a simple colored texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#3b82f6');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Space', 128, 120);
      ctx.fillText('Community', 128, 150);
    }
    
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, canvas);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
  }

  public run() {
    this.render();
  }

  public resize() {
    if (!this.gl) return;
    
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.updateProjectionMatrix();
  }

  private render() {
    if (!this.gl || !this.discProgram) return;
    
    this.gl.useProgram(this.discProgram);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Set uniforms
    this.gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
    this.gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
    this.gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    this.gl.uniform3f(this.discLocations.uCameraPosition, this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.gl.uniform1f(this.discLocations.uFrames, this._frames);
    
    this._frames++;
    requestAnimationFrame(() => this.render());
  }

  private updateCameraMatrix() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  private updateProjectionMatrix() {
    if (!this.gl) return;
    
    const canvas = this.gl.canvas as HTMLCanvasElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far
    );
  }
}

const InfiniteMenu: FC<{ items?: MenuItem[] }> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const menuItems = items.length ? items : userMenuItems;

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      if (!menuItems.length) return;
      const itemIndex = index % menuItems.length;
      setActiveItem(menuItems[itemIndex]);
    };

    if (canvas) {
      sketch = new InfiniteGridMenu(
        canvas,
        menuItems,
        handleActiveItem,
        setIsMoving,
        (sk) => sk.run()
      );
    }

    const handleResize = () => {
      if (sketch) {
        sketch.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Set initial active item
    if (menuItems.length > 0) {
      setActiveItem(menuItems[0]);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuItems]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http")) {
      window.open(activeItem.link, "_blank");
    } else {
      console.log("Internal route:", activeItem.link);
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        className="cursor-grab w-full h-full overflow-hidden relative outline-none active:cursor-grabbing"
      />

      {activeItem && (
        <>
          <h2
            className={`
              select-none absolute font-black text-4xl left-16 top-1/2 transform translate-x-[20%] -translate-y-1/2 transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white
              ${isMoving ? "opacity-0 pointer-events-none duration-100" : "opacity-100 pointer-events-auto duration-500"}
            `}
          >
            {activeItem.title}
          </h2>

          <p
            className={`
              select-none absolute max-w-[200px] text-lg top-1/2 right-[1%] transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-purple-200
              ${isMoving ? "opacity-0 pointer-events-none duration-100 translate-x-[-60%] -translate-y-1/2" : "opacity-100 pointer-events-auto duration-500 translate-x-[-90%] -translate-y-1/2"}
            `}
          >
            {activeItem.description}
          </p>

          <div
            onClick={handleButtonClick}
            className={`
              absolute left-1/2 z-10 w-14 h-14 grid place-items-center bg-cyan-400 border-4 border-black rounded-full cursor-pointer transition-all ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
              ${isMoving ? "bottom-[-80px] opacity-0 pointer-events-none duration-100 scale-0 -translate-x-1/2" : "bottom-16 opacity-100 pointer-events-auto duration-500 scale-100 -translate-x-1/2"}
            `}
          >
            <p className="select-none relative text-black top-0.5 text-2xl">↗</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;
