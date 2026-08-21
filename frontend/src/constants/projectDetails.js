import {
  FaRegUser,
  FaMapMarkerAlt,
  FaCube,
  FaHistory,
  FaCogs,
  FaBrain,
  FaGlobe,
  FaLayerGroup,
  FaServer,
  FaBoxOpen,
  FaWindows,
  FaPaintBrush
} from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiRedis,
  SiTailwindcss,
  SiFlutter,
  SiFirebase,
  SiJsonwebtokens,
  SiCloudinary,
  SiPython,
  SiDjango,
  SiPytorch,
  SiOpencv,
  SiCelery,
  SiPostgresql,
  SiJavascript,
  SiNvidia,
  SiSqlite,
  SiNumpy,
  SiTensorflow,
  SiFramer,
  SiFigma,
  SiGooglefonts,
  SiMeta,
  SiGoogle
} from "react-icons/si";
import C1 from "../assets/Projects/C-1.png";
import C2 from "../assets/Projects/C-2.png";
import C3 from "../assets/Projects/C-3.png";
import C4 from "../assets/Projects/C-4.png";
import C5 from "../assets/Projects/C-5.png";
import T1 from "../assets/Projects/T-1.png";
import T2 from "../assets/Projects/T-2.png";
import T3 from "../assets/Projects/T-3.png";
import T4 from "../assets/Projects/T-4.png";
import T5 from "../assets/Projects/T-5.png";
import T6 from "../assets/Projects/T-6.png";
import T7 from "../assets/Projects/T-7.png";
import T8 from "../assets/Projects/T-8.png";
import T9 from "../assets/Projects/T-9.png";
import SOI1 from "../assets/Projects/SOI-1.png";
import SOI2 from "../assets/Projects/SOI-2.png";
import SOI3 from "../assets/Projects/SOI-3.png";
import SOI4 from "../assets/Projects/SOI-4.png";
import SOI5 from "../assets/Projects/SOI-5.png";
import TP1 from "../assets/Projects/TP-1.jpg";
import TP2 from "../assets/Projects/TP-2.jpg";
import TP3 from "../assets/Projects/TP-3.jpg";
import TP4 from "../assets/Projects/TP-4.jpg";
import TP5 from "../assets/Projects/TP-5.jpg";
import TP6 from "../assets/Projects/TP-6.jpg";
import TP7 from "../assets/Projects/TP-7.jpg";
import TP8 from "../assets/Projects/TP-8.jpg";
import TP9 from "../assets/Projects/TP-9.jpg";
import TP10 from "../assets/Projects/TP-10.jpg";
import TP11 from "../assets/Projects/TP-11.jpg";
import GIS1 from "../assets/Projects/GIS-1.png";
import GIS2 from "../assets/Projects/GIS-2.jpeg";
import GIS3 from "../assets/Projects/GIS-3.jpeg";
import GIS4 from "../assets/Projects/GIS-4.png";
import GIS5 from "../assets/Projects/GIS-5.png";
import GIS6 from "../assets/Projects/GIS-6.png";
import GIS7 from "../assets/Projects/GIS-7.png";
import SEO1 from "../assets/Projects/SEO-1.PNG";
import SEO2 from "../assets/Projects/SEO-2.PNG";
import SEO3 from "../assets/Projects/SEO-3.PNG";
import SEO4 from "../assets/Projects/SEO-4.PNG";
import SEO5 from "../assets/Projects/SEO-5.PNG";
import SMF1 from "../assets/Projects/SMF-1.jpeg";
import SMF2 from "../assets/Projects/SMF-2.jpeg";
import SMF3 from "../assets/Projects/SMF-3.jpeg";
import SMF4 from "../assets/Projects/SMF-4.jpeg";
import SMF5 from "../assets/Projects/SMF-5.jpeg";
import SMF6 from "../assets/Projects/SMF-6.jpeg";

