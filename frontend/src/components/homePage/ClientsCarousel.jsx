import React from "react";

// ── Client logo imports ──────────────────────────────────────────────
import amtron        from "../../assets/clients/AMTRON.png";
import quoteMate     from "../../assets/clients/QuoteMate.avif";
import ukgov         from "../../assets/clients/UKGOV.png";
import geps          from "../../assets/clients/geps.png";
import holidays      from "../../assets/clients/holidays.png";
import ideaForge     from "../../assets/clients/idea_forge.png";
import kws           from "../../assets/clients/kws.png";
import mavenJobs     from "../../assets/clients/mavenJobs.avif";
import mawahib       from "../../assets/clients/mawahib.png";
import mugafi        from "../../assets/clients/mugafi.avif";
import nhpc          from "../../assets/clients/nhpc_logo.png";
import protergia     from "../../assets/clients/protergia.png";
import soilogo       from "../../assets/clients/soilogobg.png";
import traveamer     from "../../assets/clients/traveamer.avif";
import provenCode     from "../../assets/clients/provenCode.avif";
import tapori        from "../../assets/clients/tapori.png";
import irrigation    from "../../assets/clients/irrigation.jpeg";
import slideit       from "../../assets/clients/slideitblacktext.svg";
import zadium        from "../../assets/clients/zadium.png";
import hpk           from "../../assets/clients/hpk.svg";
import adopt         from "../../assets/clients/adopt.png";
import rafec         from "../../assets/clients/rafec.webp";
import soult         from "../../assets/clients/soult.webp";
import chakra        from "../../assets/clients/chakra.png";
import gendhaphool   from "../../assets/clients/gendhaphool.png";
import polatGlobal   from "../../assets/clients/polat global.png";

// ── Logo list (name shown on hover for a11y) ─────────────────────────
const logos = [
  { src: amtron,    alt: "AMTRON" },
  { src: quoteMate, alt: "QuoteMate", scale: 1.7 },
  // { src: uid,       alt: "UID",       scale: 1.7 },
  { src: ukgov,     alt: "UK Government" },
  { src: irrigation,     alt: "Irrigation" },
  { src: geps,      alt: "GEPS" },
  { src: holidays,  alt: "Holidays" },
  { src: ideaForge, alt: "Idea Forge" },
  { src: kws,       alt: "KWS" },
  { src: mavenJobs, alt: "MavenJobs", scale: 1.6},
  { src: mawahib,   alt: "Mawahib",   scale: 1.6 },
  { src: mugafi,    alt: "Mugafi",    scale: 1.7 },
  { src: nhpc,      alt: "NHPC" },
  { src: protergia, alt: "Protergia", scale: 1.7 },
  { src: tapori, alt: "Tapori", scale: 1.5 },
  { src: soilogo,   alt: "SOI" },
  { src: traveamer, alt: "Traveamer", scale: 1.7 },
  { src: provenCode, alt: "The Proven Code"},
  { src: slideit, alt: "SlideIt" },
  { src: zadium, alt: "Zadium" },
  { src: hpk, alt: "HPK", scale: 0.8 },
  { src: adopt, alt: "Adopt" },
  { src: rafec, alt: "Rafec",  },
  { src: soult, alt: "D'Soult", scale: 1.2 },
  { src: chakra, alt: "Chakra" },
  { src: gendhaphool, alt: "Gendhaphool" },
  { src: polatGlobal, alt: "Polat Global" },
];

// ── Inline keyframe: scrolls one full track width to the left ────────
const marqueeStyles = `
@keyframes marquee {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 65s linear infinite;
  will-change: transform;
}
`;

const ClientsCarousel = () => {
  // Duplicate the logos list so the second copy fills in as the first scrolls away
  const doubled = [...logos, ...logos];

  return (
    <section className="w-full bg-white md:py-20 overflow-hidden">
      <style>{marqueeStyles}</style>

      {/* ── Section heading ── */}
      <div className="text-center mb-14 px-6">
        <h2
          className="font-jetbrains text-[27px] md:text-[64px] font-normal leading-[1.2] tracking-normal text-black"
        >
          Our Trusted Clients
        </h2>
      </div>

      {/* ── Infinite marquee ── */}
      {/* Fade edges */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-5 md:mx-15 shrink-0 w-15 h-15 md:w-25 md:h-25"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain transition-all duration-300"
                style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;