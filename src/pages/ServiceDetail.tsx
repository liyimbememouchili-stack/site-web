import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const data: Record<string, { title: string; eyebrow: string; description: string; sections: { title: string; items: string[] }[] }> = {
  enquetes: {
    eyebrow: "Service",
    title: "Enquêtes Statistiques",
    description: "De la conception du questionnaire à la livraison des données apurées, nous prenons en charge l'intégralité du dispositif.",
    sections: [
      { title: "Notre offre", items: ["Cadrage et plan de sondage (aléatoire, stratifié, en grappes)", "Conception et test du questionnaire (papier, CAPI, CATI, web)", "Recrutement et formation des enquêteurs", "Suivi terrain en temps réel via tableau de bord", "Saisie, apurement, codification et livraison"] },
      { title: "Pour qui ?", items: ["Instituts nationaux de statistique", "ONG et bailleurs de fonds (UE, BAD, USAID, AFD)", "Cabinets d'études", "Entreprises souhaitant mesurer la satisfaction client"] },
    ],
  },
  analyse: {
    eyebrow: "Service",
    title: "Analyse des Données",
    description: "Transformez vos données en décisions, avec des analyses statistiques rigoureuses et des visualisations parlantes.",
    sections: [
      { title: "Ce que nous faisons", items: ["Statistiques descriptives et inférentielles", "Modèles prédictifs (régression, machine learning)", "Segmentation client, scoring, détection d'anomalies", "Tableaux de bord Power BI / Tableau / Looker Studio", "Rapports d'études prêts à publier"] },
      { title: "Outils maîtrisés", items: ["Python, R, SAS, SPSS, Stata", "PostgreSQL, MySQL, BigQuery", "Power BI, Tableau, Looker Studio", "Git, Docker, environnements cloud"] },
    ],
  },
  conseil: {
    eyebrow: "Service",
    title: "Bureau d'Études & Cabinet-Conseil",
    description: "Notre cabinet accompagne les organisations dans leurs démarches data, qualité et amélioration continue.",
    sections: [
      { title: "Missions types", items: ["Audit de la fonction data / qualité", "Mise en place de la MSP/SPC en industrie", "Conduite de projets Six Sigma (DMAIC)", "Stratégie data et gouvernance", "Pilotage de programmes de transformation"] },
      { title: "Notre méthode", items: ["Diagnostic en immersion 360°", "Plan d'action chiffré et priorisé", "Mise en œuvre avec vos équipes", "Transfert de compétences progressif", "Mesure d'impact (ROI documenté)"] },
    ],
  },
};

const ServiceDetail = () => {
  const { slug = "" } = useParams();
  const s = data[slug];
  if (!s) {
    return (
      <div className="container py-20 text-center">
        <p>Service introuvable.</p>
        <Button asChild className="mt-4"><Link to="/services">Retour</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} description={s.description} />
      <section className="container py-16 grid md:grid-cols-2 gap-6">
        {s.sections.map((sec) => (
          <Card key={sec.title} className="p-7">
            <h3 className="font-display font-bold text-xl mb-4 text-primary">{sec.title}</h3>
            <ul className="space-y-3">
              {sec.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
      <section className="container pb-16 text-center">
        <Button variant="hero" size="lg" asChild>
          <Link to="/contact">Discuter de votre projet</Link>
        </Button>
      </section>
    </>
  );
};

export default ServiceDetail;
