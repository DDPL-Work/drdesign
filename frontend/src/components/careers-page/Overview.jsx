import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMap, FiTarget, FiCompass, FiZap, FiHeart, FiHome, FiBook, FiTrendingUp, FiSun, FiUsers, FiChevronDown } from 'react-icons/fi';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'culture', label: 'Culture' },
  { id: 'values', label: 'Our Values' },
  { id: 'benefits', label: 'Benefits' },
];

const CULTURE_DATA = [
  {
    title: "Customer Obsessed",
    description: "The customer is at the center of everything we do. What’s best for the customer is best for Dr. Design Technology.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-2",
    maxW: true
  },
  {
    title: "We raise the bar",
    description: "Every day is an opportunity for us to do even better — as team members and as a company.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1"
  },
  {
    title: "Truth Seeking",
    description: "We make our decisions based on data, and we adapt as it changes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1"
  },
  {
    title: "We operate from first principles",
    description: "First principles thinking drives our innovation and leadership. To build lasting impact, we start with why.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-2",
    maxW: true
  },
  {
    title: "We bias for action",
    description: "Speed is critical. We debate, plan, execute — and iterate — with urgency.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-2",
    maxW: true
  },
  {
    title: "We put the company first",
    description: "We do what’s best for the company, which ultimately incorporates all our culture principles.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1"
  }
];

