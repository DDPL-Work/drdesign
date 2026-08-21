import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { FiCompass, FiPenTool, FiCode, FiTrendingUp } from "react-icons/fi";
import buildVideo from "../../assets/Build.mp4";
import designVideo from "../../assets/design.mp4";
import scaleVideo from "../../assets/scale.mp4";
import discoverVideo from "../../assets/discover.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "01",
    title: "Discover",
    tagline: "Map before you move.",
    description:
      "We run deep-dive workshops to map your goals, users, data flows, and constraints â€” before a single line of code is written. This phase ensures every decision downstream is intentional.",
    icon: FiCompass,
    detail: [
      "Stakeholder interviews",
      "Requirements audit",
      "Technical feasibility",
      "Risk mapping",
    ],
    accentColor: "#4B6BFB",
    glowColor: "rgba(75, 107, 251, 0.15)",
  },
  {
    id: "02",
    title: "Design",
    tagline: "Make it tangible, early.",
    description:
      "Clickable prototypes and system architecture that let you see and feel the solution before committing to full development. Fast iterations with real feedback loops.",
    icon: FiPenTool,
    detail: [
      "UI/UX prototyping",
      "System architecture",
      "Data modelling",
      "Schema design",
    ],
    accentColor: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    id: "03",
    title: "Build",
    tagline: "Ship on a rhythm.",
    description:
      "Two-week sprints with senior engineers. You get a working, tested demo every cycle â€” no disappearing acts, no surprises. Always production-quality, always on schedule.",
    icon: FiCode,
    detail: [
      "Agile sprints",
      "Senior-led engineering",
      "CI/CD pipeline",
      "QA & testing",
    ],
    accentColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    id: "04",
    title: "Scale",
    tagline: "Built to last.",
    description:
      "Deployment, team training, monitoring, and long-term support. We stay with you after launch â€” ensuring your product performs, evolves, and scales as your business grows.",
    icon: FiTrendingUp,
    detail: [
      "Production deployment",
      "Team onboarding",
      "Performance monitoring",
      "Ongoing support",
    ],
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
];

/* â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• 
   DESKTOP â€” Sticky scroll-reveal experience
   â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */
