import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="w-full bg-black py-15 md:py-24 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 md:px-15 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-[12px] font-medium tracking-[0.2em] text-[#8b949e] uppercase flex items-center justify-center gap-6 font-inter mb-6">
            <span className="w-16 h-[1px] bg-white/20 rounded-full hidden md:block"></span>
            <span>OUR PORTFOLIO</span>
            <span className="w-16 h-[1px] bg-white/20 rounded-full hidden md:block"></span>
          </h2>
          <h3 className="text-[28px] md:text-[40px] font-bold text-white font-jetbrains leading-[1.2] mb-6">
            Discover Our Complete Story & Achievements
          </h3>
          <p className="text-gray-400 font-inter text-[15px] md:text-[18px] leading-relaxed mb-10 max-w-2xl mx-auto">
            Dive deeper into our journey, explore the milestones we've achieved, and see the full spectrum of successful projects we've delivered globally. Read about our impact in our comprehensive portfolio.
          </p>
          
          <a
            href="/DR DESIGN PORTFOLIO.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white text-[#0a181c] font-jetbrains text-[15px] md:text-[14px] px-5 py-3 md:px-8 md:py-3.5 rounded-full flex items-center transition-colors shadow-md overflow-hidden whitespace-nowrap shrink-0 cursor-pointer w-fit mx-auto"
          >
            <span className="font-semibold transition-transform duration-300 ease-out group-hover:translate-x-3">
              View Full Portfolio
            </span>
            <span className="text-xl font-bold md:text-2xl -mt-2 ml-2 md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;

