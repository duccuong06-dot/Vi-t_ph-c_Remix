import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { Outfit } from "@/lib/outfits";

function Robe({ o }: { o: Outfit }) {
  const body = useMemo(() => {
    const L = o.length;
    const pts = [
      new THREE.Vector2(0.18, L / 2 + 0.25),
      new THREE.Vector2(0.42, L / 2),
      new THREE.Vector2(0.38, L / 2 - 0.5),
      new THREE.Vector2(0.3, L / 2 - 0.9),
      new THREE.Vector2(0.45 * o.flare, 0),
      new THREE.Vector2(0.7 * o.flare, -L / 2 + 0.1),
      new THREE.Vector2(0.75 * o.flare, -L / 2),
    ];
    return new THREE.LatheGeometry(pts, 48);
  }, [o]);
  const sleeveR = o.flare > 1.1 ? 0.32 : o.flare > 0.95 ? 0.2 : 0.12;
  const top = o.length / 2;
  return (
    <group>
      <mesh geometry={body} castShadow>
        <meshStandardMaterial
          color={o.color}
          roughness={0.45}
          metalness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={body} scale={1.005}>
        <meshBasicMaterial color={o.trim} wireframe transparent opacity={0.25} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.75, top - 0.3, 0]} rotation={[0, 0, s * 1.15]}>
          <cylinderGeometry args={[0.13, sleeveR, 1.0, 24, 1, true]} />
          <meshStandardMaterial
            color={o.color}
            roughness={0.5}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh position={[0, top + 0.28, 0]}>
        <cylinderGeometry args={[0.16, 0.19, 0.18, 32, 1, true]} />
        <meshStandardMaterial
          color={o.trim}
          metalness={0.7}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46 * o.flare, 0.03, 12, 64]} />
        <meshStandardMaterial color={o.trim} metalness={0.8} roughness={0.2} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0.2, top - 0.1 - i * 0.22, 0.32]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color={o.trim} metalness={0.9} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export function Garment3D({
  outfit,
  interactive = true,
}: {
  outfit: Outfit;
  interactive?: boolean;
}) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.1, 5.4], fov: 42 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#ffe2b0" />
      <pointLight position={[-3, -1, 2]} intensity={8} color="#ef8354" />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <Robe o={outfit} />
      </Float>
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer
          intensity={1.2}
          color="#e9c46a"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 1, 1]}
        />
      </Environment>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enabled={interactive}
        autoRotate
        autoRotateSpeed={1.6}
      />
    </Canvas>
  );
}
