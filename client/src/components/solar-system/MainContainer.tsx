import { Stars } from "@react-three/drei";
import React from "react";
import { useSolarData } from "../../hooks/useSolarData";
import Planet from "./Planet";

/**
 * This component is used to display the solar system.
 * @returns {JSX.Element} - A solar system
 */
export default function MainContainer() {
  return (
    <>
      <directionalLight intensity={1.5} position={[-5, 0, 0]} />

      {/* Map over all bodies*/}
      {useSolarData().map((e) => {
        const {
          id,
          model,
          text,
          scale,
          position,
          map,
          rotation,
          img,
          orbitalSpeed,
          para,
        } = e;
        return (
          <Planet
            key={id}
            position={position}
            model={model}
            text={text}
            scale={scale}
            rotation={rotation}
            map={map}
            img={img}
            orbitalRotationSpeed={orbitalSpeed ? orbitalSpeed : 0}
            para={para}
          />
        );
      })}
      <Stars
        count={10000}
        radius={200}
        depth={150}
        factor={10}
        saturation={0}
        fade
      />
    </>
  );
}
