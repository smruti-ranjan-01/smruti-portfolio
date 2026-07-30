import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Send, Cpu, Award, Download,
  Home, MessageCircle, CloudSun, Gamepad2, Grid3x3, Target, ExternalLink,
  GitBranch, Code2, CircleDashed, Zap, Sparkles, Rocket,
  FileText, Triangle, Bot, Activity, Globe,
  Coffee, Terminal, Braces, Database, Flame, Flower2, Network,
  Layers, Share2, FileCode, Palette, Wind, Atom, Hexagon, Leaf, Box, Link2, Binary, Wrench
} from "lucide-react";
import { motion, MotionConfig } from "framer-motion";

/* Lucide 1.0 removed brand icons (GitHub, LinkedIn, etc). Small inline replacements. */
function GithubMark({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinMark({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* ---------------------------------------------------------
   DESIGN TOKENS — bold/modern dark, restructured toward a
   leaner, project-grid-first layout (ref: zachjordan.io)
     bg #0A0D14  surface #12161F  surface2 #1A2030  line #232A3B
     violet #7C5CFC (aggregator)   cyan #22D3EE (client nodes)
   Type: Space Grotesk (display) / Inter (body) / JetBrains Mono (tags)
--------------------------------------------------------- */
const C = {
  bg: "#0A0D14",
  surface: "#12161F",
  surface2: "#1A2030",
  line: "#232A3B",
  violet: "#7C5CFC",
  cyan: "#22D3EE",
  text: "#E7E9F0",
  muted: "#8B93A7",
};

/* ---------------------------------------------------------
   MOTION — one reveal language reused everywhere.
   revealParent: no visual change of its own, just times
   its children (staggerChildren). revealChild: the actual
   fade/rise. Nest a revealParent inside a revealChild to
   cascade section -> grid -> card as one sequence.
--------------------------------------------------------- */
const revealParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const revealChild = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* ---------------- ambient network (small, hero-only accent) ---------------- */
function NetworkAccent() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf, tick = 0;
    let nodes = [];
    const N = 6;
    let center;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      center = { x: w * 0.82, y: h * 0.42 };
      const r = Math.min(w, h) * 0.16;
      nodes = Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        return { x: center.x + Math.cos(a) * r, y: center.y + Math.sin(a) * r, phase: Math.random() * 6 };
      });
    }
    function draw() {
      tick++;
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(center.x, center.y);
        ctx.strokeStyle = "rgba(124,92,252,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      nodes.forEach((n) => {
        const pulse = 1 + Math.sin(tick * 0.03 + n.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = C.cyan;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(center.x, center.y, 6 + Math.sin(tick * 0.04) * 1, 0, Math.PI * 2);
      ctx.fillStyle = C.violet;
      ctx.fill();
      raf = requestAnimationFrame(draw);
    }
    resize(); draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ---------------- nav ---------------- */
function BrandMark() {
  return (
    <motion.a
      href="#top"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-6 md:left-10 z-50 font-mono text-sm tracking-widest"
      style={{ color: C.text }}
    >
      SR<span style={{ color: C.violet }}>.</span>P
    </motion.a>
  );
}

const NAV_LINKS = [
  ["Home", "#top", Home],
  ["Projects", "#projects", Code2],
  ["Skills", "#skills", Sparkles],
  ["Tools", "#tools", Wrench],
  ["Achievements", "#achievements", Award],
  ["Contact", "#contact", Mail],
];

function Nav() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = NAV_LINKS
      .map(([, h]) => document.getElementById(h.slice(1)))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-md max-w-[94vw] overflow-x-auto"
      style={{ backgroundColor: "rgba(18,22,31,0.85)", border: `1px solid ${C.line}` }}
    >
      {NAV_LINKS.map(([label, href, Icon]) => {
        const isActive = active === href;
        return (
          <a
            key={href}
            href={href}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap"
            style={{ color: isActive ? C.bg : C.muted }}
          >
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})` }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </span>
          </a>
        );
      })}
    </motion.nav>
  );
}

/* ---------------- hero: casual, photo + one-line intro ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-60"><NetworkAccent /></div>
      <motion.div
        className="relative max-w-5xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20 flex flex-col md:flex-row items-center gap-10"
        initial="hidden"
        animate="show"
        variants={revealParent}
      >
        <motion.div
          variants={revealChild}
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex-shrink-0 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})`, padding: 3 }}
        >
          <img
            src="/profile.jpeg"
            alt="Smruti Ranjan Pattanaik"
            className="w-full h-full object-cover rounded-xl"
            style={{ backgroundColor: C.bg }}
          />
        </motion.div>
        <motion.div variants={revealChild}>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>
            Hey, I'm Smruti Ranjan Pattanaik.
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
            I build distributed systems and full-stack products — here's what I'm working on,
            currently researching Byzantine-resilient federated learning at IIT Bhubaneswar.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="#projects" className="text-sm font-medium underline underline-offset-4" style={{ color: C.cyan }}>See my projects</a>
            <span style={{ color: C.line }}>·</span>
            <a href="#contact" className="text-sm font-medium underline underline-offset-4" style={{ color: C.cyan }}>Get in touch</a>
            <span style={{ color: C.line }}>·</span>
            {/* Replace href with your actual resume file path, e.g. "/resume.pdf" */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full"
              style={{ backgroundColor: "#F4F5F7", color: C.bg }}
            >
              <Download size={14} /> Resume
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- featured work strip ---------------- */
function Featured() {
  const items = [
    { name: "Byzantine-Resilient FL Framework", tag: "100% Byzantine detection, ~50% bandwidth saved", href: "#projects" },
    { name: "NestAway", tag: "Airbnb-style MERN rental marketplace", href: "#projects" },
    { name: "Converso", tag: "AI chat app on the OpenAI API", href: "#projects" },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
      <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: C.cyan }}>Featured Work</div>
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        variants={revealParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map((it) => (
          <motion.a
            key={it.name}
            href={it.href}
            variants={revealChild}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="block p-5 rounded-xl"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}
          >
            <div className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{it.name}</div>
            <div className="text-xs mt-2" style={{ color: C.muted }}>{it.tag}</div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- section shell ---------------- */
function Section({ id, eyebrow, title, sub, children }) {
  return (
    <motion.section
      id={id}
      className="px-6 md:px-10 py-16 max-w-5xl mx-auto"
      variants={revealParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={revealChild}>
        {eyebrow && <div className="font-mono text-xs tracking-[0.2em] uppercase mb-3" style={{ color: C.cyan }}>{eyebrow}</div>}
        {title && <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{title}</h2>}
        {sub && <p className="mt-2 text-sm max-w-xl" style={{ color: C.muted }}>{sub}</p>}
      </motion.div>
      <motion.div className="mt-8" variants={revealChild}>{children}</motion.div>
    </motion.section>
  );
}

/* ---------------- project grid (logo + name + description + stack) ---------------- */
function ProjectTile({ icon: Icon, title, desc, stack, href, onClick }) {
  const isLink = Boolean(href);
  const isInternal = isLink && href.startsWith("#");
  const isClickable = Boolean(onClick);
  const Wrapper = isLink ? motion.a : motion.div;
  const wrapperProps = isLink
    ? isInternal
      ? { href }
      : { href, target: "_blank", rel: "noopener noreferrer" }
    : isClickable
    ? { onClick, role: "button", tabIndex: 0 }
    : {};
  const badge = isClickable ? "Info" : isInternal ? "View" : href && href.includes("github.com") ? "Repo" : isLink ? "Live" : null;
  return (
    <Wrapper
      {...wrapperProps}
      variants={revealChild}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group block p-7 rounded-xl ${isClickable ? "cursor-pointer" : ""}`}
      style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
          style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})` }}
        >
          <Icon size={20} color={C.bg} />
        </div>
        {badge && (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#F4F5F7", color: C.bg }}
          >
            {badge} <ExternalLink size={11} />
          </span>
        )}
      </div>
      <div className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{title}</div>
      <div className="text-sm mt-2 leading-relaxed" style={{ color: C.muted }}>{desc}</div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: C.surface2, color: C.muted }}>{s}</span>
        ))}
      </div>
    </Wrapper>
  );
}

