import responsiveGif from "../assets/responsive.gif";
import appGif from "../assets/app.gif";
import cloudGif from "../assets/cloud.gif";
import databaseGif from "../assets/database.gif";
import seoGif from "../assets/seo.gif";
import campaignGif from "../assets/campaign.gif";

import wayGif from "../assets/way.gif";
import satelliteGif from "../assets/satellite.gif";
import droneGif from "../assets/drone.gif";
import mapsGif from "../assets/maps.gif";

export const itCardsData = [
  {
    id: 1,
    category: "ENGINEERING",
    icon: <img src={responsiveGif} alt="Custom Software & Web Platforms" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    title: "Custom Software & Web Platforms",
    description:
      "Product-grade web platforms, ERP and internal tools built to fit the way your business actually operates.",
    features: [
      "Web apps & portals",
      "API & system integration",
      "ERP / CRM systems",
      "Legacy modernisation",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"],
  },
  {
    id: 2,
    category: "MOBILE",
    icon: <img src={appGif} alt="iOS & Android Applications" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    title: "iOS & Android Applications",
    description:
      "Offline-first, cross platform apps that stay fast and reliable in the field as well as on the shop floor.",
    features: [
      "React Native & Flutter",
      "Offline-first sync",
      "Field data capture",
      "App Store delivery",
    ],
    tech: ["React", "Flutter", "Kotlin", "Node.js", "Swift", "Firebase"],
  },
  {
    id: 3,
    category: "CLOUD",
    icon: <img src={cloudGif} alt="Cloud Infrastructure" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    title: "Cloud Infrastructure",
    description:
      "Scalable and secure cloud environments tailored to support your growing digital ecosystem.",
    features: [
      "AWS & Azure",
      "Cloud Migration",
      "DevOps & CI/CD",
      "Security & Compliance",
    ],
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"],
  },
  {
    id: 4,
    category: "DATA",
    icon: <img src={databaseGif} alt="Data & Analytics" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    title: "Data & Analytics",
    description:
      "Actionable insights through robust data pipelines, analytics dashboards, and business intelligence.",
    features: [
      "Data Engineering",
      "PowerBI & Tableau",
      "Predictive Analytics",
      "Data Warehousing",
    ],
    tech: ["Python", "SQL", "Snowflake", "PowerBI", "Tableau"],
  },
  {
    id: 5,
    category: "SEARCH & CONTENT",
    icon: <img src={seoGif} alt="CMS, SEO & Generative Search" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    title: "CMS, SEO & Generative Search",
    description:
      "Advanced content management and holistic search strategies, covering traditional SEO, GEO, and AEO to dominate search visibility.",
    features: [
      "SEO & Technical Audits",
      "GEO & AI Search Optimization",
      "AEO & Voice Search",
      "Headless CMS Integration",
    ],
    tech: ["WordPress", "Shopify", "Ahrefs", "OpenAI", "Google Analytics"],
  },
  {
    id: 6,
    category: "CAMPAIGNS",
    icon: <img src={campaignGif} alt="Meta Ads & Virtual Campaigns" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    title: "Meta Ads & Virtual Campaigns",
    description:
      "Data-driven ad campaigns and immersive virtual experiences that maximize reach, engagement, and conversion.",
    features: [
      "Meta Ads Management",
      "Virtual Campaign Strategy",
      "Conversion Tracking",
      "A/B Testing & Analytics",
    ],
    tech: ["Meta", "Google Ads", "HubSpot", "Google Analytics"],
  },
];

export const gisCardsData = [
  {
    id: 1,
    category: "WEB GIS",
    icon: <img src={wayGif} alt="Mapping Applications & Portals" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
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
    icon: <img src={satelliteGif} alt="Satellite Imagery & LULC" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=800&q=80",
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
    icon: <img src={droneGif} alt="Drone Mapping & Photogrammetry" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
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
    icon: <img src={databaseGif} alt="Databases, Assets & Consulting" className="w-16 h-16 object-contain rounded-xl" />,
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
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