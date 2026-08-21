import React from "react";

export const getTechLogoUrl = (tech) => {
  const logos = {
    React: "https://api.iconify.design/logos/react.svg",
    "Next.js": "https://api.iconify.design/logos/nextjs-icon.svg",
    TypeScript: "https://api.iconify.design/logos/typescript-icon.svg",
    "Node.js": "https://api.iconify.design/logos/nodejs-icon.svg",
    Python: "https://api.iconify.design/logos/python.svg",
    PostgreSQL: "https://api.iconify.design/logos/postgresql.svg",
    Flutter: "https://api.iconify.design/logos/flutter.svg",
    Kotlin: "https://api.iconify.design/logos/kotlin-icon.svg",
    Swift: "https://api.iconify.design/logos/swift.svg",
    Firebase: "https://api.iconify.design/logos/firebase.svg",
    AWS: "https://api.iconify.design/logos/aws.svg",
    Docker: "https://api.iconify.design/logos/docker-icon.svg",
    Kubernetes: "https://api.iconify.design/logos/kubernetes.svg",
    Terraform: "https://api.iconify.design/logos/terraform-icon.svg",
    Linux: "https://api.iconify.design/logos/linux-tux.svg",
    SQL: "https://api.iconify.design/logos/mysql-icon.svg",
    Snowflake: "https://api.iconify.design/logos/snowflake-icon.svg",
    PowerBI: "https://api.iconify.design/logos/microsoft-power-bi.svg",
    Tableau: "https://api.iconify.design/logos/tableau-icon.svg",
    // GIS Specific Tech
    MapLibre: "https://api.iconify.design/logos/maplibre-icon.svg",
    Leaflet: "https://api.iconify.design/logos/leaflet.svg",
    QGIS: "https://cdn.simpleicons.org/qgis",
    PostGIS: "https://api.iconify.design/logos/postgresql.svg",
    OpenStreetMap: "https://cdn.simpleicons.org/openstreetmap",
    GDAL: "https://api.iconify.design/logos/python.svg",
    NumPy: "https://api.iconify.design/logos/numpy.svg",
    Jupyter: "https://api.iconify.design/logos/jupyter.svg",
    "Google Earth": "https://cdn.simpleicons.org/googleearth",
    Blender: "https://api.iconify.design/logos/blender.svg",
    Cesium: "https://cdn.simpleicons.org/cesium",
    FastAPI: "https://api.iconify.design/logos/fastapi-icon.svg",
    Redis: "https://api.iconify.design/logos/redis.svg",
    // Marketing & CMS
    WordPress: "https://api.iconify.design/logos/wordpress-icon.svg",
    Shopify: "https://api.iconify.design/logos/shopify.svg",
    Contentful: "https://api.iconify.design/logos/contentful.svg",
    Strapi: "https://api.iconify.design/logos/strapi-icon.svg",
    "Google Analytics": "https://api.iconify.design/logos/google-analytics.svg",
    Ahrefs: "https://api.iconify.design/logos/ahrefs.svg",
    OpenAI: "https://api.iconify.design/logos/openai-icon.svg",
    Meta: "https://api.iconify.design/logos/meta-icon.svg",
    "Google Ads": "https://api.iconify.design/logos/google-ads.svg",
    "Meta Ads": "https://api.iconify.design/logos/meta-icon.svg",
    Figma: "https://api.iconify.design/logos/figma.svg",
    HubSpot: "https://cdn.simpleicons.org/hubspot",
    "Adobe CC": "https://cdn.simpleicons.org/adobecreativecloud/FF0000",
    "Premiere Pro": "https://api.iconify.design/logos/adobe-premiere.svg",
    "After Effects": "https://api.iconify.design/logos/adobe-after-effects.svg",
    Illustrator: "https://api.iconify.design/logos/adobe-illustrator.svg",
    Buffer: "https://cdn.simpleicons.org/buffer",
    Hootsuite: "https://cdn.simpleicons.org/hootsuite",
    GTM: "https://api.iconify.design/logos/google-tag-manager.svg",
  };
  return logos[tech] || null;
};

const PracticeCard = ({ card }) => {
  return (
    <div className="relative w-full h-full flex flex-col border border-[#E2E8F0] rounded-[24px] p-6 lg:p-10 bg-gray-400/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group overflow-hidden">
      
      {/* Background Image and Overlay (Hidden by default, shown on hover) */}
      {card.bgImage && (
        <>
          <div 
            className="absolute inset-0 z-0 opacity-100 transition-opacity duration-500 bg-cover bg-center"
            style={{ backgroundImage: `url(${card.bgImage})` }}
          />
          <div className="absolute inset-0 z-0 bg-gray-900/80 opacity-0 opacity-100 transition-opacity duration-500" />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-5 lg:mb-8">
          <div className="flex items-center justify-center">
            <div className="group-hover:scale-110 group-hover:rotate-3 transition-transform">{card.icon}</div>
          </div>
          <span className="text-[10px] font-normal font-inter text-gray-300 transition-colors tracking-[0.2em] uppercase mt-1">
            {card.category}
          </span>
        </div>
        <h3 className="text-[22px] lg:text-[24px] font-jetbrains font-bold text-white transition-colors mb-3 lg:mb-4 leading-[1.3]">
          {card.title}
        </h3>
        <p className="text-gray-100 transition-colors mb-5 lg:mb-8 font-inter font-normal leading-[1.6] text-[14px] pr-2">
          {card.description}
        </p>
        <div className="grid grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-4 mb-5 lg:mb-8">
          {card.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] flex-shrink-0"></div>
              <span className="text-[13px] lg:text-[14px] text-gray-100 transition-colors font-geist font-normal">{feature}</span>
            </div>
          ))}
        </div>
        {/* mt-auto ensures this section aligns perfectly across all cards horizontally */}
        <div className="mt-auto pt-4">
          <h4 className="text-[10px] font-normal font-inter text-gray-400 transition-colors tracking-[0.2em] uppercase mb-3">
            TECH WE USE
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {card.tech.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 bg-white transition-colors">
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
      </div>
    </div>
  );
};

export default PracticeCard;
