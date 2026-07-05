import { Globe2, Mail, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/container";
import { footerLinks } from "@/constants/navigation";

const socialLinks = [
  { label: "Instagram", icon: Globe2, href: "https://instagram.com" },
  { label: "Facebook", icon: MessageCircle, href: "https://facebook.com" },
  { label: "LinkedIn", icon: Send, href: "https://linkedin.com" },
  { label: "Email", icon: Mail, href: "mailto:hello@thedecorparty.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-white">TheDecorParty</p>
            <p className="max-w-sm text-sm text-slate-400">
              Premium decor solutions for memorable celebrations, orchestrated through a modern digital experience.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Company</p>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Support</p>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-full border border-slate-800 p-2 text-slate-400 transition hover:border-violet-400 hover:text-white">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TheDecorParty. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map((item) => (
              <Link key={item.label} to={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
