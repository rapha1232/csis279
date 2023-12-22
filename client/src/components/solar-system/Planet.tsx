import { useIntersect } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { Group, Object3DEventMap, Texture } from "three";
import Sphere from "./Sphere";

interface Props {
  position: [number, number, number];
  model?: Group<Object3DEventMap>;
  text: string;
  scale: number;
  rotation?: [number, number, number];
  map?: Texture;
  para: string;
  img: string;
  orbitalRotationSpeed: number;
}

/**
 * This component is used to display a planet.
 * @param {number[]} position - The position of the planet
 * @param {Group<Object3DEventMap>} model - The model of the planet
 * @param {string} text - The name of the planet
 * @param {number} scale - The scale of the planet
 * @param {number[]} rotation - The rotation of the planet
 * @param {Texture} map - The texture of the planet
 * @param {string} para - A paragraph about the planet
 * @param {string} img - The image of the planet
 * @param {number} orbitalRotationSpeed - The orbital rotation speed of the planet
 * @returns {JSX.Element} - A planet
 */
export default function Planet({
  position,
  model,
  text,
  scale,
  rotation,
  map,
  para,
  img,
  orbitalRotationSpeed,
}: Props) {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!visible.current) {
      setAnimate(true);
    }
  }, [visible]);

  return (
    <>
      <Sphere
        rotation={rotation}
        animate={animate}
        reference={ref}
        map={map}
        position={position}
        model={model}
        text={text}
        img={img}
        scale={scale}
        orbitalSpeed={orbitalRotationSpeed}
        para={para}
      />
    </>
  );
}
