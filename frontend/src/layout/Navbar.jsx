import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: "About", path: "/about-us" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Career", path: "/career" },
  ];

  return (
    <nav ref={navRef} className="sticky top-0 z-999 w-full bg-transparent backdrop-blur-md md:bg-white md:backdrop-blur-none flex items-center justify-between px-6 md:px-8 py-4  md:border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img
            src="/logo-remastered.svg"
            alt="Dr. Design Technology Logo"
            className="h-9 sm:h-10 w-auto"
          />
          <span className="text-[#8892a0] font-bold tracking-widest text-[10px] sm:text-xs uppercase hidden sm:block font-geist">
            Dr. Design Technology
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="text-[#5e6673] hover:text-black font-semibold text-sm tracking-wide transition-colors font-jetbrains"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Contact Us Button */}
      <div className="hidden md:flex items-center">
        <Link
          to="/contact"
          className="px-5 py-2 border border-[#9c7a65] hover:border-[#0a181c] text-[#9c7a65] hover:bg-[#0a181c] hover:text-white transition-all duration-300 rounded-md font-semibold text-sm tracking-wide font-jetbrains"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-2xl text-black focus:outline-none transition-colors"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
           className="absolute top-full left-0 w-full backdrop-blur-md bg-white/90 shadow-xl border-b border-white/20 py-6 px-6 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={toggleMenu}
                  className="text-[#0a181c] hover:text-[#6a71d8] font-medium text-lg tracking-wide transition-colors font-jetbrains pb-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={toggleMenu}
              className="mt-2 w-full text-center px-5 py-3 border border-[#0a181c] bg-[#0a181c] text-white rounded-md font-semibold text-[15px] tracking-wide font-jetbrains shadow-sm"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