function Projects() {
  const projects = [
    {
      icon: Cpu,
      title: "Byzantine-Resilient FL Framework",
      desc: "Real-Time Adaptive Straggler Avoidance and Byzantine Attack Detection with Dynamic Asynchronous Aggregation in Federated Learning — a two-stage client screening protocol with quantized weight deltas, dynamic asynchronous aggregation, and cosine-similarity confidence scoring, achieving 100% Byzantine detection with ~50% bandwidth reduction.",
      stack: ["Python", "PyTorch", "Flower (flwr)", "Distributed Systems"],
    },
    {
      icon: Home,
      title: "NestAway",
      desc: "Full-stack rental marketplace platform with listings and bookings.",
      stack: ["HTML", "CSS", "JS", "Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
      href: "https://github.com/smruti-ranjan-01/NestAway",
    },
    {
      icon: MessageCircle,
      title: "Converso",
      desc: "AI-powered chat application built on the OpenAI API.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI API"],
    },
    {
      icon: CloudSun,
      title: "Simple Weather App",
      desc: "A lightweight app for looking up current weather conditions.",
      stack: ["HTML", "CSS", "JavaScript"],
      href: "https://donals-weatherapp.netlify.app/",
    },
    {
      icon: Gamepad2,
      title: "Simon Says Game",
      desc: "A browser-based memory and reaction game.",
      stack: ["HTML", "CSS", "JavaScript"],
      href: "https://simonsaysss-game.netlify.app/",
    },
    {
      icon: Grid3x3,
      title: "Tic-Tac-Toe",
      desc: "The classic two-player game, built from scratch.",
      stack: ["HTML", "CSS", "JavaScript"],
      href: "https://tic-tac-toe-game-donal01.netlify.app/",
    },
    {
      icon: Target,
      title: "Donal's Discipline Tracker",
      desc: "A simple tracker for building and maintaining daily discipline habits.",
      stack: ["HTML"],
      onClick: () => alert("This is a private site."),
    },
    {
      icon: Globe,
      title: "My Portfolio Website",
      desc: "This very site — a React + Tailwind portfolio built to showcase my research and full-stack work.",
      stack: ["React", "Tailwind CSS", "Vite"],
      href: "#top",
    },
  ];
  return (
    <Section id="projects" eyebrow="Projects" title="My Projects" sub="A few things I've built, research and full-stack alike.">
      <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" variants={revealParent}>
        {projects.map((p) => (
          <ProjectTile key={p.title} {...p} />
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- skills (tagline style, not big cards) ---------------- */
/* ---------------- skills (6 wide cards, each with nested skill chips) ---------------- */
function SkillChip({ icon: Icon, name, level }) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
      style={{ backgroundColor: C.surface2, border: `1px solid ${C.line}` }}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})` }}
      >
        <Icon size={15} color={C.bg} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-mono" style={{ color: C.text }}>{name}</span>
        {level && <span className="text-[10px] font-mono mt-0.5" style={{ color: C.muted }}>{level}</span>}
      </div>
    </div>
  );
}

function SkillGroupCard({ label, skills }) {
  return (
    <div className="p-6 rounded-xl" style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}>
      <div className="text-base font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{label}</div>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((s) => (
          <SkillChip key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const groups = [
    {
      label: "Languages",
      skills: [
        { icon: Cpu, name: "C", level: "Intermediate" },
        { icon: Coffee, name: "Java", level: "Advanced" },
        { icon: Terminal, name: "Python", level: "Advanced" },
        { icon: Braces, name: "JavaScript", level: "Intermediate" },
        { icon: Database, name: "SQL", level: "Intermediate" },
      ],
    },
    {
      label: "ML / Research",
      skills: [
        { icon: Flame, name: "PyTorch", level: "Advanced" },
        { icon: Flower2, name: "Flower (flwr)", level: "Advanced" },
        { icon: Network, name: "Federated Learning", level: "Advanced" },
        { icon: Layers, name: "Model Quantization", level: "Intermediate" },
        { icon: Share2, name: "Distributed Systems", level: "Intermediate" },
      ],
    },
    {
      label: "Web Technologies",
      skills: [
        { icon: FileCode, name: "HTML", level: "Advanced" },
        { icon: Palette, name: "CSS", level: "Intermediate" },
        { icon: Wind, name: "Tailwind CSS", level: "Advanced" },
      ],
    },
    {
      label: "Frameworks",
      skills: [
        { icon: Atom, name: "React.js", level: "Advanced" },
        { icon: Hexagon, name: "Node.js", level: "Intermediate" },
        { icon: Zap, name: "Express.js", level: "Intermediate" },
      ],
    },
    {
      label: "Databases",
      skills: [
        { icon: Leaf, name: "MongoDB", level: "Intermediate" },
        { icon: Database, name: "MySQL", level: "Intermediate" },
      ],
    },
    {
      label: "Core Concepts",
      skills: [
        { icon: Binary, name: "Data Structures & Algorithms", level: "Advanced" },
        { icon: Box, name: "OOP", level: "Advanced" },
        { icon: Database, name: "DBMS", level: "Intermediate" },
        { icon: Link2, name: "REST APIs", level: "Intermediate" },
      ],
    },
  ];
  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit">
      <motion.div className="space-y-5" variants={revealParent}>
        {groups.map((g) => (
          <motion.div key={g.label} variants={revealChild}>
            <SkillGroupCard {...g} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- tools (logo + label cards) ---------------- */
function ToolCard({ icon: Icon, name }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl"
      style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})` }}
      >
        <Icon size={20} color={C.bg} />
      </div>
      <div className="text-xs font-mono text-center" style={{ color: C.text }}>{name}</div>
    </div>
  );
}

