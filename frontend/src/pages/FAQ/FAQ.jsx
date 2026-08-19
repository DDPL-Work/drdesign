import React, { useState, useMemo,useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import gsap from "gsap";
import FAQFormModal from '../../components/common/LeadFormModal';
import { faqData } from '../../constants/faqData';

const FAQHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#f8f9fa] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #4B6BFB 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-[57px] relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-[35px] md:text-[56px] font-bold text-gray-900 leading-[1.1] mb-6 font-jetbrains tracking-tight flex justify-center flex-wrap gap-x-3"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {["Frequently", "Asked", "Questions"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-[14px] md:text-[18px] text-gray-600 mb-10 font-inter leading-[1.6]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Life's toughest moments can feel overwhelming, and questions are completely normal. We've put together clear answers to help you understand how our IT, GIS, and Cloud solutions can support your business.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="relative max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative flex items-center">
              <svg className="absolute left-5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search for answers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-13 pr-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]/20 focus:border-[#4B6BFB] transition-all text-[15px] font-inter bg-white"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQAccordion = ({ question, answer, isOpen, onClick, onPointerEnter, onPointerLeave }) => {
  return (
    <div 
      className="border-b border-gray-200 py-5"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button 
        className="flex w-full cursor-pointer flex-row items-start justify-between focus:outline-none group"
        onClick={onClick}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="flex-start text-[17px] md:text-[19px] pr-4 text-left font-medium text-gray-900 group-hover:text-[#4B6BFB] transition-colors duration-200 font-geist">
          {question}
        </div>
        <span className="mr-4 w-3 text-center font-semibold text-gray-400 group-hover:text-[#4B6BFB] transition-colors duration-200">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 prose prose-harmony text-[15px] md:text-[16px] text-gray-600 leading-[1.6] font-inter">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



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

const CTA = ({ setIsFAQModalOpen }) => {
  const ctaRef = useRef(null);
  const navigate = useNavigate();
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
      <h2 className="font-jetbrains text-[27px] md:text-[60px] font-medium leading-[1.1] text-[#8687DD] mb-6 max-w-275">
        <SplitText text="Still have" />
        <SplitText text=" questions?" />
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="font-inter font-normal text-[#666666] text-[18px] mb-6 md:mb-12 max-w-2xl mx-auto"
      >
        If you couldn't find the answer you were looking for, our team is ready to help you with your specific needs.
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
        {/* Primary CTA Button */}
        <motion.button
          onClick={() => setIsFAQModalOpen(true)}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="group bg-[#0a181c] text-white font-jetbrains text-[15px] md:text-[14px] px-5 py-3 md:px-8 md:py-3.5 rounded-full flex items-center transition-colors shadow-md overflow-hidden whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">
            Get Your Answer
          </span>
          <span className="text-xl font-bold md:text-2xl -mt-2 ml-2  md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
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

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize state so the first question (index 0) of every category is open
  const [openItems, setOpenItems] = useState(() => {
    const initialState = {};
    faqData.forEach(cat => {
      initialState[cat.id] = 0;
    });
    return initialState;
  });

  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  // Toggle accordion open/close state (scoped per category)
  const toggleItem = (categoryId, itemIndex) => {
    setOpenItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === itemIndex ? null : itemIndex
    }));
  };

  // Filter FAQs based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    
    const query = searchQuery.toLowerCase();
    
    return faqData.map(category => {
      const filteredQuestions = category.questions.filter(
        item => 
          item.q.toLowerCase().includes(query) || 
          item.a.toLowerCase().includes(query)
      );
      return { ...category, questions: filteredQuestions };
    }).filter(category => category.questions.length > 0);
  }, [searchQuery]);

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <FAQHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="py-10  bg-white relative">
        <div className="container mx-auto px-6 md:px-[57px]">
          <div className="max-w-6xl mx-auto">
            
            <AnimatePresence mode="popLayout">
              {filteredData.length > 0 ? (
                filteredData.map((category, catIndex) => (
                  <motion.div 
                    key={category.id}
                    className="mb-12 md:mb-20 last:mb-0 flex flex-col lg:flex-row gap-6 lg:gap-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: catIndex * 0.1, ease: "easeOut" }}
                  >
                    <div className="lg:w-[38%] flex-shrink-0">
                      <h2 className="text-[20px] md:text-[28px] font-semibold text-[#8687DD] md:text-gray-900 font-jetbrains sticky top-32">
                        {category.category}
                      </h2>
                    </div>
                    <div className="lg:w-[62%] border-t border-gray-200">
                      {category.questions.map((item, qIndex) => {
                        const isOpen = openItems[category.id] === qIndex;
                        return (
                          <FAQAccordion 
                            key={qIndex}
                            question={item.q}
                            answer={item.a}
                            isOpen={isOpen}
                            onClick={() => toggleItem(category.id, qIndex)}
                            onPointerEnter={(e) => {
                              if (e.pointerType === 'mouse') {
                                setOpenItems(prev => ({ ...prev, [category.id]: qIndex }));
                              }
                            }}
                            onPointerLeave={(e) => {
                              if (e.pointerType === 'mouse' && openItems[category.id] === qIndex) {
                                setOpenItems(prev => ({ ...prev, [category.id]: null }));
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              ) : (
                <></>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
    <CTA setIsFAQModalOpen={setIsFAQModalOpen} />

    <FAQFormModal isOpen={isFAQModalOpen} onClose={() => setIsFAQModalOpen(false)} />
    </motion.div>
  );
};

export default FAQ;