const DesktopExperience = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Each step occupies an equal slice of scroll progress */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(latest * STEPS.length));
    setActiveStep(idx);
  });

  /* Progress bar width */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const step = STEPS[activeStep];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* ── Sticky viewport ───────────────────────── */}
      <div className="sticky top-0 w-full h-[100svh] lg:h-screen flex flex-col overflow-hidden">
        {/* Animated background gradient that shifts per step */}
        <motion.div
          key={`bg-${activeStep}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse 55% 55% at 72% 50%, ${step.glowColor}, transparent 70%)`,
          }}
        />

        {/* Discover step background video */}
        <AnimatePresence>
          {activeStep === 0 && (
            <motion.div
              key="discover-video-bg"
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <video
                src={discoverVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Dark overlay so text stays readable */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(11,16,30,0.72)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Build step background video */}
        <AnimatePresence>
          {activeStep === 2 && (
            <motion.div
              key="build-video-bg"
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <video
                src={buildVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Dark overlay so text stays readable */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(11,16,30,0.72)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Design step background video */}
        <AnimatePresence>
          {activeStep === 1 && (
            <motion.div
              key="design-video-bg"
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <video
                src={designVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Dark overlay so text stays readable */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(11,16,30,0.72)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scale step background video */}
        <AnimatePresence>
          {activeStep === 3 && (
            <motion.div
              key="scale-video-bg"
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <video
                src={scaleVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Dark overlay so text stays readable */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(11,16,30,0.72)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top progress bar */}
        <div className="relative z-20 w-full h-[2px] bg-white/10 shrink-0">
          <motion.div
            className="h-full"
            style={{ width: progressWidth }}
            transition={{ duration: 0 }}
          >
            <div
              className="h-full w-full"
              style={{
                background: step.accentColor,
                boxShadow: `0 0 10px ${step.accentColor}80`,
              }}
            />
          </motion.div>
          {/* Step tick marks */}
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="absolute top-1/2 -translate-y-1/2 w-[2px] h-3"
              style={{
                left: `${((i + 1) / STEPS.length) * 100}%`,
                background:
                  i < activeStep ? s.accentColor : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Main layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left: Step navigation list ────────── */}
          <div className="hidden lg:flex w-[320px] xl:w-[360px] shrink-0 flex-col justify-center px-8 xl:px-12 gap-8 border-r border-white/5 relative z-10">
            <div className="flex items-center gap-4 text-[14px] xl:text-[16px] text-gray-500 font-semibold tracking-[0.2em] mb-16 font-jetbrains whitespace-nowrap">
              <span>03 /</span>
              <span className="w-12 h-[1px] bg-white/20 inline-block" />
              <span>HOW WE WORK</span>
            </div>

            {STEPS.map((s, i) => {
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 py-[22px] relative"
                >
                  {/* Step number */}
                  <motion.span
                    className="font-jetbrains text-[16px] xl:text-[20px] font-bold tabular-nums w-8 shrink-0 text-right"
                    animate={{
                      color: isActive
                        ? s.accentColor
                        : isPast
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {s.id}
                  </motion.span>

                  {/* Animated connector line */}
                  <div className="relative h-[1px] flex-1">
                    <div className="absolute inset-0 bg-white/8" />
                    <motion.div
                      className="absolute inset-y-0 left-0 h-full"
                      animate={{ width: isPast || isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ background: s.accentColor }}
                    />
                  </div>

                  {/* Step title */}
                  <motion.span
                    className="font-jetbrains text-[20px] xl:text-[28px] font-medium shrink-0"
                    animate={{
                      color: isActive
                        ? "#ffffff"
                        : isPast
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {s.title}
                  </motion.span>

                  {/* Active indicator dot */}
                  <motion.div
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                      backgroundColor: s.accentColor,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Right: Active step content ─────────── */}
          <div className="flex-1 relative flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="w-full h-full flex items-center px-6 lg:pl-8 xl:pl-12 lg:pr-12 xl:pr-16"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -36 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="max-w-full w-full">
                  {/* Giant ghost step number */}
                  <div
                    className="font-jetbrains font-black leading-none select-none pointer-events-none"
                    style={{
                      fontSize: "clamp(100px, 18vw, 240px)",
                      color: `${step.accentColor}10`,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Icon + tagline — pulled up to overlap the ghost number */}
                  <div className="flex items-center gap-3 lg:gap-4 -mt-8 lg:-mt-12 xl:-mt-20 mb-4 lg:mb-6">
                    <div
                      className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${step.accentColor}18`,
                        border: `1px solid ${step.accentColor}35`,
                      }}
                    >
                      <step.icon
                        className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]"
                        style={{ color: step.accentColor }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className="font-jetbrains text-[14px] lg:text-[16px] xl:text-[20px] font-semibold tracking-wide"
                      style={{ color: step.accentColor }}
                    >
                      {step.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-jetbrains text-[32px] lg:text-[48px] xl:text-[72px] font-bold text-white leading-[1.05] mb-4 lg:mb-6">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-[15px] lg:text-[18px] xl:text-[24px] text-gray-400 leading-[1.6] lg:leading-[1.75] mb-8 lg:mb-12 max-w-full w-full pr-0 lg:pr-4">
                    {step.description}
                  </p>

                  {/* Detail tags */}
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {step.detail.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 + 0.15, duration: 0.3 }}
                        className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-[6px] lg:py-[10px] rounded-full font-inter text-[12px] lg:text-[14px] xl:text-[18px] font-medium"
                        style={{
                          background: `${step.accentColor}10`,
                          border: `1px solid ${step.accentColor}28`,
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        <span
                          className="w-[5px] h-[5px] rounded-full shrink-0"
                          style={{ background: step.accentColor }}
                        />
                        {d}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── 
   MOBILE — Vertical Stack Reveal (GSAP)
   ────────────────────────────────────────────────────────────────────────── */
const MobileExperience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".step-card");
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(STEPS.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (STEPS.length - 1),
            duration: 0.3,
            delay: 0.1,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      // Initially set all cards except the first one to be hidden below
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.set(card, { yPercent: 100 });

        // Each card takes an equal portion of the total scroll distance to slide up
        tl.to(card, { yPercent: 0, ease: "none" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#0B101E] overflow-hidden"
    >
      {STEPS.map((step, idx) => {
        let videoSrc;
        if (idx === 0) videoSrc = discoverVideo;
        else if (idx === 1) videoSrc = designVideo;
        else if (idx === 2) videoSrc = buildVideo;
        else if (idx === 3) videoSrc = scaleVideo;

        return (
          <div
            key={step.id}
            className="step-card absolute inset-0 w-full h-full flex flex-col justify-center px-6"
            style={{ zIndex: idx + 1 }}
          >
            <video
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay
              loop
              muted
              playsInline
            />
            <div
              className="absolute inset-0 z-0"
              style={{ background: "rgba(11,16,30,0.72)" }}
            />

            <div className="relative z-10 w-full pt-12">
              {/* Giant ghost step number */}
              <div
                className="font-jetbrains font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(100px, 18vw, 240px)",
                  color: `${step.accentColor}10`,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.id}
              </div>

              {/* Icon + tagline */}
              <div className="flex items-center gap-3 -mt-8 mb-4">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${step.accentColor}18`,
                    border: `1px solid ${step.accentColor}35`,
                  }}
                >
                  <step.icon
                    className="w-[20px] h-[20px]"
                    style={{ color: step.accentColor }}
                    strokeWidth={1.5}
                  />
                </div>
                <span
                  className="font-jetbrains text-[14px] font-semibold tracking-wide"
                  style={{ color: step.accentColor }}
                >
                  {step.tagline}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-jetbrains text-[32px] font-bold text-white leading-[1.05] mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-[15px] text-gray-400 leading-[1.6] mb-8 max-w-full w-full">
                {step.description}
              </p>

              {/* Detail tags */}
              <div className="flex flex-wrap gap-2">
                {step.detail.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-2 px-4 py-[6px] rounded-full font-inter text-[12px] font-medium"
                    style={{
                      background: `${step.accentColor}10`,
                      border: `1px solid ${step.accentColor}28`,
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    <span
                      className="w-[5px] h-[5px] rounded-full shrink-0"
                      style={{ background: step.accentColor }}
                    />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── 
   PARENT — HowWeWork
   ────────────────────────────────────────────────────────────────────────── */
const HowWeWork = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section id="how-we-work" className="w-full bg-[#0B101E]">
      {/* Section header — always visible, sits above the sticky experience */}
      <div className="relative z-10 px-6 md:px-14 pt-20 pb-10 lg:pb-0">
        <motion.div
          className="flex items-center gap-5 text-[11px] text-gray-500 font-semibold tracking-[0.2em] mb-5 font-jetbrains lg:hidden"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>03 /</span>
          <span className="w-10 h-[1px] bg-white/20 inline-block" />
          <span>HOW WE WORK</span>
        </motion.div>

        <motion.h2
          className="font-jetbrains font-bold text-white leading-[1.1] text-[30px] md:text-[42px] lg:text-[50px] max-w-xl lg:hidden"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          A delivery rhythm
          <br className="hidden md:block" /> you can plan around.
        </motion.h2>

        <motion.p
          className="font-inter text-[14px] text-gray-500 mt-3 max-w-sm leading-relaxed lg:hidden"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Four steps. No surprises. Full transparency from discovery to scale.
        </motion.p>
      </div>

      {/* Responsive experience */}
      {isMobile ? <MobileExperience /> : <DesktopExperience />}
    </section>
  );
};

export default HowWeWork;
