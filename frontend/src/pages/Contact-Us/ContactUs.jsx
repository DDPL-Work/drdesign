import React, { useState, useEffect } from "react";
import heroImg from "../../assets/contactHero.avif";
import emailGif from "../../assets/email.gif";
import locationGif from "../../assets/location2.gif";
import waitGif from "../../assets/wait.gif";
import phoneGif from "../../assets/phone.gif";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  FiMail,
  FiArrowUpRight,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import ProjectFormModal from "../../components/common/ProjectFormModal";

const Hero = ({ onOpenModal }) => {
  const text = "Let's build something exceptional.";
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-[400px] md:h-115.75 overflow-hidden flex items-center py-12 md:py-0"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        {/* Background photo */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-150 md:scale-100 origin-center"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-[#17191f]/95 via-[#17191f]/70 to-transparent pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-15 py-8">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-jetbrains text-white text-[28px] md:text-5xl lg:text-[60px] leading-[1.1] font-bold tracking-wide max-w-225"
        >
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.3em]">
              {word.split("").map((char, j) => (
                <motion.span
                  key={j}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-300 mt-5 text-base md:text-lg lg:text-[18px] leading-relaxed max-w-xl font-light"
        >
          Have a project in mind? Tell us what you're building —
          <br className="hidden md:block" /> our team is ready to help.
        </motion.p>

        <motion.button
         onClick={onOpenModal}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="mt-8 w-max group text-[#0a181c] bg-white font-jetbrains text-[15px] md:text-[14px] px-5 py-3 md:px-8 md:py-3.5 rounded-full flex items-center transition-colors shadow-md overflow-hidden whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">
            Start a Project
          </span>
          <span className="text-xl font-bold md:text-2xl -mt-2 ml-2  md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
            &rarr;
          </span>
        </motion.button>
      </div>
    </motion.section>
  );
};

const BorderShine = ({ isDark, delay = "0s" }) => (
  <>
    {/* Ambient Inner Glow */}
    <div className="hidden md:block absolute inset-0 pointer-events-none rounded-4xl z-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div
        className="absolute left-1/2 top-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] blur-[50px] opacity-20"
        style={{
          animationDelay: delay,
          background: isDark
            ? "conic-gradient(from 0deg, transparent 60%, #38bdf8 80%, #bae6fd 100%)"
            : "conic-gradient(from 0deg, transparent 60%, #0ea5e9 80%, #0284c7 100%)",
        }}
      />
    </div>

    {/* Crisp Spinning Border */}
    <div
      className="hidden md:block absolute inset-0 pointer-events-none rounded-4xl z-20 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite]"
        style={{
          animationDelay: delay,
          background: isDark
            ? "conic-gradient(from 0deg, transparent 60%, #38bdf8 80%, #bae6fd 100%)"
            : "conic-gradient(from 0deg, transparent 60%, #0ea5e9 80%, #0284c7 100%)",
        }}
      />
    </div>
  </>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: "100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.4 },
  },
};

const ConversationCards = ({ onOpenModal }) => {
  return (
    <section id="cards-section" className="relative w-full">
      <div className="px-6 lg:px-12 xl:px-16 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-[48px] font-bold font-jetbrains text-[#101218] mb-4 tracking-tight">
            Let's start a conversation.
          </h2>
          <p className="text-gray-500 text-base md:text-[20px] font-normal font-inter ">
            Whether it's a quick question or a full project brief, we read every
            message and <br className="hidden md:block" /> reply within one business day.
          </p>
        </motion.div>
      </div>

      <div className="w-full bg-sky-50 px-6 lg:px-12 xl:px-16 py-16 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-6"
        >
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row gap-6 lg:h-61.25">
            {/* Email Card */}
            <motion.div
              variants={cardVariants}
              className="flex-1 lg:flex-[1.3] bg-[#101218] text-white rounded-4xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-sm border-2 border-transparent transition-all duration-500"
            >
              <BorderShine isDark={true} delay="0s" />
              {/* Subtle background glow for dark card */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <style>{`
                  @media (max-width: 767px) {
                    @keyframes mailOut {
                      0%, 45%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
                      50%, 95% { transform: scale(1) rotate(-12deg); opacity: 0; }
                    }
                    @keyframes mailIn {
                      0%, 45%, 100% { transform: scale(1) rotate(12deg); opacity: 0; }
                      50%, 95% { transform: scale(1) rotate(0deg); opacity: 1; }
                    }
                    .mobile-mail-out { animation: mailOut 3s ease-in-out infinite; }
                    .mobile-mail-in { animation: mailIn 3s ease-in-out infinite; }
                  }
                `}</style>
                <div className="w-12 h-12 flex items-center justify-center relative overflow-hidden">
                  <img src={emailGif} alt="Email" className="w-8 h-8 rounded-lg object-contain transition-transform duration-300 md:group-hover:scale-110" />
                </div>
                <FiArrowUpRight className="text-2xl text-white md:text-gray-400 md:group-hover:text-white transition-colors" />
              </div>

              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-widest text-gray-400 mb-3 uppercase">
                  Email Us
                </p>
                <h3 className="text-[18px] sm:text-2xl md:text-3xl font-bold mb-6 break-all sm:break-normal">
                  contact@drdesigntech.com
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  Replies within 1 business day
                </div>
              </div>
            </motion.div>

            {/* Start a Project Card */}
            <motion.div
              variants={cardVariants}
              className="flex-1 bg-white rounded-4xl p-6 md:p-8 lg:p-10 flex flex-col justify-start shadow-[0_4px_24px_rgb(0,0,0,0.03)] border-2 border-gray-200 transition-all duration-500 cursor-pointer relative group"
            >
              <BorderShine delay="-0.7s" />
              <div className="flex-col flex justify-center gap-3 -mt-1.5">
                <p className="text-xs font-semibold text-gray-400 uppercase relative z-10">
                New Project?
              </p>
              <h3 className="text-2xl font-bold text-gray-900 relative z-10">
                Start a Project
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm  relative z-10">
                Share your brief and we'll get back with a tailored plan and
                estimate.
              </p>
              <motion.button
                onClick={onOpenModal}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                className="w-fit relative z-10 group bg-[#0a181c] text-white font-jetbrains text-[15px] md:text-[14px] px-5 py-3 md:px-8 md:py-3.5 rounded-full flex items-center transition-colors shadow-md overflow-hidden whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">
                  Send a brief
                </span>
                <span className="text-xl font-bold md:text-2xl -mt-2 ml-2  md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">
                  &rarr;
                </span>
              </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:h-61.25">
            {/* Phone Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-4xl p-6 lg:p-7 flex flex-col justify-between shadow-[0_4px_24px_rgb(0,0,0,0.03)] border-2 border-gray-200 overflow-hidden transition-all duration-500 cursor-pointer relative group"
            >
              <BorderShine delay="-1.4s" />
              <div className="w-12 h-12 flex items-center justify-center mb-4 relative z-10">
                <img src={phoneGif} alt="Phone" className="w-8 h-8 rounded-lg object-contain transition-transform duration-300 md:group-hover:scale-110" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-widest text-gray-400 mb-3 uppercase">
                  Phone
                </p>
                <div className="flex flex-col gap-1 mb-4">
                  <p className="text-lg md:text-xl font-medium text-gray-900">
                    +91 72170 52558
                  </p>
                  <p className="text-lg md:text-xl font-medium text-gray-900">
                    +91 72170 52556
                  </p>
                  <p className="text-lg md:text-xl font-medium text-gray-900">
                    +91 72170 52558
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Call now <FiArrowUpRight className="text-lg" />
                </a>
              </div>
            </motion.div>

            {/* Office Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-4xl p-6 lg:p-7 flex flex-col justify-between shadow-[0_4px_24px_rgb(0,0,0,0.03)] border-2 border-gray-200 overflow-hidden md:col-span-1 lg:col-span-2 transition-all duration-500 cursor-pointer relative group"
            >
              <BorderShine delay="-1.4s" />
              <div className="w-12 h-12 flex items-center justify-center mb-4 relative z-10">
                <img src={locationGif} alt="Location" className="w-8 h-8 rounded-lg object-contain transition-transform duration-300 md:group-hover:scale-110" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-widest text-gray-400 mb-3 uppercase">
                  Office
                </p>
                <p className="text-[15px] md:text-base font-medium text-gray-900 mb-4 leading-relaxed pr-2">
                  Near Survey Chowk, 11 East Canal Road, Dehradun, Uttarakhand,
                  248001
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Dehradun • India
                </div>
              </div>
            </motion.div>

            {/* Working Hours Card */}
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-4xl p-6 lg:p-7 flex flex-col justify-between shadow-[0_4px_24px_rgb(0,0,0,0.03)] border-2 border-gray-200 overflow-hidden transition-all duration-500 cursor-pointer relative group"
            >
              <BorderShine delay="-2.1s" />
              <div className="w-12 h-12 flex items-center justify-center mb-4 relative z-10">
                <img src={waitGif} alt="Working Hours" className="w-8 h-8 rounded-lg object-contain transition-transform duration-300 md:group-hover:scale-110" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-widest text-gray-400 mb-3 uppercase">
                  Working Hours
                </p>
                <p className="text-[15px] md:text-base font-medium text-gray-900 mb-4 leading-relaxed">
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM IST
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/50 border border-emerald-100 text-xs font-medium text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Available now
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Card */}
          <motion.div
            variants={cardVariants}
            className="w-full bg-white rounded-3xl md:rounded-4xl overflow-hidden shadow-[0_4px_24px_rgb(0,0,0,0.03)] border-2 md:border-4 border-gray-700 h-[300px] lg:h-61.25 transition-all duration-500 cursor-pointer relative group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d738.041421505057!2d78.05280591515341!3d30.32856862624344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929004980aa17%3A0x63e945299375e7cf!2sDr.%20Design%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1785907061338!5m2!1sen!2sin"
              className="w-full h-full relative z-10"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "cards-section") {
      setTimeout(() => {
        const element = document.getElementById("cards-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main className="relative">
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <ConversationCards onOpenModal={() => setIsModalOpen(true)} />
      <ProjectFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default ContactUs;
