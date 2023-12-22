import { useGLTF, useTexture } from "@react-three/drei";

import { Group, Object3DEventMap, Texture } from "three";

type SolarData = {
  id: number;
  text: string;
  position: [number, number, number];
  scale: number;
  boundingBox: [number, number, number];
  para: string;
  lengthOfYear: string;
  distanceFromSun: number;
  numberOfMoon: number;
  map?: Texture;
  img: string;
  rotation?: [number, number, number];
  model?: Group<Object3DEventMap>;
  orbitalSpeed?: number;
};

/**
 * @description
 * Custom hook for getting the solar system data
 * @returns solarData - The solar system data
 */
export function useSolarData(): SolarData[] {
  const [{ scene: saturn }] = useGLTF(["/assets/solar_system/Saturn.glb"]);

  const [sun, mercury, venus, earth, neptune, mars, jupiter, uranus] =
    useTexture([
      "/assets/solar_system/Textures/sun.jpeg",
      "/assets/solar_system/Textures/mercury.png",
      "/assets/solar_system/Textures/venus.png",
      "/assets/solar_system/Textures/earth.jpeg",
      "/assets/solar_system/Textures/neptune.jpeg",
      "/assets/solar_system/Textures/mars.jpeg",
      "/assets/solar_system/Textures/jupiter.png",
      "/assets/solar_system/Textures/uranus.jpeg",
    ]);

  return [
    {
      id: 0,
      text: "Sun",
      position: [0, 0, 0],
      scale: 109.1,
      boundingBox: [0.5, 0.25, 0.5],
      para: "The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds the solar system together, keeping everything – from the biggest planets to the smallest particles of debris – in its orbit.",
      lengthOfYear: "0",
      distanceFromSun: 0,
      numberOfMoon: 0,
      map: sun,
      img: "/assets/images/sun.png",
    },
    {
      id: 1,
      text: "Mercury",
      position: [75, 0, 0],
      scale: 0.38,
      boundingBox: [0.5, 0.25, 0.5],
      para: "Mercury—the smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
      lengthOfYear: "88 Earth Days",
      distanceFromSun: 0.4,
      numberOfMoon: 0,
      map: mercury,
      img: "/assets/images/mercury.png",
      orbitalSpeed: (365.25 / 88) * 0.2,
    },
    {
      id: 2,
      text: "Venus",
      position: [90, 0, 0],
      scale: 0.95,
      boundingBox: [0.4, 0.25, 0.5],
      para: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
      lengthOfYear: "225 Earth Days",
      distanceFromSun: 0.7,
      numberOfMoon: 0,
      map: venus,
      img: "/assets/images/venus.jpg",
      orbitalSpeed: (365.25 / 225) * 0.2,
    },

    {
      id: 3,
      text: "Earth",
      position: [105, 0, 0],
      scale: 1,
      rotation: [0, -20, 0],
      boundingBox: [0.3, 0.25, 0.5],
      para: "Earth—our home planet—is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
      lengthOfYear: "365.25 Earth Days",
      distanceFromSun: 1,
      numberOfMoon: 1,
      map: earth,
      img: "/assets/images/earth.jpg",
      orbitalSpeed: 0.2,
    },
    {
      id: 4,
      text: "Mars",
      position: [120, 0, 0],
      scale: 0.53,
      boundingBox: [0.3, 0.25, 0.5],
      para: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
      lengthOfYear: "1.88 Earth Years",
      distanceFromSun: 1.5,
      numberOfMoon: 2,
      map: mars,
      img: "/assets/images/mars.jpg",
      orbitalSpeed: (365.25 / (1.88 * 365.25)) * 0.2,
    },
    {
      id: 5,
      text: "Jupiter",
      position: [150, 0, 0],
      scale: 11.21,
      boundingBox: [0.5, 0.25, 0.5],
      para: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
      lengthOfYear: "11.86 Earth Years",
      distanceFromSun: 5.2,
      numberOfMoon: 79,
      map: jupiter,
      img: "/assets/images/jupiter.jpg",
      orbitalSpeed: (365.25 / (11.86 * 365.25)) * 0.2,
    },
    {
      id: 6,
      text: "Saturn",
      model: saturn,
      position: [170, 0, 0],
      scale: 0.0085,
      rotation: [0, 0, -15],
      boundingBox: [0.4, 0.25, 0.5],
      para: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
      lengthOfYear: "29.45 Earth Years",
      distanceFromSun: 9.5,
      numberOfMoon: 62,
      img: "/assets/images/saturn.jpg",
      orbitalSpeed: (365.25 / (29.45 * 365.25)) * 0.2,
    },
    {
      id: 7,
      text: "Uranus",
      position: [190, 0, 0],
      scale: 4.01,
      boundingBox: [0.4, 0.25, 0.5],
      para: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
      lengthOfYear: "84 Earth Years",
      distanceFromSun: 19.8,
      numberOfMoon: 27,
      map: uranus,
      img: "/assets/images/uranus.jpg",
      orbitalSpeed: (365.25 / (84 * 365.25)) * 0.2,
    },
    {
      id: 8,
      text: "Neptune",
      position: [210, 0, 0],
      scale: 3.9,
      boundingBox: [0.4, 0.25, 0.5],
      para: "Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.",
      lengthOfYear: "164.81 Earth Years",
      distanceFromSun: 30.1,
      numberOfMoon: 14,
      map: neptune,
      img: "/assets/images/neptune.jpg",
      orbitalSpeed: (365.25 / (164.81 * 365.25)) * 0.2,
    },
  ];
}
