import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from 'three';

function ConfusedBot() {
  const group = useRef();
  const leftEye = useRef();
  const rightEye = useRef();
  const bumpTime = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      bumpTime.current = performance.now();
    }
  };

  useFrame((state) => {
    // Floating animation
    if (group.current) {
      let baseY = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      let bumpOffset = 0;

      if (bumpTime.current > 0) {
        const elapsed = performance.now() - bumpTime.current;
        if (elapsed < 400) { // 400ms bump duration
          bumpOffset = Math.sin((elapsed / 400) * Math.PI) * 0.4;
        } else {
          bumpTime.current = 0;
        }
      }

      group.current.position.y = baseY + bumpOffset;
      
      // Slight rotation based on mouse
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.1);
    }

    // Eyes following mouse
    if (leftEye.current && rightEye.current) {
      const eyeTargetX = state.pointer.x * 0.15;
      const eyeTargetY = state.pointer.y * 0.15;
      
      leftEye.current.position.x = THREE.MathUtils.lerp(leftEye.current.position.x, -0.25 + eyeTargetX, 0.2);
      leftEye.current.position.y = THREE.MathUtils.lerp(leftEye.current.position.y, 0.4 + eyeTargetY, 0.2);
      
      rightEye.current.position.x = THREE.MathUtils.lerp(rightEye.current.position.x, 0.25 + eyeTargetX, 0.2);
      rightEye.current.position.y = THREE.MathUtils.lerp(rightEye.current.position.y, 0.4 + eyeTargetY, 0.2);
    }
  });

  return (
    <group ref={group} onClick={handleClick}>
      {/* Body */}
      <mesh castShadow position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.7, 1.2, 4, 32]} />
        <meshStandardMaterial color="#19C853" roughness={0.5} metalness={0.1} />
      </mesh>
      
      {/* Left Eye White */}
      <mesh position={[-0.25, 0.4, 0.6]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} />
      </mesh>
      {/* Left Eye Pupil */}
      <mesh ref={leftEye} position={[-0.25, 0.4, 0.8]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#0C0D0D" roughness={0.1} />
      </mesh>

      {/* Right Eye White */}
      <mesh position={[0.25, 0.4, 0.6]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} />
      </mesh>
      {/* Right Eye Pupil */}
      <mesh ref={rightEye} position={[0.25, 0.4, 0.8]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#0C0D0D" roughness={0.1} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#0C0D0D" />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial color="#19C853" emissive="#19C853" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Helper component for staggered text animation
function AnimatedText({ text, className, delayOffset = 0 }) {
  const chars = text.split("");
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            ease: "backOut",
            delay: delayOffset + index * 0.03,
          }}
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function PlaceholderPage() {
  return (
    <div className="flex-1 w-full overflow-hidden bg-[radial-gradient(circle_at_center,#ffffff_0%,#EDECF1_100%)] dark:bg-[radial-gradient(circle_at_center,#0B1120_0%,#081023_100%)] relative flex flex-col items-center justify-center">
      
      {/* 404 Main Container */}
      <div className="relative flex items-center justify-center w-full px-4 mb-4 md:mb-8 flex-1 max-h-[60vh]">
        {/* Left 4 */}
        <motion.div 
          initial={{ opacity: 0, x: -100, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
          className="text-[35vw] md:text-[300px] font-black leading-none text-[#081023] dark:text-[#f1f5f9] drop-shadow-2xl z-10 select-none"
        >
          4
        </motion.div>

        {/* Center Canvas acting as '0' */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-[30vw] h-[40vw] md:w-70 md:h-100 z-20 shrink-0 -mx-2 md:-mx-6"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <hemisphereLight skyColor="#ffffff" groundColor="#EDECF1" intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <ConfusedBot />
            </Float>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Canvas>
        </motion.div>

        {/* Right 4 */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut", delay: 0.3 }}
          className="text-[35vw] md:text-[300px] font-black leading-none text-[#081023] dark:text-[#f1f5f9] drop-shadow-2xl z-10 select-none"
        >
          4
        </motion.div>
      </div>
      <div className="relative z-30 flex flex-col items-center text-center px-6 pb-12">
        <AnimatedText 
          text="Oops, this place feels lost" 
          className="text-2xl md:text-5xl font-bold text-[#0C0D0D] dark:text-white tracking-tight mb-2 md:mb-4"
          delayOffset={0.6}
        />

        <AnimatedText 
          text="Let's get you somewhere safe" 
          className="text-xs md:text-lg text-[#0C0D0D]/50 dark:text-white/50 mb-6 md:mb-8 font-medium"
          delayOffset={1.2}
        />
      </div>

    </div>
  );
}
