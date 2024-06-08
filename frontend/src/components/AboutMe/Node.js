import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three-stdlib';

// Extend TextGeometry to make it available in JSX
extend({ TextGeometry });

const Node = ({ node, active, onHover }) => {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = active ? 1 : 0;
    }
  });

  const props = useSpring({ scale: active ? 1.5 : 1 });

  return (
    <animated.mesh
      ref={ref}
      scale={props.scale}
      onPointerOver={() => onHover(node)}
      onPointerOut={() => onHover(null)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
      <textGeometry args={[node.icon, { size: 0.5, height: 0.2 }]} />
    </animated.mesh>
  );
};

export default Node;
