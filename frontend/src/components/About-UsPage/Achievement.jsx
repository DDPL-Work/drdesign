import React from 'react';
import { FiClock, FiAward, FiShield, FiCheckCircle, FiMap, FiBriefcase } from 'react-icons/fi';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const achievements = [
  {
    id: 1,
    icon: FiCheckCircle,
    title: "300+ Successful IT Deliveries",
    description: "From agile MVPs to enterprise-grade custom ERP software rollouts across India and globally."
  },
  {
    id: 2,
    icon: FiShield,
    title: "Secure Software Architecture",
    description: "Audit-ready IT solutions engineered for stringent healthcare, government, and financial sectors."
  },
  {
    id: 3,
    icon: FiAward,
    title: "ISO 9001:2015 Aligned Development",
    description: "Rigorous quality management processes across discovery, software delivery, and ongoing tech support."
  },
  {
    id: 4,
    icon: FiClock,
    title: "5+ Years, Zero Abandoned Projects",
    description: "A trusted Dehradun tech partner ensuring every engagement reaches launch with dedicated post-live support."
  },
  {
    id: 5,
    icon: FiMap,
    title: "Advanced Geospatial (GIS) Solutions",
    description: "Delivering remote sensing, LULC mapping, and highly scalable web GIS platforms at a national level."
  },
  {
    id: 6,
    icon: FiBriefcase,
    title: "MSME & Startup India Recognised",
    description: "A registered IT and GIS vendor trusted for delivering complex public-sector and institutional projects."
  }
];

// Reusing TiltCard from previous section for premium consistency
const TiltCard = ({ children, className }) => {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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
      <div style={{ transform: "translateZ(10px)" }} className="w-full h-full flex flex-col relative z-10">
         {children}
      </div>
    </motion.div>
  );
};

const Achievement = () => {
  return (
    <section id="achievements" className="w-full bg-white pb-15 md:pb-24 overflow-hidden">
      <div className="max-w-full mx-4 md:mx-15">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-10"
        >
          <h2 className="text-[12px] font-medium tracking-[0.2em] text-[#8b949e] uppercase flex items-center gap-6 font-inter">
            <span>03 /</span>
            <span className="w-16 h-[1px] bg-gray-200 rounded-full"></span>
            <span>ACHIEVEMENTS</span>
          </h2>
        </motion.div>

        {/* Big Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-16 max-w-4xl"
        >
          <h3 className="text-[25px] md:text-[48px] font-medium text-[#0a181c] font-jetbrains leading-[1.2]">
            Credibility, earned project by<br className="hidden md:block" />project
          </h3>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Cards Container */}
      <div 
        className="w-full relative max-w-[100vw] overflow-hidden"
        style={{ 
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="px-4 md:px-15"
        >
          <div className="flex w-max gap-6 md:gap-[44px] pb-8 md:pb-12 pt-4 pr-6 md:pr-[44px] animate-marquee hover:[animation-play-state:paused]">
            {[...achievements, ...achievements].map((item, index) => (
              <TiltCard 
                key={`${item.id}-${index}`}
                className="w-[280px] md:w-[413px] h-[160px] md:h-[187px] flex-shrink-0 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] p-6 md:p-8 transition-shadow duration-500 ease-out group cursor-default"
              >
                <div className="mb-4 md:mb-8 relative w-6 h-6 md:w-8 md:h-8">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#0a181c] absolute top-0 left-0 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-cyan-600" strokeWidth={1.5} />
                  {/* Subtle ambient glow behind icon on hover */}
                  <div className="absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 bg-cyan-100/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                </div>
                
                <div className="flex flex-col gap-2 md:gap-4">
                  <h4 className="text-[15px] md:text-[18px] font-bold text-[#0a181c] font-jetbrains leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[#5e6673] font-inter text-[12px] md:text-[14px] leading-relaxed line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Global style to handle the infinite marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: scrollRight 40s linear infinite;
        }
      `}} />
    </section>
  );
}

export default Achievement;