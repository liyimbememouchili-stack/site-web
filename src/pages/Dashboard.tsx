import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getFormation, formatXAF } from "@/data/formations";
import { GraduationCap, ArrowRight, Award, Loader2 } from "lucide-react";

interface Enrollment { formation_slug: string; payment_status: string; }
interface Progress { formation_slug: string; module_index: number; completed: boolean; }

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [profileName, setProfileName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("enrollments").select("formation_slug, payment_status").eq("user_id", user.id),
      supabase.from("module_progress").select("formation_slug, module_index, completed").eq("user_id", user.id),
      supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle(),
    ]).then(([e, p, pr]) => {
      setEnrollments((e.data as Enrollment[]) || []);
      setProgress((p.data as Progress[]) || []);
      setProfileName(pr.data?.full_name || user.email || "Apprenant");
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;

  return (
    <>
      <PageHeader eyebrow="Tableau de bord" title={`Bonjour ${profileName.split(" ")[0]} 👋`} description="Reprenez votre apprentissage ou inscrivez-vous à une nouvelle formation." />

      <section className="container py-12">
        <h2 className="font-display font-bold text-xl mb-5 text-primary">Mes formations</h2>

        {enrollments.length === 0 ? (
          <Card className="p-10 text-center">
            <GraduationCap className="h-12 w-12 text-accent mx-auto mb-3" />
            <h3 className="font-display font-semibold text-lg mb-2">Vous n'êtes inscrit à aucune formation</h3>
            <p className="text-muted-foreground text-sm mb-5">Découvrez nos programmes et démarrez le module 1 gratuitement.</p>
            <Button variant="hero" asChild><Link to="/formations">Explorer les formations <ArrowRight className="h-4 w-4" /></Link></Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {enrollments.map((e) => {
              const f = getFormation(e.formation_slug);
              if (!f) return null;
              const completedCount = progress.filter((p) => p.formation_slug === e.formation_slug && p.completed).length;
              const pct = Math.round((completedCount / f.modules.length) * 100);
              const nextModule = progress.filter((p) => p.formation_slug === e.formation_slug && p.completed).length;
              return (
                <Card key={e.formation_slug} className="p-6 hover-lift">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display font-bold text-primary">{f.title}</h3>
                    {e.payment_status === "paid" ? (
                      <span className="px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-semibold">Accès complet</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">Module 1 gratuit</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">{completedCount}/{f.modules.length} modules terminés</div>
                  <Progress value={pct} className="h-2 mb-5" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="hero" asChild className="flex-1">
                      <Link to={`/formations/${f.slug}/module/${Math.min(nextModule, f.modules.length - 1)}`}>
                        Continuer <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/formations/${f.slug}`}>Programme</Link>
                    </Button>
                  </div>
                  {e.payment_status !== "paid" && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Modules 2+ : {formatXAF(f.per_module_xaf)} chacun.
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        <h2 className="font-display font-bold text-xl mt-12 mb-5 text-primary flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" /> Mes certificats
        </h2>
        <Card className="p-6 text-sm text-muted-foreground">
          Vos certificats apparaîtront ici à mesure que vous terminerez vos formations.
        </Card>
      </section>
    </>
  );
};

export default Dashboard;
