import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingCart, Sparkles, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b border-slate-200/80 backdrop-blur-xl transition-all", isScrolled ? "bg-white/85 shadow-sm" : "bg-white/70")}> 
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">TheDecorParty</p>
            <p className="text-xs text-slate-500">Premium decor</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="mr-2 h-4 w-4 text-slate-500" />
            <Input placeholder="Search decor" className="h-8 w-40 border-0 bg-transparent px-0 shadow-none focus:ring-0" />
          </div>
          <Button variant="outline" className="rounded-full">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
          <Button variant="ghost" asChild className="rounded-full">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-2 text-sm">Cart</span>
              <span className="ml-2 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white">2</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-full">
            <Link to="/profile">
              <UserRound className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 lg:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg lg:hidden">
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                <Search className="h-4 w-4 text-slate-500" />
                <Input placeholder="Search decor" className="h-8 border-0 bg-transparent px-0 shadow-none focus:ring-0" />
              </div>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <NavLink key={item.href} to={item.href} onClick={() => setIsOpen(false)} className={({ isActive }) => cn("block rounded-2xl px-3 py-2 text-sm font-medium", isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100") }>
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profile & orders</p>
                  <p className="text-xs text-slate-500">Manage your account quickly</p>
                </div>
                <Button variant="outline" className="rounded-full" onClick={() => setIsOpen(false)} asChild>
                  <Link to="/profile">Open</Link>
                </Button>
              </div>
              <div className="flex justify-end">
                <button className="rounded-full p-2 text-slate-600" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
