import { Link } from "react-router-dom";
import Container from "@/components/ui/container";
import { buildWhatsAppUrl } from "@/utils/buildWhatsAppUrl";
import { footerLinks } from "@/constants/navigation";

export function Footer() {
  const whatsappHref = buildWhatsAppUrl("Hi TheDecorParty! I need help with my booking.");

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-white">TheDecorParty</p>
            <p className="max-w-sm text-sm text-slate-400">
              Book premium event decorations and celebration packages across Bangalore.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
              Shop
            </p>
            <ul className="space-y-2 text-sm">
              {footerLinks.shop.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
              Support
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  WhatsApp Support
                </a>
              </li>
              {footerLinks.support.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} TheDecorParty. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
