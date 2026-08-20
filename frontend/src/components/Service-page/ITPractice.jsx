import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PracticeCard from "../common/PracticeCard";
import { itCardsData } from "../../constants/servicesData";

gsap.registerPlugin(ScrollTrigger);




// Row wrapper — both cards animate together when the row enters the DOM
const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

// Smooth x slide — cubic-bezier easeOutQuart, no flash
const cardVariantLeft = {
  hidden: { opacity: 0, x: -800 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariantRight = {
  hidden: { opacity: 0, x: 800 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const ITPractice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#it-practice" && location.state?.scrollToCard !== undefined) {
      const idx = location.state.scrollToCard;
      setTimeout(() => {
        if (isMobile) {
          const mobileCard = document.getElementById(`it-card-mobile-${idx}`);
          if (mobileCard) {
            mobileCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          const triggers = ScrollTrigger.getAll();
          const trigger = triggers.find((t) => t.trigger === sectionRef.current);
          const desktopCard = document.getElementById(`it-card-desktop-${idx}`);
          if (trigger && desktopCard && containerRef.current) {
            const container = containerRef.current;
            const maxScroll = Math.max(0, container.scrollWidth - container.parentElement.offsetWidth);
            const targetOffset = Math.min(desktopCard.offsetLeft, maxScroll);
            window.scrollTo({
              top: trigger.start + targetOffset,
              behavior: "smooth",
            });
          }
        }
      }, 500); // Allow GSAP / DOM to initialize
    }
  }, [location, isMobile]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        let containerWidth = container.scrollWidth;
        let parentWidth = container.parentElement.offsetWidth;
        return -(containerWidth - parentWidth);
      };

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);



  return (
    <section ref={sectionRef} id="it-practice" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-[57px]">

        {/* ── Header Section ──────────────────────────────────────────────── */}
        <div className="mb-15">
          <motion.div
            className="flex items-center gap-5 text-[11px] text-[#64748B] font-semibold tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span>01 /</span>
            <span className="w-16 h-[1px] bg-[#CBD5E1]"></span>
            <span>IT PRACTICE</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-[40px] font-jetbrains font-bold text-[#0B101E] leading-[1.1] m-0">
                IT &amp; Software Engineering
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-[18px] text-[#64748B] leading-[1.7] font-inter m-0 pr-4">
                From product discovery to production support — custom platforms,
                mobile apps, cloud infrastructure and analytics built by a senior in-house team.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE: cards animate like hero image ────────────────────────────── */}
        {isMobile && (
          <div className="flex flex-col gap-6 overflow-hidden pb-4">
            {itCardsData.map((card, index) => (
              <motion.div
                key={card.id}
                id={`it-card-mobile-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="w-full h-full flex"
              >
                <PracticeCard card={card} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── DESKTOP: Horizontal GSAP Scroll ──────────────── */}
        {!isMobile && (
          <div className="w-full overflow-visible mt-8 relative">
            <div
              ref={containerRef}
              className="flex gap-8 xl:gap-[72px] items-stretch"
              style={{ width: "max-content" }}
            >
              {itCardsData.map((card, index) => (
                <div key={card.id} id={`it-card-desktop-${index}`} className="w-[400px] lg:w-[476px] shrink-0 flex">
                  <PracticeCard card={card} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ITPractice;
