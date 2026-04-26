import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ClipboardList, BarChart3, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: ClipboardList, slug: "enquetes", title: "Enquêtes Statistiques", short: "Conception, échantillonnage, collecte (CAPI/CATI), saisie et apurement de vos enquêtes." },
  { icon: BarChart3, slug: "analyse", title: "Analyse des Données", short: "Statistiques descriptives, modèles prédictifs, dashboards interactifs sur mesure." },
  { icon: Briefcase, slug: "conseil", title: "BE & Cabinet-Conseil en Statistiques", short: "Accompagnement stratégique en data, qualité et amélioration continue." },
];

const Services = () => (
  <>
    <PageHeader eyebrow="Nos services" title="Au-delà de la formation, nous vous accompagnons" description="Notre Bureau d'Études et notre Cabinet-Conseil mettent leur expertise au service de vos projets." />
    <section className="container py-16 grid md:grid-cols-3 gap-6">
      {services.map((s) => (
        <Card key={s.slug} className="p-7 hover-lift flex flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold mb-4">
            <s.icon className="h-6 w-6 text-accent-foreground" />
          </div>
          <h3 className="font-display font-bold text-lg mb-2 text-primary">{s.title}</h3>
          <p className="text-sm text-muted-foreground mb-5 flex-1">{s.short}</p>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/services/${s.slug}`}>En savoir plus <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Card>
      ))}
    </section>
  </>
);

export default Services;
