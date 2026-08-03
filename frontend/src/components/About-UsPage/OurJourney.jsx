import React, { useRef } from 'react';
import { FiHome, FiHeart, FiMapPin } from 'react-icons/fi';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const timelineData = [
  {
    id: 1,
    year: "2018",
    pill: "01 COMPANY DETAILS",
    title: "Where it all started",
    description: "Dr. Design began in 2018 as a two-person design studio in Dehradun, working on interfaces for local businesses. As clients started asking for the systems behind those interfaces, we grew into a full engineering practice — custom software, ERP platforms, cloud infrastructure and, later, a dedicated geospatial division.",
    bullets: [
      "Registered as Dr. Design Pvt. Ltd., headquartered in Dehradun with a presence in Delhi",
      "Two practices under one roof: IT Services and GIS / Geospatial Services",
      "A dedicated squad model — product lead, designers, engineers and QA on every project"
    ],
    alignment: "left",
    icon: FiHome
  },
  {
    id: 2,
    year: "Today",
    pill: "02 CULTURE & VALUES",
    title: "What drives our work",
    description: "We are a small, senior team that prefers clarity over ceremony. Our culture is built on ownership: the people who design a system stay with it through delivery and support. That continuity is why our clients stay with us for years rather than projects.",
    bullets: [
      "Innovation first — we prototype early and test with real users before writing production code",
      "Sustainable engineering — maintainable codebases, documented systems, no throwaway work",
      "Customer obsession — transparent sprint updates, no surprises on scope or timelines"
    ],
    alignment: "right",
    icon: FiHeart
  },
  {
    id: 3,
    year: "Always",
    pill: "03 LOCATION & CONTACT",
    title: "Where to find us",
    description: "Our studio sits near Survey Chowk in Dehradun, minutes from the Survey of India campus — a fitting neighbourhood for a team that maps as much as it codes. We work with clients across India and internationally, on-site or fully remote.",
    bullets: [
      "Head office: Near Survey Chowk, 11 East Canal Road, Dehradun, Uttarakhand 248001",
      "Second presence: Delhi NCR for client and government engagements",
      "Reach us at business@drdesigntech.com or +91 7060100443"
    ],
    alignment: "left",
    icon: FiMapPin
  }
];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring configuration for the tilt
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });
  
  // Map mouse position to rotation angles (max 7 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to flat when mouse leaves
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
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
         {children}
      </div>
    </motion.div>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const OurJourney = () => {
  const containerRef = useRef(null);
  
  // Scroll progress for the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Parallax background blobs moving opposite to scroll
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background split (desktop only) */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 bg-[#fdf6f9] -z-20" />

      {/* Floating Parallax Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-10 left-[10%] w-72 h-72 bg-cyan-300/20 rounded-full blur-[80px] pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-pink-300/20 rounded-full blur-[80px] pointer-events-none -z-10"
      />

      <div className="max-w-full mx-15 relative pt-20 pb-32">
        {/* Header */}
        <div className="mb-24">
          <h2 className="text-sm font-semibold tracking-[0.15em] text-[#5e6673] uppercase flex items-center gap-6 font-jetbrains">
            <span>01 /</span>
            <span className="w-10 h-[2px] bg-gray-200 rounded-full"></span>
            <span>OUR JOURNEY</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line Background (Gray) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 transform md:-translate-x-1/2" />
          
          {/* Vertical Line Foreground (Animated Color with Glowing Tip) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-[#081023] transform md:-translate-x-1/2 origin-top flex flex-col justify-end items-center z-20" 
          >
             {/* Glowing Laser Tip */}
             <div className="w-[4px] h-[30px] bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(74,222,128,0.6)]" />
             <div className="w-[2px] h-[15px] bg-white absolute bottom-0 rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]" />
          </motion.div>

          <div className="flex flex-col gap-24 md:gap-32">
            {timelineData.map((item) => {
              const isLeft = item.alignment === 'left';
              
              return (
                <div key={item.id} className={`w-full flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'} relative`}>
                  
                  {/* Center Node */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50% 0px -30% 0px" }}
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 top-0 md:top-8"
                  >
                    <motion.div 
                      variants={{
                        hidden: { backgroundColor: "#e5e7eb", color: "#9ca3af" },
                        visible: { backgroundColor: "#081023", color: "#ffffff", transition: { duration: 0.3 } }
                      }}
                      className="text-[10px] font-bold px-3 py-1 rounded-full mb-2 tracking-wider font-jetbrains shadow-sm"
                    >
                      {item.year}
                    </motion.div>
                    
                    <div className="relative flex items-center justify-center">
                      {/* Heartbeat Pulse Ring */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { 
                            opacity: [0.6, 0], 
                            scale: [1, 1.8],
                            transition: { duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }
                          }
                        }}
                        className="absolute inset-0 rounded-full border-2 border-[#081023] bg-[#081023]/10"
                      />

                      <motion.div 
                        variants={{
                          hidden: { borderColor: "#e5e7eb", boxShadow: "0 0 0 rgba(0,0,0,0)" },
                          visible: { borderColor: "#081023", boxShadow: "0 10px 15px -3px rgba(8,16,35,0.2)", transition: { duration: 0.3 } }
                        }}
                        className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full border-2 flex items-center justify-center relative z-10"
                      >
                        <motion.div
                          variants={{
                            hidden: { color: "#d1d5db", scale: 0.8 },
                            visible: { color: "#081023", scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                          }}
                        >
                          <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Card Container with Staggered Reveal */}
                  <div className={`w-full md:w-[calc(50%-3rem)] pl-24 md:pl-0 ${isLeft ? 'md:pr-10 lg:pr-16' : 'md:pl-10 lg:pl-16'}`}>
                    <motion.div 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        hidden: { opacity: 0, x: isLeft ? -50 : 50 },
                        visible: { 
                          opacity: 1, 
                          x: 0, 
                          transition: { 
                            duration: 1, 
                            ease: [0.16, 1, 0.3, 1],
                            when: "beforeChildren",
                            staggerChildren: 0.2
                          } 
                        }
                      }}
                      className="w-full"
                    >
                      <TiltCard className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-gray-100 px-6 pb-6 pt-3 md:px-10 md:pb-10 md:pt-5 shadow-lg hover:shadow-2xl transition-shadow duration-500 relative cursor-default">
                        <motion.div variants={itemVariants} className={`flex justify-start ${isLeft ? 'md:justify-end' : 'md:justify-start'} mb-6`}>
                          <span className="bg-[#0a181c] text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase font-jetbrains shadow-md">
                            {item.pill}
                          </span>
                        </motion.div>
                        
                        <motion.h3 variants={itemVariants} className={`text-2xl md:text-3xl font-semibold text-[#0a181c] mb-4 text-left ${isLeft ? 'md:text-right' : 'md:text-left'} font-jetbrains`}>
                          {item.title}
                        </motion.h3>
                        
                        <motion.p variants={itemVariants} className={`text-[#5e6673] text-sm md:text-base leading-relaxed mb-8 text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                          {item.description}
                        </motion.p>

                        <div className="flex flex-col gap-3">
                          {item.bullets.map((bullet, idx) => (
                            <motion.div 
                              key={idx}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02, x: isLeft ? -5 : 5, transition: { duration: 0.2 } }}
                              className={`p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md flex items-center gap-4 flex-row ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} text-left ${isLeft ? 'md:text-right' : 'md:text-left'} transition-all`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                              <span className="text-xs md:text-sm text-[#5e6673] leading-snug">{bullet}</span>
                            </motion.div>
                          ))}
                        </div>
                      </TiltCard>
                    </motion.div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurJourney;