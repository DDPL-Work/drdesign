import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import bgVideo from '../../assets/service.mp4';

// ─── SplitText ────────────────────────────────────────────────────────────────
// Mirrors the home-hero implementation: splits each word into individual
// <span> characters so GSAP can stagger-animate them with blur/fade.
const SplitText = ({ text, className = '', charClass = 'headline-char' }) =>
  text.split(' ').map((word, wordIndex, wordsArray) => (
    <span
      key={wordIndex}
      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      {word.split('').map((char, i) => (
        <span
          key={i}
          className={`${charClass} ${className}`}
          style={{
            filter: 'blur(20px)',
            opacity: 0,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
      {wordIndex < wordsArray.length - 1 && (
        <span
          className={`${charClass} ${className}`}
          style={{
            filter: 'blur(20px)',
            opacity: 0,
            position: 'relative',
            display: 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {' '}
        </span>
      )}
    </span>
  ));

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const heroRef = useRef(null);

  // GSAP: character-by-character blur → clear reveal
  // Kicks off at delay 0.8 s — after the background image has started easing in.
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll('.headline-char');
      if (chars.length === 0) return;

      // Force starting state so re-renders / HMR stay consistent
      gsap.set(chars, { opacity: 0, filter: 'blur(20px)' });

      gsap.to(chars, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        stagger: 0.03,
        delay: 0.8,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[85vh] md:min-h-screen flex items-end md:items-center overflow-hidden pb-14 md:pb-0"
    >
      {/* ── 1. Background video — ease-out scale + fade ─────────────────────── */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0 }}
      />

      {/* ── Dark gradient overlay ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60 md:from-gray-900/80 md:via-gray-800/50 md:to-transparent" />

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 md:px-[57px] text-white">
        <div className="max-w-4xl">

          {/* ── 2a. Label — chars animate in via GSAP ──────────────────────── */}
          <div className="flex items-center gap-4 mb-6 font-geist">
            <p className="uppercase tracking-[0.2em] text-[12px] font-normal text-gray-200">
              <SplitText text="— — Our Services" charClass="headline-char" />
            </p>
          </div>

          {/* ── 2b. Headline — chars animate in via GSAP ───────────────────── */}
          <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-[68px] mb-5 md:mb-8 leading-[1.15] md:leading-[1.1] font-jetbrains font-bold text-white">
            <SplitText text="Software and spatial" charClass="headline-char" />
            <br />
            <SplitText text="intelligence," charClass="headline-char" />
            <br />
            <SplitText text="engineered end to" charClass="headline-char" />
            <br />
            <SplitText text="end." charClass="headline-char" />
          </h1>

          {/* ── 3. Sub-paragraph — Framer Motion ease-out after chars finish ── */}
          <motion.p
            className="text-gray-300 max-w-[90%] md:max-w-2xl leading-relaxed font-geist font-normal text-[15px] md:text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 2.2 }}
          >
            Two practices, one team. We build the digital products that run your
            business — and the geospatial systems that show you where it happens.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default Hero;