function Tools() {
  const tools = [
    { icon: GitBranch, name: "Git" },
    { icon: GithubMark, name: "GitHub" },
    { icon: Code2, name: "VS Code" },
    { icon: CircleDashed, name: "Eclipse" },
    { icon: Activity, name: "Hoppscotch" },
    { icon: Sparkles, name: "Claude" },
    { icon: Rocket, name: "Antigravity" },
    { icon: FileText, name: "LaTeX / Overleaf" },
    { icon: Zap, name: "Vite" },
    { icon: Triangle, name: "Vercel / Netlify" },
    { icon: Bot, name: "ChatGPT" },
  ];
  return (
    <Section id="tools" eyebrow="Tools" title="What I Build With" sub="Day-to-day tools across dev, testing, and AI-assisted work.">
      <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4" variants={revealParent}>
        {tools.map((t) => (
          <motion.div
            key={t.name}
            variants={revealChild}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ToolCard {...t} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- achievements (media-style one-liners) ---------------- */
function Achievements() {
  const items = [
    { title: "Federated Learning Research Paper", note: "~25–30-page paper on Byzantine-resilient FL, IIT Bhubaneswar internship." },
    { title: "Ex Machine Learning Intern, IIT Bhubaneswar", note: "Research internship under the School of Electrical Sciences and Computer Science (SECS)." },
    { title: "TCS Campus Placement", note: "Ninja category offer, Core Java — preparing for higher hiring bands." },
    { title: "CodeSprint Hackathon (CodeClash)", note: "Top 2% ranking among 8,600+ participants." },
    { title: "Infosys Springboard Certification", note: "Frontend Web Development, completed 2025." },
    { title: "GSSoC 2026 Open Source Contributor", note: "Selected contributor in one of India's largest open source programs." },
    { title: "Merit-Based Scholarship", note: "Awarded for ranking in the top 2% at Siksha 'O' Anusandhan University." },
  ];
  return (
    <Section id="achievements" eyebrow="Achievements" title="Recognition">
      <motion.div className="space-y-3" variants={revealParent}>
        {items.map((a) => (
          <motion.div key={a.title} variants={revealChild} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <Award size={16} style={{ color: C.cyan, marginTop: 3, flexShrink: 0 }} />
            <div>
              <span className="text-sm font-semibold" style={{ color: C.text }}>{a.title}</span>
              <span className="text-sm ml-2" style={{ color: C.muted }}>— {a.note}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------------- contact: real form ---------------- */
function ContactPill({ label, value, icon: Icon, href, download }) {
  const isExternal = href.startsWith("http");
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm" style={{ color: C.muted }}>{label}</span>
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...(download ? { download: true } : {})}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
        style={{ backgroundColor: "#F4F5F7", color: C.bg }}
      >
        {value} <Icon size={14} />
      </motion.a>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch("https://formspree.io/f/mlgqpqdz", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Contact Me" sub="Open to research collaborations, SDE roles, or just a chat.">
      <motion.div className="grid md:grid-cols-2 gap-10" variants={revealParent}>
        <motion.form variants={revealChild} onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-mono" style={{ color: C.muted }}>Your Name</label>
            <input
              required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1.5 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.line}`, color: C.text }}
            />
          </div>
          <div>
            <label className="text-xs font-mono" style={{ color: C.muted }}>Your Email</label>
            <input
              required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1.5 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.line}`, color: C.text }}
            />
          </div>
          <div>
            <label className="text-xs font-mono" style={{ color: C.muted }}>Your Message</label>
            <textarea
              required rows={4} name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mt-1.5 px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.line}`, color: C.text }}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm"
            style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})`, color: C.bg }}
          >
            <Send size={15} /> {sent ? "Sent!" : "Send Message"}
          </button>
          {sent && <p className="text-xs" style={{ color: C.cyan }}>Thanks — your message has been sent.</p>}
          {error && <p className="text-xs" style={{ color: "#F87171" }}>Something went wrong — please try again or email me directly.</p>}
        </motion.form>

        <motion.div variants={revealChild} className="flex flex-col justify-center gap-4">
          <ContactPill label="Drop a line at" value="Mail" icon={Mail} href="mailto:pattanaiksmrutiranjan1@gmail.com" />
          <ContactPill label="See my work at" value="GitHub" icon={GithubMark} href="https://github.com/smruti-ranjan-01" />
          <ContactPill label="Let's connect" value="LinkedIn" icon={LinkedinMark} href="https://www.linkedin.com/in/smruti-ranjan-pattanaik-815a2537a" />
          <ContactPill label="View my resume" value="Resume" icon={Download} href="/resume.pdf" download />
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-8 max-w-5xl mx-auto text-center" style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="font-mono text-xs" style={{ color: C.muted }}>© {new Date().getFullYear()} Smruti Ranjan Pattanaik. All rights reserved.</div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <div style={{ backgroundColor: C.bg, minHeight: "100vh", paddingBottom: 96 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { margin: 0; }
          input::placeholder, textarea::placeholder { color: #5B6478; }
        `}</style>
        <BrandMark />
        <Hero />
        <Featured />
        <Projects />
        <Skills />
        <Tools />
        <Achievements />
        <Contact />
        <Footer />
        <Nav />
      </div>
    </MotionConfig>
  );
}