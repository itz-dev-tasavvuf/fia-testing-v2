
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
}

const SpaceGlobe = ({ users }: SpaceGlobeProps) => {
  const globeEl = useRef<any>();

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const gData = users.map(user => ({
    ...user,
    size: 0.3,
    color: '#8b5cf6'
  }));

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      pointLabel={(d: any) => `
        <div style="background: rgba(0,0,0,0.8); padding: 8px; border-radius: 8px; color: white; max-width: 200px;">
          <strong style="color: #a855f7;">${d.name}</strong><br/>
          <span style="color: #e2e8f0;">${d.location}</span><br/>
          <em style="color: #cbd5e1; font-size: 12px;">"${d.dream}"</em><br/>
          <div style="margin-top: 4px;">
            ${d.interests.slice(0, 2).map((interest: string) => 
              `<span style="background: #7c3aed; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-right: 4px;">${interest}</span>`
            ).join('')}
          </div>
        </div>
      `}
      width={400}
      height={320}
    />
  );
};

export default SpaceGlobe;
