import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formations, formatXAF } from "@/data/formations";
import { ArrowRight, Clock, Layers } from "lucide-react";

const categories = [
  { id: "all", label: "Toutes" },
  { id: "certification", label: "Certifications" },
  { id: "logiciel", label: "Logiciels stats" },
  { id: "office", label: "MS Office" },
  { id: "os", label: "OS & Open Source" },
  { id: "db", label: "Bases de données" },
];

const Formations = () => {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? formations : formations.filter((f) => f.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Nos formations"
        title="Huit programmes pour faire décoller votre carrière"
        description="Du débutant à l'expert : choisissez votre parcours. Le premier module de chaque formation est gratuit."
      />
      <section className="container py-12">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                filter === c.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/70"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((f) => (
            <Card key={f.slug} className="p-6 hover-lift flex flex-col">
              {f.badge && (
                <span className="self-start mb-3 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                  {f.badge}
                </span>
              )}
              <h3 className="font-display font-bold text-lg mb-2 text-primary">{f.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{f.short}</p>
              <div className="text-xs text-muted-foreground space-y-1.5 mb-5">
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {f.duration}</div>
                <div className="flex items-center gap-2"><Layers className="h-3.5 w-3.5" /> {f.modules.length} modules</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="text-xs text-muted-foreground">À partir de</div>
                  <div className="font-display font-bold text-primary text-sm">{formatXAF(f.per_module_xaf)}<span className="text-xs font-normal text-muted-foreground"> /module</span></div>
                </div>
                <Button size="sm" variant="hero" asChild>
                  <Link to={`/formations/${f.slug}`}>Détails <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Formations;
