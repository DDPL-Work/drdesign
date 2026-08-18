import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" x2="22" y1="12" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SatelliteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M13 7 9 3 5 7l4 4"></path>
    <path d="m17 11 4 4-4 4-4-4"></path>
    <path d="m8 12 4 4 6-6-4-4Z"></path>
    <path d="m16 8 3-3"></path>
    <path d="M9 21a6 6 0 0 0-6-6"></path>
  </svg>
);

const DroneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const getTechLogoUrl = (tech) => {
  const logos = {
    React: "https://cdn.simpleicons.org/react",
    "Next.js": "https://cdn.simpleicons.org/nextdotjs",
    TypeScript: "https://cdn.simpleicons.org/typescript",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs",
    Python: "https://cdn.simpleicons.org/python",
    PostgreSQL: "https://cdn.simpleicons.org/postgresql",
    Flutter: "https://cdn.simpleicons.org/flutter",
    Kotlin: "https://cdn.simpleicons.org/kotlin",
    Swift: "https://cdn.simpleicons.org/swift",
    Firebase: "https://cdn.simpleicons.org/firebase",
    AWS: "https://cdn.simpleicons.org/amazonaws",
    Docker: "https://cdn.simpleicons.org/docker",
    Kubernetes: "https://cdn.simpleicons.org/kubernetes",
    Terraform: "https://cdn.simpleicons.org/terraform",
    Linux: "https://cdn.simpleicons.org/linux",
    SQL: "https://cdn.simpleicons.org/mysql",
    Snowflake: "https://cdn.simpleicons.org/snowflake",
    PowerBI: "https://cdn.simpleicons.org/powerbi",
    Tableau: "https://cdn.simpleicons.org/tableau",
    // GIS Specific Tech
    MapLibre: "https://cdn.simpleicons.org/maplibre",
    Leaflet: "https://cdn.simpleicons.org/leaflet",
    QGIS: "https://cdn.simpleicons.org/qgis",
    PostGIS: "https://cdn.simpleicons.org/postgresql",
    OpenStreetMap: "https://cdn.simpleicons.org/openstreetmap",
    GDAL: "https://cdn.simpleicons.org/osgeo",
    NumPy: "https://cdn.simpleicons.org/numpy",
    Jupyter: "https://cdn.simpleicons.org/jupyter",
    "Google Earth": "https://cdn.simpleicons.org/googleearth",
    Blender: "https://cdn.simpleicons.org/blender",
    Cesium: "https://cdn.simpleicons.org/cesium",
    FastAPI: "https://cdn.simpleicons.org/fastapi",
    Redis: "https://cdn.simpleicons.org/redis",
  };
  return logos[tech];
};

const cardsData = [
  {
    id: 1,
    category: "WEB GIS",
    icon: <GlobeIcon />,
    title: "Mapping Applications & Portals",
    description:
      "Browser-based mapping platforms with layered analytics, drawing tools and report-ready exports.",
    features: [
      "Interactive web maps",
      "Spatial dashboards",
      "Custom map tooling",
      "Public data portals",
    ],
    tech: [
      "MapLibre",
      "Leaflet",
      "QGIS",
      "PostGIS",
      "PostgreSQL",
      "OpenStreetMap",
    ],
  },
  {
    id: 2,
    category: "REMOTE SENSING",
    icon: <SatelliteIcon />,
    title: "Satellite Imagery & LULC",
    description:
      "Imagery processing, classification and change detection for planning, environment and resource monitoring.",
    features: [
      "Image classification",
      "Land use / land cover",
      "Change detection",
      "NDVI & crop analysis",
    ],
    tech: ["Python", "GDAL", "NumPy", "Jupyter", "QGIS", "Google Earth"],
  },
  {
    id: 3,
    category: "SURVEY",
    icon: <DroneIcon />,
    title: "Drone Mapping & Photogrammetry",
    description:
      "High-resolution aerial capture converted into orthomosaics, DEMs and survey-grade deliverables.",
    features: [
      "UAV survey & flight planning",
      "Orth mosaic & DEM",
      "Topographic mapping",
      "Volumetrics",
    ],
    tech: ["QGIS", "Python", "GDAL", "Blender", "Cesium", "PostgreSQL"],
  },
  {
    id: 4,
    category: "SPATIAL DATA",
    icon: <DatabaseIcon />,
    title: "Databases, Assets & Consulting",
    description:
      "Clean, versioned spatial databases plus asset mapping, migration and team training on GIS workflows.",
    features: [
      "PostGIS databases",
      "Utility & asset mapping",
      "Data conversion & QA",
      "GIS consulting & training",
    ],
    tech: ["PostgreSQL", "PostGIS", "QGIS", "Python", "FastAPI", "Redis"],
  },
];

