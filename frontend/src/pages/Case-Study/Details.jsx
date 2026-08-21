import React, { useEffect, useState, useRef } from "react";
import { solutionsData } from "../../components/homePage/Solutions";
import { Link, useParams } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import heroGradient from "../../assets/detailsHero.avif";
import heroImg from "../../assets/heroImg.webp";
import imgProject from "../../assets/imgProject.avif";
import img1 from "../../assets/img1.avif";
import imge2 from "../../assets/imge2.avif";
import img3 from "../../assets/img3.avif";
import {
  FaRegUser,
  FaMapMarkerAlt,
  FaCube,
  FaHistory,
  FaAws,
  FaNodeJs,
} from "react-icons/fa";
import { SiPostgresql, SiNextdotjs } from "react-icons/si";
import CTA from "../../components/homePage/CTA";
import { motion, AnimatePresence } from "framer-motion";
import { projectDetailsData } from "../../constants/projectDetails";

const Hero = ({ title, image }) => {
  const text = title || "Project Details";
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
      className="relative w-full h-[220px] md:h-[280px] overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        {/* Background photo */}
        <img
          src={image || heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <img
          src={heroGradient}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Light white gradient sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/30 to-white/5 pointer-events-none" />
      </motion.div>
      {/* Centered title */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-jetbrains text-white text-2xl sm:text-3xl md:text-5xl font-medium tracking-wide flex flex-wrap justify-center text-center px-4 gap-x-[0.3em] gap-y-1 md:gap-y-2"
        >
          {text.split(" ").map((word, wIdx) => (
            <span key={wIdx} className="inline-flex">
              {word.split("").map((char, cIdx) => (
                <motion.span key={cIdx} variants={charVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>
    </motion.section>
  );
};

const Details = ({ title, description, image, projectOverview, slug, galleryImages }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-10 bg-white"
    >
      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
          {/* Left Column - Text */}
          <div className="lg:col-span-5 flex flex-col xl:pr-8">
            <h2 className="font-jetbrains text-[32px] md:text-[44px] lg:text-[48px] leading-[1.15] font-medium text-[#0A1118] mb-6">
              {title || "Enterprise Resource Planning System"}
            </h2>
            <p className="font-inter text-[15px] md:text-[16px] text-[#60738a] leading-[1.7] mb-10">
              {description ||
                "A unified ERP replacing five disconnected legacy tools — bringing finance, inventory, procurement, and production planning into a single real-time platform used across four plants."}
            </p>

            <h3 className="font-jetbrains text-[22px] md:text-[26px] font-medium text-[#0A1118] mb-4">
              Project Overview
            </h3>
            <p className="font-inter text-[14px] md:text-[15px] text-[#60738a] leading-[1.7]">
              {projectOverview ||
                "Platea In dictumst hac habitasse aute velit Duis in esse irure nulla dolor voluptate pariatur fugiat reprehenderit eu cillum in dolore Sed magna aliqua dolore eiusmod labore tempor et do ut incididunt malesuada massa Maecenas erat at congue Praesent leo."}
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-7 relative w-full h-full min-h-[300px]">
            {slug === "mobile-app-development" && galleryImages?.length >= 3 ? (
              <div className="relative lg:absolute lg:inset-0 lg:h-full w-full aspect-[4/3] lg:aspect-auto my-15 sm:my-0 flex items-center justify-center">
                <img
                  src={galleryImages[0]}
                  alt="App Screen 1"
                  className="absolute w-[45%] md:w-[40%] lg:w-auto lg:h-[90%] rounded-[24px] shadow-2xl -rotate-12 -translate-x-16 md:-translate-x-24 z-10 object-contain"
                />
                <img
                  src={galleryImages[1]}
                  alt="App Screen 2"
                  className="absolute w-[50%] md:w-[45%] lg:w-auto lg:h-[100%] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-30 object-contain"
                />
                <img
                  src={galleryImages[2]}
                  alt="App Screen 3"
                  className="absolute w-[45%] md:w-[40%] lg:w-auto lg:h-[90%] rounded-[24px] shadow-2xl rotate-12 translate-x-16 md:translate-x-24 z-20 object-contain"
                />
              </div>
            ) : (
              <img
                src={image || imgProject}
                alt="Project Overview"
                className="relative lg:absolute lg:top-0 lg:right-0 w-full lg:w-auto h-auto lg:h-full rounded-[24px] md:rounded-[32px] object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ProjectInfo = ({ infoItems }) => {
  const defaultItems = [
    {
      icon: FaRegUser,
      title: "Client",
      des: "Confidential Manufacturing Group",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      des: "Pune, India",
    },
    {
      icon: FaCube,
      title: "Sector",
      des: "Manufacturing",
    },
    {
      icon: FaHistory,
      title: "Duration",
      des: "7 months",
    },
  ];

  const items = infoItems || defaultItems;
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pb-20 bg-white"
    >
      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24 flex flex-col">
        <h2 className="font-jetbrains font-medium text-[#0A1118] text-[28px] md:text-[32px] mb-8">
          Project Info
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#e2e9e8] rounded-[16px] flex flex-col items-center justify-start py-8 md:py-10 px-4 text-center transition-transform hover:-translate-y-1 duration-300 h-full"
              >
                <div className="w-[52px] h-[52px] bg-[#00a8e8] rounded-full flex items-center justify-center text-white text-[22px] mb-4 md:mb-6 shadow-sm shrink-0">
                  <Icon />
                </div>
                <h4 className="font-jetbrains text-[#60738a] text-[13px] md:text-[14px] mb-2">
                  {item.title}
                </h4>
                <p className="font-inter text-[#0a181c] font-medium text-[14px] md:text-[15px] leading-tight">
                  {item.des}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

const CoreStacks = ({ coreStacks }) => {
  if (coreStacks && coreStacks.length === 0) {
    return null;
  }

  const defaultIcons = [
    { Icon: SiPostgresql, color: "#336791" },
    { Icon: FaAws, color: "#f99000" },
    { Icon: SiNextdotjs, color: "#111111" },
    { Icon: FaNodeJs, color: "#339933" },
  ];

  const icons = coreStacks || defaultIcons;

  // Repeat icons to ensure a smooth, seamless infinite scroll
  const repeatedIcons = [
    ...icons,
    ...icons,
    ...icons,
    ...icons,
    ...icons,
    ...icons,
    ...icons,
    ...icons,
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pb-20 bg-white overflow-hidden relative"
    >
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 65s linear infinite;
            will-change: transform;
            transform: translateZ(0);
          }
        `}
      </style>
      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24 flex flex-col mb-8">
        <h2 className="font-jetbrains font-medium text-[#0A1118] text-[28px] md:text-[32px]">
          Core Stacks
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative overflow-hidden flex items-center">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee hover:[animation-play-state:paused]">
          {repeatedIcons.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div
                key={index}
                className="shrink-0 mx-8 flex items-center justify-center grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
              >
                <Icon
                  className="text-[40px] md:text-[48px]"
                  style={{ color: item.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
const ProjectGalley = ({ galleryImages, isMobileApp, isGisApp }) => {
  const defaultImages = [img1, imge2, img3];
  const images = galleryImages || defaultImages;
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Track the order of the cards. The middle index of this array is the focused card.
  const [cardOrder, setCardOrder] = useState(() => images.map((_, i) => i));

  // Sync state when navigating between different projects
  useEffect(() => {
    setCardOrder(images.map((_, i) => i));
  }, [galleryImages]);

  const centerPos = Math.floor(images.length / 2);
  const focusedIndex = cardOrder[centerPos];

  const cycleOrderLeft = () => {
    setCardOrder((prev) => {
      const next = [...prev];
      const first = next.shift();
      next.push(first);
      return next;
    });
  };

  const cycleOrderRight = () => {
    setCardOrder((prev) => {
      const next = [...prev];
      const last = next.pop();
      next.unshift(last);
      return next;
    });
  };

  const handleImageClick = (src, originalIndex) => {
    if (focusedIndex === originalIndex) {
      setSelectedImage(src);
    } else {
      // Find where it is in the current order, and cycle until it's centered
      const currentPos = cardOrder.indexOf(originalIndex);
      const diff = currentPos - centerPos;
      
      setCardOrder((prev) => {
        let next = [...prev];
        if (diff > 0) {
           for (let i = 0; i < diff; i++) {
             const first = next.shift();
             next.push(first);
           }
        } else if (diff < 0) {
           for (let i = 0; i < -diff; i++) {
             const last = next.pop();
             next.unshift(last);
           }
        }
        return next;
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pb-10 bg-white overflow-hidden relative"
    >
      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24 flex flex-col mb-8">
        <h2 className="font-jetbrains font-medium text-[#0A1118] text-[28px] md:text-[32px]">
          Project Galley
        </h2>
      </div>

      <div className="w-full grid place-items-center py-12 md:py-20 overflow-visible">
        {images.map((src, index) => {
          const currentPos = cardOrder.indexOf(index);
          const isFocused = currentPos === centerPos;
          
          let progress = 0;
          if (images.length > 1) {
             progress = currentPos / (images.length - 1);
          }
          
          const angle = -15 + (progress * 30);
          
          return (
            <motion.div
              key={index}
              onClick={() => handleImageClick(src, index)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  cycleOrderLeft();
                } else if (info.offset.x > swipeThreshold) {
                  cycleOrderRight();
                }
              }}
              animate={{
                zIndex: isFocused ? 50 : currentPos + 10,
                x: `calc(${progress * 2 - 1} * clamp(80px, 20vw, 300px))`,
                rotate: angle,
                scale: isFocused ? 1.05 : 1,
                boxShadow: isFocused ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`col-start-1 row-start-1 cursor-pointer rounded-2xl md:rounded-[24px] overflow-hidden flex items-start justify-center bg-transparent ${
                isMobileApp
                  ? "h-[350px] md:h-[650px] w-auto"
                  : isGisApp
                    ? "w-[280px] md:w-[700px] h-auto"
                    : "w-[280px] md:w-[550px] h-auto"
              }`}
            >
              <img
                src={src}
                alt={`Project screen ${index + 1}`}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${
                  isMobileApp ? "object-contain" : "object-cover"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10000000 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 text-4xl font-light z-[110] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              &times;
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Full screen preview" 
              className="max-w-full max-h-full rounded-[16px] shadow-2xl object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const CaseStudyDetails = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [slug]);

  // Format slug to readable title (e.g., "enterprise-resource-planning-system" -> "Enterprise Resource Planning System")
  const formatTitle = (slugStr) => {
    if (!slugStr) return "Project Details";
    return slugStr
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedTitle = formatTitle(slug);

  const project = solutionsData.find(
    (item) => item.title.toLowerCase().replace(/[\s/]+/g, "-") === slug,
  );

  // Traveamer specific overrides (and others defined in constants)
  const detailsOverride = projectDetailsData[slug] || {};
  const title =
    detailsOverride.title || (project ? project.title : formattedTitle);
  const description =
    detailsOverride.description || (project ? project.description : null);
  const image = detailsOverride.image || (project ? project.image : null);

  const projectOverview = detailsOverride.projectOverview || null;
  const infoItems = detailsOverride.infoItems || null;
  const galleryImages = detailsOverride.galleryImages || null;
  const coreStacks = detailsOverride.coreStacks || null;

  return (
    <main>
      {/* Breadcrumb */}
      <div className="w-full py-3.5 border-b border-gray-100">
        <div className="max-w-[1300px] ml-7  flex items-center gap-2 font-inter text-[13px] text-[#b7babf]">
          <Link
            to="/"
            className="hover:text-[#0a181c] transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-[#6b7280]/40 select-none">/</span>
          <Link
            to="/"
            state={{ scrollTo: "solutions" }}
            className="hover:text-[#0a181c] transition-colors duration-200"
          >
            Project
          </Link>
          <span className="text-[#6b7280]/40 select-none">/</span>
          <span className="text-[#2f3130] font-medium">{title}</span>
        </div>
      </div>
      <Hero title={project ? project.title : formattedTitle} image={project ? project.image : null} />
      <Details
        title={title}
        description={description}
        image={image}
        projectOverview={projectOverview}
        slug={slug}
        galleryImages={galleryImages}
      />
      <ProjectInfo infoItems={infoItems} />
      <CoreStacks coreStacks={coreStacks} />
      <ProjectGalley
        galleryImages={galleryImages}
        isMobileApp={slug === "mobile-app-development" || slug === "social-media-marketing"}
        isGisApp={slug === "gis-&-spatial-data"}
      />
      <CTA />
    </main>
  );
};

export default CaseStudyDetails;
