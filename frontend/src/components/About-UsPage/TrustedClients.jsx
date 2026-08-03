import React from 'react';
import { motion } from 'framer-motion';

// Importing all client logos from assets
import img1 from '../../assets/clients/AMTRON.png';
import img2 from '../../assets/clients/QuoteMate.avif';
import img3 from '../../assets/clients/irrigation.jpeg';
import img4 from '../../assets/clients/UKGOV.png';
import img5 from '../../assets/clients/geps.png';
import img6 from '../../assets/clients/holidays.png';
import img7 from '../../assets/clients/idea_forge_logoo-removebg-preview.png';
import img8 from '../../assets/clients/irrigation.jpeg';
import img9 from '../../assets/clients/kws.png';
import img10 from '../../assets/clients/mavenJobs.avif';
import img11 from '../../assets/clients/mawahib.png';
import img12 from '../../assets/clients/mugafi.avif';
import img13 from '../../assets/clients/nhpc_logo.png';
import img14 from '../../assets/clients/protergia.png';
import img15 from '../../assets/clients/provenCode.avif';
import img16 from '../../assets/clients/slideit.svg';
import img17 from '../../assets/clients/soilogobg.png';
import img18 from '../../assets/clients/tapori.png';

const clients = [
  { src: img1, scale: 1 },        // AMTRON
  { src: img2, scale: 1.7 },      // QuoteMate
  { src: img3},      // UID
  { src: img4, scale: 1 },        // UKGOV
  { src: img5, scale: 1 },        // GEPS
  { src: img6, scale: 1.7 },        // holidays
  { src: img7, scale: 1 },        // ideaForge
  { src: img9, scale: 1 },        // KWS
  { src: img10, scale: 1.4 },     // mavenJobs
  { src: img11, scale: 2 },     // mawahib
  { src: img12, scale: 1 },     // mugafi
  { src: img13, scale: 1 },       // nhpc
  { src: img14, scale: 2, translateX: -20 },     // protergia
  { src: img15 },               // provenCode
  { src: img16, scale: 1.6, translateX: 35 },       // slideit
  { src: img17, scale: 1, translateX: -25 },       // soilogo
  { src: img18, scale: 1.5, translateX: -25 },     // tapori
];

const row1 = clients.slice(0, 6);
const row2 = clients.slice(6, 12);
const row3 = clients.slice(12, 18);

const renderMarqueeRow = (items, direction) => {
  const isLeft = direction === 'left';
  // Moving left: animates 0 to -50%
  // Moving right: animates -50% to 0
  const animationClass = isLeft ? 'animate-marquee-left-client' : 'animate-marquee-right-client';
  
  // Duplicating 4 times to ensure it covers even ultra-wide monitors, 
  // since -50% will shift exactly 2 sets, it remains seamless.
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-hidden flex relative" 
      style={{ 
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className={`flex w-max gap-8 py-2 md:py-4 pr-8 hover:[animation-play-state:paused] ${animationClass}`}>
        {duplicatedItems.map((client, idx) => (
          <div 
            key={idx}
            className="w-[140px] h-[70px] flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100 cursor-pointer hover:scale-110"
          >
            <img 
              src={client.src} 
              alt={`Client`} 
              className="max-w-[140px] max-h-[70px] object-contain transition-transform duration-300"
              style={{
                transform: [
                  client.scale && client.scale !== 1 ? `scale(${client.scale})` : '',
                  client.translateX ? `translateX(${client.translateX}px)` : ''
                ].filter(Boolean).join(' ') || undefined
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustedClients = () => {
  return (
    <section className="w-full bg-white pb-32 pt-10 overflow-hidden">
      <div className="max-w-full mx-15">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="text-[12px] font-medium tracking-[0.2em] text-[#8b949e] uppercase flex items-center gap-6 font-jetbrains">
            <span>04 /</span>
            <span className="w-16 h-[1px] bg-gray-200 rounded-full"></span>
            <span>TRUSTED CLIENTS</span>
          </h2>
        </motion.div>

        {/* Big Heading & Description */}
        <div className="mb-16 max-w-4xl">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-[48px] font-medium text-[#0a181c] font-jetbrains leading-[1.2] mb-6"
          >
            Teams that keep coming back
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#5e6673] font-inter text-[18px] leading-relaxed max-w-3xl"
          >
            From government departments and hospital networks to manufacturing groups and D2C brands — our clients span sectors, and most of them are on their third or fourth project with us.
          </motion.p>
        </div>

        {/* Clients Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#f8f9fa] rounded-2xl border border-gray-100 flex flex-col gap-4"
        >
          {renderMarqueeRow(row1, 'right')}
          {renderMarqueeRow(row2, 'left')}
          {renderMarqueeRow(row3, 'right')}
        </motion.div>
      </div>

      {/* Global style for marquee animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLeftClient {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRightClient {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left-client {
          animation: scrollLeftClient 35s linear infinite;
        }
        .animate-marquee-right-client {
          animation: scrollRightClient 35s linear infinite;
        }
      `}} />
    </section>
  );
}

export default TrustedClients;