// ─── Shared animation variants ────────────────────────────────────────────────
// Row wrapper — both cards animate together when the row enters the DOM
const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

// Smooth x slide — cubic-bezier easeOutQuart, no flash
const cardVariantLeft = {
  hidden: { opacity: 0, x: -800 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariantRight = {
  hidden: { opacity: 0, x: 800 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const GISPractice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardCls =
    "w-full h-auto lg:h-[476px] flex flex-col border border-[#E2E8F0] dark:border-white/10 rounded-[24px] p-6 lg:p-10 bg-gray-400/20 dark:bg-white/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group";

  const renderInner = (card) => (
    <>
      <div className="flex justify-between items-start mb-5 lg:mb-8">
        <div className="w-12 h-12 bg-[#0B101E] rounded-2xl flex items-center justify-center text-white">
          <div className="group-hover:scale-155 group-hover:rotate-5 transition-transform">{card.icon}</div>
        </div>
        <span className="text-[10px] font-normal font-inter text-gray-400 tracking-[0.2em] uppercase mt-1">{card.category}</span>
      </div>
      <h3 className="text-[22px] lg:text-[24px] font-jetbrains font-bold text-gray-900 dark:text-white mb-3 lg:mb-4 leading-[1.3]">{card.title}</h3>
      <p className="text-[#64748B] mb-5 lg:mb-8 font-inter font-normal leading-[1.6] text-[14px] pr-2">{card.description}</p>
      <div className="grid grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-4 mb-5 lg:mb-8">
        {card.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] flex-shrink-0"></div>
            <span className="text-[13px] lg:text-[14px] text-[#334155] dark:text-gray-300 font-geist font-normal">{feature}</span>
          </div>
        ))}
      </div>
      <hr className="border-[#E2E8F0] dark:border-white/10 mb-4 lg:mb-6 mt-auto" />
      <div>
        <h4 className="text-[10px] font-normal font-inter text-gray-400 tracking-[0.2em] uppercase mb-3 lg:mb-4">TECH WE USE</h4>
        <div className="flex flex-wrap gap-2.5">
          {card.tech.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5 bg-white dark:bg-[#1E293B]">
              {getTechLogoUrl(tech) ? (
                <img src={getTechLogoUrl(tech)} alt={`${tech} logo`} className="w-3.5 h-3.5 object-contain" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              )}
              <span className="text-[12px] font-normal text-[#475569] dark:text-gray-300 font-inter leading-none">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section id="gis-practice" className="bg-white dark:bg-[#0B1120] overflow-hidden">
      <div className="container mx-auto px-6 md:px-[57px]">
        {/* ── Header Section */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            className="flex items-center gap-5 text-[11px] text-[#64748B] font-semibold tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span>02 /</span>
            <span className="w-16 h-[1px] bg-[#CBD5E1] dark:bg-[#334155]"></span>
            <span>GIS PRACTICE</span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-[40px] font-jetbrains font-bold text-[#0B101E] dark:text-white leading-[1.1] m-0">
                Geospatial &amp; Location<br />Intelligence
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-[18px] text-[#64748B] leading-[1.7] font-inter m-0 pr-4">
                Mapping, imagery and spatial data services used by planning authorities,
                utilities and enterprises to make decisions grounded in place.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE: cards animate like hero image */}
        {isMobile && (
          <div className="flex flex-col gap-6 overflow-hidden pb-4">
            {cardsData.map((card) => (
              <motion.div
                 key={card.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className={cardCls}
              >
                {renderInner(card)}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── DESKTOP: Row 1 & Row 2 with left / right slide */}
        {!isMobile && (
          <>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-[72px] mb-8 xl:mb-[72px]"
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {cardsData.slice(0, 2).map((card, index) => (
                <motion.div key={card.id} variants={index === 0 ? cardVariantLeft : cardVariantRight} className={cardCls}>
                  {renderInner(card)}
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-[72px]"
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {cardsData.slice(2, 4).map((card, index) => (
                <motion.div key={card.id} variants={index === 0 ? cardVariantLeft : cardVariantRight} className={cardCls}>
                  {renderInner(card)}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

      </div>
    </section>
  );
};

export default GISPractice;
