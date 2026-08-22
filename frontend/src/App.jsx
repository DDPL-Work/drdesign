import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { Toaster } from "sonner";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const GLOW_RADIUS = 3.5; // cells

const GridCell = React.memo(({ brightness, isHovered, cellSize }) => {
  return (
    <div
      style={{
        width: cellSize,
        height: cellSize,
        boxSizing: "border-box",
        border: "0.5px solid",
        borderColor: isHovered
          ? "rgba(255, 255, 255, 0.25)"
          : brightness > 0
            ? `rgba(142, 149, 251, ${0.02 + brightness * 0.2})`
            : "rgba(255, 255, 255, 0.02)",
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0.08)"
          : brightness > 0
            ? `rgba(142, 149, 251, ${brightness * 0.08})`
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
    </div>
  );
});

function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(() => {
    // Only show loading video on first visit per session
    return !sessionStorage.getItem("hasSeenLoading");
  });

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    sessionStorage.setItem("hasSeenLoading", "true");
  };

  // --- Grid Logic Copied from Hero.jsx ---
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [dims, setDims] = useState({ cols: 38, rows: 26, cellSize: 80 });
  const mobileSequenceRef = useRef({ list: [], index: 0 });

  useEffect(() => {
    if (!isVideoPlaying) return;
    const updateDims = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const currentCellSize = window.innerWidth < 768 ? 35 : 80;
      setDims({
        cols: Math.ceil(width / currentCellSize) + 1,
        rows: Math.ceil(height / currentCellSize) + 1,
        cellSize: currentCellSize,
      });
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isVideoPlaying]);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 768 || !isVideoPlaying) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isVideoPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth < 768 || !isVideoPlaying) return;
    setMousePos({ x: -1, y: -1 });
  }, [isVideoPlaying]);

  useEffect(() => {
    if (!isVideoPlaying) return;


    const interval = setInterval(() => {
      if (window.innerWidth >= 768) return; 
      const seq = mobileSequenceRef.current;
      if (seq.list.length === 0) return;

      if (seq.index >= seq.list.length) {
        for (let i = seq.list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [seq.list[i], seq.list[j]] = [seq.list[j], seq.list[i]];
        }
        seq.index = 0;
      }
      const { col, row } = seq.list[seq.index];
      seq.index++;
      setMousePos({
        x: col * dims.cellSize + (dims.cellSize / 2),
        y: row * dims.cellSize + (dims.cellSize / 2),
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [dims.cols, dims.rows, dims.cellSize, isVideoPlaying]);

  const mouseActive = mousePos.x >= 0;
  const hoveredCol = mouseActive ? Math.floor(mousePos.x / dims.cellSize) : -1;
  const hoveredRow = mouseActive ? Math.floor(mousePos.y / dims.cellSize) : -1;

  const cellData = useMemo(() => {
    const total = dims.cols * dims.rows;
    return Array.from({ length: total }, (_, i) => {
      const col = i % dims.cols;
      const row = Math.floor(i / dims.cols);

      if (!mouseActive) return { isHovered: false, brightness: 0 };

      const dx = col - hoveredCol;
      const dy = row - hoveredRow;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const isHovered = dx === 0 && dy === 0;
      const brightness = Math.max(0, 1 - distance / GLOW_RADIUS);

      return { isHovered, brightness };
    });
  }, [dims.cols, dims.rows, hoveredCol, hoveredRow, mouseActive]);

  const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");

  return (
    <>
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div 
            key="loading-screen"
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.05, 1] }}
            ref={containerRef}
            className="fixed inset-0 w-full h-full bg-[#18181A] overflow-hidden z-9999"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "default" }}
          >
            <div className="absolute inset-0 w-full h-full bg-[#18181A] flex items-center justify-center z-10">
              {/* Loading Video */}
              <video 
                src="/loadingBG.mp4" 
                autoPlay 
                muted 
                playsInline
                onEnded={handleVideoEnd}
                onCanPlay={(e) => { e.target.playbackRate = 3.0; }}
                className="w-100 md:w-200 object-contain"
                style={{ clipPath: "inset(0 0 12% 0)" }}
              />
            </div>
            {/* Interactive Grid overlaying the video */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${dims.cols}, ${dims.cellSize}px)`,
                  width: `${dims.cols * dims.cellSize}px`,
                  height: `${dims.rows * dims.cellSize}px`,
                }}
              >
                {cellData.map(({ isHovered, brightness }, i) => (
                  <GridCell
                    key={i}
                    isHovered={isHovered}
                    brightness={brightness}
                    cellSize={dims.cellSize}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={!hasSeenLoading ? { y: "100vh" } : { y: 0 }}
        animate={{ y: isVideoPlaying ? "100vh" : 0 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.05, 1] }}
        style={{ 
          position: "relative", 
          zIndex: 1, 
          height: isVideoPlaying ? "100vh" : "auto", 
          overflow: isVideoPlaying ? "hidden" : "visible" 
        }}
      >
        <SmoothScrollProvider>
          <AppRoutes />
        </SmoothScrollProvider>
      </motion.div>
      
      <Toaster
        position="bottom-right"
        closeButton
        style={{ zIndex: 999999, width: "auto" }}
        icons={{
          success: <FiCheckCircle />,
          error: <MdOutlineCancel />
        }}
        toastOptions={{
          classNames: {
            toast: "!bg-[#1E1E1E] !border-none !w-[90vw] sm:!w-max !min-w-[300px] sm:!min-w-[400px] !pl-4 sm:!pl-5 !pr-10 sm:!pr-14 !py-3 sm:!py-3.5 !rounded-xl !shadow-2xl !flex !items-center !relative",
            title: "!text-white !text-[13px] sm:!text-[15px] !font-medium !whitespace-normal sm:!whitespace-nowrap !ml-2 sm:!ml-3 !m-0",
            icon: "!m-0 !w-7 sm:!w-8 !h-7 sm:!h-8 !flex !items-center !justify-center !rounded-full !shrink-0",
            success: "[&_[data-icon]]:!bg-[#00c853]/20 [&_[data-icon]]:!text-[#00c853] [&_[data-icon]_svg]:!w-4 sm:[&_[data-icon]_svg]:!w-5 [&_[data-icon]_svg]:!h-4 sm:[&_[data-icon]_svg]:!h-5",
            error: "[&_[data-icon]]:!bg-[#ef4444]/20 [&_[data-icon]]:!text-[#ef4444] [&_[data-icon]_svg]:!w-4 sm:[&_[data-icon]_svg]:!w-5 [&_[data-icon]_svg]:!h-4 sm:[&_[data-icon]_svg]:!h-5",
            closeButton: "!opacity-100 !visible !absolute !left-auto !right-1 sm:!right-4 !top-1/2 sm:!top-2/3 !-translate-y-1/2 !bg-transparent !border-none !text-[#9CA3AF] hover:!text-white !transition-colors !p-1 !cursor-pointer"
          }
        }}
      />

    </>
  );
}

export default App;
