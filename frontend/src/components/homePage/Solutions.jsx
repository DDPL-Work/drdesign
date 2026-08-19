import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiPieChart, FiShield, FiArrowLeft, FiArrowRight, FiMonitor, FiSmartphone, FiMap, FiSearch, FiTarget, FiPenTool } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const solutionsData = [
  {
    id: "01",
    title: "GIS & Spatial Data",
    description: "Advanced mapping, imagery, and spatial data services used by planning authorities and enterprises to make decisions grounded in place.",
    Icon: FiMap,
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "02",
    title: "Web Platform Development",
    description: "Product-grade web platforms, ERPs and internal tools built with modern tech stacks to fit the way your business actually operates.",
    Icon: FiMonitor,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "03",
    title: "Mobile App Development",
    description: "Offline-first, cross-platform applications that stay fast and reliable in the field as well as on the shop floor.",
    Icon: FiSmartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "04",
    title: "Search Engine Optimization",
    description: "Data-driven SEO strategies that improve your organic visibility, drive targeted traffic, and maximize your online footprint.",
    Icon: FiSearch,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "05",
    title: "UI/UX Designing",
    description: "Sleek, high-end web experiences that blend strong digital marketing goals with smooth user journeys to capture attention and drive conversions.",
    Icon: FiPenTool,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "06",
    title: "Government IT Project",
    description: "High-precision national infrastructure portals and robust IT solutions built to deliver accurate, country-wide data and secure digital public services.",
    Icon: FiShield,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  }
];

