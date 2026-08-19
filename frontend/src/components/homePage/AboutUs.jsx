import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOOP = "3s";
const cubeStyles = `
@keyframes draw-hex {
  0%   { stroke-dashoffset: 110.93; opacity: 1; }
  50%  { stroke-dashoffset: 0;      opacity: 1; }
  70%  { stroke-dashoffset: 0;      opacity: 1; }
  100% { stroke-dashoffset: 0;      opacity: 0; }
}
@keyframes draw-diamond {
  0%   { stroke-dashoffset: 36.71;  opacity: 1; }
  50%  { stroke-dashoffset: 0;      opacity: 1; }
  70%  { stroke-dashoffset: 0;      opacity: 1; }
  100% { stroke-dashoffset: 0;      opacity: 0; }
}
@keyframes draw-building {
  0%   { stroke-dashoffset: 277.63; opacity: 1; }
  50%  { stroke-dashoffset: 0;      opacity: 1; }
  70%  { stroke-dashoffset: 0;      opacity: 1; }
  100% { stroke-dashoffset: 0;      opacity: 0; }
}
@keyframes draw-rect {
  0%   { stroke-dashoffset: 123.5;  opacity: 1; }
  50%  { stroke-dashoffset: 0;      opacity: 1; }
  70%  { stroke-dashoffset: 0;      opacity: 1; }
  100% { stroke-dashoffset: 0;      opacity: 0; }
}
@keyframes draw-star {
  0%   { stroke-dashoffset: 71.85;  opacity: 1; }
  50%  { stroke-dashoffset: 0;      opacity: 1; }
  70%  { stroke-dashoffset: 0;      opacity: 1; }
  100% { stroke-dashoffset: 0;      opacity: 0; }
}
`;

const AnimatedYearsSVG = () => (
  <svg role="presentation" viewBox="0 0 42 42" width="65" height="65">
    {/* Outer rounded square */}
    <path
      d="M 28.875 0 L 3.5 0 C 1.567 0 0 1.567 0 3.5 L 0 28.875 C 0 30.808 1.567 32.375 3.5 32.375 L 28.875 32.375 C 30.808 32.375 32.375 30.808 32.375 28.875 L 32.375 3.5 C 32.375 1.567 30.808 0 28.875 0 Z"
      fill="transparent"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      strokeDasharray="123.5"
      strokeDashoffset="123.5"
      transform="translate(4.813 4.813)"
      style={{ animation: `draw-rect ${LOOP} ease-in-out infinite` }}
    />
    {/* Outer star/snowflake */}
    <path
      d="M 19.031 7.438 C 18.045 7.438 17.099 7.046 16.402 6.348 C 15.704 5.651 15.313 4.705 15.313 3.719 C 15.313 2.732 14.921 1.787 14.223 1.089 C 13.526 0.392 12.58 0 11.594 0 L 11.156 0 C 10.17 0 9.224 0.392 8.527 1.089 C 7.829 1.787 7.438 2.732 7.438 3.719 C 7.438 4.705 7.046 5.651 6.348 6.348 C 5.651 7.046 4.705 7.438 3.719 7.438 C 2.732 7.438 1.787 7.829 1.089 8.527 C 0.392 9.224 0 10.17 0 11.156 L 0 11.594 C 0 12.58 0.392 13.526 1.089 14.223 C 1.787 14.921 2.732 15.313 3.719 15.313 C 4.705 15.313 5.651 15.704 6.348 16.402 C 7.046 17.099 7.438 18.045 7.438 19.031 C 7.438 20.017 7.829 20.963 8.527 21.661 C 9.224 22.358 10.17 22.75 11.156 22.75 L 11.594 22.75 C 12.58 22.75 13.526 22.358 14.223 21.661 C 14.921 20.963 15.313 20.017 15.313 19.031 C 15.313 18.045 15.704 17.099 16.402 16.402 C 17.099 15.704 18.045 15.313 19.031 15.313 C 20.017 15.313 20.963 14.921 21.661 14.223 C 22.358 13.526 22.75 12.58 22.75 11.594 L 22.75 11.156 C 22.75 10.17 22.358 9.224 21.661 8.527 C 20.963 7.829 20.017 7.438 19.031 7.438 Z"
      fill="transparent"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      strokeDasharray="71.85"
      strokeDashoffset="71.85"
      transform="translate(9.625 9.625)"
      style={{ animation: `draw-star ${LOOP} ease-in-out infinite` }}
    />
    {/* Inner star/snowflake */}
    <path
      d="M 17.486 11.916 C 16.788 11.219 16.397 10.273 16.397 9.287 C 16.397 8.301 16.788 7.355 17.486 6.658 C 18.183 5.96 18.575 5.014 18.575 4.028 C 18.575 3.042 18.183 2.096 17.486 1.399 L 17.176 1.089 C 16.479 0.392 15.533 0 14.547 0 C 13.56 0 12.615 0.392 11.917 1.089 C 11.572 1.434 11.162 1.708 10.711 1.895 C 10.259 2.082 9.776 2.178 9.287 2.178 C 8.799 2.178 8.315 2.082 7.864 1.895 C 7.413 1.708 7.003 1.434 6.658 1.089 C 5.96 0.392 5.014 0 4.028 0 C 3.042 0 2.096 0.392 1.399 1.089 L 1.089 1.398 C 0.392 2.095 0 3.041 0 4.027 C 0 5.014 0.392 5.959 1.089 6.657 C 1.434 7.002 1.708 7.412 1.895 7.863 C 2.082 8.314 2.178 8.798 2.178 9.287 C 2.178 9.775 2.082 10.258 1.895 10.71 C 1.708 11.161 1.434 11.571 1.089 11.916 C 0.392 12.614 0 13.559 0 14.546 C 0 15.532 0.392 16.478 1.089 17.175 L 1.398 17.485 C 2.095 18.182 3.041 18.574 4.027 18.574 C 5.014 18.574 5.959 18.182 6.657 17.485 C 7.002 17.139 7.412 16.865 7.863 16.678 C 8.314 16.492 8.798 16.395 9.287 16.395 C 9.775 16.395 10.258 16.492 10.71 16.678 C 11.161 16.865 11.571 17.139 11.916 17.485 C 12.614 18.182 13.559 18.574 14.546 18.574 C 15.532 18.574 16.478 18.182 17.175 17.485 L 17.485 17.176 C 18.182 16.479 18.574 15.533 18.574 14.547 C 18.574 13.56 18.182 12.615 17.485 11.917"
      fill="transparent"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      strokeDasharray="71.85"
      strokeDashoffset="71.85"
      transform="translate(11.713 11.713)"
      style={{ animation: `draw-star ${LOOP} ease-in-out infinite` }}
    />
  </svg>
);

