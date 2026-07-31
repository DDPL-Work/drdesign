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
    <div>
      <Hero />
      <AboutUs />
      <ClientsCarousel />
      <CoreCapability />
      <Solutions />
      <ClientStories />
      <CTA />
    </div>
  );
};

export default Home;
