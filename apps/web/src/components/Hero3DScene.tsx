import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCubeProps {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  rotationIntensity: number;
  floatIntensity: number;
}

const FloatingCube = ({
  position,
  size,
  color,
  speed,
  rotationIntensity,
  floatIntensity,
}: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

const GlowingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#e63b2e"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const points = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#e63b2e" />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#2563eb" />

      {/* Main glowing sphere */}
      <GlowingSphere />

      {/* Floating cubes - red and blue accent colors */}
      <FloatingCube
        position={[-3, 2, -2]}
        size={1.2}
        color="#e63b2e"
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={1}
      />
      <FloatingCube
        position={[3, -1, -1]}
        size={0.8}
        color="#2563eb"
        speed={1}
        rotationIntensity={0.3}
        floatIntensity={0.8}
      />
      <FloatingCube
        position={[-2, -2, 1]}
        size={0.6}
        color="#1a1a1a"
        speed={2}
        rotationIntensity={0.4}
        floatIntensity={1.2}
      />
      <FloatingCube
        position={[2, 2, -3]}
        size={1}
        color="#2563eb"
        speed={0.8}
        rotationIntensity={0.6}
        floatIntensity={0.6}
      />
      <FloatingCube
        position={[4, 0, -2]}
        size={0.5}
        color="#e63b2e"
        speed={1.2}
        rotationIntensity={0.5}
        floatIntensity={1}
      />

      {/* Particles */}
      <Particles />
    </>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero3DScene;
