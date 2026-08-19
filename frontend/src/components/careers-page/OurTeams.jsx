import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);
import { 
  FiMonitor, FiMap, FiCamera, FiTrendingUp, 
  FiUsers, FiCloud, FiPenTool, FiAward,
  FiArrowUpRight
} from 'react-icons/fi';
import { TbDrone } from 'react-icons/tb';

const teams = [
  { slug: 'it-web-development', name: 'IT & Web Development', icon: FiMonitor },
  { slug: 'gis-mapping', name: 'GIS & Mapping', icon: FiMap },
  { slug: 'drone-surveying', name: 'Drone Surveying', icon: TbDrone },
  { slug: 'seo-marketing', name: 'SEO & Marketing', icon: FiTrendingUp },
  { slug: 'crm-sales', name: 'CRM & Sales', icon: FiUsers },
  { slug: 'cloud-infrastructure', name: 'Cloud Infrastructure', icon: FiCloud },
  { slug: 'ui-ux-design', name: 'UI/UX Design', icon: FiPenTool },
  { slug: 'internships', name: 'Internships', icon: FiAward },
];

const OurTeams = () => {
  useEffect(() => {
    if (window.location.hash === '#teams-section') {
      const element = document.getElementById('teams-section');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <section id="teams-section" className="bg-white pb-20 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-jetbrains text-[36px] md:text-[48px] font-bold text-[#081023] mb-6 leading-[1.2]"
          >
            Find your team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="font-sans text-[16px] md:text-[18px] text-[rgba(8,16,35,0.65)] leading-[1.6]"
          >
            We are a growing team of engineers, designers, and strategists. Explore our departments to find where you belong.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {teams.map((team, index) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              >
                <Link
                  to={`/role/${team.slug}`}
                  className="group relative bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-5 cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-transparent transition-all duration-300 block"
                >
                  {/* Arrow Top Right */}
                  <div className="absolute top-4 right-4 text-gray-300 group-hover:text-[#4B6BFB] transition-colors duration-300">
                    <FiArrowUpRight className="w-5 h-5" />
                  </div>
                  
                  {/* Icon */}
                  <div className="shrink-0 text-[#4B6BFB] transition-transform duration-300 group-hover:scale-110 flex items-center">
                    <Icon className="w-6 md:w-10 h-6 md:h-10" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 pr-4">
                    <h3 className="font-jetbrains text-[15px] font-medium text-[#081023] group-hover:text-[#4B6BFB] transition-colors duration-300 leading-tight">
                      {team.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurTeams;