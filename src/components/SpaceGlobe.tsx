
import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

interface User {
  id: number;
  name: string;
  lat: number;
  lng: number;
  location: string;
  interests: string[];
  dream: string;
}

interface SpaceGlobeProps {
  users: User[];
  fullscreen?: boolean;
}

const SpaceGlobe = ({ users, fullscreen = false }: SpaceGlobeProps) => {
  const globeEl = useRef<any>();

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = fullscreen ? 0.3 : 0.5;
      
      if (fullscreen) {
        // Enable more interactive controls for fullscreen
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().minDistance = 200;
        globeEl.current.controls().maxDistance = 800;
      }
    }
  }, [fullscreen]);

  const gData = users.map(user => ({
    ...user,
    size: fullscreen ? 0.2 : 0.3,
    color: fullscreen ? '#00ffff' : '#8b5cf6'
  }));

  const globeConfig = {
    // Use day textures for better visibility
    globeImageUrl: fullscreen 
      ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      : "//unpkg.com/three-globe/example/img/earth-night.jpg",
    bumpImageUrl: "//unpkg.com/three-globe/example/img/earth-topology.png",
    backgroundImageUrl: fullscreen 
      ? "//unpkg.com/three-globe/example/img/night-sky.png"
      : "//unpkg.com/three-globe/example/img/night-sky.png",
    pointsData: gData,
    pointAltitude: "size",
    pointColor: "color",
    pointLabel: (d: any) => `
      <div style="background: rgba(0,0,0,0.9); padding: 12px; border-radius: 12px; color: white; max-width: 250px; border: 2px solid #00ffff;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #8b5cf6, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <span style="color: white; font-weight: bold; font-size: 14px;">${d.name.charAt(0)}</span>
          </div>
          <div>
            <strong style="color: #00ffff; font-size: 16px;">${d.name}</strong><br/>
            <span style="color: #e2e8f0; font-size: 12px;">${d.location}</span>
          </div>
        </div>
        <em style="color: #cbd5e1; font-size: 13px; line-height: 1.4; display: block; margin-bottom: 8px;">"${d.dream}"</em>
        <div style="margin-top: 8px;">
          ${d.interests.slice(0, 3).map((interest: string) => 
            `<span style="background: #7c3aed; padding: 3px 8px; border-radius: 6px; font-size: 10px; margin-right: 4px; margin-bottom: 4px; display: inline-block;">${interest}</span>`
          ).join('')}
        </div>
      </div>
    `,
    width: fullscreen ? window.innerWidth * 0.9 : 400,
    height: fullscreen ? window.innerHeight * 0.7 : 320,
    atmosphereColor: fullscreen ? '#87ceeb' : '#3b82f6',
    atmosphereAltitude: 0.2
  };

  return (
    <Globe
      ref={globeEl}
      {...globeConfig}
    />
  );
};

export default SpaceGlobe;
