import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiSend,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

const FAQFormModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !question) {
      toast.error("Please fill in your name, email, and question.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      fullName,
      email,
      phone,
      projectDetails: question, // Mapping question to projectDetails for the backend script compatibility
      formType: "Question"
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

      toast.success("Question submitted successfully! We will get back to you soon.");
      
      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setQuestion("");
      
      // Close modal after a few seconds
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
            className="relative w-full max-w-[1100px] max-h-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 my-auto bg-[#EAF3FF] dark:bg-[#0B1120] p-4 lg:p-6 rounded-[36px] shadow-2xl"
          >
            {/* Left Panel - Dark */}
            <div className="hidden lg:flex w-full lg:w-[45%] min-h-0 bg-[#091123] p-8 md:p-12 flex-col justify-between text-white relative overflow-y-auto rounded-[27px] shadow-2xl overscroll-contain no-scrollbar">
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-[#c3beba6a] uppercase font-geist">
                  <span>— — Submit Your Query</span>
                </div>
                <h2 className="text-[40px] font-bold font-jetbrains leading-tight tracking-tight mt-2">
                  Have a question?
                </h2>
                <p className="text-base text-[#DBDBDB] font-inter mt-4 max-w-[400px] leading-relaxed">
                  Fill out the form with your inquiry, and our support team will get back to you with the answers you need.
                </p>
              </div>

              <div className="flex flex-col gap-8 mt-8 lg:mt-auto relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#00B2FF] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-inter text-white">
                      Fast Responses
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-inter">
                      We aim to respond to all inquiries within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#212838] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="text-[#00B2FF] text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-bold font-inter text-white">
                      Expert Support
                    </h4>
                    <p className="text-[13px] text-[#DBDBDB] font-inter">
                      Connect directly with our technical and consulting experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-[55%] min-h-0 bg-[#F1F7FF] dark:bg-[#0f172a] rounded-[27px] shadow-2xl relative flex flex-col">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 z-50 w-10 h-10 bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#334155] rounded-full flex items-center justify-center text-gray-800 dark:text-gray-100 hover:text-black dark:hover:text-white transition-colors shadow-md border border-gray-200 dark:border-white/10"
              >
                <FiX className="text-xl" />
              </button>

              <div className="flex-1 p-8 md:p-10 flex flex-col justify-start lg:justify-center overflow-y-auto overscroll-contain no-scrollbar">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">
                      <FiUser className="text-gray-500 dark:text-gray-400" /> Full name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px]"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">
                        <FiMail className="text-gray-500 dark:text-gray-400" /> Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px]"
                      />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">
                        <FiPhone className="text-gray-500 dark:text-gray-400" /> Phone
                      </label>
                      <div className="phone-input-container w-full bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent text-gray-800 dark:text-white">
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
                            color: "inherit",
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
                  </div>

                  {/* Question */}
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">
                      <FiFileText className="text-gray-500 dark:text-gray-400" /> Your Question
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="How can we help you today?"
                      rows={4}
                      className="w-full px-4 py-3.5 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-inter text-[15px] resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-2 py-4 bg-[#091123] dark:bg-white hover:bg-[#152343] dark:hover:bg-gray-200 text-white dark:text-black border border-[#091123] dark:border-white rounded-xl text-[16px] font-semibold font-inter flex justify-center items-center gap-2 transition-colors shadow-md group ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Submit Question"}
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

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default FAQFormModal;
