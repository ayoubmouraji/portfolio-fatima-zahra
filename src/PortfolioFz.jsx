import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  FileDown,
  Link as LinkIcon,
  GraduationCap,
  Award,
  Newspaper,
  LayoutGrid,
  Filter,
  Globe,
  X,
  ChevronRight,
  Moon,
  Sun,
  Code2,
  Boxes,
  Database,
  Shield,
  TerminalSquare,
} from "lucide-react";

/**
 * Portfolio – Fatima Zahra Amarghad (BTS SIO SLAM)
 * - Refonte style "Emily Clark / Profolio" (clone visuel modernisé)
 *
 * Highlights:
 *  • Header transparent + blur, fond sombre en dégradé diagonal
 *  • Hero plein écran: texte typé, avatar lumineux à droite, particules animées
 *  • Sections: About, Skills, Réalisations (cartes image + overlay), Timeline, Veille, Contact
 *  • Modale projet détaillée, thème sombre/clair, micro-interactions
 *
 * TODO: Remplacer les placeholders (email, tel, LinkedIn, GitHub, CV, projets) par les vrais.
 */

// =====================
// ====== DATA =========
// =====================
const INFO = {
  nom: "Fatima Zahra Amarghad",
  titre: "Étudiante BTS SIO – Option SLAM",
  pitch:
    "Étudiante en développement (SLAM). Je conçois des applications web/API robustes, sécurisées et prêtes à être mises à disposition (E5).",
  localisation: "Île-de-France, France",
  email: "tahaamaraghad@gmail.com", // TODO
  tel: "0646466950", // TODO
  linkedin: "https://www.linkedin.com/in/fatima-zahra-ama-577808256", // TODO
  github: "https://github.com/username", // TODO
  cvUrl: "/cv-fatima-zahra-amarghad.pdf", // TODO
  lettreUrl: "/lettre-de-motivation-fatima-zahra-am.pdf",
  site: "",
  roles: [
    "Développeuse Web",
    "BTS SIO – SLAM",
    "Support & Déploiement",
  ],
};

const ABOUT = `Je suis en BTS SIO option SLAM. J'aime transformer des besoins métiers en services applicatifs fiables :
API REST bien conçues, interfaces propres, automatisation CI/CD et documentation claire. Mon objectif : livrer vite, propre, sécurisé.`;

const SKILLS = [
  { icon: Code2, label: "Languages", items: ["C# (Visual Studio)", "PHP/HTML/CSS/Javascript (Netbeans)", "Java (Eclipse)", "Python (PyCharm)"] },
  { icon: Database, label: "CMS", items: ["Wordpress"] },
  { icon: TerminalSquare, label: "SGBD", items: ["normes (KISS, DRY, SOLID)", "tests (unitaires, fonctionnels)", "analyse de code (Sonarlint)"] },
  { icon: Shield, label: "Qualité logicielle", items: ["JWT", "OWASP", "RGPD", "Logs"] },
  { icon: Boxes, label: "Méthodes de conception", items: ["Merise/2", "UML"] },
  { icon: Globe, label: "Travail collaboratif", items: ["Github"] },
];

const COMP_E5 = [
  "Prendre en charge les demandes",
  "Traiter un incident",
  "Déployer un service",
  "Mettre à disposition une application",
  "Automatiser (CI/CD, scripts)",
  "Sécuriser services et données",
  "Documenter & capitaliser",
];

