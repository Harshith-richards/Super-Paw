import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const DATA = {
  name: "Harshith K V",
  role: ".NET / C# Developer",
  tagline: "Building scalable, production-grade web applications with clean architecture.",
  email: "kvharshith6557@gmail.com",
  phone: "+91 79755 85507",
  location: "Mysuru, Karnataka",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  about: `Computer Science graduate (CGPA 8.75) with deep expertise in C#, ASP.NET Core, and the .NET ecosystem. I build production-grade applications with clean architecture — repository patterns, dependency injection, and RESTful API design. From IoT fire-safety systems achieving 91% detection accuracy to full-stack employee platforms handling 500+ records, I combine engineering precision with rapid framework adoption.`,
  skills: [
    {
      category: ".NET / C#",
      icon: "⬡",
      color: "from-violet-500 to-purple-600",
      items: ["C#", "ASP.NET Core MVC", "ASP.NET Core Web API", "Entity Framework Core", ".NET 8", "LINQ", "JWT Auth"],
    },
    {
      category: "Web & UI",
      icon: "◈",
      color: "from-cyan-500 to-blue-600",
      items: ["Razor Pages", "HTML5", "CSS3", "JavaScript", "React (In Progress)", "Bootstrap 5"],
    },
    {
      category: "Databases",
      icon: "▣",
      color: "from-emerald-500 to-teal-600",
      items: ["SQL Server", "MySQL", "MongoDB", "SSMS", "Stored Procedures"],
    },
    {
      category: "Tools & DevOps",
      icon: "◎",
      color: "from-orange-500 to-red-600",
      items: ["Visual Studio 2022", "VS Code", "Git & GitHub", "Postman", "Swagger", "Agile/Scrum"],
    },
    {
      category: "ML / Data",
      icon: "◆",
      color: "from-pink-500 to-rose-600",
      items: ["Python", "Scikit-Learn", "Pandas", "NumPy", "YOLO", "Flask", "Power BI"],
    },
  ],
  projects: [
    {
      title: "Employee Management System",
      year: "2024 – Present",
      description: "Full-stack CRUD web app managing 500+ employee records with role-based access control, repository pattern, and DI — reducing code duplication by ~40%.",
      tech: ["C#", "ASP.NET Core 8 MVC", "EF Core", "SQL Server", "Bootstrap 5", "Git"],
      metrics: ["500+ records", "80% test coverage", "30% faster queries"],
      color: "from-violet-600 to-purple-700",
      github: "https://github.com",
    },
    {
      title: "RESTful Product Catalogue API",
      year: "2024",
      description: "15+ endpoint Web API with Swagger spec, JWT Bearer auth securing 100% of sensitive routes, and async/await patterns boosting throughput by ~50%.",
      tech: ["C#", "ASP.NET Core Web API", "JWT", "Swagger", "SQL Server", "Postman"],
      metrics: ["15+ endpoints", "100% secured", "50% throughput ↑"],
      color: "from-cyan-600 to-blue-700",
      github: "https://github.com",
    },
    {
      title: "Fire Safety IoT System",
      year: "2023 – 2024",
      description: "End-to-end IoT fire-detection: custom YOLO classifier on 1,200+ images achieving 91% accuracy, Flask REST backend with <2s alert latency, Flutter mobile app.",
      tech: ["Python", "YOLO", "Flask", "Flutter", "MongoDB", "ESP-32"],
      metrics: ["91% accuracy", "<2s latency", "1200+ training images"],
      color: "from-orange-600 to-red-700",
      github: "https://github.com",
    },
    {
      title: "Real Estate Price Prediction",
      year: "2023",
      description: "ML regression model with 12 engineered features from raw property data, achieving R²=0.87 on test set. Deployed behind a Flask REST endpoint.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Flask", "Matplotlib"],
      metrics: ["R² = 0.87", "12 features", "Flask deployed"],
      color: "from-emerald-600 to-teal-700",
      github: "https://github.com",
    },
  ],
  education: [
    {
      degree: "B.E. in Computer Science",
      school: "ATME College of Engineering",
      location: "Mysuru",
      year: "2022 – Present",
      grade: "CGPA: 8.75 / 10",
      courses: ["OOP with C#", "DBMS", "DSA", "Computer Networks", "Software Engineering"],
    },
    {
      degree: "PUC (Science)",
      school: "Ramakrishna Vidyakendra PU College",
      location: "Mysuru",
      year: "2020 – 2022",
      grade: "93%",
      courses: [],
    },
    {
      degree: "10th Grade",
      school: "Ramakrishna Vidyakendra",
      location: "Mysuru",
      year: "2019 – 2020",
      grade: "93.92%",
      courses: [],
    },
  ],
  certifications: [
    { title: "Python for Data Science", issuer: "NPTEL", year: "2024" },
    { title: "Programming in Java", issuer: "NPTEL", year: "2024" },
    { title: "C# Fundamentals & ASP.NET Core", issuer: "Microsoft Learn", year: "In Progress" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   THREE.JS PARTICLE BACKGROUND
═══════════════════════════════════════════════════════════════ */
function ParticleBackground({ dark }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 80;

    // Particles
    const N = 1200;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      const t = Math.random();
      col[i * 3] = t < 0.33 ? 0.5 : t < 0.66 ? 0.2 : 0.8;
      col[i * 3 + 1] = t < 0.33 ? 0.3 : t < 0.66 ? 0.7 : 0.2;
      col[i * 3 + 2] = t < 0.33 ? 1.0 : t < 0.66 ? 0.9 : 0.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.7 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    // Floating torus
    const tGeo = new THREE.TorusGeometry(25, 1, 16, 100);
    const tMat = new THREE.MeshBasicMaterial({ color: 0x6d28d9, wireframe: true, transparent: true, opacity: 0.15 });
    const torus = new THREE.Mesh(tGeo, tMat);
    scene.add(torus);

    let mouse = { x: 0, y: 0 };
    const onMouse = e => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3; mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3; };
    window.addEventListener("mousemove", onMouse);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      pts.rotation.y += 0.0008;
      pts.rotation.x += 0.0003;
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.003;
      camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 20 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    sceneRef.current = { renderer, frame };
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
}

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════════════════════════ */
function SectionTitle({ label, title, sub }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">{label}</span>
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h2>
      {sub && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{sub}</p>}
      <div className="mt-5 flex justify-center gap-2">
        <span className="w-12 h-1 rounded bg-violet-600" />
        <span className="w-3 h-1 rounded bg-violet-400" />
        <span className="w-1 h-1 rounded bg-violet-300" />
      </div>
    </div>
  );
}

