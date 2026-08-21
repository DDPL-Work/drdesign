import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import PortfolioPDF from "../assets/DRDESIGNTECHPORTFOLIO.pdf";

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
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar when scrolling down past 150px, show when scrolling up
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
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
    { label: "Who we are", path: "/who-we-are" },
    { label: "What we do", path: "/what-we-do" },
    { label: "Our Story", path: "/portfolio" },
    { label: "Careers", path: "/find-teams" },
  ];

  const megaMenuData = {
    "Who we are": {
      columns: [
        {
          title: "Overview",
          links: [
            { label: "Our Journey", path: "/who-we-are#our-journey" },
            { label: "Vision & Mission", path: "/who-we-are#vision-mission" },
          ]
        },
        {
          title: "Highlights",
          links: [
            { label: "Achievements", path: "/who-we-are#achievements" },
            { label: "Trusted Clients", path: "/who-we-are#trusted-clients" },
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
    "What we do": {
      columns: [
        {
          title: "IT Services",
          links: [
            { label: "Custom Software & Website Development", path: "/what-we-do#it-practice", state: { scrollToCard: 0 } },
            { label: "iOS & Android Applications", path: "/what-we-do#it-practice", state: { scrollToCard: 1 } },
            { label: "Cloud Infrastructure, Data & Analytics", path: "/what-we-do#it-practice", state: { scrollToCard: 2 } },
            { label: "Graphics Designing & Video Editing", path: "/what-we-do#it-practice", state: { scrollToCard: 3 } },
            { label: "Social Media, SEO & Generative Search", path: "/what-we-do#it-practice", state: { scrollToCard: 4 } },
            { label: "Meta Ads & Google Ads", path: "/what-we-do#it-practice", state: { scrollToCard: 5 } },
          ]
        },
        {
          title: "GIS Services",
          links: [
            { label: "Mapping Applications & Portals", path: "/what-we-do#gis-practice", state: { scrollToCard: 0 } },
            { label: "Satellite Imagery & LULC", path: "/what-we-do#gis-practice", state: { scrollToCard: 1 } },
            { label: "Drone Mapping & Photogrammetry", path: "/what-we-do#gis-practice", state: { scrollToCard: 2 } },
            { label: "Databases, Assets & Consulting", path: "/what-we-do#gis-practice", state: { scrollToCard: 3 } },
          ]
        },
        {
          title: "Expertise",
          links: [
            { label: "IT Practice", path: "/what-we-do#it-practice" },
            { label: "GIS Practice", path: "/what-we-do#gis-practice" },
            { label: "How We Work", path: "/what-we-do#how-we-work" },
          ]
        }
      ],
      featured: {
        tag: "Solutions",
        title: "Explore our comprehensive IT & GIS solutions",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        path: "/",
        state: { scrollTo: "solutions" }
      }
    },
    "Careers": {
      columns: [
        {
          title: "Discover",
          links: [
            { label: "Overview", path: "/find-teams#overview" },
            { label: "Culture", path: "/find-teams#culture" },
          ]
        },
        {
          title: "Perks",
          links: [
            { label: "Our Values", path: "/find-teams#values" },
            { label: "Benefits", path: "/find-teams#benefits" },
          ]
        }
      ],
      featured: {
        tag: "Join Us",
        title: "Explore our open roles and find your perfect team",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        path: "/find-teams#teams-section"
      }
    }
  };

  return (
    <div 
      className={`sticky top-0 z-[999] w-full flex justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        isHidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <nav 
        ref={navRef} 
        className={`pointer-events-auto relative flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? "mt-4 w-[95%] md:w-[85%] max-w-5xl dark:bg-[#0B1120]/95 bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]  border-white/10 dark:border-gray-200/60 px-5 md:px-8 py-2.5 rounded-[2rem]"
            : `mt-0 w-full backdrop-blur-md md:dark:bg-[#0B1120] md:bg-white md:backdrop-blur-none  md:border-white/10 md:dark:border-gray-100 px-6 md:px-8 py-4 ${isMobileMenuOpen ? "dark:bg-[#0B1120]/95 bg-white/95 dark:border-white/10 border-gray-200" : "bg-transparent rounded-none border-transparent"}`
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
            {item.label === 'Our Story' ? (
              <a
                href={"https://drive.google.com/file/d/1PjX4z6lYOpA7a5AZqZwWbyzwmLf3CH-6/view"}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-gray-300 text-[#5e6673] dark:hover:text-white hover:text-black font-semibold text-sm tracking-wide transition-colors font-jetbrains"
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.path}
                className="dark:text-gray-300 text-[#5e6673] dark:hover:text-white hover:text-black font-semibold text-sm tracking-wide transition-colors font-jetbrains"
              >
                {item.label}
              </Link>
            )}

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeDropdown === item.label && megaMenuData[item.label] && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 ${
                    megaMenuData[item.label].columns.length > 2 ? "w-[1100px] max-w-[95vw]" : "w-[650px]"
                  } bg-[#0B1120] dark:bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/10 dark:border-gray-100 overflow-hidden flex`}
                  style={{ cursor: "default" }}
                >
                  {/* Left Side: Columns */}
                  <div className={`${
                    megaMenuData[item.label].columns.length > 2 ? "w-[75%] grid-cols-[1.6fr_1.3fr_0.9fr] gap-6" : "w-[55%] grid-cols-2 gap-8"
                  } p-8 grid bg-[#0B1120] dark:bg-white`}>
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
                                state={link.state}
                                className="font-inter text-[14px] text-gray-400 dark:text-[#6b7280] hover:text-white dark:hover:text-[#0a181c] transition-colors block leading-tight whitespace-nowrap"
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
                  <div className={`${megaMenuData[item.label].columns.length > 2 ? "w-[25%]" : "w-[45%]"} relative group`}>
                    {megaMenuData[item.label].featured.path === "/portfolio" ? (
                      <a href={"https://drive.google.com/file/d/1PjX4z6lYOpA7a5AZqZwWbyzwmLf3CH-6/view"} target="_blank" rel="noopener noreferrer" onClick={() => setActiveDropdown(null)} className="block w-full h-full">
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
                      </a>
                    ) : (
                      <Link 
                        to={megaMenuData[item.label].featured.path} 
                        state={megaMenuData[item.label].featured.state}
                        onClick={() => setActiveDropdown(null)} 
                        className="block w-full h-full"
                      >
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
                    )}
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
          className={`px-5 py-2 border border-[#9c7a65] dark:hover:border-white hover:border-[#0a181c] text-[#9c7a65] dark:hover:bg-white hover:bg-[#0a181c] dark:hover:text-[#0B1120] hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-semibold text-sm tracking-wide font-jetbrains ${isScrolled ? "rounded-[2rem]" : "rounded-md"}`}
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
              ? "text-[#0a181c]"
              : "text-[#0a181c]"
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
            className={`absolute left-0 w-full flex flex-col gap-6 md:hidden overflow-hidden bg-[#0B1120]/95 dark:bg-white/95 backdrop-blur-xl px-6 pb-6 pt-4 shadow-2xl ${
              isScrolled
                ? "top-[calc(100%+12px)] rounded-2xl border border-white/10 dark:border-gray-200/60"
                : "top-full rounded-none border-b border-white/10 dark:border-gray-200"
            }`}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                item.label === 'Portfolio' ? (
                  <a
                    key={item.label}
                    href={"https://drive.google.com/file/d/1PjX4z6lYOpA7a5AZqZwWbyzwmLf3CH-6/view"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMenu}
                    className="text-white dark:text-[#0a181c] hover:text-[#6a71d8] font-medium text-lg tracking-wide transition-colors font-jetbrains pb-2"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={toggleMenu}
                    className="text-white dark:text-[#0a181c] hover:text-[#6a71d8] font-medium text-lg tracking-wide transition-colors font-jetbrains pb-2"
                  >
                    {item.label}
                  </Link>
                )
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
