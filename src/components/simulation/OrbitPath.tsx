import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { getAsteroidPosition } from "../../utils/orbital-calculations";
import { AU_TO_UNITS } from "../../config/constants";
import type { AsteroidOrbitalData } from "../../types/asteroid";

export function OrbitPath({
  orbitalData,
  color = "#888888",
  opacity = 1.0,
}: {
  orbitalData: AsteroidOrbitalData;
  color?: string;
  opacity?: number;
}) {
  const points = useMemo(() => {
    const pathPoints = [];
    const segments = 512; // Reduced for performance
    
    // Calculate orbital period in days
    const period = parseFloat(orbitalData.orbital_period);
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * period; // Time from 0 to full period
      const [x, y, z] = getAsteroidPosition(t, orbitalData);
      pathPoints.push(new THREE.Vector3(x * AU_TO_UNITS, y * AU_TO_UNITS, z * AU_TO_UNITS));
    }
    return pathPoints;
  }, [orbitalData]);

  return <Line points={points} color={color} lineWidth={1} opacity={opacity} />;
}