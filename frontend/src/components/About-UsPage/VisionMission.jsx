import React, { useRef } from 'react';
import { FiEye, FiTarget } from 'react-icons/fi';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

// Replace with actual images from assets if needed
import img1 from '../../assets/vision.avif';
import img2 from '../../assets/mission.avif';

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });
  
  // Subtle 4 degree max rotation for larger cards
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {/* translateZ forces the inner content to pop out in 3D space slightly */}
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full flex flex-col relative z-10">
         {children}
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const VisionMission = () => {
  const containerRef = useRef(null);
  
  // For parallax background blobs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section id="vision-mission" ref={containerRef} className="relative w-full bg-white dark:bg-[#0B1120] pb-15 md:pb-24 overflow-hidden">
      
      {/* Ambient Parallax Background Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-10 right-0 w-160 h-160 bg-pink-100/40 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-[-10%] w120 h-120 bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <div className="max-w-full mx-4 md:mx-15 relative z-10">
        
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-sm font-semibold tracking-[0.15em] text-[#5e6673] dark:text-gray-400 uppercase flex items-center gap-6 font-jetbrains">
            <span>02 /</span>
            <span className="w-10 h-0.5 bg-gray-200 dark:bg-white/10 rounded-full"></span>
            <span>VISION & MISSION</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* Vision Card */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full h-full"
          >
            <TiltCard className="flex flex-col h-full bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-4xl border border-gray-100 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 ease-out overflow-hidden group">
              {/* Image */}
              <div className="w-full h-56 sm:h-88 relative overflow-hidden rounded-t-4xl">
                <motion.div variants={itemVariants} className="w-full h-full">
                  <img 
                    src={img1} 
                    loading='lazy'
                    alt="Our Vision" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-12 flex flex-col grow bg-white/90 dark:bg-white/5">
                <motion.div variants={itemVariants} className="relative w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8">
                  <div className="w-full h-full rounded-full bg-[#e6f4f1] flex items-center justify-center relative z-10">
                    <FiEye className="w-4 h-4 md:w-5 md:h-5 text-[#0a181c]" />
                  </div>
                  {/* Subtle hover pulse */}
                  <div className="absolute inset-0 rounded-full bg-[#e6f4f1] opacity-0 group-hover:animate-ping transition-opacity duration-300" />
                </motion.div>
                
                <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-[#0a181c] dark:text-white mb-4 md:mb-6 font-jetbrains">
                  Our Vision
                </motion.h3>
                
                <motion.p variants={itemVariants} className="text-[#5e6673] dark:text-gray-400 text-[13px] md:text-base leading-relaxed grow">
                  To be the technology partner of choice for organizations that manage complex physical and digital operations — making advanced software and spatial intelligence accessible to teams of every size.
                </motion.p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full h-full"
          >
            <TiltCard className="flex flex-col h-full bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-4xl border border-gray-100 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 ease-out overflow-hidden group">
              {/* Image */}
              <div className="w-full h-56 sm:h-88 relative overflow-hidden rounded-t-4xl">
                <motion.div variants={itemVariants} className="w-full h-full">
                  <img 
                    src={img2} 
                    loading='lazy'
                    alt="Our Mission" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-12 flex flex-col grow bg-white/90 dark:bg-white/5">
                <motion.div variants={itemVariants} className="relative w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8">
                  <div className="w-full h-full rounded-full bg-[#e6f4f1] flex items-center justify-center relative z-10">
                    <FiTarget className="w-4 h-4 md:w-5 md:h-5 text-[#0a181c]" />
                  </div>
                  {/* Subtle hover pulse */}
                  <div className="absolute inset-0 rounded-full bg-[#e6f4f1] opacity-0 group-hover:animate-ping transition-opacity duration-300" />
                </motion.div>
                
                <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-[#0a181c] dark:text-white mb-4 md:mb-6 font-jetbrains">
                  Our Mission
                </motion.h3>
                
                <motion.p variants={itemVariants} className="text-[#5e6673] dark:text-gray-400 text-[13px] md:text-base leading-relaxed grow">
                  To design and engineer software that people actually enjoy using — combining rigorous development practice, research-led design and geospatial expertise to deliver measurable outcomes for every client we serve.
                </motion.p>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default VisionMission;