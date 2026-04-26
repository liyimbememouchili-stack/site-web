import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { partners } from "@/data/site";
import { Building2 } from "lucide-react";

const Partners = () => (
  <>
    <PageHeader eyebrow="Nos partenaires" title="Un réseau qui valorise nos certifications" description="Universités, institutions et entreprises qui nous accompagnent et recrutent nos diplômés." />
    <section className="container py-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {partners.map((p) => (
        <Card key={p.name} className="p-6 text-center hover-lift">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-sm text-primary">{p.name}</h3>
          <p className="text-xs text-accent mt-1 font-medium">{p.type}</p>
        </Card>
      ))}
    </section>
  </>
);

export default Partners;
