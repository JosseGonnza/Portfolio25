document.getElementById('year').textContent = new Date().getFullYear();

    // Toggle tema claro/oscuro
    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved === 'light'){ root.classList.add('light'); btn.textContent = '☀️'; btn.setAttribute('aria-pressed','true'); }
    else { btn.setAttribute('aria-pressed','false'); }
    btn.addEventListener('click', () => {
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });

    document.querySelectorAll('#proyectos .project a').forEach(a=>{
      if(a.getAttribute('href')?.includes('tu-usuario')){
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          alert('Pronto actualizaré este enlace con mi información real. ¡Gracias por tu interés!');
        })
      }
    });

    // === Datos base (los tuyos, ya normalizados) ===
const readBooks = [
  {
    code: "🧩",
    title: "Programación orientada a objetos en Java",
    author: "Francisco Blasco",
    publisher: "Ra-Ma",
    year: 2019,
    tags: ["Java", "OOP"],
    impact: 6,
    idea: "Pensar en objetos antes que en ifs: menos acople, más orden.",
    img: "books/pooJava.png"
  },
  {
    code: "🦉",
    title: "Deep Work",
    author: "Cal Newport",
    publisher: "",
    year: 2022,
    tags: ["Productividad", "Concentración", "Enfoque"],
    impact: 7,
    idea: "Bloques sin distracciones, progreso real en menos tiempo.",
    img: "public/books/poo-java.jpg"
  },
  {
    code: "🧮",
    title: "Curso de SQL",
    author: "Ediciones Anaya",
    publisher: "Anaya",
    year: 2022,
    tags: ["SQL"],
    impact: 5,
    idea: "Las consultas también merecen atención: optimiza para personas y máquinas.",
    img: "public/books/poo-java.jpg"
  },
  {
    code: "💬",
    title: "Cómo ganar amigos e influir en las personas",
    author: "Dale Carnegie",
    publisher: "",
    year: 2023,
    tags: ["Comunicación", "Influencia", "Empatía"],
    impact: 6,
    idea: "La empatía también compila: escucha, luego propone.",
    img: "public/books/poo-java.jpg"
  },
  {
    code: "🌱",
    title: "Código sostenible",
    author: "Carlos Blé Jurado",
    publisher: "",
    year: 2022,
    tags: ["Calidad", "Diseño", "Refactoring", "Naming", "SOLID"],
    impact: 9,
    idea: "Hazlo simple, mantenible y testable: tu futuro yo te lo agradecerá.",
    img: "public/books/poo-java.jpg"
  },
  {
    code: "🧠",
    title: "El poder de las palabras",
    author: "Mariano Sigman",
    publisher: "",
    year: 2024,
    tags: ["Comunicación", "Empatía", "Emociones"],
    impact: 7,
    idea: "Una conversación siempre fue la mejor manera de conocerse a uno mismo.",
    img: "public/books/poo-java.jpg"
  },
  {
    code: "☕",
    title: "Java a fondo (5ª edición)",
    author: "Pablo Augusto Sznajdleder",
    publisher: "",
    year: 2024,
    tags: ["Java", "Colecciones", "Streams", "JDBC"],
    impact: 8,
    idea: "Bases sólidas, menos magia: entender > memorizar.",
    img: "public/books/poo-java.jpg"
  }
];

const events = [
  {
    code: "🐙",
    title: "PulpoConf 24 · Vigo",
    subtitle: "GastroTech",
    year: 2024,
    tags: ["Comunidad", "Arquitectura", "IA", "Testing"],
    applied: "Descubrí, conocí, compartí, conecté y comí. ¡Irrepetible!"
  }
];

const readingQueue = [
  { title: "Clean Code", author: "Robert C. Martin", status: "Pendiente" },
  { title: "Refactoring", author: "Martin Fowler", status: "Pendiente" },
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", status: "Pendiente" },
  { title: "AI Engineering", author: "Chip Huyen", status: "En curso", progress: 33,
    idea: "Entendiendo mejor lo que hay entre bastidores." }
];

// === Estado UI ===
let currentTag = "Todos";
let showIdeas = true;
let sortBy = "anio"; // anio | impacto | tema

// === Helpers ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function matchesTag(item, tag) {
  if (tag === "Todos") return true;
  return (item.tags || []).includes(tag);
}

function sortBooks(arr) {
  const a = [...arr];
  if (sortBy === "anio") {
    a.sort((x, y) => (y.year ?? 0) - (x.year ?? 0));
  } else if (sortBy === "impacto") {
    a.sort((x, y) => (y.impact ?? 0) - (x.impact ?? 0));
  } else if (sortBy === "tema") {
    a.sort((x, y) => ((x.tags?.[0] || "").localeCompare(y.tags?.[0] || "")) || (y.year - x.year));
  }
  return a;
}

// === Render libros leídos ===
function renderRead() {
  const grid = $("#read-grid");
  grid.classList.toggle("hide-ideas", !showIdeas);
  const filtered = readBooks.filter(b => matchesTag(b, currentTag));
  const ordered = sortBooks(filtered);

  grid.innerHTML = ordered.map(b => `
    <article class="card-book" tabindex="0">
    <div class="cover" aria-hidden="true">${(b.code || "BK").slice(0,3)}</div>
      <div class="meta">
        <div class="title">${b.title}</div>
        <div class="byline">${b.author}${b.publisher ? " · " + b.publisher : ""} · ${b.year}</div>
        <div class="badges">${(b.tags||[]).map(t => `<span class="badge">${t}</span>`).join("")}</div>
        <div class="idea">${b.idea || ""}</div>
      </div>
    </article>
  `).join("");
}

// === Render eventos ===
function renderEvents() {
  const list = $("#events-list");
  list.innerHTML = events.map(e => `
    <article class="event">
      <div class="logo">${e.code}</div>
      <div>
        <div class="headline">${e.title} — ${e.year}</div>
        <div class="line">${e.subtitle} · ${(e.tags||[]).join(" · ")}</div>
        <div class="takeaway"> ${e.applied}</div>
      </div>
    </article>
  `).join("");
}

// === Render queue ===
function renderQueue() {
  const list = $("#queue-list");
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

// === Interacciones ===
function bindControls() {
  $$(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".chip").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-selected","true");
      currentTag = btn.dataset.tag;
      renderRead();
    });
  });

  $("#toggle-ideas").addEventListener("click", (e) => {
    showIdeas = !showIdeas;
    e.currentTarget.setAttribute("aria-pressed", String(showIdeas));
    e.currentTarget.querySelector(".toggle-state").textContent = showIdeas ? "ON" : "OFF";
    renderRead(); renderQueue();
  });

  $("#sort-select").addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderRead();
  });
}

// === Init ===
function initLearning() {
  renderRead();
  renderEvents();
  renderQueue();
  bindControls();
}
document.addEventListener("DOMContentLoaded", initLearning);


    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll',()=>{
      if(window.scrollY>400){scrollBtn.classList.add('show')}else{scrollBtn.classList.remove('show')}
    });
    scrollBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length > 1){
          e.preventDefault();
          document.querySelector(id).scrollIntoView({behavior:'smooth'});
        }
      });
    });