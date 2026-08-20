import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import phoneGif from '../assets/phone.gif';

const FloatingCallButton = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [showButton, setShowButton] = useState(false);

  const checkVisibility = (latestScroll) => {
    const isHome = location.pathname === '/';
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // On home page, hide the button when the hero section (and its "Learn More" button) is visible
    // The hero section takes up 100vh, so we show it after scrolling past roughly 80vh
    if (isHome && latestScroll < windowHeight * 0.8) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    checkVisibility(latest);
  });

  useEffect(() => {
    checkVisibility(scrollY.get());
  }, [location.pathname]);

  return (
    <a
      href="tel:+917060100443"
      className={`group fixed bottom-6 right-6 z-[9999] bg-[#5c3608] hover:bg-[#362005] text-white rounded-full font-jetbrains font-semibold text-[15px] tracking-wide shadow-[0_8px_30px_rgb(75,107,251,0.3)] hover:shadow-[0_8px_30px_rgb(75,107,251,0.5)] transition-all duration-300 block w-[164px] h-[52px] overflow-hidden ${
        showButton 
          ? 'translate-y-0 opacity-100 hover:-translate-y-1' 
          : 'translate-y-[150%] opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full h-full">
        
        {/* Icon (Starts left, moves right) */}
        <div className="absolute top-[10px] left-[12px] z-20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[108px]">
          <img src={phoneGif} alt="Phone" className="w-8 h-8 object-contain rounded-full bg-white p-1" />
        </div>

        {/* "Book a call" (Starts visible in remaining 120px, pushed right on hover) */}
        <div className="absolute top-0 bottom-0 w-[120px] left-[44px] flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[100px] group-hover:opacity-0 whitespace-nowrap">
          Book a call
        </div>

        {/* "Call Now" (Starts hidden left, pulled in to fill the first 120px) */}
        <div className="absolute top-0 bottom-0 w-[120px] left-[-120px] flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[120px] opacity-0 group-hover:opacity-100 whitespace-nowrap">
          Call Now
        </div>

      </div>
    </a>
  );
};

export default FloatingCallButton;
