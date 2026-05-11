"use client";
import { Edges, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

interface Dice3DProps {
  sides: DiceType;
  rolling: boolean;
  result: number | null;
  color?: string;
  edgeColor?: string;
}

export function Dice3D({
  sides,
  rolling,
  result,
  color = "#1F2937",
  edgeColor = "#D4AF37",
}: Dice3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, faces } = useMemo(() => {
    let geo: THREE.BufferGeometry;
    let numbers: number[] = [];

    switch (sides) {
      case 4:
        geo = new THREE.TetrahedronGeometry(1.5, 0);
        numbers = [1, 2, 3, 4];
        break;
      case 6:
        geo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        numbers = [1, 6, 2, 5, 3, 4]; // Standard d6 mapping
        break;
      case 8:
        geo = new THREE.OctahedronGeometry(1.5, 0);
        numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        break;
      case 12:
        geo = new THREE.DodecahedronGeometry(1.5, 0);
        numbers = [1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7];
        break;
      case 10:
        // Sphere with 5 segments and 2 rings gives exactly 10 triangles
        geo = new THREE.SphereGeometry(1.5, 5, 2);
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        break;
      case 100:
        // Sphere with 10 segments and 6 rings gives exactly 100 triangles:
        // 10 top pole + 10 bottom pole + (4 rings * 10 quads * 2 triangles/quad) = 100
        geo = new THREE.SphereGeometry(1.5, 10, 6);
        numbers = Array.from({ length: 100 }, (_, i) => i + 1);
        break;
      default:
        geo = new THREE.IcosahedronGeometry(1.5, 0);
        numbers = [
          20, 2, 14, 4, 17, 8, 10, 12, 16, 6, 1, 19, 3, 13, 5, 18, 9, 11, 15, 7,
        ];
        break;
    }

    geo.computeVertexNormals();
    // Convert to non-indexed to ensure we can iterate over triangles reliably
    const nonIndexedGeo = geo.toNonIndexed();
    const positions = nonIndexedGeo.getAttribute("position").array;
    const faceData = [];

    // For geometries with more than one triangle per face (like BoxGeometry or Dodecahedron)
    // we need to group them. But the D20 logic assumes 1 triangle = 1 face.
    // Let's refine the face extraction logic.

    if (sides === 6) {
      // D6 has 6 faces, each 2 triangles.
      const faceNormals = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, -1),
      ];
      for (let i = 0; i < 6; i++) {
        faceData.push({
          id: i,
          number: numbers[i],
          position: faceNormals[i].clone().multiplyScalar(0.9),
          normal: faceNormals[i].clone(),
        });
      }
    } else if (sides === 12) {
      // D12 has 12 pentagonal faces.
      // We can find unique normals from the vertices.
      const pos = positions;
      const seenNormals: THREE.Vector3[] = [];

      for (let i = 0; i < pos.length; i += 9) {
        const v1 = new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]);
        const v2 = new THREE.Vector3(pos[i + 3], pos[i + 4], pos[i + 5]);
        const v3 = new THREE.Vector3(pos[i + 6], pos[i + 7], pos[i + 8]);
        const normal = new THREE.Vector3()
          .crossVectors(v2.clone().sub(v1), v3.clone().sub(v1))
          .normalize();

        if (!seenNormals.some((n) => n.angleTo(normal) < 0.1)) {
          seenNormals.push(normal);
          faceData.push({
            id: seenNormals.length - 1,
            number: numbers[seenNormals.length - 1] || seenNormals.length,
            position: normal.clone().multiplyScalar(1.4),
            normal: normal.clone(),
          });
        }
      }
    } else {
      // For Tetrahedron, Octahedron, Icosahedron, and Sphere (D10, D100)
      const faceCount = sides;
      for (let i = 0; i < faceCount; i++) {
        const idx = i * 9;
        if (idx + 8 >= positions.length) break;
        const v1 = new THREE.Vector3(
          positions[idx],
          positions[idx + 1],
          positions[idx + 2],
        );
        const v2 = new THREE.Vector3(
          positions[idx + 3],
          positions[idx + 4],
          positions[idx + 5],
        );
        const v3 = new THREE.Vector3(
          positions[idx + 6],
          positions[idx + 7],
          positions[idx + 8],
        );

        const centroid = new THREE.Vector3()
          .add(v1)
          .add(v2)
          .add(v3)
          .divideScalar(3);

        faceData.push({
          id: i,
          number: numbers[i] ?? i + 1,
          position: centroid.clone(),
          normal: centroid.clone().normalize(),
        });
      }
    }

    return { geometry: geo, faces: faceData };
  }, [sides]);

  const targetQuaternion = useRef(new THREE.Quaternion());
  const currentQuaternion = useRef(new THREE.Quaternion());
  const spinVelocity = useRef(new THREE.Vector3());

  useEffect(() => {
    if (rolling) {
      spinVelocity.current.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
      );
    } else if (result !== null) {
      const face = faces.find((f) => f.number === result);
      if (face && groupRef.current) {
        const targetNormal = new THREE.Vector3(0, 0, 1);
        const q = new THREE.Quaternion().setFromUnitVectors(
          face.normal,
          targetNormal,
        );

        const randomSpins = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, 0, (Math.random() * 360 * Math.PI) / 180),
        );
        randomSpins.multiply(q);
        targetQuaternion.current.copy(randomSpins);
      }
    }
  }, [rolling, result, faces]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (rolling) {
      groupRef.current.rotation.x += spinVelocity.current.x * delta;
      groupRef.current.rotation.y += spinVelocity.current.y * delta;
      groupRef.current.rotation.z += spinVelocity.current.z * delta;
      currentQuaternion.current.copy(groupRef.current.quaternion);
    } else if (result !== null) {
      currentQuaternion.current.slerp(targetQuaternion.current, 0.1);
      groupRef.current.quaternion.copy(currentQuaternion.current);
    } else {
      groupRef.current.rotation.x += 0.005;
      groupRef.current.rotation.y += 0.01;
      currentQuaternion.current.copy(groupRef.current.quaternion);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          polygonOffset
          polygonOffsetFactor={1}
        />
        <Edges threshold={sides >= 100 ? 5 : 15} color={edgeColor} />
      </mesh>

      {faces.map((f) => {
        // Offset to prevent text from sinking into the face
        const offset = sides >= 100 ? 0.08 : sides > 20 ? 0.1 : 0.06;
        const pos = f.position
          .clone()
          .add(f.normal.clone().multiplyScalar(offset));
        const lookTarget = pos.clone().add(f.normal);

        return (
          <group
            key={`${f.number}-${f.id}`}
            position={[pos.x, pos.y, pos.z]}
            onUpdate={(self) =>
              self.lookAt(lookTarget.x, lookTarget.y, lookTarget.z)
            }
          >
            <Text
              fontSize={sides >= 100 ? 0.22 : sides >= 20 ? 0.4 : 0.6}
              color={result === f.number ? edgeColor : "#F9FAFB"}
              anchorX="center"
              anchorY="middle"
              material-toneMapped={false}
              // Depth test ensures numbers on the back side are hidden by the die
              depthTest={true}
            >
              {f.number}
              {(f.number === 6 || f.number === 9) && sides > 6 && sides < 100
                ? "."
                : ""}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
