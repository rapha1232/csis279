import { Loader, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../components/solar-system/MainContainer";

function SolarSystem() {
  return (
    <div className="relative h-screen">
      <Link
        to="/home"
        className="absolute top-[10px] left-[10px] p-[10px] z-10 text-dark100_light900 bg-primary-500 border-1 border-black rounded-md"
      >
        Back to home
      </Link>
      <Canvas
        shadows
        camera={{ fov: 55, near: 0.1, far: 1000, position: [200, 100, 100] }}
      >
        <color attach="background" args={["black"]} />
        <ambientLight intensity={5} position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <OrbitControls />
          <MainContainer />
          <Preload all />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default SolarSystem;
