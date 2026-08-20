import { useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation, useMatches } from "react-router-dom";
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

    if (scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, location.state]);

  return null;
};

const MainLayout = () => {
  const matches = useMatches();
  const is404 = matches.some(match => match?.handle?.is404);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <Navbar />
      <main className="grow flex flex-col">
        <Outlet />
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

