"use client";

import { useRef, useMemo, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { OrbitControls, useEnvironment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ── Physical diamond material ─────────────────────────────
function DiamondModel({ isDragging }: { isDragging: React.MutableRefObject<boolean> }) {
  const { scene } = useGLTF("/pure_diamond.glb");
  const groupRef  = useRef<THREE.Group>(null);

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

  // Throttled RAF: rotate + invalidate at ~24fps
  useEffect(() => {
    const TARGET_FPS = 24;
    const interval = 1000 / TARGET_FPS; // ~41.67ms
    let lastTime = 0;
    let rafId: number;

    const loop = (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time - ((time - lastTime) % interval);
        if (!isDragging.current && groupRef.current) {
          // ~0.28 rad/s → scale by ratio of TARGET_FPS/60 for correct speed
          groupRef.current.rotation.y += (interval / 1000) * 0.28;
          invalidate(); // tell Canvas to render this frame
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/pure_diamond.glb");

// ── Shared Canvas config ──────────────────────────────────
const CANVAS_GLSL = {
  antialias:           true,
  alpha:               false,
  toneMapping:         THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.6,
  powerPreference:     "high-performance" as const,
};

const CAMERA = { position: [0, 0.4, 4.0] as [number, number, number], fov: 38 };

const SCENE_LIGHTS = (
  <>
    <color attach="background" args={["#060810"]} />
    <ambientLight intensity={0.08} />
    <directionalLight position={[3,  8,  4]} intensity={6}   color="#ffffff" />
    <directionalLight position={[-3, 4, -4]} intensity={4}   color="#a0c8ff" />
    <directionalLight position={[0, -4,  3]} intensity={3}   color="#ffe0a0" />
  </>
);

// ── Default: always render at native refresh rate ──────────
export function Diamond3D() {
  const isDragging = useRef(false);

  return (
    <Canvas
      gl={CANVAS_GLSL}
      camera={CAMERA}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
    >
      {SCENE_LIGHTS}
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

// ── Hero: demand-loop with 24fps RAF rotation ─────────────
// GPU renders only when invalidate() is called (~24 times/sec)
// No continuous 60fps render loop → eliminates GPU stalls
export function Diamond3DDemand() {
  const isDragging = useRef(false);

  return (
    <Canvas
      gl={CANVAS_GLSL}
      camera={CAMERA}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
      frameloop="demand"
    >
      {SCENE_LIGHTS}
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