const AnimatedCubeSVG = () => (
  <>
    <style>{cubeStyles}</style>
    <svg viewBox="0 0 50 50" width="65" height="65" role="presentation">
      {/* Outer hexagon */}
      <path
        d="M 16 0 L 0 9 L 0 27.5 L 16 37 L 32 27.5 L 32 9 Z"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeDasharray="110.93"
        strokeDashoffset="110.93"
        transform="translate(9.132 6.058)"
        style={{ animation: `draw-hex ${LOOP} ease-in-out infinite` }}
      />
      {/* Top diamond */}
      <path
        d="M 8 0 L 0 4.5 L 8 9 L 16 4.5 Z"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeDasharray="36.71"
        strokeDashoffset="36.71"
        transform="translate(17.132 12.058)"
        style={{ animation: `draw-diamond ${LOOP} ease-in-out infinite` }}
      />
      {/* Right face */}
      <path
        d="M 8 0 L 0 4.5 L 8 9 L 16 4.5 Z"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeDasharray="36.71"
        strokeDashoffset="36.71"
        transform="translate(24.132 24.058) rotate(119 8 4.5)"
        style={{ animation: `draw-diamond ${LOOP} ease-in-out infinite` }}
      />
      {/* Left face */}
      <path
        d="M 8 0 L 0 4.5 L 8 9 L 16 4.5 Z"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeDasharray="36.71"
        strokeDashoffset="36.71"
        transform="translate(10.132 24.058) rotate(60 8 4.5)"
        style={{ animation: `draw-diamond ${LOOP} ease-in-out infinite` }}
      />
    </svg>
  </>
);

const AnimatedHQSVG = () => (
  <svg role="presentation" viewBox="0 0 65 65" width="65" height="65">
    <path
      d="M 52 58.5 L 52 6.5 C 52 4.776 51.315 3.123 50.096 1.904 C 48.877 0.685 47.224 0 45.5 0 L 13 0 C 11.276 0 9.623 0.685 8.404 1.904 C 7.185 3.123 6.5 4.776 6.5 6.5 L 6.5 58.5 M 52 58.5 L 58.5 58.5 M 52 58.5 L 35.75 58.5 M 6.5 58.5 L 0 58.5 M 6.5 58.5 L 22.75 58.5 M 35.75 58.5 L 35.75 42.25 C 35.75 41.388 35.407 40.561 34.798 39.952 C 34.189 39.343 33.362 39 32.5 39 L 26 39 C 25.138 39 24.311 39.343 23.702 39.952 C 23.092 40.561 22.75 41.388 22.75 42.25 L 22.75 58.5 M 35.75 58.5 L 22.75 58.5 M 19.5 13 L 22.75 13 M 19.5 26 L 22.75 26 M 35.75 13 L 39 13 M 35.75 26 L 39 26"
      fill="transparent"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      strokeDasharray="277.63"
      strokeDashoffset="277.63"
      transform="translate(3.25 3.25)"
      style={{ animation: `draw-building ${LOOP} ease-in-out infinite` }}
    />
  </svg>
);

