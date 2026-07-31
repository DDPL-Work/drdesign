import React, { useEffect, useRef } from "react";
import { FiPhone } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// Helper to split text into CHARACTERS for GSAP reveal animation
const SplitText = ({ text, className = "", charClass = "cta-char" }) => {
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
            display: "inline-block",
            width: "0.3em",
          }}
        >
          {" "}
        </span>
      )}
    </span>
  ));
};

const CTA = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView || !ctaRef.current) return;

    let ctx = gsap.context(() => {
      const chars = ctaRef.current.querySelectorAll(".cta-char");
      if (chars.length === 0) return;

      gsap.set(chars, { opacity: 0, filter: "blur(20px)" });

      gsap.to(chars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={ctaRef}
      className="w-full bg-white py-15 md:py-24 px-6 flex flex-col items-center text-center"
    >
      <h2 className="font-jetbrains text-[27px] md:text-[60px] font-medium leading-[1.1] text-[#8687DD] mb-6 max-w-[1100px]">
        <SplitText text="Ready to Start Your Next" />
        <br className="hidden md:block" />
        <SplitText text=" Project?" />
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="font-inter font-normal text-[#666666] text-[18px] mb-6 md:mb-12"
      >
        Let's build something exceptional together.
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
        {/* Primary CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="group bg-[#0a181c] text-white font-jetbrains text-[15px] md:text-[14px] px-5 py-3 md:px-8 md:py-3.5 rounded-full flex items-center transition-colors shadow-md overflow-hidden whitespace-nowrap shrink-0"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-[12px]">
            Start a Project
          </span>
          <span className="text-xl font-bold md:text-2xl -mt-2 ml-2  md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-[30px] group-hover:opacity-0">
            &rarr;
          </span>
        </motion.button>

        {/* Secondary Contact Link */}
        <motion.a
          href="tel:+917060100443"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          className="group flex items-center gap-2 md:gap-3 font-jetbrains font-semibold text-[#666666] hover:text-[#0A0F1C] transition-colors text-[15px] md:text-[14px] whitespace-nowrap shrink-0"
        >
          <FiPhone className="text-[16px] md:text-[18px] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-12" />
          <span>Call: +91 7060100443</span>
        </motion.a>
      </div>
    </section>
  );
};

export default CTA;