const SolutionCard = ({ item, index, isMobile = false }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleViewCaseStudy = () => {
    const slug = item.title.toLowerCase().replace(/[\s/]+/g, '-');
    navigate(`/project/${slug}`);
  };

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    <motion.div 
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: (index % 3) * 0.15 }}
      style={{ perspective: "1200px" }}
      className={`relative ${isMobile ? "w-full h-full" : "z-10 hover:z-50"}`}
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative flex flex-col justify-between p-8 min-h-110 border-0 md:border-2 md:hover:border-0 shadow-none border-transparent md:border-gray-200 rounded-3xl overflow-hidden bg-transparent transition-shadow duration-500 h-full transform-gpu"
      >
        {/* Hover Background Image & Overlay */}
        <div className="absolute inset-0 z-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transform scale-100 md:scale-105 md:group-hover:scale-100 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a181c] via-[#0a181c]/80 to-[#0a181c]/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Content (z-10) */}
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          {/* Top Row: Icon and Small Image */}
          <div className="flex justify-between items-start mb-12">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/10 md:bg-gray-50 flex items-center justify-center md:group-hover:bg-white/10 backdrop-blur-md md:backdrop-blur-none md:group-hover:backdrop-blur-md border border-white/20 md:border-gray-100 md:group-hover:border-white/20 transition-all duration-500">
              <item.Icon className="text-3xl text-white md:text-[#0a181c] md:group-hover:text-white transition-colors duration-500" />
            </div>
            
            {/* Small Image (Visible before hover) */}
            <div className="hidden md:block w-28 h-28 rounded-2xl overflow-hidden transition-all duration-500 opacity-100 md:group-hover:opacity-0 md:group-hover:scale-95 md:group-hover:-translate-y-4 shadow-sm border border-gray-100 md:group-hover:border-transparent">
              <img 
                src={item.image} 
                alt="thumbnail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-auto relative transition-transform duration-500 ease-out -translate-y-2 md:translate-y-0 md:group-hover:-translate-y-2">
            <h3 className="font-jetbrains text-[26px] font-semibold text-white md:text-[#0a181c] md:group-hover:text-white mb-4 transition-colors duration-500 leading-tight">
              {item.title}
            </h3>
            <p className="font-inter text-gray-300 md:text-[#6b7280] md:group-hover:text-gray-300 text-[15px] leading-relaxed transition-colors duration-500 mb-16 md:mb-0 md:group-hover:mb-16">
              {item.description}
            </p>

            {/* Hidden Hover Button */}
            <div className="absolute bottom-0 left-0 translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
              <button onClick={handleViewCaseStudy} className="group/btn bg-white text-[#0a181c] font-jetbrains text-[13px] px-6 py-2.5 rounded-full flex items-center transition-colors shadow-sm overflow-hidden hover:bg-gray-100 pointer-events-auto">
                <span className="transition-transform duration-300 ease-out group-hover/btn:translate-x-2">View Case Study</span> 
                <span className='ml-2 text-xl -mt-1.5 md:-mt-1 transition-all duration-300 ease-out group-hover/btn:translate-x-5 group-hover/btn:opacity-0'>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileSolutionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % solutionsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + solutionsData.length) % solutionsData.length);
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
    }, 3500);
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
    <div className="md:hidden flex flex-col items-center w-full mx-auto mt-4 bg-transparent" style={{ perspective: 1200 }}>
      <div 
        className="w-full relative bg-transparent flex justify-center min-h-[480px]"
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
            <SolutionCard item={solutionsData[currentIndex]} index={0} isMobile={true} />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Controls */}
      <div className="flex justify-between items-center w-full mt-8 px-2">
        {/* Dots */}
        <div className="flex gap-2">
          {solutionsData.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-8 bg-[#0a181c]" : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0a181c] hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#0a181c] text-white flex items-center justify-center hover:bg-[#152429] transition-colors"
          >
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Solutions = () => {
  const baseLength = solutionsData.length;
  const extendedData = [...solutionsData, ...solutionsData, ...solutionsData];

  const [desktopIndex, setDesktopIndex] = useState(baseLength);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const handleDesktopNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setDesktopIndex(prev => prev + 1);
  };
  
  const handleDesktopPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setDesktopIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (desktopIndex >= baseLength * 2) {
      setIsTransitioning(false);
      setDesktopIndex(desktopIndex - baseLength);
    } else if (desktopIndex <= baseLength - 1) {
      setIsTransitioning(false);
      setDesktopIndex(desktopIndex + baseLength);
    }
  };

  return (
    <section id="solutions" className="w-full bg-white py-24 px-4 md:px-6 flex flex-col items-center overflow-hidden">
      <div className="max-w-325 w-full flex flex-col mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-jetbrains text-[27px] md:text-[48px] font-medium text-[#0a181c] text-center mb-4"
        >
          Impactful Solutions We've Built
        </motion.h2>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block w-full max-w-325 bg-transparent">
        <div className="overflow-hidden py-16 -my-16 px-10 -mx-10 bg-transparent">
          <div className="-mx-5 bg-transparent">
            <div 
              className={`flex w-full bg-transparent ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${desktopIndex * (100 / itemsToShow)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedData.map((item, index) => (
                <div key={`${item.id}-${index}`} className="w-1/2 lg:w-1/3 shrink-0 px-5 bg-transparent">
                  <SolutionCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex justify-between items-center w-full max-w-325 mt-10 px-2">
        {/* Dots */}
        <div className="flex gap-2">
          {solutionsData.map((_, idx) => {
            const activeDot = desktopIndex % baseLength;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setIsTransitioning(true);
                  const currentBlock = Math.floor(desktopIndex / baseLength);
                  setDesktopIndex(currentBlock * baseLength + idx);
                }}
                className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  activeDot === idx ? "w-8 bg-[#0a181c]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleDesktopPrev}
            className="w-12 h-12 rounded-full border border-gray-200 text-[#0a181c] hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-xl -ml-0.5" />
          </button>
          <button 
            onClick={handleDesktopNext}
            className="w-12 h-12 rounded-full bg-[#0a181c] text-white hover:bg-[#152429] flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaChevronRight className="text-xl -mr-0.5" />
          </button>
        </div>
      </div>

      <MobileSolutionCarousel />
    </section>
  );
};

export default Solutions;