import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FlaskConical } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Team", path: "/team" },
  { label: "Research", path: "/research" },
  { label: "Publications", path: "/publications" },
  
  { label: "News", path: "/news" },
];

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">MD Lab</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-card p-6">
            <div className="flex items-center gap-2 mb-8">
              <FlaskConical className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground">MD Lab</span>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-secondary-foreground">MD Lab</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Advancing drug discovery through computational innovation at the intersection of chemistry, biology, and AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Department of Chemistry & Biochemistry</li>
              <li>123 Science Drive</li>
              <li>Research City, ST 12345</li>
              <li className="pt-2">info@molecdynamicslab.edu</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Office Hours</h4>
            <p className="text-sm text-slate-300">Monday – Friday<br />9:00 AM – 5:00 PM</p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-xs text-slate-500">
          © 2025 Molecular Dynamics Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[73px]">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
