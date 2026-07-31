import { useEffect } from "react";
import { createBrowserRouter, useNavigate, Outlet, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import CaseStudyDetails from "../pages/Case-Study/Details";

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
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/project/:slug", index: true, element: <CaseStudyDetails /> },
      { path: "*", element: <PlaceholderPage /> },
    ]
  }
]);

/* ── Temporary placeholder for unbuilt pages ────────────────────────────── */
export function PlaceholderPage({ title }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#EDECF1] px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <nav className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-semibold text-[#19C853] tracking-wide">
            DR DESIGN TECHNOLOGY
          </span>
          <span className="text-xs text-[#0C0D0D]/20">/</span>
          <span className="text-xs text-[#0C0D0D]/40">{title}</span>
        </nav>

        <h1 className="text-2xl font-black text-[#0C0D0D] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Placeholder Card */}
      <div className="relative rounded-xl border border-[#0C0D0D]/6 bg-white overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#19C853]/10 blur-3xl rounded-full" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
          {/* Icon */}
          <div className="text-5xl">🚧</div>

          {/* Title */}
          <h2 className="text-lg font-bold text-[#0C0D0D] tracking-tight">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-sm text-[#0C0D0D]/60 max-w-md leading-relaxed">
            The <span className="text-[#19C853] font-semibold">{title}</span>{" "}
            page you are looking for is currently under development or does not
            exist.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-5 py-2 rounded-lg text-xs font-bold bg-[#19C853] text-white shadow-lg shadow-[#19C853]/25 hover:shadow-[#19C853]/40 transition-all"
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
