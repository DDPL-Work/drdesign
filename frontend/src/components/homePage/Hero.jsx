import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

// Helper to split text into CHARACTERS for GSAP reveal animation
// (each character blurs/fades in individually)
const SplitText = ({ text, className = "", charClass = "headline-char" }) => {
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
            filter: "blur(20px)",
            opacity: 0,
            position: "relative",
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {" "}
        </span>
      )}
    </span>
  ));
};

const GLOW_RADIUS = 3.5; // cells

const ICON_SLUGS = [
  "react",
  "nodedotjs",
  "mongodb",
  "express",
  "postgresql",
  "mysql",
  "redis",
  "python",
  "flutter",
  "wordpress",
  "shopify",
  "figma",
  "framer",
  "qgis",
  "esri",
  "leaflet",
  "php",
  "laravel",
  "threedotjs",
  "django",
  "typescript",
  "javascript",
  "nextdotjs",
  "dji",
];

// Using the exact grid glow color (8E95FB) so all icons match perfectly
const TECH_ICONS = ICON_SLUGS.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/8E95FB`,
);

// Memoized individual grid cell
const GridCell = React.memo(({ brightness, isHovered, iconIndex, cellSize }) => {
  const iconUrl = TECH_ICONS[iconIndex];

  return (
    <div
      style={{
        width: cellSize,
        height: cellSize,
        boxSizing: "border-box",
        border: "0.5px solid",
        borderColor: isHovered
          ? "rgba(255, 255, 255, 0.5)"
          : brightness > 0
            ? `rgba(142, 149, 251, ${0.04 + brightness * 0.4})`
            : "rgba(255, 255, 255, 0.04)",
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0.15)"
          : brightness > 0
            ? `rgba(142, 149, 251, ${brightness * 0.15})`
            : "transparent",
        backdropFilter: isHovered ? "blur(12px)" : "none",
        WebkitBackdropFilter: isHovered ? "blur(12px)" : "none",
        boxShadow: isHovered ? "0 4px 24px rgba(0, 0, 0, 0.2)" : "none",
        transform: isHovered ? "scale(1.25)" : "scale(1)",
        transformOrigin: "bottom left",
        transition: isHovered
          ? "transform 0.08s ease, border-color 0.08s ease, background-color 0.08s ease, backdrop-filter 0.08s ease, box-shadow 0.08s ease"
          : "border-color 0.5s ease, background-color 0.5s ease, transform 0.4s ease, backdrop-filter 0.5s ease, box-shadow 0.5s ease",
        position: "relative",
        zIndex: isHovered ? 2 : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt="Tech Stack"
          style={{
            width: "35px",
            height: "35px",
            objectFit: "fill",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.2)",
            transition: isHovered
              ? "opacity 0.15s ease, transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              : "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
});

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [globeHovered, setGlobeHovered] = useState(false);

  const [dims, setDims] = useState({ cols: 38, rows: 26, cellSize: 80 });

  // GSAP character-by-character blur/fade reveal — triggered when hero mounts
  useEffect(() => {
    if (!heroRef.current) return;

    let ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll(".headline-char");
      if (chars.length === 0) return;

      // Force initial state explicitly to ensure consistency across re-renders/HMR
      gsap.set(chars, { opacity: 0, filter: "blur(20px)" });

      gsap.to(chars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.04,
        delay: 0.3,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateDims = () => {
      if (!heroRef.current) return;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const currentCellSize = window.innerWidth < 768 ? 35 : 80;
      setDims({
        cols: Math.ceil(width / currentCellSize) + 1,
        rows: Math.ceil(height / currentCellSize) + 1,
        cellSize: currentCellSize,
      });
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    if (heroRef.current) ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 768) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth < 768) return;
    setMousePos({ x: -1, y: -1 });
  }, []);

  const mobileSequenceRef = useRef({ list: [], index: 0 });

  // Simulate random hover movements on mobile devices automatically
  useEffect(() => {
    // Generate a shuffled sequence of all cell coordinates for mobile
    if (window.innerWidth < 768) {
      const total = dims.cols * dims.rows;
      const list = Array.from({ length: total }, (_, i) => ({
        col: i % dims.cols,
        row: Math.floor(i / dims.cols),
      }));
      // Fisher-Yates shuffle
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      mobileSequenceRef.current = { list, index: 0 };
    }

    const interval = setInterval(() => {
      if (window.innerWidth >= 768) return; // Desktop uses real mouse
      
      const seq = mobileSequenceRef.current;
      if (seq.list.length === 0) return;

      if (seq.index >= seq.list.length) {
        // Reshuffle and start over once all cells have been shown
        for (let i = seq.list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [seq.list[i], seq.list[j]] = [seq.list[j], seq.list[i]];
        }
        seq.index = 0;
      }

      const { col, row } = seq.list[seq.index];
      seq.index++;
      
      // Calculate exact pixel position to activate this specific cell
      setMousePos({
        x: col * dims.cellSize + (dims.cellSize / 2),
        y: row * dims.cellSize + (dims.cellSize / 2),
      });
    }, 1500); // Highlight a new unique cell every 1.5s

    return () => clearInterval(interval);
  }, [dims.cols, dims.rows, dims.cellSize]);

  const mouseActive = mousePos.x >= 0;
  const hoveredCol = mouseActive ? Math.floor(mousePos.x / dims.cellSize) : -1;
  const hoveredRow = mouseActive ? Math.floor(mousePos.y / dims.cellSize) : -1;

  // Pre-compute cell props only for visible cells
  const cellData = useMemo(() => {
    const total = dims.cols * dims.rows;
    return Array.from({ length: total }, (_, i) => {
      const col = i % dims.cols;
      const row = Math.floor(i / dims.cols);
      // Pseudo-randomly assign an icon to this cell based on its absolute index
      const iconIndex = (i * 137 + 19) % TECH_ICONS.length;

      if (!mouseActive) return { isHovered: false, brightness: 0, iconIndex };

      const dx = col - hoveredCol;
      const dy = row - hoveredRow;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isHovered = dx === 0 && dy === 0;
      const brightness = Math.max(0, 1 - distance / GLOW_RADIUS);

      return { isHovered, brightness, iconIndex };
    });
  }, [dims.cols, dims.rows, hoveredCol, hoveredRow, mouseActive]);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[40vh] md:min-h-[90vh]  bg-[#0C0D0D] flex flex-col items-center justify-start pt-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "default" }}
    >
      {/* Interactive Grid — z-20 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${dims.cols}, ${dims.cellSize}px)`,
            width: `${dims.cols * dims.cellSize}px`,
            height: `${dims.rows * dims.cellSize}px`,
          }}
        >
          {cellData.map(({ isHovered, brightness, iconIndex }, i) => (
            <GridCell
              key={i}
              isHovered={isHovered}
              brightness={brightness}
              iconIndex={iconIndex}
              cellSize={dims.cellSize}
            />
          ))}
        </div>
      </div>

      {/* Content Container — z-30, above the grid */}
      <div
        className="relative flex flex-col items-center text-center px-6 max-w-4xl mx-auto gap-8"
        style={{ zIndex: 99 }}
      >
        {/* Main Headline */}
        <h1 className="font-jetbrains text-[27px] sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight text-[#6a71d8]">
          <SplitText text="Turning " charClass="headline-char" />
          <SplitText
            text="Complex Ideas "
            className="text-white"
            charClass="headline-char"
          />
          <br className="block md:hidden" />
          <br className="hidden md:block" />
          <SplitText text="into " charClass="headline-char" />
          <SplitText
            text="Seamless"
            className="text-white"
            charClass="headline-char"
          />
          <SplitText text=" Digital" charClass="headline-char" />
          <br className="hidden md:block" />
          <SplitText text="Products" charClass="headline-char" />
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          className="font-sans text-gray-100 text-sm md:text-base max-w-2xl leading-relaxed min-h-15"
        >
          Dr. DESIGN TECHNOLOGY is a full-service design and engineering{" "}
          <br className="hidden md:block" />
          agency, creating intuitive software and design systems for forward-{" "}
          <br className="hidden md:block" />
          thinking companies.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-4 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <button onClick={() => navigate("/contact-us", { state: { scrollTo: "cards-section" } })} className="group relative z-10 px-6 py-2.5 rounded-full bg-[#e3eeff] text-[#0C0D0D] font-jetbrains font-semibold text-sm flex items-center transition-colors cursor-pointer overflow-hidden">
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-3">Get Started</span>
            <span className="text-xl ml-2 -mt-2 md:mt-0 transition-all duration-300 ease-out group-hover:translate-x-7.5 group-hover:opacity-0">&rarr;</span>
          </button>
        </motion.div>
      </div>

      {/* Globe Section — z-40, above grid */}
      <motion.div
        className="relative w-full flex justify-center items-end h-17.5 md:h-28.75"
        style={{ marginTop: "30px", zIndex: 40 }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        onMouseEnter={() => setGlobeHovered(true)}
        onMouseLeave={() => setGlobeHovered(false)}
      >
        {/* Globe Container — glow inside, overflows visibly around sphere */}
        <div
          className="relative pointer-events-auto transition-transform duration-700 ease-out w-125 md:w-175 h-125 md:h-175"
          style={{
            marginBottom: "-250px",
            zIndex: -99,
            flexShrink: 0,
            transform: globeHovered ? "translateY(-10px)" : "translateY(0px)",
          }}
        >
          {/* Outer ring glow — centered on globe */}
          <div
            className="absolute pointer-events-none transition-all duration-700 ease-out w-130 h-130 md:w-190 md:h-190 "
            style={{
              top: "50%",
              left: "50%",
              transform: globeHovered
                ? "translate(-50%, -50%) scale(1.05)"
                : "translate(-50%, -50%) scale(1)",
              background: globeHovered
                ? "radial-gradient(circle, transparent 44%, rgba(80,130,255,0.4) 50%, rgba(50,90,240,0.2) 58%, transparent 72%)"
                : "radial-gradient(circle, transparent 44%, rgba(80,130,255,0.22) 50%, rgba(50,90,240,0.1) 58%, transparent 72%)",
              filter: "blur(12px)",
              zIndex: 1,
            }}
          ></div>

          <iframe
            src="/globe.html"
            title="Interactive Globe"
            className="absolute inset-0 w-full h-full border-0"
            style={{ backgroundColor: "transparent", zIndex: 2 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
