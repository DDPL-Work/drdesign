import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─── Constants ──────────────────────────────────────────── */
const ACCENT        = "#4B6BFB";
const CIRCLE_RADIUS = 240;
const SCROLL_HEIGHT = 350; // vh
const CARD_WIDTH    = 220;
const CARD_HEIGHT   = 148;
const GAP           = 28;

/* ─── Step data ──────────────────────────────────────────── */
const STEPS = [
  {
    id: "01",
    label: "STEP 01",
    title: "Discover",
    description:
      "Workshops to map goals, users, data and constraints before a line of code.",
    revealAt: 0.15,
    angleProgress: 0,
  },
  {
    id: "02",
    label: "STEP 02",
    title: "Design",
    description:
      "Prototypes and architecture that make the solution tangible early.",
    revealAt: 0.4,
    angleProgress: 0.25,
  },
  {
    id: "03",
    label: "STEP 03",
    title: "Build",
    description:
      "Two-week sprints with senior engineers and a working demo every cycle.",
    revealAt: 0.65,
    angleProgress: 0.5,
  },
  {
    id: "04",
    label: "STEP 04",
    title: "Scale",
    description: "Deployment, training, monitoring and long-term support.",
    revealAt: 0.88,
    angleProgress: 0.75,
  },
];

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENT 1 — SectionHeader
   ═══════════════════════════════════════════════════════════ */
const SectionHeader = () => (
  <div className="container mx-auto px-6 md:px-[57px] pt-24">

    {/* Breadcrumb */}
    <motion.div
      className="flex items-center gap-5 text-[11px] text-[#64748B] font-semibold tracking-[0.2em] mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <span>03 /</span>
      <span className="w-16 h-[1px] bg-[#CBD5E1] dark:bg-[#334155] inline-block" />
      <span>HOW WE WORK</span>
    </motion.div>

    {/* Heading */}
    <motion.h2
      className="font-geist font-bold text-[#0B101E] dark:text-white leading-[1.1] m-0 text-4xl md:text-[48px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    >
      A delivery rhythm you can plan <br className="md:block hidden" /> around.
    </motion.h2>
  </div>
);



/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENT 2 — CircleSection
   ═══════════════════════════════════════════════════════════ */
