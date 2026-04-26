import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, GraduationCap, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems: { label: string; to: string; children?: { label: string; to: string }[] }[] = [
  { label: "Accueil", to: "/" },
  {
    label: "Qui sommes-nous",
    to: "/a-propos",
    children: [
      { label: "À propos", to: "/a-propos" },
      { label: "Nos domaines", to: "/a-propos/domaines" },
      { label: "Notre équipe", to: "/a-propos/equipe" },
      { label: "Nos partenaires", to: "/a-propos/partenaires" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Enquêtes statistiques", to: "/services/enquetes" },
      { label: "Analyse des données", to: "/services/analyse" },
      { label: "BE & Cabinet-Conseil", to: "/services/conseil" },
    ],
  },
  { label: "Formations", to: "/formations" },
  { label: "Certifications", to: "/certifications" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-gold shadow-gold">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </span>
          <span className="hidden sm:block">
            <span className="text-primary">Académie</span>
            <span className="text-accent">DCI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {item.children.map((c) => (
                    <DropdownMenuItem key={c.to} asChild>
                      <Link to={c.to} className="cursor-pointer">{c.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-smooth ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full gradient-gold text-xs font-bold text-accent-foreground">
                    {(user.email?.[0] || "U").toUpperCase()}
                  </span>
                  Mon espace
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard"><LayoutDashboard className="h-4 w-4 mr-2" />Tableau de bord</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => { await signOut(); navigate("/"); }}>
                  <LogOut className="h-4 w-4 mr-2" />Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Se connecter</Link>
              </Button>
              <Button size="sm" variant="hero" asChild>
                <Link to="/auth?mode=signup">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container flex flex-col py-4 gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-2 py-2 font-medium text-sm text-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 flex flex-col border-l border-border pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpen(false)}
                        className="py-1.5 text-sm text-muted-foreground hover:text-primary"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
              {user ? (
                <>
                  <Button variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </Button>
                  <Button variant="ghost" onClick={async () => { await signOut(); setOpen(false); navigate("/"); }}>
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link to="/auth">Se connecter</Link>
                  </Button>
                  <Button variant="hero" asChild onClick={() => setOpen(false)}>
                    <Link to="/auth?mode=signup">S'inscrire</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
