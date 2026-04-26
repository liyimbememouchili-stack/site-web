import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { domains } from "@/data/site";
import { Sparkles } from "lucide-react";

const Domains = () => (
  <>
    <PageHeader eyebrow="Nos domaines" title="Six grands domaines d'expertise" description="Notre offre couvre l'ensemble du cycle de vie de la donnée et de la qualité." />
    <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((d, i) => (
        <Card key={d.title} className="p-7 hover-lift gradient-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg gradient-gold text-accent-foreground font-bold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <h3 className="font-display font-bold text-lg mb-2 text-primary">{d.title}</h3>
          <p className="text-sm text-muted-foreground">{d.desc}</p>
        </Card>
      ))}
    </section>
  </>
);

export default Domains;