const CultureCard = ({ colSpan, image, title, description, maxW = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
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
    if (window.innerWidth < 768) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`${colSpan} relative min-h-[300px] z-10 md:hover:z-50`} style={{ perspective: "1200px" }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="w-full h-full relative overflow-hidden rounded-[2rem] group shadow-md md:shadow-[0_4px_24px_rgba(0,0,0,0.04)] md:border md:border-gray-100 bg-white transform-gpu"
      >
        {/* Animated Expanding Image */}
        <div className="absolute top-0 right-0 w-full h-full rounded-none md:top-6 md:right-6 md:w-28 md:h-28 md:rounded-2xl overflow-hidden z-10 md:group-hover:top-0 md:group-hover:right-0 md:group-hover:w-full md:group-hover:h-full md:group-hover:rounded-none transition-all duration-[600ms] ease-[0.16,1,0.3,1]">
          <img src={image} className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" alt={title} />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-[600ms] z-20 pointer-events-none"></div>

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-30 pointer-events-none">
          <h3 className="font-jetbrains text-[22px] font-bold text-white md:text-[#081023] md:group-hover:text-white mb-2 leading-[1.3] transition-colors duration-500 drop-shadow-md md:drop-shadow-none">{title}</h3>
          <p className={`font-sans text-[14px] md:text-[15px] text-gray-200 md:text-[rgba(8,16,35,0.55)] md:group-hover:text-gray-300 leading-[1.6] transition-colors duration-500 drop-shadow-md md:drop-shadow-none ${maxW ? 'max-w-lg' : 'max-w-xs md:max-w-sm'}`}>
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const MobileCultureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CULTURE_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CULTURE_DATA.length) % CULTURE_DATA.length);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transformOrigin: dir > 0 ? "100% 50%" : "0% 50%"
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transformOrigin: "50% 50%",
      transition: { duration: 0.25, ease: "easeOut" }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transformOrigin: dir > 0 ? "0% 50%" : "100% 50%",
      transition: { duration: 0.25, ease: "easeIn" }
    })
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full mx-auto" style={{ perspective: 1200 }}>
      <div 
        className="w-full relative flex justify-center min-h-[360px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full"
          >
            <CultureCard 
              image={CULTURE_DATA[currentIndex].image}
              title={CULTURE_DATA[currentIndex].title}
              description={CULTURE_DATA[currentIndex].description}
              colSpan="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex gap-2 mt-6">
        {CULTURE_DATA.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-[#4B6BFB]' : 'w-2 bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Overview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeSectionLabel = SECTIONS.find(s => s.id === activeSection)?.label || 'Overview';

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (SECTIONS.some(s => s.id === hash)) {
      setActiveSection(hash);
      
      // When the hash changes (e.g. clicking mega menu from navbar),
      // smooth scroll to the section top.
      setTimeout(() => {
        if (sectionRef.current) {
          const yOffset = -100; 
          const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
          if (window.lenis) {
            window.lenis.scrollTo(y, { duration: 1.2 });
          } else {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [location.hash]);

  const sectionRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveSection(id);
    navigate(`/find-teams#${id}`, { replace: true });
    
    // Smooth scroll to the top of the section, adjusting for fixed navbar
    if (sectionRef.current) {
      const yOffset = -100; 
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-10 md:py-24 relative z-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          
          {/* Mobile Dropdown (Visible only on mobile) */}
          <div className="md:hidden w-full relative z-50">
            <div className="mb-3">
              <h3 className="font-jetbrains text-[18px] font-bold text-[#081023]">Explore Sections</h3>
              <p className="font-sans text-[13px] text-gray-500 mt-1">Tap below to jump to different topics</p>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-white border-2 border-gray-100 hover:border-[#4B6BFB]/50 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm transition-all"
            >
              <span className="font-jetbrains text-[16px] font-bold text-[#081023]">{activeSectionLabel}</span>
              <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown className="text-gray-500 text-xl" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden z-50"
                >
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        handleTabClick(section.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-5 py-4 font-jetbrains text-[15px] transition-all border-b last:border-b-0 border-gray-50 flex items-center ${
                        activeSection === section.id 
                          ? "bg-[#F1F7FF] text-[#4B6BFB] font-bold" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#081023]"
                      }`}
                    >
                      {activeSection === section.id && <div className="w-1.5 h-1.5 rounded-full bg-[#4B6BFB] mr-3" />}
                      {section.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Left Sidebar */}
          <div className="md:w-1/4 lg:w-1/5 relative hidden md:block">
            <div className="sticky top-32 flex flex-col gap-8 border-l-2 border-gray-100 pl-6 py-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleTabClick(section.id)}
                  className={`text-left font-jetbrains text-[15px] font-semibold tracking-wide transition-all duration-300 relative ${
                    activeSection === section.id 
                      ? "text-[#4B6BFB]" 
                      : "text-gray-400 hover:text-[#0B1120]"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div 
                      layoutId="activeSectionIndicator"
                      className="absolute -left-[26px] top-1/2 -translate-y-1/2 w-[2px] h-6 bg-[#4B6BFB] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-3/4 lg:w-4/5">
            <AnimatePresence mode="wait">
            
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
              <h2 className="font-jetbrains text-[28px] md:text-[36px] font-bold text-[#081023] mb-6 leading-[1.2]">
                Welcome to Dr. Design Technology
              </h2>
              <div className="mb-12">
                <p className="font-sans text-[15px] md:text-[16px] text-[rgba(8,16,35,0.65)] leading-[1.6] mb-4">
                  At Dr. Design Technology, we are a multidisciplinary team bridging the gap between digital innovation and real-world physical operations. We solve complex challenges by combining advanced software engineering with field-tested operational strategies.
                </p>
                <p className="font-sans text-[15px] md:text-[16px] text-[rgba(8,16,35,0.65)] leading-[1.6]">
                  Our expertise spans across a wide variety of industries, giving our teams the unique opportunity to work on holistic projects. From launching scalable cloud infrastructure to flying drones for high-precision physical surveys, the work you do here shapes industries and builds the foundations of tomorrow.
                </p>
              </div>

              {/* What We Do Cards */}
              <h3 className="font-jetbrains text-[22px] md:text-[24px] font-bold text-[#081023] mb-8">Our Core Focus Areas</h3>
              <div className="flex flex-col gap-12 md:gap-16">
                
                {/* IT Development (Overlay on Mobile, Image Left on Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex flex-col md:flex-row items-center md:gap-8 group rounded-[2rem] overflow-hidden md:rounded-none md:overflow-visible shadow-md md:shadow-none"
                >
                  <div className="w-full md:w-1/2 overflow-hidden md:rounded-[2rem] relative h-80 md:shadow-md">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" alt="IT Development" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/60 to-transparent md:hidden pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end md:static md:p-0 md:w-1/2 md:flex md:flex-col items-start md:px-6 z-10 pointer-events-none md:pointer-events-auto">
                    <h4 className="font-jetbrains text-[20px] md:text-[24px] font-bold text-white md:text-[#081023] mb-3 leading-[1.3] drop-shadow-md md:drop-shadow-none">IT Development & Consultation</h4>
                    <p className="font-sans text-[14px] text-gray-200 md:text-[rgba(8,16,35,0.55)] leading-[1.6] md:mb-5 drop-shadow-md md:drop-shadow-none">
                      We design, build, and scale sophisticated web and mobile applications, creating custom software solutions and architecture consultations for enterprise clients.
                    </p>
                  </div>
                </motion.div>

                {/* GIS Development (Overlay on Mobile, Image Right on Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex flex-col md:flex-row-reverse items-center md:gap-8 group rounded-[2rem] overflow-hidden md:rounded-none md:overflow-visible shadow-md md:shadow-none"
                >
                  <div className="w-full md:w-1/2 overflow-hidden md:rounded-[2rem] relative h-80 md:shadow-md">
                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="GIS Development" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/60 to-transparent md:hidden pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end md:static md:p-0 md:w-1/2 md:flex md:flex-col items-start md:px-6 z-10 pointer-events-none md:pointer-events-auto">
                    <h4 className="font-jetbrains text-[20px] md:text-[24px] font-bold text-white md:text-[#081023] mb-3 leading-[1.3] drop-shadow-md md:drop-shadow-none">GIS Development & Tools</h4>
                    <p className="font-sans text-[14px] text-gray-200 md:text-[rgba(8,16,35,0.55)] leading-[1.6] md:mb-5 drop-shadow-md md:drop-shadow-none">
                      We specialize in Geographic Information Systems, developing highly customized mapping tools and performing complex spatial data analysis using ArcGIS, QGIS, and custom web maps.
                    </p>
                  </div>
                </motion.div>

                {/* Drone & Survey (Overlay on Mobile, Image Left on Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex flex-col md:flex-row items-center md:gap-8 group rounded-[2rem] overflow-hidden md:rounded-none md:overflow-visible shadow-md md:shadow-none"
                >
                  <div className="w-full md:w-1/2 overflow-hidden md:rounded-[2rem] relative h-80 md:shadow-md">
                    <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80" alt="Drone Survey" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/60 to-transparent md:hidden pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end md:static md:p-0 md:w-1/2 md:flex md:flex-col items-start md:px-6 z-10 pointer-events-none md:pointer-events-auto">
                    <h4 className="font-jetbrains text-[20px] md:text-[24px] font-bold text-white md:text-[#081023] mb-3 leading-[1.3] drop-shadow-md md:drop-shadow-none">Physical & Drone Surveys</h4>
                    <p className="font-sans text-[14px] text-gray-200 md:text-[rgba(8,16,35,0.55)] leading-[1.6] md:mb-5 drop-shadow-md md:drop-shadow-none">
                      Our field teams conduct high-precision land and drone surveys, capturing crucial topographical data that powers our GIS engines and digital models.
                    </p>
                  </div>
                </motion.div>

                {/* SEO, CRM & Sales (Overlay on Mobile, Image Right on Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex flex-col md:flex-row-reverse items-center md:gap-8 group rounded-[2rem] overflow-hidden md:rounded-none md:overflow-visible shadow-md md:shadow-none"
                >
                  <div className="w-full md:w-1/2 overflow-hidden md:rounded-[2rem] relative h-80 md:shadow-md">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="SEO and CRM" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/60 to-transparent md:hidden pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end md:static md:p-0 md:w-1/2 md:flex md:flex-col items-start md:px-6 z-10 pointer-events-none md:pointer-events-auto">
                    <h4 className="font-jetbrains text-[20px] md:text-[24px] font-bold text-white md:text-[#081023] mb-3 leading-[1.3] drop-shadow-md md:drop-shadow-none">Digital Growth & Sales</h4>
                    <p className="font-sans text-[14px] text-gray-200 md:text-[rgba(8,16,35,0.55)] leading-[1.6] md:mb-5 drop-shadow-md md:drop-shadow-none">
                      We drive business success through strategic SEO, advanced CRM integrations, and aggressive sales operations to guarantee maximum reach and conversion.
                    </p>
                  </div>
                </motion.div>

              </div>
              </motion.div>
            )}

            {/* Culture Section */}
            {activeSection === 'culture' && (
              <motion.div 
                key="culture"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
              <h2 className="font-jetbrains text-[28px] md:text-[36px] font-bold text-[#081023] mb-8 leading-[1.2]">
                Our Culture
              </h2>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                {CULTURE_DATA.map((culture, index) => (
                  <CultureCard 
                    key={index}
                    colSpan={culture.colSpan}
                      image={culture.image}
                      title={culture.title}
                      description={culture.description}
                      maxW={culture.maxW}
                    />
                ))}
              </div>

              {/* Mobile Carousel */}
              <MobileCultureCarousel />
              
              </motion.div>
            )}

            {/* Values Section */}
            {activeSection === 'values' && (
              <motion.div 
                key="values"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Background blue glow blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8F1FF] rounded-full blur-[100px] opacity-60 pointer-events-none -z-10"></div>

                <div className="columns-1 md:columns-2 gap-6 space-y-6 relative z-10">
                  
                  {/* Title Block */}
                  <div className="break-inside-avoid mb-4 md:mb-6 flex flex-col justify-center py-2 md:p-10 bg-transparent md:min-h-[220px]">
                    <h2 className="font-jetbrains text-[32px] md:text-[44px] font-bold text-[#081023] mb-3 md:mb-4 leading-[1.2]">
                      Our values
                    </h2>
                    <p className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.6]">
                      What we love and stand for every day
                    </p>
                  </div>

                  {/* Card: An open map */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="group break-inside-avoid bg-white p-8 md:p-10 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-gray-100 hover:border-[#4B6BFB]/60 hover:shadow-[0_8px_32px_rgba(75,107,251,0.1)] transition-all duration-500 flex flex-col gap-6"
                  >
                    <FiMap className="w-8 h-8 text-[#081023] group-hover:text-[#4B6BFB] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                    <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] leading-[1.3]">An open map</h3>
                    <div className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.7] flex flex-col gap-3">
                      <p>We are transparent in our data, development, and delivery.</p>
                      <p>We don't put walls up unless it's necessary for security.</p>
                      <p>We become better when we share insights and knowledge.</p>
                      <p>We are open to diverse perspectives, backgrounds, and thought.</p>
                    </div>
                  </motion.div>

                  {/* Card: Build as a team */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="group break-inside-avoid bg-white p-8 md:p-10 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-gray-100 hover:border-[#4B6BFB]/60 hover:shadow-[0_8px_32px_rgba(75,107,251,0.1)] transition-all duration-500 flex flex-col gap-6"
                  >
                    <FiTarget className="w-8 h-8 text-[#081023] group-hover:text-[#4B6BFB] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                    <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] leading-[1.3]">Build as a team</h3>
                    <div className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.7] flex flex-col gap-3">
                      <p>We <strong>build</strong> because we are engineers and creators.</p>
                      <p>Life is short. Let's create impactful <strong>solutions</strong>.</p>
                      <p>We operate as a <strong>team</strong> because great software and surveys require collaboration.</p>
                      <p>We keep our technical and operational standards high.</p>
                    </div>
                  </motion.div>

                  {/* Card: Guide and empower */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="group break-inside-avoid bg-white p-8 md:p-10 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-gray-100 hover:border-[#4B6BFB]/60 hover:shadow-[0_8px_32px_rgba(75,107,251,0.1)] transition-all duration-500 flex flex-col gap-6"
                  >
                    <FiCompass className="w-8 h-8 text-[#081023] group-hover:text-[#4B6BFB] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                    <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] leading-[1.3]">Guide and empower</h3>
                    <div className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.7] flex flex-col gap-3">
                      <p>We want the best outcomes for our clients and ourselves.</p>
                      <p>We coach our peers and clients to their highest potential.</p>
                      <p>That's why working with us feels like a true partnership.</p>
                    </div>
                  </motion.div>

                  {/* Card: Own the execution */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="group break-inside-avoid bg-white p-8 md:p-10 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-gray-100 hover:border-[#4B6BFB]/60 hover:shadow-[0_8px_32px_rgba(75,107,251,0.1)] transition-all duration-500 flex flex-col gap-6"
                  >
                    <FiZap className="w-8 h-8 text-[#081023] group-hover:text-[#4B6BFB] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                    <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] leading-[1.3]">Own the execution</h3>
                    <div className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.7] flex flex-col gap-3">
                      <p>Whether in the field with a drone or coding a CRM, we act like owners.</p>
                      <p>Let's empower each other to take responsibility.</p>
                      <p>If we see a process that needs optimization, we lead through it.</p>
                    </div>
                  </motion.div>

                  {/* Card: Empathy first */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="group break-inside-avoid bg-white p-8 md:p-10 rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-gray-100 hover:border-[#4B6BFB]/60 hover:shadow-[0_8px_32px_rgba(75,107,251,0.1)] transition-all duration-500 flex flex-col gap-6"
                  >
                    <FiHeart className="w-8 h-8 text-[#081023] group-hover:text-[#4B6BFB] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500" />
                    <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] leading-[1.3]">Empathy first</h3>
                    <div className="font-sans text-[15px] text-[rgba(8,16,35,0.65)] leading-[1.7] flex flex-col gap-3">
                      <p>We can deliver robust IT systems and still be kind.</p>
                      <p>We can maintain high data accuracy standards and be kind.</p>
                      <p>We can say no to scope creep and be kind.</p>
                      <p>Kindness spans across field teams, developers, and clients - we always try our best to be kind.</p>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            )}

            {/* Benefits Section */}
            {activeSection === 'benefits' && (
              <motion.div 
                key="benefits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
              <h2 className="font-jetbrains text-[28px] md:text-[36px] font-bold text-[#081023] mb-8 leading-[1.2]">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Health & Wellness", desc: "Comprehensive medical, dental, and vision coverage.", icon: FiHeart, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80" },
                  { title: "Flexible Work", desc: "Remote-friendly and flexible hours to support your lifestyle.", icon: FiHome, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" },
                  { title: "Learning Budget", desc: "Annual stipend for courses, conferences, and books.", icon: FiBook, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" },
                  { title: "Retirement Plans", desc: "Competitive matching to help you plan for the future.", icon: FiTrendingUp, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" },
                  { title: "Generous PTO", desc: "Take the time you need to recharge and spend with family.", icon: FiSun, image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80" },
                  { title: "Team Events", desc: "Regular offsites, hackathons, and social gatherings.", icon: FiUsers, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                      className="relative overflow-hidden flex flex-col gap-4 p-8 border border-white/10 rounded-3xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all bg-[#0B1120] group"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={benefit.image} 
                          alt={benefit.title} 
                          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[0.16,1,0.3,1] group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/70 to-[#0B1120]/30 transition-opacity duration-500 group-hover:opacity-90"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-[#4B6BFB] group-hover:border-white transition-all duration-500">
                          <Icon className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-jetbrains text-[16px] font-bold text-white mb-2 group-hover:text-[#4B6BFB] transition-colors duration-300">{benefit.title}</h4>
                          <p className="font-sans text-[13px] text-gray-300 leading-[1.6] group-hover:text-white transition-colors duration-300">{benefit.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              </motion.div>
            )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;