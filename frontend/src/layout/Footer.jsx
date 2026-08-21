import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone, FiLinkedin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#081023] pt-16 pb-8 px-8 border-t border-white/10 z-50">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column - Logo & Address */}
        <div className="flex flex-col gap-6 md:col-span-5 lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo-remastered.svg" 
              alt="Dr. Design Technology Logo" 
              className="h-10 w-auto" 
            />
            <span className="text-[#8892a0] font-bold tracking-widest text-xs uppercase hidden sm:block font-geist">
              Dr. Design Technology
            </span>
          </Link>
          <div className="flex items-start gap-3 text-gray-300">
            <FiMapPin className="text-[#8892a0] mt-1 text-lg shrink-0" />
            <p className="text-sm leading-relaxed">
              Near Survey Chowk, 11 East Canal Road, Dehradun, <br className="hidden sm:block" />
              Uttarakhand, 248001.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/company/drdesignpvtltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#8687DD] hover:text-white hover:border-[#8687DD] transition-all duration-300">
              <FiLinkedin className="text-lg" />
            </a>
            <a href="https://www.instagram.com/drdesigntechnology" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#8687DD] hover:text-white hover:border-[#8687DD] transition-all duration-300">
              <FiInstagram className="text-lg" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578675068487" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#8687DD] hover:text-white hover:border-[#8687DD] transition-all duration-300">
              <FiFacebook className="text-lg" />
            </a>
          </div>
        </div>

        {/* Middle Column - Quick Links */}
        <div className="flex flex-col gap-5 md:col-span-3 lg:col-span-4 lg:items-center">
          <div className="w-full lg:w-max">
            <h3 className="text-[#8892a0] font-semibold tracking-widest text-sm uppercase mb-5 font-jetbrains">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <Link to="/about-us" className="text-gray-300 hover:text-white text-sm transition-colors">About Us</Link>
              <Link to="/services" className="text-gray-300 hover:text-white text-sm transition-colors">Services</Link>
              <Link to="/#solutions" className="text-gray-300 hover:text-white text-sm transition-colors">Projects</Link>
              <Link to="/find-answers" className="text-gray-300 hover:text-white text-sm transition-colors">FAQs</Link>
              <Link to="/find-teams" className="text-gray-300 hover:text-white text-sm transition-colors">Careers</Link>
            </div>
          </div>
        </div>

        {/* Right Column - Direct Contact */}
        <div className="flex flex-col gap-5 md:col-span-4 lg:col-span-4 items-start lg:items-end">
          <div className="w-full lg:w-max">
            <h3 className="text-[#8892a0] font-semibold tracking-widest text-sm uppercase mb-5 font-jetbrains">
              Direct Contact
            </h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@drdesigntech.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm">
                <FiMail className="text-[#8892a0] text-lg shrink-0" />
                contact@drdesigntech.com
              </a>
              <a href="tel:+917217052558" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm">
                <FiPhone className="text-[#8892a0] text-lg shrink-0" />
                +91 7217052558
              </a>
              <a href="https://wa.me/917217052556" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm">
                <FaWhatsapp className="text-[#8892a0] text-lg shrink-0" />
                +91 7217052556
              </a>
              <a href="https://wa.me/917217052558" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm">
                <FaWhatsapp className="text-[#8892a0] text-lg shrink-0" />
                +91 7217052558
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-center text-center">
        <p className="text-[#8892a0] text-xs">
          &copy; 2026 Dr. Design PVT. LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
