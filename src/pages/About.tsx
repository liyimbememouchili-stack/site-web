import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Calendar } from "lucide-react";
import { milestones } from "@/data/site";

const About = () => (
  <>
    <PageHeader
      eyebrow="À propos"
      title="L'Académie des Données et des Certifications Internationales"
      description="Une institution panafricaine dédiée à la montée en compétences sur les métiers de la donnée, de la qualité et de la gestion de projet."
    />

    <section className="container py-16 grid md:grid-cols-3 gap-6">
      {[
        { icon: Target, title: "Notre mission", text: "Démocratiser l'accès aux compétences quantitatives en Afrique francophone, à travers des formations certifiantes accessibles, pratiques et internationalement reconnues." },
        { icon: Eye, title: "Notre vision", text: "Devenir d'ici 5 ans la référence francophone pour les certifications en statistiques, qualité, data science et gestion de projet." },
        { icon: Heart, title: "Nos valeurs", text: "Excellence pédagogique, accessibilité financière, ancrage africain, ouverture internationale et accompagnement humain de chaque apprenant." },
      ].map((b) => (
        <Card key={b.title} className="p-7 hover-lift">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold mb-4">
            <b.icon className="h-6 w-6 text-accent-foreground" />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">{b.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
        </Card>
      ))}
    </section>

    {/* TIMELINE — unique to About */}
    <section className="bg-secondary py-16">
      <div className="container max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Notre histoire</p>
        <h2 className="font-display text-3xl font-bold mb-10 text-primary">Six années de croissance continue</h2>
        <div className="relative border-l-2 border-accent/30 pl-8 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <div className="absolute -left-[42px] flex h-10 w-10 items-center justify-center rounded-full gradient-gold shadow-gold">
                <Calendar className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="font-display font-bold text-2xl text-primary">{m.year}</div>
              <p className="text-foreground/80 mt-1 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PEDAGOGY — unique to About */}
    <section className="container py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Notre approche</p>
        <h2 className="font-display text-3xl font-bold text-primary">Une pédagogie en 3 temps</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Comprendre", text: "Cours théoriques structurés, glossaire bilingue (FR/EN), supports téléchargeables." },
          { title: "Pratiquer", text: "Quiz interactifs après chaque module, exercices guidés et études de cas réels." },
          { title: "Appliquer", text: "Projet final encadré et présentation devant un jury pour valider la certification." },
        ].map((p, i) => (
          <Card key={p.title} className="p-7 gradient-card hover-lift">
            <div className="font-display text-5xl font-bold text-accent/30 mb-3">0{i + 1}</div>
            <h3 className="font-display font-bold text-xl text-primary mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm">{p.text}</p>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default About;
