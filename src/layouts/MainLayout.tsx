import { Outlet, useLocation } from "react-router-dom";
import { WhatsAppFAB } from "@/components/common/WhatsAppFAB";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout() {
  const { pathname } = useLocation();
  const showWhatsApp =
    !pathname.startsWith("/admin") && pathname !== "/checkout";
  const hasStickyCTA = /^\/product\/[^/]+$/.test(pathname);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
      <Navbar />
      <main className="pb-12 pt-0 sm:pt-6">
        <Outlet />
      </main>
      <Footer />
      {showWhatsApp && <WhatsAppFAB hasStickyCTA={hasStickyCTA} />}
    </div>
  );
}
