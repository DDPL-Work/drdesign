import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FiArrowLeft, FiMapPin, FiClock, FiArrowUpRight, FiUserCheck, FiZap, FiGlobe, FiHeart, FiCode } from 'react-icons/fi';
import {rolesData} from '../../constants/roleData';
import ApplyFormModal from '../common/ApplyFormModal';

const SplitText = ({ text, className = '', charClass = 'headline-char' }) =>
  text.split(' ').map((word, wordIndex, wordsArray) => (
    <span
      key={wordIndex}
      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      {word.split('').map((char, i) => (
        <span
          key={i}
          className={`${charClass} ${className}`}
          style={{
            filter: 'blur(20px)',
            opacity: 0,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
      {wordIndex < wordsArray.length - 1 && (
        <span
          className={`${charClass} ${className}`}
          style={{
            filter: 'blur(20px)',
            opacity: 0,
            position: 'relative',
            display: 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {' '}
        </span>
      )}
    </span>
  ));

const ScrollWordReveal = ({ text, initialColor = 'rgba(8,16,35,0.2)', finalColor = 'rgba(8,16,35,0.7)' }) => {
  if (typeof text !== 'string') return text;
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.015 } },
        hidden: {}
      }}
    >
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { color: initialColor },
            visible: { color: finalColor }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const RoleDetails = () => {
  const { slug } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const heroRef = useRef(null);
  
  const data = rolesData[slug] || rolesData['default'];

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!isLoaded || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const chars = heroRef.current.querySelectorAll('.headline-char');
      if (chars.length === 0) return;

      gsap.set(chars, { opacity: 0, filter: 'blur(20px)' });

      gsap.to(chars, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        stagger: 0.03,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded, slug]);

  if (!isLoaded) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Header Section */}
      <div ref={heroRef} className="relative w-full h-[40vh] min-h-[350px] flex items-end pb-12 pt-32">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081023] via-[#081023]/70 to-[#081023]/30"></div>
        </div>

        {/* Header Content */}
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          
          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center gap-2 font-sans text-[14px] text-white/70 mb-6"
          >
            <Link to="/find-teams" className="hover:text-[#4B6BFB] transition-colors">Careers</Link>
            <span>/</span>
            <Link to="/find-teams#teams-section" className="hover:text-[#4B6BFB] transition-colors">Roles</Link>
            <span>/</span>
            <span className="text-white font-medium">{data.name}</span>
          </motion.div>

          <div>
            <h1 className="font-jetbrains text-[40px] md:text-[64px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
              <SplitText text={data.name} />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
              className="font-sans text-[18px] md:text-[22px] text-white/80 leading-[1.6] max-w-3xl"
            >
              {data.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* About Company Section */}
            <motion.section
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-jetbrains text-[24px] font-bold text-[#081023] mb-4"><ScrollWordReveal text="About Dr. Design Technology" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></h2>
              <div className="font-sans text-[16px] leading-[1.8] space-y-4">
                <p><ScrollWordReveal text="Dr. Design Technology is a cutting-edge technical and operational platform, rebuilt around intelligent data solutions." /></p>
                <p><ScrollWordReveal text="For years, teams have relied on legacy systems to manage their workflows. These platforms were built for a slower era, with manual setups, fragmented data, and insights that arrive too late to shape decisions. The gap between how fast the industry moves and how fast technology can keep up has never been wider." /></p>
                <p><ScrollWordReveal text="We're building something different. With our modern solutions, teams move from problem to resolution in hours instead of weeks, without sacrificing rigor. Our mission is to make deep technological understanding effortless and always on, so the best teams in the world can build solutions they love." /></p>
              </div>
            </motion.section>

            {/* About the Role Section */}
            <motion.section
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-jetbrains text-[24px] font-bold text-[#081023] mb-4"><ScrollWordReveal text="About the Role" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></h2>
              <div className="font-sans text-[16px] leading-[1.8] space-y-4">
                <p><ScrollWordReveal text={data.about || ''} /></p>
                <p><ScrollWordReveal text={`This is an ideal role for someone who enjoys technical problem solving, customer interaction, and cross-functional collaboration in a fast-moving environment. This is a ${data.type ? data.type.toLowerCase() : ''} role based in our Dehradun office.`} /></p>
              </div>
            </motion.section>

            {/* Your Impact Section */}
            <motion.section
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-jetbrains text-[24px] font-bold text-[#081023] mb-6 flex items-center gap-3">
                <FiZap className="text-[#4B6BFB]" />
                <ScrollWordReveal text="Your Impact" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" />
              </h2>
              <div className="flex flex-col gap-4 font-sans text-[16px] leading-[1.6]">
                {data.impact && data.impact.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B6BFB] mt-2.5 shrink-0"></span>
                    <p><ScrollWordReveal text={item} /></p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Your Strengths Section */}
            <motion.section
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-jetbrains text-[24px] font-bold text-[#081023] mb-6 flex items-center gap-3">
                <FiUserCheck className="text-[#4B6BFB]" />
                <ScrollWordReveal text="Your Strengths" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" />
              </h2>
              <div className="flex flex-col gap-4 font-sans text-[16px] leading-[1.6]">
                {data.requirements && data.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B6BFB] mt-2.5 shrink-0"></span>
                    <p><ScrollWordReveal text={req} /></p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Technologies Section (Conditional) */}
            {data.technologies && (
              <motion.section
                initial={{ opacity: 0.2, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="font-jetbrains text-[24px] font-bold text-[#081023] mb-4 flex items-center gap-3">
                  <FiCode className="text-[#4B6BFB]" />
                  Technology Stack
                </h2>
                
                {data.techNote && (
                  <p className="font-sans text-[15px] text-[rgba(8,16,35,0.6)] mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    {data.techNote}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.technologies.map((tech, idx) => (
                    <div 
                      key={idx}
                      className="group bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-2xl p-5 hover:border-[#4B6BFB]/40 hover:shadow-[0_8px_24px_rgba(75,107,251,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-default flex flex-col"
                    >
                      <h4 className="font-jetbrains text-[15px] font-bold text-[#081023] mb-4">{tech.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {tech.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 hover:bg-white hover:border-[#4B6BFB]/30 hover:shadow-sm transition-all">
                            <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" />
                            <span className="font-sans text-[13px] font-medium text-[#081023]/80">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Diversity Section */}
            <motion.section 
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#E8F1FF]/50 border border-gray-100 rounded-[24px] p-8 mt-4"
            >
              <h2 className="font-jetbrains text-[20px] font-bold text-[#081023] mb-4 flex items-center gap-3">
                <FiHeart className="text-[#4B6BFB]" />
                <ScrollWordReveal text="Our Commitment to Diversity and Inclusion" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" />
              </h2>
              <div className="font-sans text-[15px] leading-[1.8]">
                <p><ScrollWordReveal text="We prioritize diversity within our team and value different perspectives, educational backgrounds, and life experiences. We encourage people from underrepresented backgrounds to apply. At Dr. Design Technology, we pride ourselves on being a people-first company, where your contributions truly matter and are valued." /></p>
              </div>
            </motion.section>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 flex flex-col gap-8 sticky top-32">
            {/* Role Overview Card */}
            <motion.div 
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-[32px] p-8 md:p-10"
            >
              <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] mb-6"><ScrollWordReveal text="Role Overview" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></h3>
              
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-sans text-[13px] text-[rgba(8,16,35,0.5)] uppercase tracking-wider font-semibold mb-1">Department</p>
                  <p className="font-sans text-[16px] font-medium text-[#081023]"><ScrollWordReveal text={data.name} initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></p>
                </div>
                <div>
                  <p className="font-sans text-[13px] text-[rgba(8,16,35,0.5)] uppercase tracking-wider font-semibold mb-1">Job Location</p>
                  <p className="font-sans text-[16px] font-medium text-[#081023]"><ScrollWordReveal text="Dehradun, India" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></p>
                </div>
                <div>
                  <p className="font-sans text-[13px] text-[rgba(8,16,35,0.5)] uppercase tracking-wider font-semibold mb-1">Work Model</p>
                  <p className="font-sans text-[16px] font-medium text-[#081023]"><ScrollWordReveal text={data.location || ''} initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></p>
                </div>
                <div>
                  <p className="font-sans text-[13px] text-[rgba(8,16,35,0.5)] uppercase tracking-wider font-semibold mb-1">Employment Type</p>
                  <p className="font-sans text-[16px] font-medium text-[#081023]"><ScrollWordReveal text={data.type || ''} initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></p>
                </div>
              </div>
            </motion.div>

            {/* Benefits & Perks Card */}
            <motion.div 
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-[32px] p-8 md:p-10"
            >
              <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] mb-6"><ScrollWordReveal text="Benefits & Perks" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></h3>
              <ul className="flex flex-col gap-4 font-sans text-[15px] leading-[1.6]">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1FF] text-[#4B6BFB] shrink-0 text-sm mt-0.5">✓</span>
                  <ScrollWordReveal text="Competitive salary & equity" />
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1FF] text-[#4B6BFB] shrink-0 text-sm mt-0.5">✓</span>
                  <ScrollWordReveal text="Comprehensive health coverage" />
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1FF] text-[#4B6BFB] shrink-0 text-sm mt-0.5">✓</span>
                  <ScrollWordReveal text="Flexible remote work policy" />
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1FF] text-[#4B6BFB] shrink-0 text-sm mt-0.5">✓</span>
                  <ScrollWordReveal text="Continuous learning budget" />
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1FF] text-[#4B6BFB] shrink-0 text-sm mt-0.5">✓</span>
                  <ScrollWordReveal text="Paid parental leave" />
                </li>
              </ul>
            </motion.div>

            {/* Apply Card */}
            <motion.div 
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="bg-white border border-[#4B6BFB]/20 shadow-[0_8px_32px_rgba(75,107,251,0.08)] rounded-[32px] p-8 md:p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4B6BFB]/5 rounded-bl-[64px] -z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-[#4B6BFB]/10"></div>
              <h3 className="font-jetbrains text-[22px] font-bold text-[#081023] mb-4"><ScrollWordReveal text="Ready to join us?" initialColor="rgba(8,16,35,0.2)" finalColor="#081023" /></h3>
              <p className="font-sans text-[15px] leading-[1.6] mb-8">
                <ScrollWordReveal text="If you're excited about this role and share our passion for building the future, we want to hear from you. Submit your application below." />
              </p>
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="group/btn relative flex items-center justify-center gap-2 w-full bg-[#4B6BFB] text-white font-sans font-medium text-[16px] py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(75,107,251,0.25)] cursor-pointer"
              >
                <span className="relative z-10">Apply Now</span>
                <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
      
      <ApplyFormModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        roleName={data.name} 
        roleOptions={data.subRoles || []}
      />
    </div>
  );
};

export default RoleDetails;