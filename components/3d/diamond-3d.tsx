"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useEnvironment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ── Physical diamond material ─────────────────────────────
// Key insight: envMap is set directly on the material (not via scene.environment).
// This means specular/IBL reflections work, but the transmission pass
// refracts scene.background (dark) instead of the bright HDRI.
// Result: transparent dark interior + colorful specular fire.
function DiamondModel({ isDragging }: { isDragging: React.MutableRefObject<boolean> }) {
  const { scene } = useGLTF("/pure_diamond.glb");
  const groupRef  = useRef<THREE.Group>(null);

  // Load HDRI but do NOT attach it to scene.environment
  // (attaching to scene.environment would make transmission refract the bright HDRI = white blob)
  const envMap = useEnvironment({ preset: "studio" });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color:               new THREE.Color("#ffffff"),
        metalness:           0,
        roughness:           0,
        transmission:        1.0,
        thickness:           2.0,
        ior:                 2.42,
        reflectivity:        1,
        clearcoat:           1,
        clearcoatRoughness:  0,
        envMapIntensity:     3.5,
        attenuationColor:    new THREE.Color("#cce8ff"),
        attenuationDistance: 12,
        side:                THREE.DoubleSide,
        envMap,
      }),
    [envMap]
  );

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) scene.scale.setScalar(1.5 / maxDim);

    box.setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = material;
        mesh.castShadow    = false;
        mesh.receiveShadow = false;
      }
    });
  }, [scene, material]);

  useFrame((_, delta) => {
    if (!isDragging.current && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/pure_diamond.glb");

export function Diamond3D() {
  const isDragging = useRef(false);

  return (
    <Canvas
      gl={{
        antialias:           true,
        alpha:               false,
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.6,
      }}
      camera={{ position: [0, 0.4, 4.0], fov: 38 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
    >
      {/* Dark scene background — transmission refracts this (not the bright HDRI) */}
      {/* This is what makes the diamond look transparent instead of solid white */}
      <color attach="background" args={["#060810"]} />

      {/* Jewelry light rig — colored lights simulate chromatic dispersion */}
      <ambientLight intensity={0.05} />
      <directionalLight position={[2,   8,  4]}  intensity={5}   color="#ffffff" />
      <directionalLight position={[-2,  5,  5]}  intensity={3.5} color="#f0f8ff" />
      <directionalLight position={[4,   4,  3]}  intensity={3}   color="#ffffff" />
      <directionalLight position={[5,   1,  1]}  intensity={3.5} color="#60b8ff" />
      <directionalLight position={[0,   0, -7]}  intensity={3}   color="#90c8ff" />
      <directionalLight position={[-4,  2,  4]}  intensity={3}   color="#ffd060" />
      <directionalLight position={[0,  -5,  2]}  intensity={2}   color="#ffe0a0" />
      <directionalLight position={[-2,  4, -5]}  intensity={2.5} color="#c060ff" />
      <pointLight position={[0, 1.5, 2.5]} intensity={4} color="#ffffff" distance={10} />

      <Suspense fallback={null}>
        <DiamondModel isDragging={isDragging} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.05}
        maxPolarAngle={Math.PI * 0.9}
        onStart={() => { isDragging.current = true; }}
        onEnd={()   => { isDragging.current = false; }}
      />
    </Canvas>
  );
}
