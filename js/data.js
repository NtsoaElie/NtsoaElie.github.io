/* ============================================================================
   data.js  ·  ✦ THIS IS THE ONLY FILE YOU NEED TO EDIT ✦
   ----------------------------------------------------------------------------
   The portfolio is bilingual (EN / FR). Content lives in two parallel trees
   under `i18n.en` and `i18n.fr` — same shape, different language. To change
   a section, edit the matching block in BOTH trees (or just one if you don't
   care about the other locale).

   · Change active default lang ........ `defaultLang` below
   · Add a project ..................... add an object to `projects.items`
   · Add a skill ....................... add a tag string to a group
   · New social link ................... add an object to `contact.links`

   Fields ending in "Html" accept HTML (e.g. <b>bold</b>); everything else
   is plain text. Exposed as a frozen global so the page works with no build.
   ========================================================================== */

window.PORTFOLIO = Object.freeze({

  /* default language on first visit. After that, the user's choice is
     remembered in localStorage under "portfolio.lang". */
  defaultLang: "en",

  /* identity that does NOT change between languages */
  brand: {
    handle: "ELIE",     // shown in nav + footer
    level:  "LV.999",   // gradient pill in the nav
  },

  /* ── language trees ──────────────────────────────────────────────── */
  i18n: {

    /* ============================== ENGLISH ============================== */
    en: {

      meta: {
        title:    "Elie Ramampiarison — Arise · Developer Portfolio",
        htmlLang: "en",
      },

      // language switcher button: label is the lang to switch TO
      langSwitch: { label: "FR", aria: "Passer en français" },

      // nav link labels
      nav: [
        { label: "about",    href: "#about"    },
        { label: "skills",   href: "#skills"   },
        { label: "projects", href: "#projects" },
        { label: "contact",  href: "#contact"  },
      ],

      // hero
      hero: {
        greet: "> whoami",
        name:  "ELIE",                                  // big glitch display name
        taglines: [
          "Arise. The stack awaits.",
          "Software Engineering Student · ÉTS",
          "Full-Stack Hunter · Java | .NET | TS",
          "Currently clearing: CentraFi, SChan & L'original",
        ],
        blurbHtml:
          "<b>Software engineering student</b> at ÉTS, leveling up the " +
          "stack from .NET back-ends to React/TS front-ends. Currently " +
          "shipping side-projects, hunting bugs, and building things people actually use.",
        ctas: [
          { label: "▶ ARISE",          href: "#projects", primary: true  },
          { label: "⟢ get in touch",   href: "#contact",  primary: false },
        ],
        stats: [
          { label: "HP",            value: "999 / 999", meter: "hp",  fill: "100%" },
          { label: "MP · mana",     value: "READY",     meter: "sp",  fill: "88%"  },
          { label: "EXP → LV.999",  value: "MAX",       meter: "exp", fill: "100%" },
        ],
      },

      // about — terminal card
      about: {
        eyebrow:       "about",
        titleHtml:     "The <b>Hunter</b> behind the screen",
        terminalTitle: "Hunter's Log",
        lines: [
          { html: "Hi — I'm <b>Elie Ramampiarison</b>, a software engineering student at <b>ÉTS</b> in Montréal." },
          { html: "Previously: DEC in Computer Science &amp; Technology at <b>Champlain College</b>. Recently: .NET intern alum @ <b>CCL Industries</b>. Currently: automation &amp; web intern @ <b>L'original</b>." },
          { html: "outside the IDE: APP|ÉTS club, media team @ People's Church, Java tutor at Champlain.", muted: true },
        ],
      },

      // skills — tech stack from the CV (Languages / Frameworks / Tools / Methodologies)
      skills: {
        eyebrow:   "stat window",
        titleHtml: "Skills &amp; <b>arsenal</b>",
        groups: [
          { name: "Languages",     tags: ["Java", "C#", "JavaScript", "TypeScript", "Flutter", "SQL", "HTML/CSS"] },
          { name: "Frameworks",    tags: ["React", "Spring Boot", ".NET", "Blazor", "React Native (Expo)", "Flask"] },
          { name: "Tools",         tags: ["Git", "Docker", "Postman", "Jira", "Supabase", "VS Code", "Visual Studio", "IntelliJ"] },
          { name: "Methodologies", tags: ["Agile", "Scrum"] },
        ],
      },

      // projects — internships + 4 CV projects
      projects: {
        eyebrow:   "gates",
        titleHtml: "Cleared <b>gates</b>",
        items: [
          {
            idx:   "INTERNSHIP · L'ORIGINAL",
            title: "Automation & Web Dev Intern",
            meta:  "Aug 2026 — Present · Montréal, QC",
            desc:  "Contributing to website updates and building an internal bot that streamlines core business processes — saving the team an estimated 3–5 hours of manual work per week.",
            stack: ["Automation", "Web Dev"],
            links: [],
          },
          {
            idx:   "INTERNSHIP · CCL INDUSTRIES",
            title: ".NET Developer Intern",
            meta:  "Mar 2025 — May 2025 · Saint-Bruno-de-Montarville, QC",
            desc:  "Designed and built a no-code SQL query builder inside an ERP, used by 20+ employees. Cut dev dependency ~30% by letting non-technical users run complex queries. Shipped interactive dashboards for clearer reporting and decision-making. GitHub for version control, code review, and feature integration.",
            stack: [".NET", "Blazor", "C#", "SQL"],
            links: [],
          },
          {
            idx:   "GATE_002 · S-RANK",
            title: "SChan",
            meta:  "Jan 2026 — Present · JavaScript, GSAP",
            desc:  "Designed and built a portfolio site for a digital artist to grow their online presence. Tight client collaboration to scope and refine features; fully responsive across devices.",
            stack: ["JavaScript", "GSAP"],
            links: [],
            note:  "Source kept private at the artist's request.",
          },
          {
            idx:   "GATE_003 · S-RANK",
            title: "CentraFi",
            meta:  "Nov 2025 — Present · TS, Tailwind, React Native",
            desc:  "Mobile + web MVP that centralizes banking data across multiple institutions. Built secure aggregation APIs, designed the cross-platform dashboard UX, and owned the product lifecycle from idea to ship.",
            stack: ["TypeScript", "Tailwind", "React Native"],
            links: [
              { label: "code", href: "#" },
            ],
          },
          {
            idx:   "GATE_004 · S-RANK",
            title: "High End Detailing",
            meta:  "Sep 2024 — Feb 2025 · Spring Boot, TS, React",
            desc:  "Team of 5 building tooling to streamline a local business's operations. Contributed to system design, sprint planning, and feature delivery. Agile workflow via Jira.",
            stack: ["Spring Boot", "TypeScript", "React"],
            links: [
              { label: "code", href: "#" },
            ],
          },
          {
            idx:   "GATE_005 · S-RANK",
            title: "Champlain PetClinic",
            meta:  "Sep 2024 — Dec 2024 · Spring Boot, TS, React",
            desc:  "Long-running multi-cohort microservices project. Built the cart microservice with a team of 6, following Agile practices in Jira.",
            stack: ["Spring Boot", "TypeScript", "React"],
            links: [
              { label: "code", href: "#" },
            ],
          },
        ],
      },

      // contact
      contact: {
        eyebrow:       "uplink",
        titleHtml:     "Let's <b>connect</b>",
        terminalTitle: "Guild Hall",
        lines: [
          { html: "Open to internships, freelance, and interesting collaborations." },
          { html: "based in Montréal · response faster than a frame-perfect input.", muted: true },
        ],
        links: [
          { label: "✦ email",    href: "mailto:ntsoaelie@gmail.com" },
          { label: "✦ github",   href: "https://github.com/NtsoaElie",                  external: true },
          { label: "✦ linkedin", href: "https://www.linkedin.com/in/elieramampiarison/?locale=en", external: true },
          { label: "✦ phone",    reveal: "✦ 514-929-6645" },
        ],
      },

      // footer
      footer: {
        textHtml: "&copy; {year} {handle} — arising with <span class=\"mark\" aria-hidden=\"true\"></span>",
        hint:     "psst… try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
      },

      // boot sequence flavor
      boot: {
        lines: [
          { text: "> initializing the System ..." },
          { text: "> awakening hidden potential ...", highlight: true },
          { text: "> loading Hunter @ LV.999 ..." },
        ],
        grant: "SYSTEM MESSAGE // you have obtained the qualifications of a Player.",
      },

      // achievement toasts shown the first time each section scrolls into view
      achievements: {
        about:    ["TITLE ACQUIRED",     "Hunter identity confirmed"],
        skills:   ["STAT WINDOW OPENED", "Skills revealed · +999 INT"],
        projects: ["GATE LOG OPENED",    "Reviewing cleared gates"],
        contact:  ["UPLINK ESTABLISHED", "Comms channel online"],
      },

      // toast shown when the user toggles the language
      langChangeToast: ["LANGUAGE PATCHED", "interface set to english"],
    },

    /* ============================== FRENCH ============================== */
    fr: {

      meta: {
        title:    "Elie Ramampiarison — Arise · Portfolio de développeur",
        htmlLang: "fr",
      },

      langSwitch: { label: "EN", aria: "Switch to English" },

      nav: [
        { label: "à propos",    href: "#about"    },
        { label: "compétences", href: "#skills"   },
        { label: "projets",     href: "#projects" },
        { label: "contact",     href: "#contact"  },
      ],

      hero: {
        greet: "> whoami",
        name:  "ELIE",
        taglines: [
          "Arise. La stack attend.",
          "Étudiant en génie logiciel · ÉTS",
          "Développeur Full-Stack Hunter · Java | .NET | TS",
          "En cours : CentraFi, SChan & L'original",
        ],
        blurbHtml:
          "<b>Étudiant en génie logiciel</b> à l'ÉTS, je monte de niveau sur la " +
          "stack — du back-end .NET au front-end React/TS. Je pousse des " +
          "projets perso, je chasse les bugs et je bâtis des choses qui servent vraiment.",
        ctas: [
          { label: "▶ ARISE",       href: "#projects", primary: true  },
          { label: "⟢ entrer en contact", href: "#contact",  primary: false },
        ],
        stats: [
          { label: "PV",            value: "999 / 999", meter: "hp",  fill: "100%" },
          { label: "PM · mana",     value: "PRÊT",      meter: "sp",  fill: "88%"  },
          { label: "EXP → LV.999",  value: "MAX",       meter: "exp", fill: "100%" },
        ],
      },

      about: {
        eyebrow:       "à propos",
        titleHtml:     "Le <b>Hunter</b> derrière l'écran",
        terminalTitle: "Journal du Hunter",
        lines: [
          { html: "Salut — je suis <b>Elie Ramampiarison</b>, étudiant en génie logiciel à l'<b>ÉTS</b>, à Montréal." },
          { html: "Avant : DEC en informatique et technologie au <b>Champlain College</b>. Récemment : stage .NET chez <b>CCL Industries</b>. Actuellement : stagiaire automatisation &amp; web chez <b>L'original</b>." },
          { html: "hors IDE : club APP|ÉTS, équipe média à People's Church, tuteur Java à Champlain.", muted: true },
        ],
      },

      skills: {
        eyebrow:   "fenêtre de stats",
        titleHtml: "Compétences &amp; <b>arsenal</b>",
        groups: [
          { name: "Langages",      tags: ["Java", "C#", "JavaScript", "TypeScript", "Flutter", "SQL", "HTML/CSS"] },
          { name: "Frameworks",    tags: ["React", "Spring Boot", ".NET", "Blazor", "React Native (Expo)", "Flask"] },
          { name: "Outils",        tags: ["Git", "Docker", "Postman", "Jira", "Supabase", "VS Code", "Visual Studio", "IntelliJ"] },
          { name: "Méthodologies", tags: ["Agile", "Scrum"] },
        ],
      },

      projects: {
        eyebrow:   "portails",
        titleHtml: "Portails <b>franchis</b>",
        items: [
          {
            idx:   "STAGE · L'ORIGINAL",
            title: "Stagiaire automatisation & web",
            meta:  "Août 2026 — Présent · Montréal, QC",
            desc:  "Contribution aux mises à jour du site web et développement d'un bot interne qui automatise des processus d'affaires clés — un gain estimé de 3 à 5 heures de travail manuel par semaine pour l'équipe.",
            stack: ["Automatisation", "Web"],
            links: [],
          },
          {
            idx:   "STAGE · CCL INDUSTRIES",
            title: "Stagiaire développeur .NET",
            meta:  "Mars 2025 — Mai 2025 · Saint-Bruno-de-Montarville, QC",
            desc:  "Conception et développement d'un générateur de requêtes SQL sans code dans un ERP, utilisé par 20+ employés. Dépendance aux développeurs réduite d'environ 30 % en permettant aux utilisateurs non techniques d'exécuter des requêtes complexes. Création de tableaux de bord interactifs pour des rapports plus clairs. GitHub pour la gestion de versions, les revues de code et l'intégration.",
            stack: [".NET", "Blazor", "C#", "SQL"],
            links: [],
          },
          {
            idx:   "PORTAIL_002 · RANG S",
            title: "SChan",
            meta:  "Janvier 2026 — Présent · JavaScript, GSAP",
            desc:  "Conception et développement d'un site web pour un artiste numérique afin d'améliorer sa présence en ligne. Collaboration étroite avec le client pour cadrer et affiner les fonctionnalités; application entièrement responsive.",
            stack: ["JavaScript", "GSAP"],
            links: [],
            note:  "Code source non public à la demande de l'artiste.",
          },
          {
            idx:   "PORTAIL_003 · RANG S",
            title: "CentraFi",
            meta:  "Novembre 2025 — Présent · TS, Tailwind, React Native",
            desc:  "MVP mobile + web qui centralise les données bancaires de plusieurs institutions. Implémentation d'API sécurisées d'agrégation, conception de l'UX du tableau de bord multiplateforme, et gestion du cycle de vie complet — de l'idéation au déploiement.",
            stack: ["TypeScript", "Tailwind", "React Native"],
            links: [
              { label: "code", href: "#" },
            ],
          },
          {
            idx:   "PORTAIL_004 · RANG S",
            title: "High End Detailing",
            meta:  "Sept. 2024 — Févr. 2025 · Spring Boot, TS, React",
            desc:  "Équipe de 5 à optimiser les opérations d'une entreprise locale. Contribution à la conception du système, à la planification des sprints et à la livraison des fonctionnalités. Méthodologies Agile via Jira.",
            stack: ["Spring Boot", "TypeScript", "React"],
            links: [
              { label: "code", href: "#" },
            ],
          },
          {
            idx:   "PORTAIL_005 · RANG S",
            title: "Champlain PetClinic",
            meta:  "Sept. 2024 — Déc. 2024 · Spring Boot, TS, React",
            desc:  "Projet microservices de longue durée, maintenu par plusieurs cohortes. Développement du microservice panier au sein d'une équipe de 6, méthodologies Agile via Jira.",
            stack: ["Spring Boot", "TypeScript", "React"],
            links: [
              { label: "code", href: "#" },
            ],
          },
        ],
      },

      contact: {
        eyebrow:       "liaison",
        titleHtml:     "Restons <b>en contact</b>",
        terminalTitle: "Salle de guilde",
        lines: [
          { html: "Ouvert aux stages, mandats freelance et collaborations intéressantes." },
          { html: "basé à Montréal · réponse plus rapide qu'un input frame-perfect.", muted: true },
        ],
        links: [
          { label: "✦ courriel", href: "mailto:ntsoaelie@gmail.com" },
          { label: "✦ github",   href: "https://github.com/NtsoaElie",                  external: true },
          { label: "✦ linkedin", href: "https://www.linkedin.com/in/elieramampiarison/?locale=fr", external: true },
          { label: "✦ téléphone", reveal: "✦ 514-929-6645" },
        ],
      },

      footer: {
        textHtml: "&copy; {year} {handle} — arise avec <span class=\"mark\" aria-hidden=\"true\"></span>",
        hint:     "psst… essaie le code Konami : ↑ ↑ ↓ ↓ ← → ← → B A",
      },

      boot: {
        lines: [
          { text: "> initialisation du Système ..." },
          { text: "> éveil du potentiel caché ...", highlight: true },
          { text: "> chargement du Hunter @ LV.999 ..." },
        ],
        grant: "MESSAGE SYSTÈME // vous avez obtenu les qualifications d'un Joueur.",
      },

      achievements: {
        about:    ["TITRE OBTENU",          "Identité du Hunter confirmée"],
        skills:   ["FENÊTRE DE STATS OUVERTE", "Compétences révélées · +999 INT"],
        projects: ["JOURNAL DES PORTAILS",  "Portails franchis consultés"],
        contact:  ["LIAISON ÉTABLIE",       "Canal de comms en ligne"],
      },

      langChangeToast: ["LANGUE PATCHÉE", "interface réglée sur français"],
    },
  },
});
