/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Stars, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

// Define intrinsic elements as components to bypass type checking in environments where 
// JSX.IntrinsicElements is not correctly extended for @react-three/fiber.
const MeshPhysicalMaterial = 'meshPhysicalMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Mesh = 'mesh' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

const NetworkNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[0.5, 32, 32]} position={position} scale={scale}>
      <MeshPhysicalMaterial
        color={color}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
        thickness={2}
      />
    </Sphere>
  );
};

export const AbstractBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <AmbientLight intensity={0.8} />
        <PointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
        <PointLight position={[-10, -5, -5]} intensity={0.5} color="#3b82f6" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Central Cluster */}
            <NetworkNode position={[0, 0, 0]} color="#2dd4bf" scale={1.5} />
            <NetworkNode position={[-2, 1, -1]} color="#94a3b8" scale={0.8} />
            <NetworkNode position={[2, -1, -2]} color="#0ea5e9" scale={1} />
            <NetworkNode position={[1.5, 2, -3]} color="#cbd5e1" scale={0.6} />
            <NetworkNode position={[-1.5, -2, -1]} color="#2dd4bf" scale={0.7} />
            
            {/* Connecting Lines (Simulated with thin cylinders or custom lines) */}
             <Mesh position={[-1, 0.5, -0.5]} rotation={[0, 0, Math.PI/4]}>
                <CylinderGeometry args={[0.02, 0.02, 3]} />
                <MeshBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
            </Mesh>
             <Mesh position={[1, -0.5, -1]} rotation={[0, 0, -Math.PI/4]}>
                <CylinderGeometry args={[0.02, 0.02, 3]} />
                <MeshBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
            </Mesh>
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
