import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formations, formatXAF } from "@/data/formations";
import { ArrowRight, Award } from "lucide-react";
import sixsigma from "@/assets/sixsigma.jpg";
import datascience from "@/assets/datascience.jpg";
import pm from "@/assets/pm.jpg";
import spc from "@/assets/spc.jpg";

const visuals: Record<string, string> = {
  "lean-six-sigma": sixsigma,
  "data-science": datascience,
  "project-management": pm,
  "msp-spc": spc,
};

const Certifications = () => {
  const certs = formations.filter((f) => f.category === "certification");
  return (
    <>
      <PageHeader
        eyebrow="Certifications internationales"
        title="Quatre certifications pour propulser votre profil"
        description="Des programmes alignés sur les standards internationaux, avec un module 1 toujours gratuit pour découvrir le contenu."
      />
      <section className="container py-16 space-y-10">
        {certs.map((f, i) => (
          <Card key={f.slug} className="overflow-hidden hover-lift">
            <div className={`grid lg:grid-cols-2 gap-0 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div
                className="min-h-[260px] bg-cover bg-center"
                style={{ backgroundImage: `url(${visuals[f.slug] || sixsigma})` }}
                role="img"
                aria-label={f.title}
              />
              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex items-center gap-2 text-accent mb-3">
                  <Award className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Certification</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-primary mb-3">{f.title}</h3>
                <p className="text-muted-foreground mb-5 flex-1">{f.description}</p>
                <div className="grid grid-cols-3 gap-4 text-xs mb-6">
                  <div><div className="text-muted-foreground">Durée</div><div className="font-semibold">{f.duration}</div></div>
                  <div><div className="text-muted-foreground">Modules</div><div className="font-semibold">{f.modules.length}</div></div>
                  <div><div className="text-muted-foreground">Par module</div><div className="font-semibold text-primary">{formatXAF(f.per_module_xaf)}</div></div>
                </div>
                <div>
                  <Button variant="hero" asChild>
                    <Link to={`/formations/${f.slug}`}>Voir le programme <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
};

export default Certifications;
