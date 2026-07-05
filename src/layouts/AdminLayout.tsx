import { Outlet, NavLink } from "react-router-dom";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

const links = [
  { label: "Overview", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Container>
        <div className="flex flex-col gap-8 py-8 lg:flex-row">
          <aside className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm lg:w-72">
            <div className="mb-4 px-3 py-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">Control center</p>
            </div>
            <nav className="space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn("block rounded-2xl px-3 py-2 text-sm font-medium transition", isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}
