import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFormation, formatXAF } from "@/data/formations";
import { Lock, PlayCircle, CheckCircle2, Clock, Award, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FormationDetail = () => {
  const { slug = "" } = useParams();
  const formation = getFormation(slug);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const [enrollment, setEnrollment] = useState<{ payment_status: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !formation) { setLoading(false); return; }
    supabase
      .from("enrollments")
      .select("payment_status")
      .eq("user_id", user.id)
      .eq("formation_slug", formation.slug)
      .maybeSingle()
      .then(({ data }) => { setEnrollment(data); setLoading(false); });
  }, [user, formation]);

  if (!formation) {
    return (
      <div className="container py-20 text-center">
        <p>Formation introuvable.</p>
        <Button asChild className="mt-4"><Link to="/formations">Retour</Link></Button>
      </div>
    );
  }

  const handleStart = async () => {
    if (!user) { navigate(`/auth?redirect=/formations/${formation.slug}`); return; }
    setEnrolling(true);
    if (!enrollment) {
      const { error } = await supabase.from("enrollments").insert({
        user_id: user.id,
        formation_slug: formation.slug,
        payment_status: "free_trial",
      });
      if (error) { toast.error("Erreur lors de l'inscription"); setEnrolling(false); return; }
      toast.success("Inscription validée — accès au module 1 gratuit !");
    }
    navigate(`/formations/${formation.slug}/module/0`);
  };

  const isPaid = enrollment?.payment_status === "paid";

  return (
    <>
      <PageHeader eyebrow="Formation certifiante" title={formation.title} description={formation.short} />

      <section className="container py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-7">
            <h2 className="font-display font-bold text-xl mb-3 text-primary">À propos de cette formation</h2>
            <p className="text-muted-foreground leading-relaxed">{formation.description}</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5" />
                <div><div className="text-xs text-muted-foreground">Durée</div><div className="font-semibold text-sm">{formation.duration}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-accent mt-0.5" />
                <div><div className="text-xs text-muted-foreground">Niveau</div><div className="font-semibold text-sm">{formation.level}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-accent mt-0.5" />
                <div><div className="text-xs text-muted-foreground">Certificat</div><div className="font-semibold text-sm">À l'issue</div></div>
              </div>
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="font-display font-bold text-xl mb-5 text-primary">Programme — {formation.modules.length} modules</h2>
            <div className="space-y-3">
              {formation.modules.map((m, idx) => {
                const isFree = idx === 0;
                const accessible = isFree || isPaid;
                return (
                  <div key={m.index} className="border border-border rounded-xl p-4 hover:border-accent/50 transition-smooth">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary font-bold text-sm shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-display font-semibold text-sm truncate">{m.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.duration} • {m.lessons.length} leçons</p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        {isFree ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-semibold">
                            Gratuit
                          </span>
                        ) : accessible ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground ml-11 leading-relaxed">{m.summary}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <aside className="lg:col-span-1">
          <Card className="p-6 sticky top-20 shadow-elegant">
            <div className="text-center pb-4 border-b border-border">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Tarif par module</div>
              <div className="font-display font-bold text-3xl text-primary mt-1">{formatXAF(formation.per_module_xaf)}</div>
              <div className="text-xs text-muted-foreground mt-1">Module 1 toujours gratuit</div>
            </div>
            <div className="py-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total complet</span><strong>{formatXAF(formation.price_xaf)}</strong></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Modules</span><strong>{formation.modules.length}</strong></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Certification</span><strong className="text-success">Incluse</strong></div>
            </div>
            {loading ? (
              <Button disabled className="w-full"><Loader2 className="h-4 w-4 animate-spin" /></Button>
            ) : (
              <Button variant="hero" size="lg" className="w-full" onClick={handleStart} disabled={enrolling}>
                <PlayCircle className="h-5 w-5" />
                {enrollment ? "Continuer" : "Commencer le module 1 (gratuit)"}
              </Button>
            )}
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Le paiement en ligne en FCFA sera bientôt disponible.
            </p>
          </Card>
        </aside>
      </section>
    </>
  );
};

export default FormationDetail;
