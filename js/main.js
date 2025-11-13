/* Main JS – sin cambiar funcionalidades, solo limpieza */
(() => {
  'use strict';

  // ===== Helpers =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Año en footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Tema claro/oscuro =====
  const btn = $('#themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');

  if (saved === 'light') {
    root.classList.add('light');
    if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-pressed', 'true'); }
  } else {
    if (btn) btn.setAttribute('aria-pressed', 'false');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });
  }

  // Aviso en enlaces placeholder
  $$('#proyectos .project a').forEach(a => {
    if (a.getAttribute('href')?.includes('tu-usuario')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Pronto actualizaré este enlace con mi información real. ¡Gracias por tu interés!');
      });
    }
  });

  // ===== SKILLS =====
  const skillGroups = [
    {
      name: "Java",
      level: 3,
      summary: "Backend fuerte, OOP y patrones.",
      tags: [
        { label: "Java17", kind: "core" },
        { label: "Java19", kind: "core" },
        { label: "Java21", kind: "core" },
        { label: "OOP", kind: "core" },
        { label: "Colecciones/Streams", kind: "core" },
        { label: "REST APIs", kind: "core" },
      ]
    },
    {
      name: "Spring Boot",
      level: 2.5,
      summary: "Agilidad e intencionalidad.",
      tags: [
        { label: "Spring MVC", kind: "core" },
        { label: "Dependency Injection", kind: "core" },
        { label: "Spring Data JPA", kind: "db" },
      ]
    },
    {
      name: "Bases de datos",
      level: 2.5,
      summary: "Modelado y consultas sólidas.",
      tags: [
        { label: "MySQL", kind: "db" },
        { label: "H2 (InMemory)", kind: "db" },
        { label: "DBeaver / Workbench", kind: "tool" },
        { label: "Docker Volumes", kind: "tool" }
      ]
    },
    {
      name: "Testing",
      level: 2,
      summary: "TDD y dobles de test.",
      tags: [
        { label: "TDD", kind: "test" },
        { label: "JUnit 5", kind: "test" },
        { label: "Mockito", kind: "test" },
        { label: "Test Doubles", kind: "test" }
      ]
    },
    {
      name: "JetBrains IDEs",
      level: 4.5,
      summary: "Flujos limpios, refactors y configuraciones",
      tags: [
        { label: "IntelliJ IDEA", kind: "tool" },
        { label: "Multicursor", kind: "tool" },
        { label: "Live Templates", kind: "tool" },
        { label: "Git Integration", kind: "tool" }
      ]
    },
    {
      name: "Dev & Tools",
      level: 3.5,
      summary: "Productividad y despliegue local.",
      tags: [
        { label: "Git", kind: "tool" },
        { label: "Docker", kind: "tool" },
        { label: "Swagger/OpenAPI", kind: "tool" },
        { label: "Notion", kind: "tool" }
      ]
    }
  ];

  function renderSkills() {
    const grid = $('#skills-grid');
    if (!grid) return;

    grid.innerHTML = skillGroups.map(g => {
      const tags = g.tags.map(t => `<span class="tag-mini" data-kind="${t.kind}">${t.label}</span>`).join("");

      return `
        <article class="skill-card" data-level="${g.level}">
          <div class="skill-head">
            <div class="skill-name">${g.name}</div>
            <div class="skill-level" style="--level:${g.level}"></div>
          </div>
          <div class="tags-mini">${tags}</div>
          <div class="skill-foot">${g.summary || ""}</div>
        </article>
      `;
    }).join("");
  }

  // ===== LEARNING (datos + UI) =====
  const readBooks = [
    { code: "🧩", title: "Programación orientada a objetos en Java", author: "Francisco Blasco", publisher: "Ra-Ma", year: 2019, tags: ["Java", "OOP"], impact: 6, idea: "Pensar en objetos antes que en ifs: menos acople, más orden." },
    { code: "🦉", title: "Deep Work", author: "Cal Newport", publisher: "", year: 2022, tags: ["Productividad", "Concentración", "Enfoque"], impact: 7, idea: "Bloques sin distracciones, progreso real en menos tiempo." },
    { code: "🧮", title: "Curso de SQL", author: "Ediciones Anaya", publisher: "Anaya", year: 2022, tags: ["SQL"], impact: 5, idea: "Las consultas también merecen atención: optimiza para personas y máquinas." },
    { code: "💬", title: "Cómo ganar amigos e influir en las personas", author: "Dale Carnegie", publisher: "", year: 2023, tags: ["Comunicación", "Influencia", "Empatía"], impact: 6, idea: "La empatía también compila: escucha, luego propone." },
    { code: "🌱", title: "Código sostenible", author: "Carlos Blé Jurado", publisher: "", year: 2022, tags: ["Diseño", "Refactoring", "Naming", "SOLID"], impact: 9, idea: "Hazlo simple, mantenible y testable: tu futuro yo te lo agradecerá." },
    { code: "🧠", title: "El poder de las palabras", author: "Mariano Sigman", publisher: "", year: 2024, tags: ["Comunicación", "Empatía", "Emociones"], impact: 7, idea: "Una conversación siempre fue la mejor manera de conocerse a uno mismo." },
    { code: "☕", title: "Java a fondo (5ª edición)", author: "Pablo Augusto Sznajdleder", publisher: "", year: 2024, tags: ["Java", "Colecciones", "Streams", "JDBC"], impact: 8, idea: "Bases sólidas, menos magia: entender > memorizar." }
  ];

  const events = [
    { code: "🐙", title: "PulpoConf 24 · Vigo", subtitle: "GastroTech", year: 2024, tags: ["Comunidad", "Arquitectura", "IA", "Testing"], applied: "Descubrí, conocí, compartí, conecté y comí. ¡Irrepetible!" }
  ];

  const readingQueue = [
    { title: "Clean Code", author: "Robert C. Martin", status: "Pendiente" },
    { title: "Refactoring", author: "Martin Fowler", status: "Pendiente" },
    { title: "The Pragmatic Programmer", author: "Hunt & Thomas", status: "Pendiente" },
    { title: "AI Engineering", author: "Chip Huyen", status: "En curso", progress: 33, idea: "Entendiendo mejor lo que hay entre bastidores." }
  ];

  let currentTag = "Todos";
  let showIdeas = true;
  let sortBy = "anio"; // anio | impacto | tema

  function matchesTag(item, tag) {
    if (tag === "Todos") return true;
    return (item.tags || []).includes(tag);
  }

  function sortBooks(arr) {
    const a = [...arr];
    if (sortBy === "anio") a.sort((x, y) => (y.year ?? 0) - (x.year ?? 0));
    else if (sortBy === "impacto") a.sort((x, y) => (y.impact ?? 0) - (x.impact ?? 0));
    else if (sortBy === "tema") a.sort((x, y) => ((x.tags?.[0] || "").localeCompare(y.tags?.[0] || "")) || (y.year - x.year));
    return a;
  }

  function renderRead() {
    const grid = $("#read-grid");
    if (!grid) return;
    grid.classList.toggle("hide-ideas", !showIdeas);

    const ordered = sortBooks(readBooks.filter(b => matchesTag(b, currentTag)));
    grid.innerHTML = ordered.map(b => `
      <article class="card-book" tabindex="0">
        <div class="cover" aria-hidden="true">${(b.code || "BK").slice(0, 3)}</div>
        <div class="meta">
          <div class="title">${b.title}</div>
          <div class="byline">${b.author}${b.publisher ? " · " + b.publisher : ""} · ${b.year}</div>
          <div class="badges">${(b.tags || []).map(t => `<span class="badge">${t}</span>`).join("")}</div>
          <div class="idea">${b.idea || ""}</div>
        </div>
      </article>
    `).join("");
  }

  function renderEvents() {
    const list = $("#events-list");
    if (!list) return;
    list.innerHTML = events.map(e => `
      <article class="event">
        <div class="logo">${e.code}</div>
        <div>
          <div class="headline">${e.title} — ${e.year}</div>
          <div class="line">${e.subtitle} · ${(e.tags || []).join(" · ")}</div>
          <div class="takeaway">${e.applied}</div>
        </div>
      </article>
    `).join("");
  }

  function renderQueue() {
    const list = $("#queue-list");
    if (!list) return;
    list.innerHTML = readingQueue.map(q => `
      <article class="queue-item">
        <div class="title">${q.title} — ${q.author}</div>
        <div class="status">— ${q.status}${typeof q.progress === "number" ? ` · ${q.progress}%` : ""}</div>
        ${typeof q.progress === "number" ? `
        <div class="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${q.progress}">
          <i style="width:${q.progress}%"></i>
        </div>` : ""}
        ${q.idea ? `<div class="idea">${q.idea}</div>` : ""}
      </article>
    `).join("");
  }

  function bindControls() {
    $$(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".chip").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        currentTag = btn.dataset.tag;
        renderRead();
      });
    });

    $("#toggle-ideas")?.addEventListener("click", (e) => {
      showIdeas = !showIdeas;
      e.currentTarget.setAttribute("aria-pressed", String(showIdeas));
      e.currentTarget.querySelector(".toggle-state").textContent = showIdeas ? "ON" : "OFF";
      renderRead(); renderQueue();
    });

    $("#sort-select")?.addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderRead();
    });
  }

  // Scroll suave anclas
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id && id.length > 1) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

    // ===== Scroll Reveal =====
  function initReveal() {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.2
    });

    $$('.reveal').forEach(el => observer.observe(el));
  }

  function markDefaultReveals() {
    const defaults = [
      '#proyectos',
      '#skills-grid',
      '#learning',
      '#contacto'
    ];

    defaults.forEach(sel => {
      const el = $(sel);
      if (el) el.classList.add('reveal');
    });
  }

  // ===== Init =====
  document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    renderRead();
    renderEvents();
    renderQueue();
    bindControls();

    markDefaultReveals();
    initReveal();

    // Animación de entrada del HERO al cargar
    const hero = $('.hero-animate');
    if (hero) {
      // Esperamos al siguiente frame para asegurarnos de que la transición se aplica
      requestAnimationFrame(() => {
        hero.classList.add('hero-visible');
      });
    }
  });
})();