function Card({ children, className = "", delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
function Nav({ dark, setDark, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Education", "Contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scroll = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/5 py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scroll("home")} className="text-xl font-black text-white tracking-tight">
          H<span className="text-violet-400">K</span>V
        </button>
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <li key={l}>
              <button onClick={() => scroll(l)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${active === l.toLowerCase() ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {l}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-lg transition-all">
            {dark ? "☀" : "◑"}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 rounded-full bg-white/5 text-white flex items-center justify-center">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-6 py-4">
          {links.map(l => (
            <button key={l} onClick={() => scroll(l)} className="block w-full text-left py-3 text-gray-300 hover:text-white font-medium border-b border-white/5 last:border-0">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <ParticleBackground dark={true} />
      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        {/* Avatar */}
        <div className="mx-auto mb-8 relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-1 rounded-full bg-gray-950 flex items-center justify-center">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400">H</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-violet-300 text-sm font-medium">Available for opportunities</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight">
          {DATA.name.split(" ").map((w, i) => (
            <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400" : ""}>{w} </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-violet-300 font-semibold mb-4">{DATA.role}</p>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{DATA.tagline}</p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full hover:from-violet-500 hover:to-purple-500 transition-all hover:scale-105 shadow-lg shadow-violet-500/25">
            View Projects →
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
            Get In Touch
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-center">
          {[["8.75", "CGPA"], ["4+", "Projects"], ["2", "Certifications"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-white">{v}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Who I Am" title="About Me" sub="A passionate engineer building robust software solutions" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card delay={0}>
            <div className="relative">
              <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-violet-900/50 to-gray-900 border border-violet-500/20 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400 mb-4">HKV</div>
                  <div className="text-gray-300 font-medium">.NET / C# Developer</div>
                  <div className="text-gray-500 text-sm mt-1">Mysuru, Karnataka 🇮🇳</div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[["8.75", "GPA"], ["4+", "Projects"], ["2+", "Certs"]].map(([v, l]) => (
                      <div key={l} className="bg-white/5 rounded-xl p-3">
                        <div className="text-xl font-black text-violet-400">{v}</div>
                        <div className="text-xs text-gray-500">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card delay={150}>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">{DATA.about}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  ["🎓", "Computer Science", "B.E. — ATME College"],
                  ["📍", "Location", "Mysuru, Karnataka"],
                  ["💼", "Seeking", "Fresher .NET Role"],
                  ["🌐", "Focus", "ASP.NET Core, C#"],
                ].map(([icon, label, val]) => (
                  <div key={label} className="bg-gray-800/50 rounded-2xl p-4 border border-white/5">
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
                    <div className="text-white font-medium text-sm mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <a href={`mailto:${DATA.email}`} className="flex-1 text-center py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all text-sm">
                  ✉ Email Me
                </a>
                <a href={DATA.github} className="flex-1 text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm">
                  ⌥ GitHub
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" className="py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Expertise" title="Technical Skills" sub="Technologies and tools I work with" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.skills.map((s, i) => (
            <Card key={s.category} delay={i * 80}>
              <div className="h-full bg-gray-900/60 border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all hover:-translate-y-1 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-4">{s.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded-full hover:bg-violet-600/20 hover:border-violet-500/40 hover:text-white transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section id="projects" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle label="Portfolio" title="Featured Projects" sub="Handcrafted solutions from concept to deployment" />
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.projects.map((p, i) => (
            <Card key={p.title} delay={i * 100}>
              <div className="h-full bg-gray-950/80 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:-translate-y-1 group">
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-bold text-xl leading-tight">{p.title}</h3>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg ml-3 whitespace-nowrap">{p.year}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.description}</p>

                  <div className="flex gap-2 mb-5 flex-wrap">
                    {p.metrics.map(m => (
                      <span key={m} className="text-xs font-semibold text-violet-300 bg-violet-600/15 border border-violet-500/25 px-2.5 py-1 rounded-full">{m}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map(t => (
                      <span key={t} className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/8">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2 border-t border-white/5">
                    <a href={p.github} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-medium">
                      ⌥ GitHub →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EDUCATION
═══════════════════════════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" className="py-28 bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle label="Background" title="Education & Certifications" />
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600 via-violet-600/50 to-transparent" />
          {DATA.education.map((e, i) => (
            <Card key={e.degree} delay={i * 100}>
              <div className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="md:w-1/2 pl-14 md:pl-0">
                  <div className={`bg-gray-900/60 border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-bold text-lg">{e.degree}</h3>
                      <span className="text-violet-400 font-bold text-sm ml-2">{e.grade}</span>
                    </div>
                    <div className="text-gray-300 font-medium text-sm">{e.school}</div>
                    <div className="text-gray-500 text-xs mt-0.5 mb-3">{e.location} · {e.year}</div>
                    {e.courses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {e.courses.map(c => <span key={c} className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded">{c}</span>)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute left-3 md:left-1/2 top-6 w-7 h-7 md:-translate-x-1/2 bg-violet-600 border-4 border-gray-950 rounded-full z-10" />
                <div className="hidden md:block md:w-1/2" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-white font-bold text-2xl text-center mb-8">Certifications</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {DATA.certifications.map((c, i) => (
              <Card key={c.title} delay={i * 80}>
                <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 hover:border-violet-500/30 transition-all text-center">
                  <div className="text-3xl mb-3">🏆</div>
                  <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                  <div className="text-gray-500 text-xs">{c.issuer} · {c.year}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message too short";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle label="Get In Touch" title="Contact Me" sub="Let's build something amazing together" />
        <div className="grid md:grid-cols-2 gap-12">
          <Card delay={0}>
            <div className="space-y-6">
              <h3 className="text-white font-bold text-2xl">Let's Connect</h3>
              <p className="text-gray-400 leading-relaxed">I'm actively looking for fresher .NET Developer roles. Whether it's a job opportunity, freelance project, or just a chat about technology — I'd love to hear from you.</p>
              {[
                ["✉", "Email", DATA.email, `mailto:${DATA.email}`],
                ["☎", "Phone", DATA.phone, `tel:${DATA.phone}`],
                ["📍", "Location", DATA.location, null],
              ].map(([icon, label, val, href]) => (
                <div key={label} className="flex items-center gap-4 bg-gray-950/50 border border-white/5 rounded-xl p-4 hover:border-violet-500/30 transition-all">
                  <span className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center text-lg">{icon}</span>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
                    {href ? <a href={href} className="text-white hover:text-violet-400 transition-colors font-medium">{val}</a> : <div className="text-white font-medium">{val}</div>}
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                {[["GitHub", DATA.github, "⌥"], ["LinkedIn", DATA.linkedin, "in"]].map(([n, u, i]) => (
                  <a key={n} href={u} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all text-sm">
                    <span>{i}</span> {n}
                  </a>
                ))}
              </div>
            </div>
          </Card>

          <Card delay={150}>
            {sent ? (
              <div className="h-full flex items-center justify-center text-center bg-gray-950/50 rounded-2xl border border-violet-500/20 p-12">
                <div>
                  <div className="text-6xl mb-4">✅</div>
                  <div className="text-white font-bold text-2xl mb-2">Message Sent!</div>
                  <div className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-gray-950/50 border border-white/5 rounded-2xl p-8">
                {[["name", "Your Name", "text"], ["email", "Email Address", "email"]].map(([field, ph, type]) => (
                  <div key={field}>
                    <input type={type} placeholder={ph} value={form[field]}
                      onChange={e => { setForm({ ...form, [field]: e.target.value }); setErrors({ ...errors, [field]: "" }); }}
                      className={`w-full bg-gray-900 border ${errors[field] ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm`} />
                    {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <textarea rows={5} placeholder="Your message..." value={form.message}
                    onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    className={`w-full bg-gray-900 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none text-sm`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button onClick={submit} className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-500/20">
                  Send Message →
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-2xl font-black text-white">H<span className="text-violet-400">K</span>V</span>
        <p className="text-gray-500 text-sm">© 2024 Harshith K V. Designed & Built with ♥</p>
        <div className="flex gap-4">
          {[["GitHub", DATA.github], ["LinkedIn", DATA.linkedin], ["Email", `mailto:${DATA.email}`]].map(([n, u]) => (
            <a key={n} href={u} className="text-gray-500 hover:text-violet-400 text-sm transition-colors">{n}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`${dark ? "bg-gray-950" : "bg-white"} font-sans antialiased`}>
      <style>{`* { box-sizing: border-box; } html { scroll-behavior: smooth; } body { margin: 0; background: #030712; }`}</style>
      <Nav dark={dark} setDark={setDark} active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
