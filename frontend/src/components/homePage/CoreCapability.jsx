import React, { useEffect, useRef } from "react";
import { GiFlowerEmblem } from "react-icons/gi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bandStyles = `
@keyframes slide-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.band-left {
  display: flex;
  width: max-content;
  animation: slide-left 65s linear infinite;
  will-change: transform;
}
@media (max-width: 767px) {
  .band-dark { transform: rotate(-14deg); }
  .band-orange { transform: rotate(14deg); }
}
@media (min-width: 768px) {
  .band-dark { transform: rotate(-6deg); }
  .band-orange { transform: rotate(6deg); }
}
`;

const orangeItems = [
  "Cybersecurity & Network Solutions",
  "API Development & System Integration",
  "Database Design & Management",
  "Web Development",
  "Mobile Development",
  "ERP Development",
  "General IT Consultation",
  "IT Support & Maintenance",
];

const blueItems = [
  "Drone Mapping & Photogrammetry",
  "3D GIS & Spatial Visualization",
  "GIS Mapping & Cartography",
  "Surveying & Topographic Mapping",
];

const BandItem = ({ label }) => (
  <span className="font-inter text-white text-[20px] md:text-[32px] font-bold whitespace-nowrap flex items-center">
    <span className="mx-6 md:mx-10">{label}</span>
    <span className="text-white/50 text-[12px] md:text-[20px] mr-2">
      <GiFlowerEmblem />
    </span>
  </span>
);

const CoreCapability = () => {
  const doubledOrange = [...orangeItems, ...orangeItems];
  const doubledBlue = [...blueItems, ...blueItems, ...blueItems, ...blueItems];

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const orangeBandRef = useRef(null);
  const blueBandRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      })
      .from(
        orangeBandRef.current,
        {
          x: -200,
          opacity: 0,
          duration: 2.5,
          ease: "power3.out",
        },
        "-=1.2"
      )
      .from(
        blueBandRef.current,
        {
          x: 200,
          opacity: 0,
          duration: 2.5,
          ease: "power3.out",
        },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white pt-20 pb-0 overflow-hidden">
      <style>{bandStyles}</style>

      {/* Heading */}
      <div className="text-center md:mb-12 mb-7 px-6">
        <h2 ref={headingRef} className="font-jetbrains text-[27px] md:text-[64px] font-normal leading-[1.2] text-black">
          Core Capabilities
        </h2>
      </div>

      {/* Crossing bands — container is taller than visible strips to allow rotation room */}
      <div className="md:pt-[37px] md:pb-[42px]">
        <div className="relative h-[140px] md:h-[224px]">
          {/* Dark band */}
          <div
            ref={orangeBandRef}
            className="absolute w-[250vw] h-[45px] md:h-[72px] -left-[75vw] top-[25%] bg-[#111625] py-[6px] md:py-[10px] z-10 band-dark"
          >
            <div className="band-left">
              {doubledOrange.map((label, i) => (
                <BandItem key={i} label={label} />
              ))}
            </div>
          </div>

          {/* Orange band */}
          <div
            ref={blueBandRef}
            className="absolute w-[250vw] h-[45px] md:h-[72px] -left-[75vw] top-[25%] bg-[#F04D12] py-[6px] md:py-[10px] z-20 band-orange"
          >
            <div className="band-left">
              {doubledBlue.map((label, i) => (
                <BandItem key={i} label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapability;
