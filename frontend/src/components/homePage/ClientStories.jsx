import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    text: "Dr. Design Technology transformed our fragmented ERP landscape into a unified platform. Their engineering discipline and design clarity made the rollout smooth across all four plants.",
    author: "Ankit Sharma",
    role: "Operations Director, Manufacturing Group",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: 2,
    text: "The team's ability to translate complex requirements into intuitive user interfaces is unmatched. They didn't just build software; they solved our core business challenges.",
    author: "Sarah Jenkins",
    role: "Product Manager, TechFlow",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: 3,
    text: "Working with them felt like an extension of our own team. Their proactive communication and deep technical expertise ensured our project was delivered ahead of schedule.",
    author: "Michael Chang",
    role: "CTO, Innovate Inc",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: 4,
    text: "They bring a rare combination of strategic thinking and flawless execution. The geospatial app they delivered has revolutionized our field operations completely.",
    author: "Elena Rodriguez",
    role: "VP of Engineering, GeoSpatial",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
];

const ClientStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white dark:bg-[#0B1120] px-4 md:px-8 flex justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1400px] bg-[#0A1118] xl:bg-transparent rounded-[40px] xl:rounded-none pt-8 px-8 pb-8 md:p-14 xl:p-0 flex flex-col xl:flex-row xl:items-stretch relative">
        {/* Left Column */}
        <div className="w-full xl:w-[40%] self-stretch flex flex-col justify-between z-10 relative xl:p-14 xl:pr-10 xl:bg-[#0A1118] xl:rounded-l-[40px] xl:rounded-tr-[40px]">
          <div>
            <div className="flex items-center gap-4 text-[#60738a] text-[13px] md:text-sm tracking-[0.2em] font-semibold mb-10">
              <span>TESTIMONIALS</span>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-0">
              <div className="w-13 h-13 md:w-14 md:h-14 bg-[#16212D] rounded-2xl flex items-center justify-center text-[#5c8cce] text-lg md:text-xl md:mb-10 shrink-0">
                <FaQuoteLeft />
              </div>

              <h2 className="text-white text-[25px] md:text-[56px] lg:text-[64px] font-semibold leading-[1.1] font-inter mb-0 md:mb-4">
                What Our{" "}
                <br className="hidden xl:block" />
                Clients Say
              </h2>
            </div>

            <p className="text-[#8b95a5] text-[14px] max-w-full md:max-w-2xl xl:max-w-90 leading-[1.6]">
              Real feedback from the teams we partner with — from enterprise
              platforms to field-ready geospatial apps.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="w-full xl:w-[60%] mt-10 xl:mt-0 self-stretch flex flex-col z-10 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Card Carousel Area */}
          <div className="relative w-full h-87.5 md:h-100">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 xl:left-8 w-full xl:w-[calc(100%-32px)] h-full xl:h-[calc(100%-32px)] cursor-grab"
              >
                <div className="w-full h-full bg-white dark:bg-[#0A1118] xl:bg-[#0A1118] rounded-[24px] md:rounded-[32px] xl:rounded-[40px] p-6 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] xl:shadow-none flex flex-col justify-between">
                  {/* Top Content */}
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 h-full">
                    <div className="flex items-center md:items-start gap-4 md:gap-0">
                      <div className="w-[72px] h-[72px] md:w-40 md:h-40 shrink-0 rounded-2xl md:rounded-[20px] overflow-hidden shadow-md">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].author}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Mobile Author Info (next to image) */}
                      <div className="flex flex-col justify-center md:hidden">
                        <div className="flex gap-1 text-[#f59e0b] text-[12px] mb-1.5">
                          {[...Array(testimonials[currentIndex].rating)].map(
                            (_, i) => (
                              <FaStar key={i} />
                            ),
                          )}
                        </div>
                        <span className="text-[#1a202c] dark:text-white font-bold text-[16px] leading-tight">
                          {testimonials[currentIndex].author}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-[13px] mt-1 leading-tight">
                          {testimonials[currentIndex].role}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex items-start md:items-center mt-2 md:mt-0">
                      <p className="text-[#1a202c] dark:text-white xl:text-white text-[14px] md:text-[22px] leading-[1.6] font-inter italic">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-gray-200 dark:bg-[#16212D] xl:bg-[#16212D] my-4 md:my-8"></div>

                  {/* Bottom Author Info */}
                  <div className="flex flex-row items-center justify-center md:justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0A1118] xl:bg-[#16212D] rounded-full flex items-center justify-center text-white xl:text-[#5c8cce] text-[15px] md:text-lg shrink-0">
                        <FaQuoteLeft />
                      </div>

                      {/* Desktop Author Info (next to quote icon) */}
                      <div className="hidden md:flex flex-col">
                        <span className="text-[#1a202c] dark:text-white xl:text-white font-bold text-[18px]">
                          {testimonials[currentIndex].author}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 xl:text-[#8b95a5] text-[15px]">
                          {testimonials[currentIndex].role}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-1 text-[#f59e0b] text-lg md:text-xl">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <FaStar key={i} />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls below card */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-12 xl:mt-0 gap-8 md:gap-0 xl:p-14 xl:pt-10 xl:pl-12 xl:bg-[#0A1118] xl:rounded-br-[40px] xl:rounded-tr-[40px] relative">
            {/* Concave Inner Corner (Desktop only) */}
            <div className="hidden xl:block absolute top-[-72px] left-0 w-[72px] h-[72px] pointer-events-none">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 L 0 72 L 72 72 A 72 72 0 0 1 0 0 Z" fill="#0A1118"/>
              </svg>
            </div>
            {/* Avatar Dots */}
            <div className="flex gap-3">
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ${
                    currentIndex === idx
                      ? "ring-2 ring-[#5c8cce] ring-offset-2 ring-offset-[#0A1118] scale-110 shadow-[0_0_15px_rgba(92,140,206,0.4)] opacity-100"
                      : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                  }`}
                >
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-[46px] h-[46px] rounded-full border border-[#2d3748] flex items-center justify-center text-white hover:bg-[#2d3748] transition-colors"
              >
                <FaChevronLeft className="text-sm -ml-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-[46px] h-[46px] rounded-full border border-[#2d3748] flex items-center justify-center text-white hover:bg-[#2d3748] transition-colors"
              >
                <FaChevronRight className="text-sm -mr-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ClientStories;
