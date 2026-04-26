export type Module = {
  index: number;
  title: string;
  duration: string;
  summary: string;
  lessons: string[];
};

export type Formation = {
  slug: string;
  title: string;
  category: "certification" | "logiciel" | "office" | "os" | "db";
  short: string;
  description: string;
  duration: string;
  level: string;
  price_xaf: number; // prix total (module 1 gratuit)
  per_module_xaf: number;
  badge?: string;
  modules: Module[];
};

export const formations: Formation[] = [
  {
    slug: "lean-six-sigma",
    title: "Certification (Lean) Six Sigma — Yellow & Green Belt",
    category: "certification",
    short: "Maîtrisez la méthode DMAIC pour améliorer la qualité et réduire les variations dans tout type de processus.",
    description:
      "Programme complet préparant aux ceintures Jaune et Verte du (Lean) Six Sigma. 160 heures de formation : 110h de cours/TD/TP, 32h de projet en entreprise et 16h de préparation à l'examen de certification. 4 formules disponibles : weekend, soirs en semaine, présentiel bloqué, ou 100% en ligne.",
    duration: "160 h • 20 semaines",
    level: "Aucun niveau minimal requis",
    price_xaf: 350000,
    per_module_xaf: 45000,
    badge: "Phare",
    modules: [
      {
        index: 0,
        title: "Introduction au (Lean) Six Sigma",
        duration: "8 h",
        summary:
          "Découvrez l'histoire, la philosophie et les bénéfices business du Six Sigma. Comprendre les ceintures et le rôle de chaque acteur.",
        lessons: [
          "Origines : Motorola, GE et la révolution qualité",
          "Les 5 principes Lean et la chasse aux 8 gaspillages (MUDA)",
          "Niveaux Sigma et coût de la non-qualité",
          "Rôles : White, Yellow, Green, Black, Master Black Belt",
          "Étude de cas : 3 succès Six Sigma en Afrique",
        ],
      },
      {
        index: 1,
        title: "DMAIC — Définir & Mesurer",
        duration: "16 h",
        summary: "Cadrer un projet Six Sigma et collecter des données fiables.",
        lessons: [
          "Charte projet, SIPOC, Voix du Client (VOC)",
          "Cartographie de processus & Value Stream Mapping",
          "Plan de collecte & échantillonnage",
          "Analyse du système de mesure (MSA, Gage R&R)",
        ],
      },
      {
        index: 2,
        title: "Statistiques pour Six Sigma",
        duration: "20 h",
        summary: "Les outils statistiques essentiels pour analyser un processus.",
        lessons: [
          "Statistiques descriptives & visualisation",
          "Lois de probabilité (Normale, Poisson, Binomiale)",
          "Tests d'hypothèse (t, χ², ANOVA)",
          "Régression simple et multiple",
        ],
      },
      {
        index: 3,
        title: "DMAIC — Analyser",
        duration: "18 h",
        summary: "Identifier les causes racines de la variation.",
        lessons: [
          "Diagramme d'Ishikawa, 5 Pourquoi, AMDEC",
          "Pareto, histogrammes, boîtes à moustaches",
          "Tests de comparaison de moyennes et de variances",
          "Analyse de capabilité (Cp, Cpk, Pp, Ppk)",
        ],
      },
      {
        index: 4,
        title: "DMAIC — Améliorer & Contrôler",
        duration: "20 h",
        summary: "Concevoir, tester et pérenniser les améliorations.",
        lessons: [
          "Plans d'expérience (DOE) — facteurs et interactions",
          "Brainstorming structuré & solutions Poka-Yoke",
          "Cartes de contrôle (Shewhart, EWMA, CUSUM)",
          "Plan de contrôle et standardisation",
        ],
      },
      {
        index: 5,
        title: "Outils logiciels (Minitab, R, Excel)",
        duration: "12 h",
        summary: "Mettre en pratique les outils Six Sigma sur les logiciels du marché.",
        lessons: [
          "Minitab : assistant Six Sigma de A à Z",
          "R : packages SixSigma & qcc",
          "Excel : tableaux croisés et cartes de contrôle",
        ],
      },
      {
        index: 6,
        title: "Projet d'entreprise (32 h en immersion)",
        duration: "32 h",
        summary: "Conduire un vrai projet DMAIC dans une organisation partenaire.",
        lessons: [
          "Cadrage avec le sponsor",
          "Collecte terrain et analyse",
          "Présentation des résultats et ROI",
        ],
      },
      {
        index: 7,
        title: "Préparation à l'examen de certification",
        duration: "16 h",
        summary: "Révisions ciblées, examens blancs et passage de la certification.",
        lessons: [
          "QCM blanc Yellow Belt",
          "QCM blanc Green Belt",
          "Étude de cas notée",
          "Examen final et délivrance du certificat",
        ],
      },
    ],
  },
  {
    slug: "msp-spc",
    title: "Maîtrise Statistique des Procédés (MSP / SPC)",
    category: "certification",
    short: "Surveillez et stabilisez vos procédés industriels grâce aux cartes de contrôle.",
    description:
      "Apprenez à mettre en place une démarche SPC complète : cartes de contrôle, capabilité, plans d'échantillonnage et amélioration continue.",
    duration: "60 h • 8 semaines",
    level: "Bases en statistiques recommandées",
    price_xaf: 180000,
    per_module_xaf: 35000,
    modules: [
      { index: 0, title: "Introduction à la MSP", duration: "6 h", summary: "Pourquoi maîtriser la variation.", lessons: ["Variation commune vs spéciale", "Histoire et enjeux du SPC", "Vocabulaire qualité"] },
      { index: 1, title: "Cartes de contrôle aux variables", duration: "10 h", summary: "X̄-R, X̄-S, I-MR.", lessons: ["Construction et lecture", "Règles de Western Electric", "Études de cas"] },
      { index: 2, title: "Cartes aux attributs", duration: "8 h", summary: "p, np, c, u.", lessons: ["Choisir la bonne carte", "Calcul des limites", "Interprétation"] },
      { index: 3, title: "Capabilité des procédés", duration: "8 h", summary: "Cp, Cpk, Pp, Ppk.", lessons: ["Calculs et interprétation", "Études de cas industrielles"] },
      { index: 4, title: "Plans d'échantillonnage", duration: "10 h", summary: "Normes ISO 2859 et 3951.", lessons: ["AQL, LTPD", "Lecture des tables"] },
      { index: 5, title: "Projet & certification", duration: "18 h", summary: "Étude de cas et examen.", lessons: ["Projet terrain", "Examen final"] },
    ],
  },
  {
    slug: "project-management",
    title: "Certification Project Management",
    category: "certification",
    short: "Pilotez vos projets avec les méthodes PMI, Prince2 et Agile.",
    description:
      "Programme préparant aux fondamentaux du management de projet, avec une vision hybride classique / agile, et une préparation aux examens internationaux.",
    duration: "120 h • 15 semaines",
    level: "Aucun prérequis",
    price_xaf: 280000,
    per_module_xaf: 40000,
    modules: [
      { index: 0, title: "Fondamentaux du management de projet", duration: "10 h", summary: "Définitions et cycle de vie.", lessons: ["Projet vs opération", "Cycle en V, cycle agile", "Parties prenantes"] },
      { index: 1, title: "Cadrage et planification", duration: "16 h", summary: "WBS, Gantt, chemin critique.", lessons: ["Charte projet", "WBS", "Gantt et PERT"] },
      { index: 2, title: "Pilotage des coûts et des risques", duration: "16 h", summary: "Earned Value et matrices de risques.", lessons: ["EV, PV, AC", "Registre des risques", "Plans de mitigation"] },
      { index: 3, title: "Méthodes agiles (Scrum, Kanban)", duration: "20 h", summary: "Sprints, backlog, revues.", lessons: ["Manifeste agile", "Rôles Scrum", "Tableau Kanban"] },
      { index: 4, title: "Outils de gestion (MS Project, Jira)", duration: "20 h", summary: "Mise en pratique outillée.", lessons: ["MS Project pas à pas", "Jira & Confluence"] },
      { index: 5, title: "Projet final & examen", duration: "38 h", summary: "Mémoire et soutenance.", lessons: ["Cas réel", "Soutenance", "QCM final"] },
    ],
  },
  {
    slug: "data-science",
    title: "Certification Data Science (Analyst & Scientist)",
    category: "certification",
    short: "De la donnée brute aux modèles prédictifs : Python, SQL, machine learning.",
    description:
      "Formation intensive couvrant l'analyse, la visualisation et la modélisation prédictive. Préparation aux rôles de Data Analyst et Data Scientist.",
    duration: "200 h • 24 semaines",
    level: "Bases en mathématiques recommandées",
    price_xaf: 450000,
    per_module_xaf: 50000,
    badge: "Très demandée",
    modules: [
      { index: 0, title: "Découverte de la Data Science", duration: "8 h", summary: "Vue d'ensemble du métier.", lessons: ["Data Analyst, Engineer, Scientist", "Workflow CRISP-DM", "Outils du marché"] },
      { index: 1, title: "Python pour la data", duration: "24 h", summary: "Numpy, Pandas, Matplotlib.", lessons: ["Bases Python", "Manipulation Pandas", "Visualisation"] },
      { index: 2, title: "SQL avancé", duration: "20 h", summary: "Requêtes complexes et fenêtres.", lessons: ["Jointures avancées", "CTE et fenêtres", "Optimisation"] },
      { index: 3, title: "Statistiques inférentielles", duration: "20 h", summary: "Tests, intervalles, p-value.", lessons: ["Distributions", "Tests d'hypothèse", "ANOVA"] },
      { index: 4, title: "Machine Learning supervisé", duration: "30 h", summary: "Régression et classification.", lessons: ["Régression linéaire/logistique", "Arbres et forêts", "SVM, KNN"] },
      { index: 5, title: "Machine Learning non supervisé", duration: "20 h", summary: "Clustering et réduction.", lessons: ["K-Means, DBSCAN", "ACP, t-SNE", "Détection d'anomalies"] },
      { index: 6, title: "Visualisation Power BI / Tableau", duration: "24 h", summary: "Storytelling avec la donnée.", lessons: ["Power BI Desktop", "Tableau Public", "Dashboards exécutifs"] },
      { index: 7, title: "Projet capstone & certification", duration: "54 h", summary: "Projet de bout en bout.", lessons: ["Choix du sujet", "Modélisation", "Soutenance et examen"] },
    ],
  },
  {
    slug: "logiciels-stats",
    title: "Logiciels Statistiques (R, SPSS, SAS)",
    category: "logiciel",
    short: "Maîtrisez les trois logiciels références de l'analyse statistique.",
    description: "Trois parcours en un : R, SPSS et SAS, du chargement de données aux modèles avancés.",
    duration: "80 h • 10 semaines",
    level: "Niveau débutant à intermédiaire",
    price_xaf: 200000,
    per_module_xaf: 30000,
    modules: [
      { index: 0, title: "Découverte de R & RStudio", duration: "10 h", summary: "Premiers pas en R.", lessons: ["Installation", "Vecteurs et data.frames", "ggplot2"] },
      { index: 1, title: "R avancé : tidyverse & modélisation", duration: "20 h", summary: "dplyr, tidyr, modèles.", lessons: ["Pipes %>%", "Régressions", "Rmarkdown"] },
      { index: 2, title: "SPSS de A à Z", duration: "20 h", summary: "L'incontournable des sciences humaines.", lessons: ["Interface", "Tests classiques", "ACP, AFC"] },
      { index: 3, title: "SAS pour la production", duration: "20 h", summary: "Le standard bancaire et pharma.", lessons: ["DATA step", "PROC SQL", "PROC REG, GLM"] },
      { index: 4, title: "Projet et examen", duration: "10 h", summary: "Étude comparative.", lessons: ["Cas réel", "QCM final"] },
    ],
  },
  {
    slug: "ms-office",
    title: "MS Office (Word, Excel, PowerPoint)",
    category: "office",
    short: "La suite bureautique indispensable, du débutant à l'avancé.",
    description: "Formation complète Word, Excel (incluant TCD, Power Query, VBA) et PowerPoint pro.",
    duration: "60 h • 8 semaines",
    level: "Aucun prérequis",
    price_xaf: 120000,
    per_module_xaf: 25000,
    modules: [
      { index: 0, title: "Word : documents professionnels", duration: "12 h", summary: "Mise en page, styles, publipostage.", lessons: ["Styles et sommaire", "Publipostage", "Formulaires"] },
      { index: 1, title: "Excel : formules essentielles", duration: "16 h", summary: "RECHERCHEX, SI, SOMMEPROD…", lessons: ["Formules avancées", "Mise en forme conditionnelle", "Graphiques"] },
      { index: 2, title: "Excel avancé : TCD & Power Query", duration: "16 h", summary: "Analyse et automatisation.", lessons: ["Tableaux croisés", "Power Query", "Power Pivot"] },
      { index: 3, title: "Initiation VBA", duration: "10 h", summary: "Automatiser Excel avec des macros.", lessons: ["Enregistreur de macros", "Variables et boucles", "UserForms"] },
      { index: 4, title: "PowerPoint pro & storytelling", duration: "6 h", summary: "Présentations qui marquent.", lessons: ["Maquette", "Animations", "Pitch"] },
    ],
  },
  {
    slug: "linux-openoffice",
    title: "Linux / Ubuntu & OpenOffice",
    category: "os",
    short: "Devenez autonome sur l'environnement open-source.",
    description: "Apprenez à installer, utiliser et administrer Ubuntu, et à produire des documents avec OpenOffice / LibreOffice.",
    duration: "40 h • 6 semaines",
    level: "Aucun prérequis",
    price_xaf: 90000,
    per_module_xaf: 20000,
    modules: [
      { index: 0, title: "Installation & découverte d'Ubuntu", duration: "8 h", summary: "Premiers pas.", lessons: ["Live USB", "Bureau GNOME", "Logiciels"] },
      { index: 1, title: "Ligne de commande Linux", duration: "12 h", summary: "Bash et fichiers.", lessons: ["ls, cd, cp, mv", "grep, awk, sed", "Permissions"] },
      { index: 2, title: "OpenOffice Writer & Calc", duration: "12 h", summary: "Bureautique libre.", lessons: ["Writer", "Calc", "Compatibilité MS Office"] },
      { index: 3, title: "Administration de base", duration: "8 h", summary: "Utilisateurs, paquets, services.", lessons: ["apt", "systemd", "Sécurité de base"] },
    ],
  },
  {
    slug: "bases-donnees",
    title: "Bases de Données (SQL, PostgreSQL, MySQL)",
    category: "db",
    short: "Concevez et exploitez des bases de données relationnelles fiables.",
    description: "Du modèle conceptuel à l'optimisation : MERISE, SQL standard, PostgreSQL et MySQL.",
    duration: "70 h • 9 semaines",
    level: "Aucun prérequis",
    price_xaf: 160000,
    per_module_xaf: 28000,
    modules: [
      { index: 0, title: "Modélisation & MERISE", duration: "10 h", summary: "MCD, MLD, MPD.", lessons: ["Entités & associations", "Cardinalités", "Normalisation"] },
      { index: 1, title: "SQL standard", duration: "20 h", summary: "SELECT, JOIN, agrégats.", lessons: ["Requêtes simples", "Jointures", "Sous-requêtes"] },
      { index: 2, title: "PostgreSQL avancé", duration: "20 h", summary: "Fonctions, triggers, JSON.", lessons: ["Fonctions PL/pgSQL", "Index avancés", "JSONB"] },
      { index: 3, title: "MySQL & administration", duration: "12 h", summary: "Administration et sauvegarde.", lessons: ["Comptes & droits", "Sauvegarde / restauration", "Réplication"] },
      { index: 4, title: "Projet final", duration: "8 h", summary: "Concevoir une base de A à Z.", lessons: ["Cahier des charges", "Réalisation", "Soutenance"] },
    ],
  },
];

export const getFormation = (slug: string) =>
  formations.find((f) => f.slug === slug);

export const formatXAF = (amount: number) =>
  new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
