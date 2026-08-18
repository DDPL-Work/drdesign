import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = (label) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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

  const megaMenuData = {
    "About": {
      columns: [
        {
          title: "Overview",
          links: [
            { label: "Our Journey", path: "/about-us#our-journey" },
            { label: "Vision & Mission", path: "/about-us#vision-mission" },
          ]
        },
        {
          title: "Highlights",
          links: [
            { label: "Achievements", path: "/about-us#achievements" },
            { label: "Trusted Clients", path: "/about-us#trusted-clients" },
          ]
        }
      ],
      featured: {
        tag: "Support",
        title: "Frequently Asked Questions",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
        path: "/find-answers"
      }
    },
    "Services": {
      columns: [
        {
          title: "Expertise",
          links: [
            { label: "IT Practice", path: "/services#it-practice" },
            { label: "GIS Practice", path: "/services#gis-practice" },
          ]
        },
        {
          title: "Approach",
          links: [
            { label: "How We Work", path: "/services#how-we-work" },
          ]
        }
      ],
      featured: {
        tag: "Portfolio",
        title: "Explore our latest case studies",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        path: "/portfolio"
      }
    }
  };

  return (
    <div className="sticky top-0 z-[999] w-full flex justify-center transition-all duration-500 pointer-events-none">
      <nav 
        ref={navRef} 
        className={`pointer-events-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? "mt-4 w-[95%] md:w-[85%] max-w-5xl bg-[#0B1120]/95 dark:bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/10 dark:border-gray-200/60 px-5 md:px-8 py-2.5 rounded-[2rem]"
            : `mt-0 w-full backdrop-blur-md md:bg-[#0B1120] md:dark:bg-white md:backdrop-blur-none border-b md:border-white/10 md:dark:border-gray-100 px-6 md:px-8 py-4 ${isMobileMenuOpen ? "bg-[#0B1120]/95 dark:bg-white/95 border-white/10 dark:border-gray-200" : "bg-transparent rounded-none border-transparent"}`
        }`}
      >
      <div className="w-full flex items-center justify-between">
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
      <div className="hidden md:flex items-center gap-8 lg:gap-12 relative" onMouseLeave={handleMouseLeave}>
        {navLinks.map((item) => (
          <div 
            key={item.label}
            className="relative py-4"
            onMouseEnter={() => handleMouseEnter(item.label)}
          >
            <Link
              to={item.path}
              className="text-gray-300 dark:text-[#5e6673] hover:text-white dark:hover:text-black font-semibold text-sm tracking-wide transition-colors font-jetbrains"
            >
              {item.label}
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeDropdown === item.label && megaMenuData[item.label] && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[650px] bg-[#0B1120] dark:bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/10 dark:border-gray-100 overflow-hidden flex"
                  style={{ cursor: "default" }}
                >
                  {/* Left Side: Columns */}
                  <div className="w-[55%] p-8 grid grid-cols-2 gap-8 bg-[#0B1120] dark:bg-white">
                    {megaMenuData[item.label].columns.map((col, idx) => (
                      <div key={idx}>
                        <h4 className="font-inter font-semibold text-white dark:text-[#0a181c] text-[15px] mb-4">
                          {col.title}
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {col.links.map((link, lidx) => (
                            <li key={lidx}>
                              <Link 
                                to={link.path}
                                className="font-inter text-[14px] text-gray-400 dark:text-[#6b7280] hover:text-white dark:hover:text-[#0a181c] transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Right Side: Featured Card */}
                  <div className="w-[45%] relative group">
                    <Link to={megaMenuData[item.label].featured.path} onClick={() => setActiveDropdown(null)} className="block w-full h-full">
                      <img 
                        src={megaMenuData[item.label].featured.image} 
                        alt="Featured" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none transition-transform duration-700 group-hover:scale-105" />
                      
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                        <div>
                          <p className="font-jetbrains text-white/80 text-[12px] font-semibold tracking-wider mb-2">
                            {megaMenuData[item.label].featured.tag}
                          </p>
                          <h4 className="font-inter text-white text-[20px] font-semibold leading-tight">
                            {megaMenuData[item.label].featured.title}
                          </h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0a181c] shrink-0 transform transition-transform group-hover:translate-x-1 shadow-sm">
                          <FiChevronRight className="text-lg" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Desktop Contact Us Button */}
      <div className="hidden md:flex items-center">
        <Link
          to="/contact-us"
          className="px-5 py-2 border border-[#9c7a65] hover:border-white dark:hover:border-[#0a181c] text-[#9c7a65] hover:bg-white dark:hover:bg-[#0a181c] hover:text-[#0B1120] dark:hover:text-white transition-all duration-300 rounded-md font-semibold text-sm tracking-wide font-jetbrains"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className={`text-2xl focus:outline-none transition-colors ${
            isScrolled || isMobileMenuOpen
              ? "text-white dark:text-[#0a181c]"
              : "text-[#0a181c] dark:text-white"
          }`}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
           className="w-full flex flex-col gap-6 md:hidden mt-2 pt-4 border-t border-white/10 dark:border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={toggleMenu}
                  className="text-white dark:text-[#0a181c] hover:text-[#6a71d8] font-medium text-lg tracking-wide transition-colors font-jetbrains pb-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact-us"
              onClick={toggleMenu}
              className="mt-2 w-full flex justify-center items-center px-5 py-3 border dark:border-[#0a181c] border-white dark:bg-[#0a181c] bg-white dark:text-white text-black rounded-full font-semibold text-[15px] tracking-wide font-jetbrains shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
