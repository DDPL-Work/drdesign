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

const seoConfig = {
  "/": { title: "DR.DESIGN TECH  - Enterprise IT & GIS Solutions", description: "DR.DESIGN TECH is a premier technology firm specializing in custom IT Services, GIS, and Digital Transformation." },
  "/who-we-are": { title: "About Us | DR.DESIGN TECH", description: "Learn about our journey, vision, and the team driving enterprise technology solutions at DR.DESIGN TECH." },
  "/what-we-do": { title: "Our Services | DR.DESIGN TECH", description: "Explore our range of services including GIS, Web Development, Mobile Apps, SEO, UI/UX, and Social Media Marketing." },
  "/find-teams": { title: "Careers | DR.DESIGN TECH", description: "Join our team of visionary engineers and designers. Discover open roles and build the future with DR.DESIGN TECH." },
  "/contact-us": { title: "Contact Us | DR.DESIGN TECH", description: "Get in touch with DR.DESIGN TECH for enterprise IT and geospatial solutions." },
  "/find-answers": { title: "FAQ | DR.DESIGN TECH", description: "Find answers to frequently asked questions about DR.DESIGN TECH's services, processes, and more." },
};

const SEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    let currentSEO = seoConfig[location.pathname];
    
    if (!currentSEO) {
      if (location.pathname.startsWith('/project/')) {
        currentSEO = { title: "Case Study | DR.DESIGN TECH", description: "Explore our successful enterprise technology and GIS projects." };
      } else if (location.pathname.startsWith('/role/')) {
        currentSEO = { title: "Career Opportunity | DR.DESIGN TECH", description: "View the details for this open role and join the DR.DESIGN TECH team." };
      } else {
        currentSEO = { title: "DR.DESIGN TECH", description: "DR.DESIGN TECH - Enterprise Technology & Consulting" };
      }
    }

    document.title = currentSEO.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", currentSEO.description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = currentSEO.description;
      document.head.appendChild(metaDescription);
    }
  }, [location.pathname]);

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
      <SEOManager />
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

