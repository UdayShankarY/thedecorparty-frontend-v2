import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#ffffff_100%)] text-slate-900">
      <Navbar />
      <main className="pb-12 pt-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
