import { useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation, useMatches } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Home from "../pages/Home/Home";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import CaseStudyDetails from "../pages/Case-Study/Details";
import AboutUs from "../pages/About-Us/AboutUs";
import PlaceholderPage from "../pages/NotFound/NotFound";
import ContactUs from "../pages/Contact-Us/ContactUs";
import Services from "../pages/Services/Services";
import FAQ from "../pages/FAQ/FAQ";
import Careers from "../pages/Careers/Careers";
import RoleDetails from "../components/careers-page/RoleDetails";
import FloatingCallButton from "../layout/FloatingCallButton";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo || location.hash?.replace('#', '');

    const timer = setTimeout(() => {
      if (scrollToId) {
        const element = document.getElementById(scrollToId);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -50, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }, 150); // Delay matches the 0.15s exit animation so the old page doesn't jump

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, location.state]);

  return null;
};

const MainLayout = () => {
  const matches = useMatches();
  const location = useLocation();
  const is404 = matches.some(match => match?.handle?.is404);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <Navbar />
      <main className="grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ y: "100vh", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!is404 && <Footer />}
      <FloatingCallButton />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/who-we-are", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/what-we-do", element: <Services /> },
      { path: "/find-teams", element: <Careers /> },
      { path: "/project/:slug", element: <CaseStudyDetails /> },
      { path: "/role/:slug", element: <RoleDetails /> },
      { path: "/find-answers", element: <FAQ /> },
      { path: "*", element: <PlaceholderPage />, handle: { is404: true } },
    ]
  }
]);