const CircleSection = () => {
  const containerRef = useRef(null);
  const stickyRef    = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const arcProgress        = useMotionValue(0);
  const travelX            = useMotionValue(0);
  const travelY            = useMotionValue(0);
  const ringGlowOpacity    = useMotionValue(0);
  const animatedPathLength = useTransform(arcProgress, (v) =>
    Math.max(0, Math.min(1, v))
  );

  const [frameSize, setFrameSize] = useState({ width: 1200, height: 900 });
  const [stepVisible,     setStepVisible]     = useState([false, false, false, false]);
  const [stepDotsVisible, setStepDotsVisible] = useState([false, false, false, false]);
  const [isComplete,      setIsComplete]      = useState(false);

  const center = useMemo(
    () => ({ x: frameSize.width / 2, y: frameSize.height / 2 + 130 }),
    [frameSize.width, frameSize.height]
  );

  const getPointOnCircle = useCallback(
    (progress, radiusOffset = 0) => {
      const angle  = progress * Math.PI * 2;
      const radius = CIRCLE_RADIUS + radiusOffset;
      return {
        x: center.x + radius * Math.cos(angle - Math.PI / 2),
        y: center.y + radius * Math.sin(angle - Math.PI / 2),
      };
    },
    [center.x, center.y]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !stickyRef.current) return;
    const updateSize = () => {
      if (!stickyRef.current) return;
      startTransition(() =>
        setFrameSize({
          width:  stickyRef.current.clientWidth  || 1200,
          height: stickyRef.current.clientHeight || 900,
        })
      );
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(stickyRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const p = getPointOnCircle(0);
    travelX.set(p.x);
    travelY.set(p.y);
  }, [getPointOnCircle, travelX, travelY]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    arcProgress.set(clamped);

    const point = getPointOnCircle(clamped);
    travelX.set(point.x);
    travelY.set(point.y);
    ringGlowOpacity.set(clamped >= 0.98 ? 1 : 0);

    const nextVis    = STEPS.map((s) => clamped > s.revealAt);
    const nextDotVis = STEPS.map((s) => clamped >= s.angleProgress);
    const nextDone   = clamped >= 0.98;

    startTransition(() => {
      setStepVisible((prev) =>
        prev.some((v, i) => v !== nextVis[i]) ? nextVis : prev
      );
      setStepDotsVisible((prev) =>
        prev.some((v, i) => v !== nextDotVis[i]) ? nextDotVis : prev
      );
      setIsComplete((prev) => (prev !== nextDone ? nextDone : prev));
    });
  });

  const cardPositions = useMemo(
    () =>
      STEPS.map((step, i) => {
        const anchor = getPointOnCircle(step.angleProgress);
        if (i === 0) return { left: anchor.x - CARD_WIDTH / 2, top: anchor.y - CARD_HEIGHT - GAP };
        if (i === 1) return { left: anchor.x + GAP,             top: anchor.y - CARD_HEIGHT / 2  };
        if (i === 2) return { left: anchor.x - CARD_WIDTH / 2,  top: anchor.y + GAP              };
        return          { left: anchor.x - CARD_WIDTH - GAP,  top: anchor.y - CARD_HEIGHT / 2  };
      }),
    [getPointOnCircle]
  );

  return (
    /* minHeight uses a runtime constant → stays inline */
    <div
      ref={containerRef}
      className="relative w-full bg-white dark:bg-[#0B1120] pt-10 pb-50"
      style={{ minHeight: `${SCROLL_HEIGHT}vh` }}
    >
      {/* Keyframe animations — cannot be expressed as Tailwind classes */}
      <style>{`
        @keyframes scpPulse {
          0%   { transform: scale(0.95); opacity: 0.45; }
          50%  { transform: scale(1.1);  opacity: 0.85; }
          100% { transform: scale(0.95); opacity: 0.45; }
        }
        @keyframes scpRingGlow {
          0%   { filter: drop-shadow(0 0 6px  rgba(75,107,251,0.35)); }
          50%  { filter: drop-shadow(0 0 16px rgba(75,107,251,0.65)); }
          100% { filter: drop-shadow(0 0 6px  rgba(75,107,251,0.35)); }
        }
      `}</style>

      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-visible"
      >

        {/* ── SVG circle ─────────────────────────────── */}
        {/* width/height are runtime values → inline; position/overflow → Tailwind */}
        <svg
          aria-hidden="true"
          width={frameSize.width}
          height={frameSize.height}
          className="absolute inset-0 overflow-visible"
        >
          {/* transformOrigin depends on runtime center → inline */}
          <g
            style={{
              transformOrigin: `${center.x}px ${center.y}px`,
              transform:       "rotate(-90deg)",
            }}
          >
            {/* Dashed track */}
            <circle
              cx={center.x}
              cy={center.y}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="rgba(8,16,35,0.08)"
              strokeWidth={2}
              strokeDasharray="4 8"
            />
            {/* Animated arc — pathLength + filter are motion/filter values → inline */}
            <motion.circle
              cx={center.x}
              cy={center.y}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke={ACCENT}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="1"
              style={{
                pathLength: animatedPathLength,
                filter:     "drop-shadow(0 0 8px rgba(75,107,251,0.5))",
              }}
            />
          </g>
        </svg>

        {/* ── Step dots + cards ──────────────────────── */}
        {STEPS.map((step, index) => {
          const stepPoint = getPointOnCircle(step.angleProgress);
          return (
            <div key={step.id}>

              {/* Pulse halo — left/top/display are runtime → inline */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  left:       stepPoint.x - 8,
                  top:        stepPoint.y - 8,
                  width:      16,
                  height:     16,
                  background: "rgba(75,107,251,0.2)",
                  display:    stepDotsVisible[index] ? "block" : "none",
                  animation:  "scpPulse 1.8s ease-in-out infinite",
                }}
              />

              {/* Core dot — left/top/bg/opacity are runtime → inline */}
              <div
                aria-hidden="true"
                className="absolute rounded-full transition-opacity duration-[350ms] ease-in-out"
                style={{
                  left:    stepPoint.x - 4,
                  top:     stepPoint.y - 4,
                  width:   8,
                  height:  8,
                  background: ACCENT,
                  opacity: stepDotsVisible[index] ? 1 : 0,
                }}
              />

              {/* Card — static layout/style → Tailwind; dynamic position → inline */}
              <motion.article
                initial={false}
                animate={{
                  opacity: stepVisible[index] ? 1 : 0,
                  y:       stepVisible[index] ? 0 : 16,
                }}
                transition={{
                  type:      "spring",
                  stiffness: 260,
                  damping:   26,
                  mass:      0.9,
                }}
                className="absolute bg-white dark:bg-[#111B2E] border border-[rgba(8,16,35,0.10)] dark:border-white/10 rounded-[14px] p-5 z-[3]"
                style={{
                  width:     CARD_WIDTH,
                  left:      cardPositions[index].left,
                  top:       cardPositions[index].top,
                  boxShadow: "0 4px 24px rgba(75,107,251,0.08), 0 1px 4px rgba(0,0,0,0.06)",
                  willChange: "opacity, transform",
                }}
              >
                {/* Step label — color tied to ACCENT constant → inline */}
                <div
                  className="font-jetbrains text-[11px] font-semibold uppercase tracking-[2px] mb-2"
                  style={{ color: ACCENT }}
                >
                  {step.label}
                </div>

                {/* Title */}
                <h3 className="m-0 mb-[6px] font-jetbrains text-[20px] font-bold leading-[1.15] text-[#081023] dark:text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="m-0 font-sans text-[13px] font-normal text-[rgba(8,16,35,0.55)] dark:text-gray-400 leading-[1.6]">
                  {step.description}
                </p>
              </motion.article>
            </div>
          );
        })}

        {/* ── Travelling dot ─────────────────────────── */}
        {/* left/top are motion values, bg/shadow tied to ACCENT → inline */}
        <motion.div
          aria-hidden="true"
          className="absolute rounded-full z-4"
          style={{
            left:      travelX,
            top:       travelY,
            width:     16,
            height:    16,
            x:         -8,
            y:         -8,
            background: ACCENT,
            boxShadow: "0 0 16px rgba(75,107,251,0.65)",
          }}
        />

        {/* ── Completion ring glow ───────────────────── */}
        {/* All values are runtime computed → inline; layout helpers → Tailwind */}
        <motion.div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            left:      center.x - CIRCLE_RADIUS - 22,
            top:       center.y - CIRCLE_RADIUS - 22,
            width:     CIRCLE_RADIUS * 2 + 44,
            height:    CIRCLE_RADIUS * 2 + 44,
            border:    `2px solid ${ACCENT}30`,
            opacity:   ringGlowOpacity,
            animation: isComplete ? "scpRingGlow 1.8s ease-in-out infinite" : "none",
          }}
        />

      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENT 3 — MobileTimeline
   ═══════════════════════════════════════════════════════════ */
const MobileTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div className="container mx-auto px-6 py-10 pb-24" ref={containerRef}>
      <div className="relative">
        {/* Base Dashed vertical line */}
        <div className="absolute left-[13px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#08102314] dark:border-white/15"></div>
        
        {/* Active solid vertical line that fills on scroll */}
        <motion.div 
          className="absolute left-[13px] top-6 bottom-6 w-[2px] z-0"
          style={{ 
            backgroundColor: ACCENT, 
            scaleY: scrollYProgress, 
            transformOrigin: "top" 
          }}
        />
        
        <div className="flex flex-col gap-8">
          {STEPS.map((step) => (
            <motion.div
              key={step.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "0px 0px -50% 0px" }}
              className="relative pl-10"
            >
              {/* Timeline Dot with spring pop animation */}
              <motion.div 
                className="absolute left-[8px] top-5 w-3 h-3 rounded-full z-10 shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#0B1120]"
                style={{ backgroundColor: ACCENT }}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { 
                    scale: 1, 
                    opacity: 1, 
                    transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.1 } 
                  }
                }}
              />

              {/* Card with slide & fade animation + subtle hover */}
              <motion.div 
                className="bg-white dark:bg-[#111B2E] border border-[rgba(8,16,35,0.10)] dark:border-white/10 rounded-[14px] p-6 shadow-[0_4px_24px_rgba(75,107,251,0.08),_0_1px_4px_rgba(0,0,0,0.06)] relative z-10"
                variants={{
                  hidden: { opacity: 0, x: 40, y: 20 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 } 
                  }
                }}
                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
              >
                <div
                  className="font-jetbrains text-[11px] font-semibold uppercase tracking-[2px] mb-2"
                  style={{ color: ACCENT }}
                >
                  {step.label}
                </div>
                <h3 className="m-0 mb-[6px] font-jetbrains text-[20px] font-bold leading-[1.15] text-[#081023] dark:text-white">
                  {step.title}
                </h3>
                <p className="m-0 font-sans text-[13px] font-normal text-[rgba(8,16,35,0.55)] dark:text-gray-400 leading-[1.6]">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PARENT — HowWeWork
   ═══════════════════════════════════════════════════════════ */
const HowWeWork = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="how-we-work" className="bg-white dark:bg-[#0B1120]">
      <SectionHeader />
      {isMobile ? <MobileTimeline /> : <CircleSection />}
    </section>
  );
};

export default HowWeWork;