// Reusable stat card component
const StatCard = ({ cardRef, icon: Icon, title, subtitle }) => (
  <div
    ref={cardRef}
    className="bg-[#111625] text-white rounded-[10px] w-[291px] h-[185px] flex flex-col justify-between items-center text-left shadow-lg p-4"
  >
    <div className="text-gray-200">
      <Icon />
    </div>
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-jetbrains text-[28px] font-medium tracking-wide leading-tight">
        {title}
      </h3>
      <p className="font-inter text-gray-400 text-[15px] font-normal tracking-wide ">
        {subtitle}
      </p>
    </div>
  </div>
);

const statData = [
  { icon: AnimatedYearsSVG, title: "5+ years", subtitle: "in software engineering" },
  { icon: AnimatedCubeSVG, title: "300+ projects", subtitle: "successfully completed" },
  { icon: AnimatedHQSVG, title: "HQ in Delhi", subtitle: "offices in the Delhi & Dehradun" },
];

const MobileStatCarousel = ({ cardsRef }) => {
  const extendedStats = [
    statData[statData.length - 1],
    ...statData,
    statData[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNext = () => {
    if (currentIndex >= extendedStats.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === extendedStats.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(extendedStats.length - 2);
    }
  };

  let activeDot = currentIndex - 1;
  if (activeDot === statData.length) activeDot = 0;
  if (activeDot === -1) activeDot = statData.length - 1;

  return (
    <div className="md:hidden flex flex-col items-center w-full max-w-[320px] mx-auto mt-4">
      <div 
        className="w-full overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className={`flex w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedStats.map((stat, idx) => (
            <div key={idx} className="w-full  flex-shrink-0 flex justify-center">
              <StatCard
                cardRef={idx >= 1 && idx <= 3 ? (el) => (cardsRef.current[idx - 1 + 3] = el) : null}
                icon={stat.icon}
                title={stat.title}
                subtitle={stat.subtitle}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {statData.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeDot === idx ? "w-8 bg-[#8687DD]" : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animates when top of section hits 80% of viewport
          toggleActions: "play none none reverse", // Reverse animation on scroll up
        },
      });

      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          textRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .from(
          cardsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white py-15 px-6 flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-[1073px] w-full flex flex-col items-center text-center">
        <h2
          ref={headingRef}
          className="font-jetbrains text-[27px] md:text-[42px] md:text-[56px] font-normal tracking-wider text-black mb-6 uppercase"
        >
          About DR.DESIGN
        </h2>

        <p
          ref={textRef}
          className="font-inter text-[#333333] text-[13px] md:text-[19px] leading-[1.8] max-w-[814px] mb-8 font-normal"
        >
          DR.DESIGN PVT. LTD. is a premier technology and consulting firm specializing in <br className="sm:block hidden" /> enterprise Geospatial Solutions (GIS), custom IT Services, and comprehensive Digital <br className="sm:block hidden" /> Transformation. Built on deep technical expertise, we partner with startups, established <br className="sm:block hidden" /> businesses, and government agencies to bring their visionary ideas to life. We engineer <br className="sm:block hidden" /> custom, data-driven infrastructure and intelligent software that helps our clients scale faster and optimize operations.
        </p>

        {/* Desktop View */}
        <div className="hidden md:flex flex-row justify-center gap-[100px]">
          <StatCard
            cardRef={(el) => (cardsRef.current[0] = el)}
            icon={AnimatedYearsSVG}
            title="5+ years"
            subtitle="in software engineering"
          />
          <StatCard
            cardRef={(el) => (cardsRef.current[1] = el)}
            icon={AnimatedCubeSVG}
            title="300+ projects"
            subtitle="successfully completed"
          />
          <StatCard
            cardRef={(el) => (cardsRef.current[2] = el)}
            icon={AnimatedHQSVG}
            title="HQ in Dehradun"
            subtitle="offices in the Delhi & Dehradun"
          />
        </div>

        {/* Mobile View Carousel */}
        <MobileStatCarousel cardsRef={cardsRef} />
      </div>
    </div>
  );
};

export default AboutUs;
