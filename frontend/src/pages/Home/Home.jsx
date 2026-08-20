import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import Hero from "../../components/homePage/Hero";
import AboutUs from "../../components/homePage/AboutUs";
import ClientsCarousel from "../../components/homePage/ClientsCarousel";
import CoreCapability from "../../components/homePage/CoreCapability";
import Solutions from "../../components/homePage/Solutions";
import ClientStories from "../../components/homePage/ClientStories";
import CTA from "../../components/homePage/CTA";
import "lenis/dist/lenis.css"; // optional but good practice
import NewHero from "../../components/homePage/NewHero";

const Home = () => {
  const location = useLocation();

  // Scroll to section when navigated here with state.scrollTo
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.state]);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* Fixed Hero Section (Bypasses overflow-x-hidden issues) */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          <NewHero />
        </div>
      </div>

      {/* Subsequent Sections that scroll over the hero */}
      {/* Added mt-[100vh] to push this content below the viewport initially */}
      <div className="relative z-10 bg-white shadow-2xl mt-[100vh]">
        <AboutUs />
        <ClientsCarousel />
        <CoreCapability />
        <Solutions />
        <ClientStories />
        <CTA />
      </div>
    </div>
  );
};

export default Home;
