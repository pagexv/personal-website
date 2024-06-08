import React, { useRef, useMemo, useEffect } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleEffect = ({ startPosition, endPosition, setDisplayText, textBoxDimensions }) => {
  const particleGeometryRef = useRef();
  const particles = useMemo(() => {
    const particlesArray = [];
    const particleCount = 500;

    for (let i = 0; i < particleCount; i++) {
      const position = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2)
      );
      particlesArray.push(position);
    }

    return particlesArray;
  }, []);

  useEffect(() => {
    setDisplayText(true);
  }, [setDisplayText]);

  useFrame(() => {
    if (particleGeometryRef.current) {
      const positions = particleGeometryRef.current.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = THREE.MathUtils.lerp(positions[i], endPosition[0], 0.02);
        positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], endPosition[1], 0.02);
        positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], endPosition[2], 0.02);
      }
      particleGeometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <lineSegments>
      <bufferGeometry attach="geometry" ref={particleGeometryRef}>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={new Float32Array(particles.length * 6)}
          itemSize={3}
          count={particles.length * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="green" linewidth={2} />
    </lineSegments>
  );
};

export default ParticleEffect;
