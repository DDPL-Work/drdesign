import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const MobileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
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
  };
  return logos[tech];
};

const cardsData = [
  {
    id: 1,
    category: "ENGINEERING",
    icon: <CodeIcon />,
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
    icon: <MobileIcon />,
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
    icon: <CloudIcon />,
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
    icon: <DatabaseIcon />,
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
];

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

const ITPractice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Shared card class — p-6 on mobile, p-10 on desktop
  const cardCls =
    "w-full h-auto lg:h-[476px] flex flex-col border border-[#E2E8F0] rounded-3xl p-6 lg:p-10 bg-gray-400/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group";

  // Inner card content (shared between mobile & desktop)
  const renderInner = (card) => (
    <>
      <div className="flex justify-between items-start mb-5 lg:mb-8">
        <div className="w-12 h-12 bg-[#0B101E] rounded-2xl flex items-center justify-center text-white">
          <div className="group-hover:scale-155 group-hover:rotate-5 transition-transform">{card.icon}</div>
        </div>
        <span className="text-[10px] font-normal font-inter text-gray-400 tracking-[0.2em] uppercase mt-1">
          {card.category}
        </span>
      </div>
      <h3 className="text-[22px] lg:text-[24px] font-jetbrains font-bold text-gray-900 mb-3 lg:mb-4 leading-[1.3]">
        {card.title}
      </h3>
      <p className="text-[#64748B] mb-5 lg:mb-8 font-inter font-normal leading-[1.6] text-[14px] pr-2">
        {card.description}
      </p>
      <div className="grid grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-4 mb-5 lg:mb-8">
        {card.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] flex-shrink-0"></div>
            <span className="text-[13px] lg:text-[14px] text-[#334155] font-geist font-normal">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <h4 className="text-[10px] font-normal font-inter text-gray-400 tracking-[0.2em] uppercase mb-3 lg:mb-4">TECH WE USE</h4>
        <div className="flex flex-wrap gap-2.5">
          {card.tech.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 bg-white">
              {getTechLogoUrl(tech) ? (
                <img src={getTechLogoUrl(tech)} alt={`${tech} logo`} className="w-3.5 h-3.5 object-contain" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              )}
              <span className="text-[12px] font-normal text-[#475569] font-inter leading-none">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section id="it-practice" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-[57px]">

        {/* ── Header Section ──────────────────────────────────────────────── */}
        <div className="mb-15">
          <motion.div
            className="flex items-center gap-5 text-[11px] text-[#64748B] font-semibold tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span>01 /</span>
            <span className="w-16 h-[1px] bg-[#CBD5E1]"></span>
            <span>IT PRACTICE</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-[40px] font-jetbrains font-bold text-[#0B101E] leading-[1.1] m-0">
                IT &amp; Software Engineering
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-[18px] text-[#64748B] leading-[1.7] font-inter m-0 pr-4">
                From product discovery to production support — custom platforms,
                mobile apps, cloud infrastructure and analytics built by a senior in-house team.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── MOBILE: cards animate like hero image ────────────────────────────── */}
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

        {/* ── DESKTOP: Row 1 & Row 2 with left / right slide ──────────────── */}
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
                <motion.div
                  key={card.id}
                  variants={index === 0 ? cardVariantLeft : cardVariantRight}
                  className={cardCls}
                >
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
                <motion.div
                  key={card.id}
                  variants={index === 0 ? cardVariantLeft : cardVariantRight}
                  className={cardCls}
                >
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

export default ITPractice;
