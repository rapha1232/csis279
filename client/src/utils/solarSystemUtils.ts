import { Vector3 } from "three";

// Calculate the orbital points for a planet
export const calculateOrbitalPoints = (radius: number, segments: number) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);
    points.push(new Vector3(x, 0, z));
  }
  return points;
};
