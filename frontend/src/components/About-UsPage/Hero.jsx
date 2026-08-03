import React from "react";
import heroGradient from "../../assets/detailsHero.avif";
import heroImg from "../../assets/aboutUs.avif";
import { motion } from "framer-motion";

const AboutUsHero = () => {
  const text = "About Us";
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 }
    }
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-55 md:h-88.25 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        {/* Background photo */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <img
          src={heroGradient}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Light white gradient sheen */}
        <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/5 to-white/20 pointer-events-none" />
      </motion.div>
      {/* Centered title */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-jetbrains text-white text-3xl md:text-[64px] font-medium tracking-wide flex"
        >
          {text.split("").map((char, i) => (
            <motion.span key={i} variants={charVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default AboutUsHero