import { a, useSpring } from "@react-spring/three";
import { Line, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { calculateOrbitalPoints } from "../../utils/solarSystemUtils";

interface Props {
  position: [number, number, number];
  scale: number;
  model?: any;
  animate?: boolean;
  reference?: any;
  text: string;
  map?: any;
  rotation?: [number, number, number];
  img?: string;
  orbitalSpeed: number;
  para: string;
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
export default function Sphere({
  position,
  scale,
  model,
  animate,
  reference,
  text,
  map,
  rotation,
  orbitalSpeed,
  para,
}: Props) {
  const lineRef = useRef<any>();
  const nameTagRef = useRef<any>();

  // Rotate the planet and update the position of the nametag
  useFrame(({ clock }) => {
    text === "Venus"
      ? (reference.current.rotation.y -= 0.0009)
      : (reference.current.rotation.y += 0.0009);

    if (animate) {
      const orbitalPosition = [
        position[0] * Math.cos(clock.getElapsedTime() * orbitalSpeed),
        position[1],
        position[0] * Math.sin(clock.getElapsedTime() * orbitalSpeed),
      ];

      reference.current.position.set(
        orbitalPosition[0],
        orbitalPosition[1],
        orbitalPosition[2]
      );

      // Update the position of the nametag
      const nametagPosition = [
        orbitalPosition[0],
        orbitalPosition[1] + 10, // Adjust the vertical position of the nametag
        orbitalPosition[2],
      ];
      nameTagRef.current.position.set(
        nametagPosition[0],
        nametagPosition[1],
        nametagPosition[2]
      );
    }
  });

  const [normal, roughness] = useTexture([
    "/assets/solar_system/Textures/normal.jpg",
    "/assets/solar_system/Textures/roughness.png",
  ]);

  const props = useSpring({
    scale: animate ? scale : scale * 0.25,
  });

  return (
    <>
      {/* Render Orbital Line */}
      <Line
        ref={lineRef}
        position={[0, 0, 0]}
        points={calculateOrbitalPoints(position[0], 64)}
        color="gray"
        lineWidth={0.2}
      />

      {text === "Saturn" ? (
        <a.mesh
          position={position}
          ref={reference}
          rotation={rotation}
          scale={props.scale}
        >
          <primitive object={model} />
        </a.mesh>
      ) : (
        <a.mesh position={position} scale={props.scale} ref={reference}>
          <sphereGeometry args={[0.5, 128, 128]} />
          <meshStandardMaterial
            wireframe={false}
            normalMap={text === "Earth" ? normal : null}
            map={map}
          />
        </a.mesh>
      )}

      <Text
        ref={nameTagRef}
        position={[position[0], position[1] + 3, position[2]]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </>
  );
}
