import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Menu, X, Send, Cpu, Award, Download,
  Home, MessageCircle, CloudSun, Gamepad2, Grid3x3, Target, ExternalLink,
  GitBranch, Code2, CircleDashed, Zap, Sparkles, Rocket,
  FileText, Triangle, Bot, Activity, Globe
} from "lucide-react";

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
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [["Projects", "#projects"], ["Skills", "#skills"], ["Tools", "#tools"], ["Achievements", "#achievements"], ["Contact", "#contact"]];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(10,13,20,0.75)", borderBottom: `1px solid ${C.line}` }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-widest" style={{ color: C.text }}>SR<span style={{ color: C.violet }}>.</span>P</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-sm" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
               onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
               onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l}</a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: C.text }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-sm pt-4" style={{ color: C.muted }}>{l}</a>)}
        </div>
      )}
    </header>
  );
}

/* ---------------- hero: casual, photo + one-line intro ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-60"><NetworkAccent /></div>
      <div className="relative max-w-5xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20 flex flex-col md:flex-row items-center gap-10">
        <div
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex-shrink-0 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})`, padding: 3 }}
        >
          <img
            src="/profile.jpeg"
            alt="Smruti Ranjan Pattanaik"
            className="w-full h-full object-cover rounded-xl"
            style={{ backgroundColor: C.bg }}
          />
        </div>
        <div>
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
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.line}`, color: C.text }}
            >
              <Download size={14} /> Resume
            </a>
          </div>
        </div>
      </div>
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
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <a key={it.name} href={it.href} className="block p-5 rounded-xl transition-transform hover:-translate-y-1"
             style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}>
            <div className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{it.name}</div>
            <div className="text-xs mt-2" style={{ color: C.muted }}>{it.tag}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------- section shell ---------------- */
function Section({ id, eyebrow, title, sub, children }) {
  return (
    <section id={id} className="px-6 md:px-10 py-16 max-w-5xl mx-auto">
      {eyebrow && <div className="font-mono text-xs tracking-[0.2em] uppercase mb-3" style={{ color: C.cyan }}>{eyebrow}</div>}
      {title && <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}>{title}</h2>}
      {sub && <p className="mt-2 text-sm max-w-xl" style={{ color: C.muted }}>{sub}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- project grid (logo + name + description + stack) ---------------- */
function ProjectTile({ icon: Icon, title, desc, stack, href, onClick }) {
  const isLink = Boolean(href);
  const isInternal = isLink && href.startsWith("#");
  const isClickable = Boolean(onClick);
  const Wrapper = isLink ? "a" : "div";
  const wrapperProps = isLink
    ? isInternal
      ? { href }
      : { href, target: "_blank", rel: "noopener noreferrer" }
    : isClickable
    ? { onClick, role: "button", tabIndex: 0 }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`group block p-7 rounded-xl transition-transform hover:-translate-y-1 ${isClickable ? "cursor-pointer" : ""}`}
      style={{ backgroundColor: C.surface, border: `1px solid ${C.line}` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
          style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.cyan})` }}
        >
          <Icon size={20} color={C.bg} />
        </div>
        {(isLink || isClickable) && (
          <ExternalLink
            size={15}
            style={{ color: C.muted }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectTile key={p.title} {...p} />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- skills (tagline style, not big cards) ---------------- */
function Skills() {
  const groups = [
    { label: "Languages", items: "C · Java · Python · JavaScript · SQL" },
    { label: "ML / Research", items: "PyTorch · Flower (flwr) · Federated Learning · Model Quantization · Distributed Systems" },
    { label: "Web Technologies", items: "HTML · CSS · Tailwind CSS" },
    { label: "Frameworks", items: "React.js · Node.js · Express.js" },
    { label: "Databases", items: "MongoDB · MySQL" },
    { label: "Core Concepts", items: "Data Structures & Algorithms · OOP · DBMS · REST APIs" },
  ];
  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit">
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div className="w-40 text-sm font-semibold flex-shrink-0" style={{ color: C.text }}>{g.label}</div>
            <div className="text-sm font-mono" style={{ color: C.muted }}>{g.items}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- tools (logo + label cards) ---------------- */
function ToolCard({ icon: Icon, name }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl transition-transform hover:-translate-y-1"
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {tools.map((t) => (
          <ToolCard key={t.name} {...t} />
        ))}
      </div>
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
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.title} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <Award size={16} style={{ color: C.cyan, marginTop: 3, flexShrink: 0 }} />
            <div>
              <span className="text-sm font-semibold" style={{ color: C.text }}>{a.title}</span>
              <span className="text-sm ml-2" style={{ color: C.muted }}>— {a.note}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- contact: real form ---------------- */
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
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={submit} className="space-y-4">
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
        </form>

        <div className="flex flex-col justify-center gap-3">
          <a href="mailto:pattanaiksmrutiranjan1@gmail.com" className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
            <Mail size={16} style={{ color: C.cyan }} /> pattanaiksmrutiranjan1@gmail.com
          </a>
          <a href="https://github.com/smruti-ranjan-01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
            <GithubMark size={16} color={C.cyan} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/smruti-ranjan-pattanaik-815a2537a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
            <LinkedinMark size={16} color={C.cyan} /> LinkedIn
          </a>
          <a href="/resume.pdf" download className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
            <Download size={16} style={{ color: C.cyan }} /> Download Resume
          </a>
        </div>
      </div>
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
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: #5B6478; }
      `}</style>
      <Nav />
      <Hero />
      <Featured />
      <Projects />
      <Skills />
      <Tools />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}