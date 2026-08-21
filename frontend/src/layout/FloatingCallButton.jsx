import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

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
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        showButton 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-[150%] opacity-0 pointer-events-none'
      }`}
    >
      {/* Phone Call Button */}
      <a
        href="tel:+917217052558"
        className="group flex items-center justify-center h-[60px] bg-[#007AFF] hover:bg-[#0056b3] text-white rounded-full shadow-[0_8px_30px_rgba(0,122,255,0.4)] hover:shadow-[0_8px_30px_rgba(0,122,255,0.6)] transition-all duration-500 animate-bounce overflow-hidden px-[12px] hover:px-6"
        aria-label="Call us"
      >
        <FaPhoneAlt className="w-9 h-9 shrink-0" />
        <span className="w-0 overflow-hidden opacity-0 group-hover:w-[75px] group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-jetbrains font-semibold text-[15px]">
          Call Us!
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917217052558"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center h-[60px] bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-500 animate-bounce overflow-hidden px-[12px] hover:px-6"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-9 h-9 shrink-0" />
        <span className="w-0 overflow-hidden opacity-0 group-hover:w-[110px] group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-jetbrains font-semibold text-[15px]">
          Chat with us!
        </span>
      </a>
    </div>
  );
};

export default FloatingCallButton;
