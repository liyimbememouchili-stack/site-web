import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Quote, Star, Sparkles, Rocket, Globe2, HeartHandshake, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { testimonials, journey, faq, partners } from "@/data/site";
import heroImg from "@/assets/hero.jpg";

const stats = [
  { value: 1200, suffix: "+", label: "Apprenants formés" },
  { value: 92, suffix: "%", label: "Taux de réussite" },
  { value: 7, suffix: "", label: "Pays touchés" },
  { value: 24, suffix: "/7", label: "Plateforme accessible" },
];

// Animated counter
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else setN(to);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold text-accent">
      {n.toLocaleString("fr-FR")}{suffix}
    </div>
  );
};

const Index = () => {
  const [tIndex, setTIndex] = useState(0);

  // Auto-rotating testimonials
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO with animated gradient blobs */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />

        <div className="container relative py-20 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wide uppercase mb-5">
              <Sparkles className="h-3 w-3" /> Bienvenue à l'Académie DCI
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Apprendre, Certifier, <span className="text-gradient-gold">Transformer</span> votre carrière.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl">
              La plateforme de référence en Afrique francophone pour les certifications en data, qualité et gestion de projet.
              Inscrivez-vous, testez gratuitement, certifiez-vous.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth?mode=signup">
                  Commencer gratuitement <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/a-propos">Découvrir l'Académie</Link>
              </Button>
            </div>
          </div>

          {/* Live floating card */}
          <div className="hidden lg:block animate-fade-up">
            <div className="relative">
              <img
                src={heroImg}
                alt="Apprenants en formation à l'Académie DCI"
                width={1600}
                height={1000}
                className="rounded-2xl shadow-elegant border border-accent/20"
              />
              <Card className="absolute -bottom-6 -left-6 p-4 max-w-xs bg-card/95 backdrop-blur shadow-elegant animate-fade-up">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold shrink-0">
                    <GraduationCap className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">+12 inscrits aujourd'hui</div>
                    <p className="text-xs text-muted-foreground">Rejoignez la communauté DCI.</p>
                  </div>
                </div>
              </Card>
              <Card className="absolute -top-6 -right-6 p-3 bg-card/95 backdrop-blur shadow-elegant hidden xl:flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-foreground">4.9/5 — 230 avis</span>
              </Card>
            </div>
          </div>
        </div>

        {/* Animated KPI strip */}
        <div className="relative border-t border-primary-foreground/10 bg-primary/40 backdrop-blur">
          <div className="container grid grid-cols-2 md:grid-cols-4 py-8 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <Counter to={s.value} suffix={s.suffix} />
                <div className="text-xs text-primary-foreground/70 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY — 4 steps unique to home */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Votre parcours</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">De l'inscription au certificat en 4 étapes</h2>
          <p className="mt-4 text-muted-foreground">Un parcours simple, transparent et flexible, conçu pour s'adapter à votre rythme.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.map((j, i) => (
            <Card
              key={j.step}
              className="relative p-7 hover-lift gradient-card border-border/60"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -top-4 left-7 flex h-10 px-3 items-center justify-center rounded-lg gradient-gold shadow-gold font-display font-bold text-accent-foreground text-sm">
                {j.step}
              </div>
              <h3 className="font-display font-bold text-lg mb-2 mt-3 text-primary">{j.title}</h3>
              <p className="text-sm text-muted-foreground">{j.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* COMMITMENTS — unique pillars */}
      <section className="bg-secondary py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: "Pédagogie immersive", desc: "Études de cas, projets capstones et coaching live avec des praticiens en activité." },
              { icon: Globe2, title: "Empreinte panafricaine", desc: "Apprenants de 8 pays, formateurs basés à Yaoundé, Dakar et Abidjan." },
              { icon: HeartHandshake, title: "Engagement humain", desc: "Un référent dédié pendant toute votre formation et un suivi post-certification." },
            ].map((p) => (
              <Card key={p.title} className="p-7 hover-lift bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold mb-4">
                  <p.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-primary">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — auto-rotating carousel */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Ils nous recommandent</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">La parole à nos apprenants</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 shadow-elegant relative overflow-hidden">
            <Quote className="absolute -top-4 -left-4 h-24 w-24 text-accent/10" />
            <div className="relative min-h-[180px]">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === tIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-foreground/90 italic mb-6">
                    « {t.quote} »
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-gold text-accent-foreground font-display font-bold text-sm shadow-gold">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-primary">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === tIndex ? "w-8 bg-accent" : "w-2 bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS TICKER — animated marquee */}
      <section className="bg-primary text-primary-foreground py-12 overflow-hidden">
        <div className="container mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Ils nous font confiance</p>
        </div>
        <div className="relative flex">
          <div className="flex shrink-0 gap-12 animate-marquee whitespace-nowrap pr-12">
            {[...partners, ...partners].map((p, i) => (
              <div key={`${p.name}-${i}`} className="flex items-center gap-2 text-sm font-display font-semibold opacity-80">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {p.name}
              </div>
            ))}
          </div>
          <div className="flex shrink-0 gap-12 animate-marquee whitespace-nowrap pr-12" aria-hidden="true">
            {[...partners, ...partners].map((p, i) => (
              <div key={`${p.name}-d-${i}`} className="flex items-center gap-2 text-sm font-display font-semibold opacity-80">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — accordion unique to home */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Questions fréquentes</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Tout ce que vous devez savoir avant de démarrer</h2>
            <p className="text-muted-foreground">Une autre question ? Notre équipe vous répond sous 24h via la page contact.</p>
          </div>
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-display font-semibold text-primary hover:text-accent">
                    <span className="flex items-center gap-3">
                      <ChevronDown className="h-4 w-4 text-accent shrink-0" />
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-7">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <Card className="overflow-hidden border-0 gradient-hero text-primary-foreground p-10 md:p-16 text-center shadow-elegant relative">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 relative">
            Prêt à rejoindre <span className="text-gradient-gold">l'Académie DCI</span> ?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 relative">
            Créez votre compte gratuitement et accédez immédiatement au premier module de chaque formation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth?mode=signup">Créer mon compte <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Index;
