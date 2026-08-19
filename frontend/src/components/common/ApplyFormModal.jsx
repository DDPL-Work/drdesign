import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiX,
  FiPaperclip,
  FiChevronDown,
  FiFileText,
  FiTrash2
} from "react-icons/fi";
import { toast } from "sonner";
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

const ApplyFormModal = ({ isOpen, onClose, roleName, roleOptions = [] }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSubRole, setSelectedSubRole] = useState(roleOptions[0] || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !resume) {
      toast.error("Please fill in your name, email, and resume link.");
      return;
    }

    setIsSubmitting(true);
    
    const formData = {
      fullName,
      email,
      phone,
      roleName,
      subRole: selectedSubRole,
      linkedin,
      github,
      resume,
      formType: "Application"
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast.success("Application submitted successfully! We will get back to you soon.");
      
      setFullName(""); 
      setEmail(""); 
      setPhone(""); 
      setLinkedin(""); 
      setGithub(""); 
      setResume("");
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
          className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div 
            className="flex min-h-full items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[1400px] flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 bg-[#EAF3FF] p-4 lg:p-6 rounded-[36px] shadow-2xl"
            >
            {/* Left Panel - Dark */}
            <div className="hidden lg:flex w-full lg:w-[45%] bg-[#091123] p-8 md:p-12 flex-col justify-between text-white relative rounded-[27px] shadow-2xl">
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-[#DBDBDB] uppercase">
                  <span>Join the Team</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-jetbrains leading-tight tracking-tight mt-2">
                  Take the next step in your career.
                </h2>
                <p className="text-base text-[#DBDBDB] font-sans mt-4 max-w-[400px] leading-relaxed">
                  Submit your application for the <span className="text-white font-medium">{roleName}</span> position. We're excited to learn more about your skills and experience.
                </p>
              </div>

              <div className="flex flex-col gap-8 mt-8 lg:mt-auto relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#4B6BFB] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-sans text-white">
                      Fast Review Process
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-sans">
                      Our hiring team will review your application within 48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#4B6BFB] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-sans text-white">
                      Equal Opportunity
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-sans">
                      We celebrate diversity and are committed to inclusive hiring.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#4B6BFB] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-sans text-white">
                      Confidentiality
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-sans">
                      Your application and personal details stay secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-[55%] bg-[#F1F7FF] rounded-[27px] shadow-2xl relative flex flex-col">
              <button
                onClick={onClose}
                type="button"
                className="absolute -top-3 -right-3 z-50 w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-800 hover:text-black transition-colors shadow-md border border-gray-200"
              >
                <FiX className="text-xl" />
              </button>

              <div className="flex-1 p-8 md:p-10 flex flex-col justify-start lg:justify-center">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiUser className="text-gray-500" /> Full name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent transition-all shadow-sm font-sans text-[15px]"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiMail className="text-gray-500" /> Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent transition-all shadow-sm font-sans text-[15px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiPhone className="text-gray-500" /> Phone number
                      </label>
                      <div className="phone-input-container w-full bg-white border border-gray-300 rounded-xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#4B6BFB] focus-within:border-transparent">
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={setPhone}
                          dropdownClass="no-scrollbar"
                          inputStyle={{
                            width: "100%",
                            height: "46px",
                            border: "none",
                            background: "transparent",
                            fontSize: "15px",
                            fontFamily: "Inter, sans-serif",
                            color: "#1f2937",
                            paddingLeft: "48px",
                          }}
                          buttonStyle={{
                            border: "none",
                            background: "transparent",
                            borderRadius: "12px 0 0 12px",
                            paddingLeft: "8px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiBriefcase className="text-gray-500" /> Specific Role
                      </label>
                      
                      {roleOptions && roleOptions.length > 0 ? (
                        <>
                          <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all shadow-sm font-sans text-[15px] flex justify-between items-center cursor-pointer"
                          >
                            <span className={selectedSubRole ? "text-gray-800" : "text-gray-400"}>
                              {selectedSubRole || "Select a role"}
                            </span>
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
                                className="absolute top-full mt-2 left-0 w-full max-h-48 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999] overflow-y-auto overscroll-contain no-scrollbar"
                              >
                                {roleOptions.map((option, index) => (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      setSelectedSubRole(option);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="px-4 py-3 hover:bg-[#F1F7FF] text-[15px] text-gray-700 cursor-pointer font-sans transition-colors border-b last:border-b-0 border-gray-100"
                                  >
                                    {option}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <input
                          type="text"
                          value={roleName}
                          disabled
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 focus:outline-none transition-all shadow-sm font-sans text-[15px] cursor-not-allowed"
                        />
                      )}
                    </div>
                  </div>

                  {/* Row 3: LinkedIn & GitHub */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiLinkedin className="text-gray-500" /> LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent transition-all shadow-sm font-sans text-[15px]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 font-sans">
                        <FiGithub className="text-gray-500" /> GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent transition-all shadow-sm font-sans text-[15px]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Resume */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[15px] font-bold text-[#334155] font-sans">
                      Resume Link<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent transition-all shadow-sm font-sans text-[15px]"
                      required
                    />
                    <p className="text-[13px] text-gray-500 font-sans">
                      Note: Please paste a public drive link (Google Drive, OneDrive, Dropbox, etc.) to your resume. Ensure access is set to "Anyone with the link".
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-4 py-3.5 bg-[#091123] hover:bg-[#152343] text-white rounded-xl text-[16px] font-semibold font-sans flex justify-center items-center gap-2 transition-all shadow-md group ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && <FiSend className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};

export default ApplyFormModal;