const PROJETS = [
  {
    id: "helpdesk",
    titre: "C# : agenda (POO et sérialisation), gestion des habilitations (POO, MVC, authentification, MySQL)",
    cover: "linear-gradient(135deg,#22d3ee33,#d946ef33)",
    contexte:
      "C# : agenda (POO et sérialisation), gestion des habilitations",
    objectifs: [
      "Rôles (admin/technicien/utilisateur)",
      "Dashboard",
    ],
    technos: ["POO", "MVC", "authentification", "MySQL"],
    competences: [
      "Developpement POO",
      "Traiter un incident",
      "Mettre à disposition une application"
    ],
    livrables: ["Code Git", "MCD/MLD + SQL", "Plan de tests", "Guide d'exploitation"],
    resultats:
      "Mise en prod scolaire via GitHub Actions (CI) + déploiement Docker (CD).",
    liens: [
      { label: "Repo GitHub", href: "#" },
      { label: "Démo", href: "#" }
    ]
  },
  {
    id: "inventory",
    titre: "interventions sur un site responsive de présentation d'articles",
    cover: "linear-gradient(135deg,#a78bfa33,#22d3ee33)",
    contexte:
      "Amélioration d'un site web",
    objectifs: ["corrections", "RGPD", "déploiement", "référencement"],
    technos: ["PHP", "HTML", "CSS", "JavaScript"],
    competences: [
      "Prendre en charge les demandes",
      "Dev HTML",
      "DEV CSS",
      "DEV PHP/Javascript",
    ],
    livrables: ["code du site web"],
    resultats: "Un site avec un nouveau look",
    liens: [{ label: "Repo GitHub", href: "#" }],
  },
  {
    id: "pwa-salles",
    titre: " Site e-commerce",
    cover: "linear-gradient(135deg,#d946ef33,#a78bfa33)",
    contexte:
      "Création d'un site E-commerce",
    objectifs: ["Réalisation Site e-commerce selon la demande du client"],
    technos: ["WordPress"],
    competences: [
      "Mettre à disposition d'un site e-commerce"
    ],
    livrables: ["Guide utilisateur", "Présentation PDF"],
    resultats: "",
    liens: [{ label: "Présentation", href: "#" }],
  },
  {
    id: "pwa-salles",
    titre: "Jeu de combat 2D en Client/Serveur ",
    cover: "linear-gradient(135deg,#d946ef33,#a78bfa33)",
    contexte:
      "Création d'un site E-commerce",
    objectifs: ["Réalisation d'un jeu 2D"],
    technos: ["Java"],
    competences: [
      "(graphique, objet, MVC, sockets)"
    ],
    livrables: ["Guide utilisateur", "Présentation PDF"],
    resultats: "",
    liens: [{ label: "Présentation", href: "#" }],
  },
];

const DIPLOMES = [
  { titre: "BTS SIO SLAM", etab: "CNED ", date: "2025 – 2026", lieu: "Île-de-France" },

  { titre: "Baccalauréat Général S ", etab: "Lycée [Ibn rochd]", date: "2016 2017", lieu: "MAROC" },
];

const CERTIFS = [
  { titre: "", organisme: "", date: "" },
  
];

const VEILLE = [
  {
    titre: "Veille technologique — aperçu",
    resume:
      "Dans le cadre de ma formation BTS SIO (option SLAM), je réalise une veille technologique pour suivre les évolutions du développement web, des langages et de la sécurité informatique.",
    source: "Personnel",
    lien: "",
  },
  {
    titre: "Objectifs",
    resume:
      "Rester informée des nouveautés dans les langages utilisés (C#, Python, PHP, JavaScript). Découvrir les bonnes pratiques en sécurité et les tendances des outils (Visual Studio, Oracle, VirtualBox).",
    source: "Objectifs",
    lien: "",
  },
  {
    titre: "Recherche de l'information",
    resume:
      "Moteurs de recherche (Google, Bing), newsletters (GitHub Weekly, Frontend Weekly), flux RSS / agrégateurs (Feedly), alertes Google et réseaux professionnels (LinkedIn, YouTube - Grafikart, Benjamin Code).",
    source: "Méthodes",
    lien: "https://feedly.com",
  },
  {
    titre: "Partage & collaboration",
    resume:
      "Synthèses et notes partagées via Google Docs / OneDrive, wiki personnel (Moodle) et publications sur un blog étudiant ou espace collaboratif pour capitaliser et recevoir des retours.",
    source: "Collaboration",
    lien: "",
  },
  {
    titre: "Sujets suivis (exemples)",
    resume:
      "Nouveautés C# 12 dans Visual Studio, OWASP API Top 10 (2025) pour la sécurité des API, et l'évolution des solutions de virtualisation (VirtualBox, Docker).",
    source: "Exemples",
    lien: "https://owasp.org/www-project-api-security/",
  },
];

// =====================
// === HELPERS/UI ======
// =====================
const useTyped = (words, speed = 80, pause = 1200) => {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, sub.length + 1);
        setSub(next);
        if (next === full) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = full.slice(0, sub.length - 1);
        setSub(next);
        if (next.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 1.8 : speed);
    return () => clearTimeout(timeout);
  }, [words, speed, pause, index, sub, deleting]);
  return sub + (deleting ? "" : "|");
};

