
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

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
      <meshPhysicalMaterial
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
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#3b82f6" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <NetworkNode position={[0, 0, 0]} color="#2dd4bf" scale={1.5} />
            <NetworkNode position={[-2, 1, -1]} color="#94a3b8" scale={0.8} />
            <NetworkNode position={[2, -1, -2]} color="#0ea5e9" scale={1} />
            <NetworkNode position={[1.5, 2, -3]} color="#cbd5e1" scale={0.6} />
            <NetworkNode position={[-1.5, -2, -1]} color="#2dd4bf" scale={0.7} />
            
             <mesh position={[-1, 0.5, -0.5]} rotation={[0, 0, Math.PI/4]}>
                <cylinderGeometry args={[0.02, 0.02, 3]} />
                <meshBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
            </mesh>
             <mesh position={[1, -0.5, -1]} rotation={[0, 0, -Math.PI/4]}>
                <cylinderGeometry args={[0.02, 0.02, 3]} />
                <meshBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
            </mesh>
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
