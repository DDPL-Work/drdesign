import React, { useEffect, useState } from "react";
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
          className="font-jetbrains text-white text-3xl md:text-5xl font-medium tracking-wide flex"
        >
          {text.split("").map((char, i) => (
            <motion.span key={i} variants={charVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </motion.section>
  );
};

const Details = ({ title, description, image, projectOverview }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-10 bg-white"
    >
      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
          <div className="lg:col-span-7">
            <img
              src={image || imgProject}
              alt="Project Overview"
              className="w-full h-auto rounded-[24px] md:rounded-[32px] object-cover"
            />
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
  const [selectedImage, setSelectedImage] = useState(null);

  const defaultImages = [img1, imge2, img3];
  const images = galleryImages || defaultImages;
  // Duplicate array multiple times for a seamless infinite scroll loop
  const repeatedImages = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pb-10 bg-white overflow-hidden relative"
    >
      <style>{`
        @keyframes gallery-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-gallery-marquee {
          display: flex;
          width: max-content;
          animation: gallery-marquee 65s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>

      <div className="w-full mx-auto px-4 md:px-12 lg:px-16 xl:px-24 flex flex-col mb-8">
        <h2 className="font-jetbrains font-medium text-[#0A1118] text-[28px] md:text-[32px]">
          Project Galley
        </h2>
      </div>

      <div className="w-full relative overflow-hidden flex items-start">
        <div className="animate-gallery-marquee hover:[animation-play-state:paused]">
          {repeatedImages.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(src)}
              className={`shrink-0 mx-4 md:mx-8 rounded-2xl md:rounded-[20px] overflow-hidden bg-transparent flex items-start justify-center cursor-pointer ${
                isMobileApp
                  ? "h-[60vh] md:h-[600px] w-auto"
                  : isGisApp
                    ? "w-[85vw] md:w-[600px] h-auto"
                    : "w-[85vw] md:w-[450px] h-auto"
              }`}
            >
              <img
                src={src}
                alt={`Project screen ${index + 1}`}
                loading="lazy"
                decoding="async"
                className={`transition-transform duration-500 ${
                  isMobileApp
                    ? "h-full w-auto object-contain"
                    : "w-full h-auto object-contain"
                }`}
              />
            </div>
          ))}
        </div>
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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
      />
      <ProjectInfo infoItems={infoItems} />
      <CoreStacks coreStacks={coreStacks} />
      <ProjectGalley
        galleryImages={galleryImages}
        isMobileApp={slug === "mobile-app-development"}
        isGisApp={slug === "gis-&-spatial-data"}
      />
      <CTA />
    </main>
  );
};

export default CaseStudyDetails;