export const projectDetailsData = {
  "web-platform-development": {
    image: T1,
    title: "Traveamer",
    description: "An exclusive corporate travel desk platform streamlining flight and hotel bookings, automated manager approvals, and comprehensive expense tracking.",
    projectOverview: "Traveamer is a robust B2B corporate travel desk built to streamline flight and hotel bookings for MSMEs and corporate teams. Engineered to eliminate manual coordination, the platform features a powerful 'Search, Select, Approve, Book' automated workflow that takes an employee from search to a confirmed PNR in under 60 seconds. It replaces tedious email-based permissions with an intelligent, role-based architecture where travel admins configure booking rights, limits, and preferences just once. Employees instantly generate booking requests with auto-suggested Project Cost IDs, which route directly to managers for seamless one-click approvals via Email or WhatsApp. With Single Sign-On (SSO) integrations and automated GST invoicing, Traveamer provides organizations with clear, centralized tracking of all travel and stay expenses.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Traveamer Array Pvt Limited",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "Janakpuri, New Delhi",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: " Web Platform Development",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Deployed & Active",
      },
    ],
    galleryImages: [T1, T2, T3, T4, T5, T6, T7, T8, T9],
    coreStacks: [
      { Icon: SiReact, color: "#61DAFB" },
      { Icon: SiNodedotjs, color: "#339933" },
      { Icon: SiMongodb, color: "#47A248" },
      { Icon: SiExpress, color: "#000000" },
      { Icon: SiRedis, color: "#DC382D" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
      { Icon: SiJsonwebtokens, color: "#000000" },
      { Icon: SiCloudinary, color: "#3448C5" },
    ]
  },
  "mobile-app-development": {
    image: TP1,
    title: "Tapoori Talk",
    description: "Real-time audio & video streaming social platform built for interactive community hangouts, live voice chatrooms, virtual gifting, and seamless peer-to-peer engagement.",
    projectOverview: "Tapoori Talk is a next-generation social entertainment and live streaming app engineered to connect communities across the globe. Built with Flutter, Agora RTC, and Firebase, the platform delivers high-performance multi-seat voice rooms, live broadcasting, interactive mini-games, and gamified virtual economy systems including animated gifts, VIP ranks, and social feeds. Designed for scale and low-latency interaction, it provides users with an immersive space to meet, talk, and build vibrant digital communities.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Tapoori Talk",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "Global",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: " Mobile App Development",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Deployed & Active",
      },
    ],
    coreStacks: [
      { Icon: SiFlutter, color: "#02569B" },
      { Icon: SiFirebase, color: "#FFCA28" },
      { Icon: SiJsonwebtokens, color: "#000000" },
      { Icon: SiCloudinary, color: "#3448C5" },
      { Icon: SiNodedotjs, color: "#339933" },
      { Icon: SiMongodb, color: "#47A248" },
      { Icon: SiRedis, color: "#DC382D" },
      { Icon: SiExpress, color: "#000000" },
    ],
    galleryImages: [TP2, TP3, TP4, TP5, TP6, TP7, TP8, TP9, TP10, TP11]
  },
  "government-it-project": {
    image: SOI1,
    title: "Survey of India CORS Portal",
    description: "A comprehensive national infrastructure portal delivering Real-Time Kinematic (RTK) corrections, subscription management, and high-precision GNSS data processing across India.",
    projectOverview: "The Survey of India CORS Portal is a critical national infrastructure project designed to provide a country-wide consistent reference frame. By leveraging a network of Continuously Operating Reference Stations (CORS), the platform eliminates the need for organizations to set up their own local reference stations. It overcomes the 10-11 meter accuracy limitations of standard GNSS by offering Real-Time Kinematic (RTK) and Differential GNSS (DGNSS) correction services with pinpoint ±3 cm accuracy. The robust portal handles subscription-based access, epoch-based CORS/VRS data downloads for post-processing, and automated Online GNSS Processing (OPS) to support highly accurate spatial data requirements nationwide.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Survey of India (Govt. of India)",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "National (India)",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: " Government & Spatial Data",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Deployed & Active",
      },
    ],
    galleryImages: [SOI1, SOI2, SOI3, SOI4, SOI5],
    coreStacks: [
      { Icon: SiReact, color: "#61DAFB" },
      { Icon: SiNodedotjs, color: "#339933" },
      { Icon: SiMongodb, color: "#47A248" },
      { Icon: SiExpress, color: "#000000" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
      { Icon: FaCogs, color: "#6B7280" },
    ]
  },
  "gis-&-spatial-data": {
    image: GIS1,
    title: "Change Detection System",
    description: "A GIS and computer vision-based application designed to identify and visualize changes between geospatial images, preserving spatial information.",
    projectOverview: "The Change Detection System is a GIS and computer vision-based application designed to identify and visualize changes between geospatial images captured at different time periods. The system processes large TIFF/GeoTIFF images, divides them into manageable tiles when required, performs image analysis and segmentation, and generates a change-detection result while preserving the spatial information of the original imagery. The project is designed to support automated detection of land-use, vegetation, building, road, and other geographical changes. It also includes a web-based interface where users can upload imagery, process datasets, and view/download the generated change-detection results.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Survey Of India",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "National (India)",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: " GIS & Spatial Data",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Deployed & Active",
      },
    ],
    galleryImages: [GIS2, GIS3, GIS4, GIS5, GIS6, GIS7],
    coreStacks: [
      { Icon: SiPython, color: "#3776AB" },
      { Icon: SiDjango, color: "#092E20" },
      { Icon: FaServer, color: "#A30000" },
      { Icon: SiPytorch, color: "#EE4C2C" },
      { Icon: SiTensorflow, color: "#FF6F00" },
      { Icon: SiOpencv, color: "#5C3EE8" },
      { Icon: FaBrain, color: "#FF1493" },
      { Icon: FaGlobe, color: "#2F4F4F" },
      { Icon: FaLayerGroup, color: "#8A2BE2" },
      { Icon: SiNumpy, color: "#013243" },
      { Icon: SiCelery, color: "#37814A" },
      { Icon: SiSqlite, color: "#003B57" },
      { Icon: SiJavascript, color: "#F7DF1E" },
      { Icon: FaBoxOpen, color: "#4B8BBE" },
      { Icon: SiNvidia, color: "#76B900" },
    ]
  },
  "search-engine-optimization": {
    image: SEO1,
    title: "CCCwale",
    description: "An online exam preparation platform helping students prepare for the NIELIT CCC exam through bilingual online tests, mock exams, previous-year papers, and study notes.",
    projectOverview: "CCCwale.com is a comprehensive, SEO-focused exam preparation platform built to provide students with structured practice across all major NIELIT CCC chapters. The platform was engineered with a strong emphasis on performance, mobile responsiveness, and technical SEO readiness. Our optimization strategy encompassed deep technical SEO (crawlability, semantic architecture), extensive on-page refinement (keyword-targeted landing pages, AI-friendly structured answers), and off-page authority building. The result is a highly discoverable, fast, and user-centric educational portal that serves both traditional search engines and modern AI-driven search experiences.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "CPCTwale (Parent Brand of CCCwale)",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "Khandwa, Madhya Pradesh",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: "EdTech & SEO Optimization",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Deployed & Active",
      },
    ],
    galleryImages: [SEO1, SEO2, SEO3, SEO4, SEO5],
    coreStacks: []
  },
  "ui-ux-designing": {
    image: C1,
    title: "Chakra Athletica",
    description: "Designed a sleek, high-end web experience for Chakra Athletica, a premier indoor cycling studio. The core objective was to blend strong digital marketing goals with a smooth user experience.",
    projectOverview: "Chakra Athletica is a premier indoor cycling studio offering high-energy, rhythm-based rides. We completely overhauled their digital presence with a bespoke web experience, translating the studio's electrifying atmosphere into a sleek, high-end platform. Through strategic UI/UX design, we crafted a seamless user journey focused on high conversion rates, ensuring that every visitor quickly understands the brand value and can easily book their bikes. Built without code using Framer and designed in Figma, the result is a fast, visually stunning, and highly engaging marketing engine.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Chakra",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "Bangalore",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: " No Code Website",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "1 Month",
      },
    ],
    galleryImages: [C1, C2, C3, C4, C5],
    coreStacks: [
      { Icon: SiFramer, color: "#0055FF" },
      { Icon: SiFigma, color: "#F24E1E" },
      { Icon: SiGooglefonts, color: "#4285F4" },
    ]
  },
  "social-media-marketing": {
    image: SMF1,
    title: "Scan My Flight",
    description: "End-to-end performance marketing encompassing Meta Ads, Google Ads, and organic social media growth, delivering measurable ROI and market penetration.",
    projectOverview: "For the 'Scan My Flight' campaign, we engineered highly optimized Meta Ads campaigns focused on aggressive User Acquisition and targeted lead generation. Our data-driven approach achieved phenomenal results: driving over 2,500+ Mobile App Installs at an exceptionally low Cost Per Install (CPI) of under ₹10 (averaging around ₹9.86) with a spend of just ₹25k. By rigorously A/B testing ad creatives and continuously optimizing budget allocations, we delivered maximum ROI and rapid scaling for the brand.",
    infoItems: [
      {
        icon: FaRegUser,
        title: "Client",
        des: "Scan My Flight",
      },
      {
        icon: FaMapMarkerAlt,
        title: "Location",
        des: "Global",
      },
      {
        icon: FaCube,
        title: "Sector",
        des: "Digital Marketing",
      },
      {
        icon: FaHistory,
        title: "Duration",
        des: "Ongoing Campaigns",
      },
    ],
    galleryImages: [
      SMF1,
      SMF2,
      SMF3,
      SMF4,
      SMF5,
    ],
    coreStacks: [
      { Icon: SiMeta, color: "#0468FF" },
      { Icon: SiGoogle, color: "#4285F4" },
      { Icon: FaPaintBrush, color: "#00C4CC" },
    ]
  }
};
