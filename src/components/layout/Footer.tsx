import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-gold">
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </span>
            Académie DCI
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            L'Académie des Données et des Certifications Internationales — former l'Afrique aux métiers de la donnée et de la qualité.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-accent">Découvrir</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/a-propos" className="hover:text-accent transition-smooth">À propos</Link></li>
            <li><Link to="/a-propos/equipe" className="hover:text-accent transition-smooth">Notre équipe</Link></li>
            <li><Link to="/a-propos/partenaires" className="hover:text-accent transition-smooth">Partenaires</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-smooth">Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-accent">Apprendre</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/formations" className="hover:text-accent transition-smooth">Toutes les formations</Link></li>
            <li><Link to="/certifications" className="hover:text-accent transition-smooth">Certifications</Link></li>
            <li><Link to="/formations/lean-six-sigma" className="hover:text-accent transition-smooth">Six Sigma</Link></li>
            <li><Link to="/formations/data-science" className="hover:text-accent transition-smooth">Data Science</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3 text-accent">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> contact@academie-dci.com</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> +237 6 00 00 00 00</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Yaoundé / Dakar / 100% en ligne</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Académie DCI. Tous droits réservés.</p>
          <p>Paiements en FCFA (XAF) — paiement en ligne bientôt disponible.</p>
        </div>
      </div>
    </footer>
  );
};
