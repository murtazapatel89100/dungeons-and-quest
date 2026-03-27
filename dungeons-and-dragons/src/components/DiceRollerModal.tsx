"use client";
import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Environment, ContactShadows, Edges } from "@react-three/drei";
import * as THREE from "three";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

interface DiceRollerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function D20Dice({ rolling, result }: { rolling: boolean; result: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { geometry, faces } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 0);
    geo.computeVertexNormals();
    
    const positions = geo.getAttribute('position').array;
    const faceData = [];
    
    const numbers = [20, 2, 14, 4, 17, 8, 10, 12, 16, 6, 1, 19, 3, 13, 5, 18, 9, 11, 15, 7];
    
    for (let i = 0; i < 20; i++) {
        const idx = i * 9;
        const v1 = new THREE.Vector3(positions[idx], positions[idx+1], positions[idx+2]);
        const v2 = new THREE.Vector3(positions[idx+3], positions[idx+4], positions[idx+5]);
        const v3 = new THREE.Vector3(positions[idx+6], positions[idx+7], positions[idx+8]);
        
        const centroid = new THREE.Vector3()
            .add(v1).add(v2).add(v3).divideScalar(3);
            
        faceData.push({
            id: i,
            number: numbers[i] || i + 1,
            position: centroid.clone(),
            normal: centroid.clone().normalize(),
            v1, v2, v3
        });
    }
    
    // We return the INDEXED geo for the mesh/edges to render correctly without seams
    return { geometry: geo, faces: faceData };
  }, []);

  const targetQuaternion = useRef(new THREE.Quaternion());
  const currentQuaternion = useRef(new THREE.Quaternion());
  const spinVelocity = useRef(new THREE.Vector3());

  useEffect(() => {
    if (rolling) {
      spinVelocity.current.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
    } else if (result) {
      const face = faces.find(f => f.number === result);
      if (face && groupRef.current) {
        const targetNormal = new THREE.Vector3(0, 0, 1);
        const q = new THREE.Quaternion().setFromUnitVectors(face.normal, targetNormal);
        
        const randomSpins = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, 0, (Math.random() * 360) * Math.PI / 180)
        );
        randomSpins.multiply(q);
        targetQuaternion.current.copy(randomSpins);
      }
    }
  }, [rolling, result, faces]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    if (rolling) {
      groupRef.current.rotation.x += spinVelocity.current.x * delta;
      groupRef.current.rotation.y += spinVelocity.current.y * delta;
      groupRef.current.rotation.z += spinVelocity.current.z * delta;
      currentQuaternion.current.copy(groupRef.current.quaternion);
    } else if (result) {
      currentQuaternion.current.slerp(targetQuaternion.current, 0.05);
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
          color="#1F2937"
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
        <Edges threshold={15} color="#D4AF37" />
      </mesh>

      {faces.map((f, i) => {
        const pos = f.position.clone().add(f.normal.clone().multiplyScalar(0.02));
        const lookTarget = pos.clone().add(f.normal);
        
        return (
          <group 
            key={i} 
            position={[pos.x, pos.y, pos.z]} 
            onUpdate={(self) => self.lookAt(lookTarget.x, lookTarget.y, lookTarget.z)}
          >
            <Text
              fontSize={0.4}
              color={result === f.number ? "#D4AF37" : "#F9FAFB"}
              anchorX="center"
              anchorY="middle"
              material-toneMapped={false}
            >
              {f.number}
              {f.number === 6 || f.number === 9 ? "." : ""}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function DiceRollerModal({ isOpen, onClose }: DiceRollerModalProps) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    setResult(null);

    const newResult = Math.floor(Math.random() * 20) + 1;
    
    setTimeout(() => {
      setResult(newResult);
      setRolling(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F1A]/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111827] border-2 border-[#D4AF37]/50 p-8 shadow-[0_0_40px_rgba(109,40,217,0.2)] flex flex-col items-center"
          >
            {/* Corner Embellishments */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#D4AF37] z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-4 relative z-10 w-full">
              <h2 className="font-['Cinzel'] text-2xl md:text-3xl text-[#F9FAFB] uppercase tracking-widest mb-2">
                Test Your Fate
              </h2>
              <p className="font-['Inter'] text-[#9CA3AF] text-sm">
                Target Critical: 20
              </p>
            </div>

            {/* Sizing Fix: explicit height to ensure Canvas scales up correctly */}
            <div className="w-full relative flex flex-col items-center justify-center h-[350px] mt-4">
              <div className="w-full h-full cursor-pointer" onClick={rollDice}>
                <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} style={{ width: "100%", height: "100%" }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 10]} intensity={2} />
                  <Suspense fallback={null}>
                    <Environment preset="city" />
                    <D20Dice rolling={rolling} result={result} />
                  </Suspense>
                  <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />
                </Canvas>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none">
                {result !== null && !rolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="font-['Cinzel'] text-3xl md:text-4xl font-bold text-[#D4AF37] drop-shadow-[0_0_15px_rgba(0,0,0,1)] text-center bg-[#111827]/80 px-6 py-2 rounded-sm backdrop-blur-md border border-[#D4AF37]/30"
                  >
                    {result === 20 ? 'Critical Success!' : result === 1 ? 'Critical Failure!' : result}
                  </motion.div>
                )}
                {rolling && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="font-['Cinzel'] text-xl text-[#9CA3AF] tracking-widest uppercase bg-[#111827]/80 px-6 py-2 rounded-sm backdrop-blur-md"
                  >
                    Casting...
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center relative z-10 w-full">
              <button
                onClick={rollDice}
                disabled={rolling}
                className="px-8 py-3 bg-[#0B0F1A] border border-[#D4AF37]/50 text-[#D4AF37] font-['Cinzel'] uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rolling ? 'Rolling...' : 'Roll Again'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
