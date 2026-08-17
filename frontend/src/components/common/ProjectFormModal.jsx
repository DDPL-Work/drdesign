import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiGrid,
  FiFileText,
  FiSend,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

const services = [
  "Custom Software Development",
  "Mobile App Development",
  "Web Development",
  "ERP & CRM Solutions",
  "Cloud Infrastructure",
  "GIS & Remote Sensing",
  "Web GIS Development",
  "Utility Mapping",
  "LULC Mapping",
  "Satellite Image Processing",
  "Other",
];

const ProjectFormModal = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  // New state variables for form submission
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dropdownRef = useRef(null);

  // Replace this with your Google Apps Script Web App URL!
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email) {
      toast.error("Please fill in at least your name and email.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      fullName,
      email,
      phone,
      company,
      selectedService,
      projectDetails,
      formType: "Lead"
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Scripts to avoid CORS errors on the frontend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // With no-cors, we can't reliably read the response body, but if it doesn't throw, it likely succeeded.
      toast.success("Message sent successfully! We will get back to you soon.");
      
      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setSelectedService("");
      setProjectDetails("");
      
      // Optionally close modal after a few seconds
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          data-lenis-prevent="true"
          className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto overscroll-contain"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-300 max-h-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 my-auto bg-[#EAF3FF] p-4 lg:p-6 rounded-[36px] shadow-2xl"
          >
            {/* Left Panel - Dark */}
            <div className="hidden lg:flex w-full lg:w-[45%] min-h-0 bg-[#091123] p-8 md:p-12 flex-col justify-between text-white relative overflow-y-auto rounded-[27px] shadow-2xl overscroll-contain no-scrollbar">
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-[#DBDBDB] uppercase">
                
                  <span>Send a message</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-jetbrains leading-tight tracking-tight mt-2">
                  Tell us about your project.
                </h2>
                <p className="text-base text-[#DBDBDB] font-inter mt-4 max-w-100 leading-relaxed">
                  Share a few details and we’ll prepare a tailored response with
                  next steps, timelines, and a rough estimate.
                </p>
              </div>

              <div className="flex flex-col gap-8 mt-8 lg:mt-auto relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#00B2FF] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-inter text-white">
                      Free project review
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-inter">
                      We analyze your requirements before the first call.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#00B2FF] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-inter text-white">
                      Reply within 24 hours
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-inter">
                      Our team responds on every business day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#00B2FF] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-inter text-white">
                      NDA on request
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-inter">
                      Your ideas stay confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-[55%] min-h-0 bg-[#F1F7FF] rounded-[27px] shadow-2xl relative flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 z-50 w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-800 hover:text-black transition-colors shadow-md border border-gray-200"
              >
                <FiX className="text-xl" />
              </button>

              <div className="flex-1 p-8 md:p-10 flex flex-col justify-start lg:justify-center overflow-y-auto overscroll-contain no-scrollbar">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit}
                >
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                        <FiUser className="text-gray-500" /> Full name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px]"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                        <FiMail className="text-gray-500" /> Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                        <FiPhone className="text-gray-500" /> Phone number
                      </label>
                      <div className="phone-input-container w-full bg-white border border-gray-300 rounded-xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={setPhone}
                          inputStyle={{
                            width: "100%",
                            height: "50px",
                            border: "none",
                            background: "transparent",
                            fontSize: "15px",
                            fontFamily: "Inter",
                            color: "#1f2937",
                            paddingLeft: "48px",
                          }}
                          buttonStyle={{
                            border: "none",
                            background: "transparent",
                            borderRadius: "12px 0 0 12px",
                            paddingLeft: "8px",
                          }}
                          dropdownStyle={{
                            width: "300px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                        <FiBriefcase className="text-gray-500" /> Company /
                        Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Dropdown */}
                  <div className="flex flex-col gap-2.5 relative" ref={dropdownRef}>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                      <FiGrid className="text-gray-500" /> Service you're
                      interested in
                    </label>
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all shadow-sm font-inter text-[15px] flex justify-between items-center cursor-pointer"
                    >
                      <span
                        className={
                          selectedService ? "text-gray-800" : "text-gray-400"
                        }
                      >
                        {selectedService || "Select a service"}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="text-gray-500 text-lg" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-21.25 left-0 w-full max-h-55 bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-y-auto overscroll-contain no-scrollbar"
                        >
                          {services.map((service, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedService(service);
                                setIsDropdownOpen(false);
                              }}
                              className="px-4 py-3 hover:bg-sky-50 text-[15px] text-gray-700 cursor-pointer font-inter transition-colors border-b last:border-b-0 border-gray-100"
                            >
                              {service}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Row 4: Project Details */}
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-inter">
                      <FiFileText className="text-gray-500" /> Project details
                    </label>
                    <textarea
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Tell us about your goals, timeline, and any specific requirements..."
                      rows={4}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px] resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-2 py-4 bg-[#091123] hover:bg-[#152343] text-white rounded-xl text-[16px] font-semibold font-inter flex justify-center items-center gap-2 transition-colors shadow-md group ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    {!isSubmitting && <FiSend className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to mount the modal directly to document.body
  // This ensures it overlays everything else on the page regardless of z-index stacking contexts
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default ProjectFormModal;
