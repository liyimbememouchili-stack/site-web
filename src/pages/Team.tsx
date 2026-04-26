import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { team } from "@/data/site";
import { Linkedin } from "lucide-react";

const Team = () => (
  <>
    <PageHeader eyebrow="Notre équipe" title="Des formateurs reconnus, en activité" description="Notre force : une équipe pluridisciplinaire qui pratique au quotidien ce qu'elle enseigne." />
    <section className="container py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((m) => (
        <Card key={m.name} className="p-6 hover-lift">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-gold text-accent-foreground font-display font-bold text-lg shadow-gold">
              {m.initials}
            </div>
            <div>
              <h3 className="font-display font-bold text-primary">{m.name}</h3>
              <p className="text-xs text-accent font-semibold">{m.role}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
          <a className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-smooth" href="#" aria-label={`Profil LinkedIn de ${m.name}`}>
            <Linkedin className="h-3.5 w-3.5" /> Voir le profil LinkedIn
          </a>
        </Card>
      ))}
    </section>
  </>
);

export default Team;
