import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFormation, formatXAF } from "@/data/formations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Lock, ArrowLeft, ArrowRight, Loader2, CreditCard, PlayCircle } from "lucide-react";
import { toast } from "sonner";

const ModulePage = () => {
  const { slug = "", index = "0" } = useParams();
  const moduleIndex = Number(index);
  const formation = getFormation(slug);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (!user || !formation) return;
    Promise.all([
      supabase.from("enrollments").select("*").eq("user_id", user.id).eq("formation_slug", slug).maybeSingle(),
      supabase.from("module_progress").select("*").eq("user_id", user.id).eq("formation_slug", slug).eq("module_index", moduleIndex).maybeSingle(),
    ]).then(([e, p]) => {
      setEnrollment(e.data);
      setCompleted(p.data?.completed || false);
      setLoading(false);
    });
  }, [user, formation, slug, moduleIndex]);

  if (!formation) return <div className="container py-20 text-center">Formation introuvable.</div>;

  const module = formation.modules[moduleIndex];
  if (!module) return <div className="container py-20 text-center">Module introuvable.</div>;

  const isFree = moduleIndex === 0;
  const isPaid = enrollment?.payment_status === "paid";
  const accessible = isFree || isPaid;

  const markComplete = async () => {
    if (!user) return;
    setMarking(true);
    const { error } = await supabase.from("module_progress").upsert({
      user_id: user.id,
      formation_slug: slug,
      module_index: moduleIndex,
      completed: true,
      completed_at: new Date().toISOString(),
    }, { onConflict: "user_id,formation_slug,module_index" });
    if (error) toast.error("Erreur"); else { setCompleted(true); toast.success("Module terminé !"); }
    setMarking(false);
  };

  const simulatePayment = async () => {
    if (!user) return;
    const { error } = await supabase.from("enrollments").update({
      payment_status: "paid",
      amount_xaf: formation.price_xaf,
      paid_at: new Date().toISOString(),
    }).eq("user_id", user.id).eq("formation_slug", slug);
    if (error) { toast.error("Erreur"); return; }
    toast.success("Accès complet débloqué (paiement à intégrer prochainement)");
    setEnrollment({ ...enrollment, payment_status: "paid" });
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;

  if (!accessible) {
    return (
      <>
        <PageHeader eyebrow={`Module ${moduleIndex + 1} • ${formation.title}`} title={module.title} />
        <section className="container py-16 max-w-2xl">
          <Card className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <Lock className="h-7 w-7 text-accent" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">Module verrouillé</h2>
            <p className="text-muted-foreground mb-6">
              Pour accéder à ce module et à la suite de la formation, débloquez l'accès complet.
            </p>
            <div className="bg-secondary rounded-xl p-5 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Par module</span><strong>{formatXAF(formation.per_module_xaf)}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Accès complet (tous les modules + certification)</span><strong className="text-primary">{formatXAF(formation.price_xaf)}</strong></div>
            </div>
            <Button variant="hero" size="lg" onClick={simulatePayment}>
              <CreditCard className="h-4 w-4" /> Débloquer l'accès complet
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Le paiement en ligne en FCFA sera intégré prochainement. Pour le moment, contactez-nous pour finaliser le règlement.
            </p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/formations/${slug}`}><ArrowLeft className="h-4 w-4" /> Retour au programme</Link>
              </Button>
            </div>
          </Card>
        </section>
      </>
    );
  }

  const prev = moduleIndex > 0 ? moduleIndex - 1 : null;
  const next = moduleIndex < formation.modules.length - 1 ? moduleIndex + 1 : null;

  return (
    <>
      <PageHeader eyebrow={`Module ${moduleIndex + 1}/${formation.modules.length} • ${formation.title}`} title={module.title} description={module.summary} />

      <section className="container py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-7">
            <div className="aspect-video w-full rounded-xl gradient-hero flex items-center justify-center mb-6">
              <div className="text-center text-primary-foreground">
                <PlayCircle className="h-14 w-14 mx-auto mb-2 text-accent" />
                <p className="text-sm text-primary-foreground/80">Vidéo & contenu interactif du module</p>
              </div>
            </div>
            <h2 className="font-display font-bold text-xl mb-4 text-primary">Plan du module ({module.duration})</h2>
            <ul className="space-y-3">
              {module.lessons.map((l, i) => (
                <li key={i} className="flex gap-3 items-start text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="text-foreground/85">{l}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-7">
            <h3 className="font-display font-bold text-lg mb-3 text-primary">Ressources</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Le support de cours, les exercices et l'accès à la classe virtuelle vous seront communiqués par email
              et par votre formateur référent dès le démarrage de la session.
            </p>
            <div className="flex flex-wrap gap-2">
              {!completed ? (
                <Button variant="hero" onClick={markComplete} disabled={marking}>
                  <CheckCircle2 className="h-4 w-4" /> Marquer comme terminé
                </Button>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/15 text-success text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Module terminé
                </span>
              )}
              {next !== null && completed && (
                <Button variant="outline" onClick={() => navigate(`/formations/${slug}/module/${next}`)}>
                  Module suivant <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>

        <aside>
          <Card className="p-5 sticky top-20">
            <h4 className="font-display font-semibold mb-3 text-primary text-sm">Programme complet</h4>
            <ul className="space-y-1.5">
              {formation.modules.map((m, i) => {
                const free = i === 0;
                const acc = free || isPaid;
                const isCurrent = i === moduleIndex;
                return (
                  <li key={i}>
                    <Link
                      to={`/formations/${slug}/module/${i}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-smooth ${
                        isCurrent ? "bg-primary text-primary-foreground" : acc ? "hover:bg-secondary text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <span className="font-semibold w-5 shrink-0">{i + 1}</span>
                      <span className="flex-1 truncate">{m.title}</span>
                      {!acc && <Lock className="h-3 w-3" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 pt-4 border-t border-border flex justify-between gap-2">
              {prev !== null ? (
                <Button size="sm" variant="ghost" asChild><Link to={`/formations/${slug}/module/${prev}`}><ArrowLeft className="h-3.5 w-3.5" /> Préc.</Link></Button>
              ) : <span />}
              {next !== null && (
                <Button size="sm" variant="ghost" asChild><Link to={`/formations/${slug}/module/${next}`}>Suiv. <ArrowRight className="h-3.5 w-3.5" /></Link></Button>
              )}
            </div>
          </Card>
        </aside>
      </section>
    </>
  );
};

export default ModulePage;
