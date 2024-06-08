import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import './NodeMap.css';
import ParticleEffect from './ParticleEffect';

// Extend TextGeometry to be used in JSX
extend({ TextGeometry });

const nodes = [
  {
    id: 1,
    position: [1, -1, 1],
    text: `
      <strong>Software Developer at Identos Inc:</strong>
      <ul>
        <li>Developed a key component for delegating to a SmileCDR instance.</li>
        <li>Led the development of an IAM solution integrated with a FHIR instance.</li>
        <li>Delivered a pioneering minimum viable product for the UK pension dashboard program.</li>
        <li>Successfully led the upgrade of a Spring Boot 2 application to Spring Boot 3.</li>
        <li>Pioneered the integration of User-Managed Access (UMA) & OAuth principles.</li>
        <li>Built a comprehensive admin portal using React, Elide, and PHP.</li>
        <li>Engineered advanced automation tools integrating Python Behave, Selenium, and qTest.</li>
      </ul>

      <strong>Software Developer at Big Data Research Lab:</strong>
      <ul>
        <li>Enhanced backend efficiency and ensured robust system stability.</li>
        <li>Specialized in designing robust APIs for backend systems.</li>
        <li>Successfully migrated the solution from a local environment to a cloud service using Docker.</li>
      </ul>
    `,
    name: 'Experience',
  },
  {
    id: 2,
    position: [-1, -1, -1],
    text: `
      <strong>Master of Science in Computer Science</strong>, Arizona State University<br />
      <strong>Bachelor of Science in Computer Science</strong>, University of Waterloo
    `,
    name: 'Education',
  },
  {
    id: 3,
    position: [1, -2, -1],
    text: '<strong>Java, Python, SQL, Typescript</strong>',
    name: 'Tool Set',
  },
  {
    id: 4,
    position: [-1, -2, 1],
    text: '<strong>Cooking, Hiking, Video Games</strong>',
    name: 'Hobbies',
  },
];

const NodeMap = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [displayText, setDisplayText] = useState(false);
  const [stoppedNodeId, setStoppedNodeId] = useState(null);

  const handleCanvasClick = (e) => {
    if (e.target.tagName !== 'CANVAS') return;
    setHoveredNode(null);
    setDisplayText(false);
    setStoppedNodeId(null);
  };

  useEffect(() => {
    if (!hoveredNode) {
      setDisplayText(false);
    }
  }, [hoveredNode]);

  return (
    <div className="canvas-container" onClick={handleCanvasClick}>
      <video autoPlay loop muted className="background-video">
        <source src="/about.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video autoPlay loop muted className="background-video overlay">
        <source src="/second-about.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Canvas style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {nodes.map(node => (
          <AnimatedNode
            key={node.id}
            node={node}
            setHoveredNode={setHoveredNode}
            setStoppedNodeId={setStoppedNodeId}
            stopped={stoppedNodeId === node.id}
            setDisplayText={setDisplayText}
          />
        ))}
      </Canvas>
      {displayText && hoveredNode && (
        <div className="hovered-text expand" dangerouslySetInnerHTML={{ __html: hoveredNode.text }} />
      )}
    </div>
  );
};

const AnimatedNode = ({ node, setHoveredNode, setStoppedNodeId, stopped, setDisplayText }) => {
  const nodeRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const { position, scale } = useSpring({
    from: { position: node.position, scale: 1 },
    to: async (next) => {
      while (!stopped) {
        await next({
          position: [
            node.position[0] + (Math.random() - 0.5) * 2,
            node.position[1] + (Math.random() - 0.5) * 2,
            node.position[2] + (Math.random() - 0.5) * 2
          ],
          scale: 1
        });
        await next({ position: node.position, scale: 1 });
      }
    },
    config: { duration: 4000 }
  });

  useFrame(() => {
    if (nodeRef.current) {
      const distance = nodeRef.current.position.length();
      const newScale = THREE.MathUtils.lerp(0.5, 1.5, 1 - Math.min(distance / 5, 1));
      nodeRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  const handlePointerOver = () => {
    setHoveredNode(node);
    setIsHovered(true);
    setStoppedNodeId(node.id);
    setDisplayText(true);  // Ensure this is called to start displaying the background image
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };

  return (
    <group>
      <a.mesh
        ref={nodeRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handlePointerOver}
        scale={scale}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="blue" />
        <Html>
          <div className="node-name">{node.name}</div>
        </Html>
      </a.mesh>
      <mesh
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handlePointerOver}
      >
        <sphereGeometry args={[0.3, 16, 16]} /> {/* Adjust the first argument to control the size */}
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

export default NodeMap;
