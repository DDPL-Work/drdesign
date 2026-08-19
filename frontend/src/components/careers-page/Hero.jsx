import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import CareerHeroImg from '../../assets/career-hero.png';
import { FiArrowRight } from 'react-icons/fi';

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

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll('.headline-char');
      if (chars.length === 0) return;

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
    <section ref={heroRef} className="relative w-full h-[85vh] sm:h-[90vh] md:h-screen min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0B1120]">
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img 
          src={CareerHeroImg} 
          alt="Careers at Dr. Design Technology" 
          className="w-full h-full object-cover object-[center_20%] md:object-contain md:object-right"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0 }}
        />
        {/* Gradients to ensure text readability on the left */}
        <div className="absolute inset-0 bg-[#0B1120]/60 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/40 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] from-20% via-[#0B1120]/80 md:via-[#0B1120]/60 md:via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] from-0% via-transparent via-30% to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-20 md:mt-0">
        <div className="flex flex-col items-start text-left max-w-xl">
          <div className="w-full">
            <div className="inline-block mb-4 md:mb-6 ">
              <span className="font-geist text-[10px] md:text-[12px] font-semibold text-white tracking-[0.2em] uppercase">
                <SplitText text="Join Our Team" />
              </span>
            </div>
            
            <h1 className="font-jetbrains text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.2] md:leading-[1.1] mb-4 md:mb-6 tracking-tight">
              <SplitText text="Build the" /> <span className="text-[#4B6BFB]"><SplitText text="Future" /></span> <br className='hidden sm:block' />
              <SplitText text="With Us." />
            </h1>
            
            <motion.p 
              className="font-sans text-base sm:text-lg text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 1.6 }}
            >
              We are always looking for passionate creators, engineers, and visionaries to help us shape the next generation of digital experiences.
            </motion.p>

            <motion.button 
              onClick={() => {
                document.getElementById('teams-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 1.8 }}
              className="group relative inline-flex items-center bg-white text-[#0B1120] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-[14px] sm:text-[15px] font-jetbrains overflow-hidden transition-colors cursor-pointer"
            >
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">Explore Open Roles</span>
              <span className="text-lg sm:text-xl ml-2 transition-all duration-300 ease-out group-hover:translate-x-7 group-hover:opacity-0">&rarr;</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;