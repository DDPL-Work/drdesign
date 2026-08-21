import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import gsap from 'gsap'
import bgVideo from '../../assets/Home-hero.mp4'

// Helper to split text into CHARACTERS for GSAP reveal animation
const SplitText = ({ text, className = "", charClass = "headline-char" }) => {
  return text.split(" ").map((word, wordIndex, wordsArray) => (
    <span
      key={wordIndex}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {word.split("").map((char, i) => (
        <span
          key={i}
          className={`${charClass} ${className}`}
          style={{
            filter: "blur(20px)",
            opacity: 0,
            position: "relative",
            display: "inline-block",
          }}
        >
          {char}
        </span>
      ))}
      {wordIndex < wordsArray.length - 1 && (
        <span
          className={`${charClass} ${className}`}
          style={{
            filter: "blur(20px)",
            opacity: 0,
            position: "relative",
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {" "}
        </span>
      )}
    </span>
  ));
};

const NewHero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // GSAP character-by-character blur/fade reveal
  useEffect(() => {
    if (!heroRef.current) return;

    let ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll(".headline-char");
      if (chars.length === 0) return;

      gsap.set(chars, { opacity: 0, filter: "blur(20px)" });

      gsap.to(chars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.04,
        delay: 0.3,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[100svh] md:h-screen overflow-hidden flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {/* Simple Dark Overlay for text readability */}
        <div className="absolute inset-0 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        //   style={{ clipPath: 'inset(0 0 12.5% 0)' }} 
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Learn More Button */}
      <div className="absolute bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-7 md:right-20 z-20 w-max">
        <button 
          onClick={() => navigate("/what-we-do")}
          className="group flex items-center justify-center px-6 py-4 md:py-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide rounded-full hover:bg-transparent hover:border-white/50 transition-colors duration-300 shadow-xl overflow-hidden cursor-pointer"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">
            Learn more
          </span>
          <span className="text-xl font-bold -mt-1 ml-2 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
            &rarr;
          </span>
        </button>
      </div>
    </section>
  )
}

export default NewHero