const Section = ({ id, title, subtitle, children, icon: Icon }) => {
  const ref = useRef(null);
  // useScroll scoped to the section to create a subtle parallax effect
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.section id={id} className="py-20 md:py-24 scroll-mt-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-center gap-3"
          style={{ translateY: y }}
        >
          {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="text-muted-foreground mt-2 max-w-3xl"
            style={{ translateY: y }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mt-6"
          style={{ translateY: y }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-white/5 dark:bg-white/5 backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.55)] transition-shadow bg-white/5 dark:bg-white/5 backdrop-blur ${className}`}>
    {children}
  </div>
);

const ProjectCard = ({ p, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
  >
    <div
      className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer group bg-white/5 backdrop-blur"
      onClick={() => onOpen(p.id)}
    >
      <div
        className="h-44 w-full"
        style={{ background: p.cover }}
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold group-hover:text-cyan-300 transition-colors">{p.titre}</h3>
        <p className="text-sm text-muted-foreground mt-1">{p.contexte}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.technos.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="mt-4 text-sm text-cyan-300 inline-flex items-center gap-2">
          Voir les détails <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.div>
);

// Avatar vector (semi‑réaliste simplifié) + halo animé
const Avatar = () => (
  <div className="relative w-72 h-72 md:w-80 md:h-80">
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          "conic-gradient(from 0deg, rgba(34,211,238,0.25), rgba(167,139,250,0.25), rgba(217,70,239,0.25), rgba(34,211,238,0.25))",
        filter: "blur(16px)",
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    />
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-white/10" />
    <div className="absolute inset-1 rounded-full overflow-hidden">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="gSkin" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4c9a9" />
            <stop offset="100%" stopColor="#e9a67d" />
          </linearGradient>
          <linearGradient id="gHair" x1="0" x2="1">
            <stop offset="0%" stopColor="#2b2b2b" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="gBg" x1="0" x2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
        <rect width="300" height="300" fill="url(#gBg)" opacity="0.10" />
        <ellipse cx="150" cy="230" rx="90" ry="40" fill="#1f2937" />
        <rect x="135" y="150" width="30" height="28" rx="8" fill="url(#gSkin)" />
        <circle cx="150" cy="120" r="48" fill="url(#gSkin)" />
        <path d="M105 120c0-35 25-55 45-55s50 18 50 52c0 22-6 28-6 28s-8-22-44-22-45 22-45 22-0-9 0-25z" fill="url(#gHair)" />
        <circle cx="136" cy="118" r="4" fill="#111827" />
        <circle cx="164" cy="118" r="4" fill="#111827" />
        <path d="M136 138c6 8 22 8 28 0" stroke="#9f6" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="95" y="175" width="110" height="12" rx="4" fill="#0f172a" />
        <rect x="90" y="187" width="120" height="44" rx="8" fill="#111827" />
        <circle cx="150" cy="207" r="5" fill="#374151" />
      </svg>
    </div>
  </div>
);

const Particles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white/30"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 6 + Math.random() * 6, repeat: Infinity }}
      />
    ))}
  </div>
);

// =====================
// ====== APP ==========
// =====================
export default function PortfolioFZ() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [filtre, setFiltre] = useState("Tous");
  const [open, setOpen] = useState(null); // id projet
  const [sent, setSent] = useState(false);

  const typed = useTyped(INFO.roles, 70, 1100);
  const competencesSet = useMemo(() => ["Tous", ...new Set(COMP_E5)], []);

  const projetsFiltres = useMemo(() => {
    return PROJETS.filter((p) => {
      const matchTxt = !query || [p.titre, p.contexte, p.objectifs.join(" "), p.technos.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchComp = filtre === "Tous" || p.competences.includes(filtre);
      return matchTxt && matchComp;
    });
  }, [query, filtre]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fz_theme');
      if (stored) {
        setDark(stored === 'dark');
        return;
      }
    } catch (e) {
      // ignore
    }
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(true);
    } catch (e) {}
  }, []);

  // Apply class and persist
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem('fz_theme', dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark]);

  return (
      <div className="min-h-screen text-slate-100 bg-[linear-gradient(135deg,#090a1a_0%,#13162b_50%,#0b0f22_100%)]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.a 
            href="#accueil" 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="font-extrabold text-lg tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">FZ</span>
              <span className="text-white"> • Portfolio SLAM</span>
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 group-hover:w-full transition-all duration-300"
              whileHover={{ width: "100%" }}
            />
          </motion.a>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {[
              ["À propos", "#about"],
              ["Compétences", "#skills"],
              ["Projets", "#realisations"],
              ["Parcours", "#parcours"],
              ["Veille", "#veille"],
              ["Contact", "#contact"]
            ].map(([label, href]) => (
              <motion.a
                key={href}
                href={href}
                className="relative group py-1"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative text-white/80 hover:text-white transition-colors duration-200">
                  {label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.a>
            ))}
          </nav>
          <button type="button" aria-pressed={dark} aria-label="Basculer le thème" className="rounded-full border border-white/10 p-2 hover:shadow-sm" onClick={() => setDark((v) => !v)}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative min-h-[86vh] flex items-center">
        <Particles />
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                {INFO.nom}
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.6 }} 
                className="mt-2 text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300 font-semibold"
              >
                {typed}
              </motion.p>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }} className="mt-4 text-white/70 max-w-2xl">
              {INFO.pitch}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#realisations" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:from-cyan-400 hover:to-fuchsia-400 transition">
                  Voir mes réalisations <ChevronRight className="w-4 h-4" />
                </a>
                <a href={INFO.cvUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 border border-white/20 bg-white/5 hover:bg-white/10">
                  <FileDown className="w-4 h-4" /> CV PDF
                </a>
                <a href={INFO.lettreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 border border-white/20 bg-white/5 hover:bg-white/10">
                  <FileDown className="w-4 h-4" /> Lettre de motivation
                </a>
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
              <a className="inline-flex items-center gap-2 underline decoration-cyan-400/60 hover:text-cyan-300" href={`mailto:${INFO.email}`}><Mail className="w-4 h-4" /> {INFO.email}</a>
              <a className="inline-flex items-center gap-2 underline decoration-cyan-400/60 hover:text-cyan-300" href={`tel:${INFO.tel.replace(/\\s/g, "")}`}><Phone className="w-4 h-4" /> {INFO.tel}</a>
              <a className="inline-flex items-center gap-2 underline decoration-cyan-400/60 hover:text-cyan-300" href={INFO.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4" /> LinkedIn</a>
              <a className="inline-flex items-center gap-2 underline decoration-cyan-400/60 hover:text-cyan-300" href={INFO.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4" /> GitHub</a>
            </div>
          </div>
          <div className="md:col-span-5 flex items-center justify-center">
            <Avatar />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="À propos" subtitle={ABOUT} icon={LayoutGrid}>
        <Card>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Développement Web", "API REST", "Bases de données", "CI/CD", "Support applicatif", "Sécurité"].map((k) => (
              <Badge key={k}>{k}</Badge>
            ))}
          </div>
        </Card>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Compétences" subtitle="Technos et outils utilisés au quotidien." icon={Code2}>
        <div className="grid md:grid-cols-3 gap-6">
          {SKILLS.map(({ icon: Icon, label, items }) => (
            <Card key={label}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 text-cyan-300" />
                <h3 className="font-semibold">{label}</h3>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {items.map((it) => (
                  <Badge key={it}>{it}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* REALISATIONS */}
      <Section id="realisations" title="Réalisations" subtitle="Sélection de projets alignés sur l'E5 (contexte, objectifs, livrables, compétences)." icon={LayoutGrid}>
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
          <div className="relative flex-1">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un projet (techno, titre, objectif...)" className="w-full rounded-xl border border-white/10 px-4 py-2 pl-10 bg-white/5 text-white placeholder-white/50" />
            <Filter className="w-4 h-4 absolute left-3 top-2.5 text-white/60" />
          </div>
          <select value={filtre} onChange={(e) => setFiltre(e.target.value)} className="rounded-xl border border-white/10 px-3 py-2 bg-white/5">
            {["Tous", ...COMP_E5].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projetsFiltres.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
        {projetsFiltres.length === 0 && (
          <p className="text-sm text-white/70 mt-4">Aucun projet ne correspond à la recherche.</p>
        )}

        {/* Modale détails projet */}
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(null)} />
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.25 }} className="relative max-w-2xl w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur text-white">
                <button className="absolute right-3 top-3 p-2 rounded-full border border-white/10 bg-white/10" onClick={() => setOpen(null)} aria-label="Fermer">
                  <X className="w-4 h-4" />
                </button>
                {(() => {
                  const p = PROJETS.find((x) => x.id === open);
                  if (!p) return null;
                  return (
                    <div>
                      <h3 className="text-2xl font-bold">{p.titre}</h3>
                      <p className="mt-1 text-sm text-white/70">{p.contexte}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold">Objectifs</h4>
                        <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                          {p.objectifs.map((o, i) => (
                            <li key={i}>{o}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-semibold">Compétences E5 mobilisées</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {p.competences.map((c, i) => (
                            <Badge key={i}>{c}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-semibold">Livrables</h4>
                        <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                          {p.livrables.map((l, i) => (
                            <li key={i}>{l}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="mt-3 text-sm"><strong>Résultats :</strong> {p.resultats}</p>
                      {p.liens?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {p.liens.map((lnk) => (
                            <a key={lnk.href} href={lnk.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline text-sm"><LinkIcon className="w-4 h-4"/> {lnk.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* PARCOURS – timeline */}
      <Section id="parcours" title="Parcours" subtitle="Étapes de formation et jalons clés." icon={GraduationCap}>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/15" />
              {DIPLOMES.map((d, i) => (
                <div key={i} className="relative pl-8 pb-8">
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_0_4px] shadow-cyan-400/20" />
                  <div className="border-l border-white/10 pl-6 -ml-[1px]">
                    <h4 className="font-semibold">{d.titre}</h4>
                    <p className="text-sm text-white/70">{d.etab} — {d.date} — {d.lieu}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-3"><Award className="w-5 h-5 text-cyan-300"/><h3 className="font-semibold">Compétences E5 & Certifs</h3></div>
            <div className="flex flex-wrap gap-2">
              {COMP_E5.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Certifications</h4>
              <ul className="space-y-2 text-sm mt-2">
                {CERTIFS.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-white/60" />
                    <div>
                      <p className="font-medium">{c.titre}</p>
                      <p className="text-white/70">{c.organisme} — {c.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* VEILLE */}
      <Section id="veille" title="Veille" subtitle="Articles & ressources suivis avec résumés personnels." icon={Newspaper}>
        <div className="grid md:grid-cols-3 gap-6">
          {VEILLE.map((v, i) => (
            <Card key={i}>
              <div className="flex items-center gap-3 mb-2"><Newspaper className="w-5 h-5 text-cyan-300"/><h3 className="font-semibold text-lg">{v.titre}</h3></div>
              <p className="text-sm text-white/70">{v.resume}</p>
              <a className="mt-3 inline-flex items-center gap-2 underline text-sm" href={v.lien} target="_blank" rel="noreferrer"><LinkIcon className="w-4 h-4"/>Source : {v.source}</a>
            </Card>
          ))}
        </div>
        <p className="text-xs text-white/60 mt-4">Astuce E5 : relie chaque point de veille à une amélioration concrète d'un projet.</p>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Pour un stage, une alternance ou un premier emploi." icon={Mail}>
        <Card>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> <a className="underline" href={`mailto:${INFO.email}`}>{INFO.email}</a></p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> <a className="underline" href={`tel:${INFO.tel.replace(/\\s/g, '')}`}>{INFO.tel}</a></p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a className="inline-flex items-center gap-2 underline" href={INFO.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4"/> LinkedIn</a>
                <a className="inline-flex items-center gap-2 underline" href={INFO.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4"/> GitHub</a>
                <a className="inline-flex items-center gap-2 underline" href={INFO.cvUrl} target="_blank" rel="noreferrer"><FileDown className="w-4 h-4"/> CV PDF</a>
                <a className="inline-flex items-center gap-2 underline ml-3" href={INFO.lettreUrl} target="_blank" rel="noreferrer"><FileDown className="w-4 h-4"/> Lettre de motivation </a>
              </div>
            </div>
            <form className="space-y-3" onSubmit={(e)=>{e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 2200);}}>
              <div>
                <label className="block text-xs mb-1">Nom</label>
                <input className="w-full rounded-xl border border-white/10 px-3 py-2 bg-white/5" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs mb-1">Email</label>
                <input type="email" className="w-full rounded-xl border border-white/10 px-3 py-2 bg-white/5" placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className="block text-xs mb-1">Message</label>
                <textarea className="w-full rounded-xl border border-white/10 px-3 py-2 bg-white/5" rows={4} placeholder="Bonjour, je vous contacte au sujet de..." />
              </div>
              <button type="submit" className="rounded-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 transition text-white">Envoyer</button>
              {sent && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs text-emerald-400">
                  ✔ Message envoyé (démo). Pour l'envoi réel, branche Formspree.
                </motion.p>
              )}
            </form>
          </div>
        </Card>
      </Section>

      <footer className="py-10 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {INFO.nom} — Portfolio BTS SIO SLAM.
      </footer>
    </div>
  );
}
