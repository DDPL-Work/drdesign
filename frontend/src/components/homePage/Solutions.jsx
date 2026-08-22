import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiTrendingUp,
  FiPieChart,
  FiShield,
  FiArrowLeft,
  FiArrowRight,
  FiMonitor,
  FiSmartphone,
  FiMap,
  FiSearch,
  FiTarget,
  FiPenTool,
} from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import mapsGif from "../../assets/maps.gif";
import webGif from "../../assets/web.gif";
import appGif from "../../assets/app.gif";
import seoGif from "../../assets/seo.gif";
import uiUxGif from "../../assets/ui-ux.gif";
import governmentGif from "../../assets/goverment.gif";
import campaignGif from "../../assets/campaign.gif";

gsap.registerPlugin(ScrollTrigger);

export const solutionsData = [
  {
    id: "01",
    title: "Web Platform Development",
    description:
      "Product-grade web platforms, ERPs and internal tools built with modern tech stacks to fit the way your business actually operates.",
    gifIcon: webGif,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "02",
    title: "Mobile App Development",
    description:
      "Offline-first, cross-platform applications that stay fast and reliable in the field as well as on the shop floor.",
    gifIcon: appGif,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "03",
    title: "Search Engine Optimization",
    description:
      "Data-driven SEO strategies that improve your organic visibility, drive targeted traffic, and maximize your online footprint.",
    gifIcon: seoGif,
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "04",
    title: "UI/UX Designing",
    description:
      "Sleek, high-end web experiences that blend strong digital marketing goals with smooth user journeys to capture attention and drive conversions.",
    gifIcon: uiUxGif,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "05",
    title: "Social Media Marketing",
    description:
    "Targeted Meta Ads, Google Ads, and social media campaigns engineered to maximize ROI, drive qualified leads, and aggressively scale your digital footprint.",
    gifIcon: campaignGif,
    image:
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "06",
    title: "Government IT Project",
    description:
      "High-precision national infrastructure portals and robust IT solutions built to deliver accurate, country-wide data and secure digital public services.",
    gifIcon: governmentGif,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "07",
    title: "GIS & Spatial Data",
    description:
      "Advanced mapping, imagery, and spatial data services used by planning authorities and enterprises to make decisions grounded in place.",
    gifIcon: mapsGif,
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
  },
];

const SolutionCard = ({ item, index, isMobile = false }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleViewCaseStudy = () => {
    const slug = item.title.toLowerCase().replace(/[\s/]+/g, "-");
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
        className="group relative flex flex-col justify-between p-8 min-h-110 border border-white/10 shadow-none rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-500 h-full transform-gpu hover:bg-white/10"
      >
        {/* Hover Background Image & Overlay */}
        <div className="absolute inset-0 z-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transform scale-100 md:scale-105 md:group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a181c] via-[#0a181c]/80 to-[#0a181c]/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Content (z-10) */}
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          {/* Top Row: Icon and Small Image */}
          <div className="flex justify-between items-start mb-12">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center transition-all duration-500 overflow-hidden shadow-sm p-1">
              <img
                src={item.gifIcon}
                alt={`${item.title} icon`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Small Image (Visible before hover) */}
            <div className="hidden md:block w-28 h-28 rounded-2xl overflow-hidden transition-all duration-500 opacity-100 md:group-hover:opacity-0 md:group-hover:scale-95 md:group-hover:-translate-y-4 shadow-sm border border-white/10">
              <img
                src={item.image}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-auto relative transition-transform duration-500 ease-out -translate-y-2 md:translate-y-0 md:group-hover:-translate-y-2">
            <h3 className="font-jetbrains text-[26px] font-semibold text-white mb-4 transition-colors duration-500 leading-tight">
              {item.title}
            </h3>
            <p className="font-inter text-gray-300 text-[15px] leading-relaxed transition-colors duration-500 mb-16 md:mb-0 md:group-hover:mb-16">
              {item.description}
            </p>

            {/* Hidden Hover Button */}
            <div className="absolute bottom-0 left-0 translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
              <button
                onClick={handleViewCaseStudy}
                className="group/btn text-[#0a181c] bg-white hover:bg-gray-200 font-jetbrains text-[13px] px-6 py-2.5 rounded-full flex items-center transition-colors shadow-sm overflow-hidden pointer-events-auto"
              >
                <span className="transition-transform duration-300 ease-out group-hover/btn:translate-x-2">
                  View Case Study
                </span>
                <span className="ml-2 text-xl -mt-1.5 md:-mt-1 transition-all duration-300 ease-out group-hover/btn:translate-x-5 group-hover/btn:opacity-0">
                  &rarr;
                </span>
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
    setCurrentIndex(
      (prev) => (prev - 1 + solutionsData.length) % solutionsData.length,
    );
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
      transformOrigin: dir > 0 ? "100% 50%" : "0% 50%",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transformOrigin: "50% 50%",
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transformOrigin: dir > 0 ? "0% 50%" : "100% 50%",
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <div
      className="md:hidden flex flex-col items-center w-full mx-auto mt-4 bg-transparent"
      style={{ perspective: 1200 }}
    >
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
            <SolutionCard
              item={solutionsData[currentIndex]}
              index={0}
              isMobile={true}
            />
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
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Only apply horizontal scroll on desktop view
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        let containerWidth = container.scrollWidth;
        // Scroll exactly enough so the last card aligns with the right side of the screen
        return -(containerWidth - window.innerWidth);
      };

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center", // Pin when section is in the middle of the screen
          end: () => `+=${getScrollAmount() * -1}`, // Duration proportional to scroll distance
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });
    }, sectionRef);

    // On first visit, the main content is at y: 100vh during the loading screen.
    // ScrollTrigger pins and measures positions while the section is off-screen,
    // resulting in broken horizontal scroll on first load (but correct after refresh).
    // 'ddpl:layout-ready' is dispatched by App.jsx once the loading transition fully ends.
    const onLayoutReady = () => ScrollTrigger.refresh();
    window.addEventListener("ddpl:layout-ready", onLayoutReady);

    return () => {
      window.removeEventListener("ddpl:layout-ready", onLayoutReady);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative w-full bg-black py-24 flex flex-col items-center overflow-hidden"
    >
      {/* ── Continuous Video Background Graphics ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle overlay grid for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Gradient fade to seamlessly blend the video edges into the black background */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-325 w-full flex flex-col mb-8 px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-jetbrains text-[27px] md:text-[48px] font-medium text-white text-center mb-4 drop-shadow-lg"
        >
          Impactful Solutions We've Built
        </motion.h2>
      </div>

      {/* Desktop GSAP Horizontal Scroll Container */}
      <div className="hidden md:flex w-full overflow-hidden mt-8 relative">
        <div
          ref={containerRef}
          className="flex gap-8 px-10 items-stretch"
          style={{ width: "max-content" }}
        >
          {solutionsData.map((item, index) => (
            <div
              key={item.id}
              className="w-[400px] lg:w-[450px] shrink-0 h-full"
            >
              <SolutionCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div className="w-full px-4 md:px-6">
        <MobileSolutionCarousel />
      </div>
    </section>
  );
};

export default Solutions;
