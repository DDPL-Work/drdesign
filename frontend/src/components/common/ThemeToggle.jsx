import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-6 right-6 z-[9999999] p-3 rounded-full shadow-2xl backdrop-blur-md transition-all hover:scale-110 bg-white/90 dark:bg-[#1E293B]/90 border border-gray-200 dark:border-white/10 text-[#0a181c] dark:text-[#fbbf24] hover:bg-white dark:hover:bg-[#334155] cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
