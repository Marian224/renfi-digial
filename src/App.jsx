import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  Headphones,
  Menu,
  Monitor,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "MA-KRIS",
    subtitle: "Premium fashion. Czysta estetyka, elegancja i mocna marka online.",
    description: "Strona dla marki MA-KRIS, zaprojektowana tak, aby podkreślać luksusowy charakter, nowoczesny styl i wyjątkowy wizerunek.",
    tags: ["Fashion", "Luxury", "Brand"],
    tone: "makris",
    meta: "Web Design · Development",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    link: "https://ma-kris.vercel.app/",
  },
  {
    number: "02",
    title: "LESZNO TIRE LAB",
    subtitle: "Performance, precyzja i technologia na drodze.",
    description: "Futurystyczny koncept dla serwisu opon i kół, zaprojektowany jak marka performance, a nie zwykły warsztat.",
    tags: ["Automotive", "Performance", "Service"],
    tone: "tire",
    meta: "Web Design · Development",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    link: "https://tirlab.vercel.app/",
  },
  {
    number: "03",
    title: "MODO RESTAURANT",
    subtitle: "Nowoczesna gastronomia w editorialowym wydaniu.",
    description: "Cinematiczna strona restauracji, która sprzedaje atmosferę jeszcze zanim gość zobaczy menu.",
    tags: ["Restaurant", "Hospitality", "Editorial"],
    tone: "modo",
    meta: "Web Design · Development",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    link: "https://modoweb-liart.vercel.app/",
  },
];

const services = [
  [Monitor, "Strony firmowe", "Nowoczesne strony dopasowane do Twojej branży i potrzeb."],
  [Rocket, "Landing pages", "Skoncentrowane na jednym celu — więcej zapytań i sprzedaży."],
  [ShoppingCart, "Sklepy internetowe", "Funkcjonalne sklepy online, które sprzedają 24/7."],
  [CalendarDays, "Rezerwacje online", "Systemy rezerwacji dla usług, gabinetów i salonów."],
  [Search, "SEO", "Optymalizacja, dzięki której Twoja strona będzie lepiej widoczna w Google."],
  [Headphones, "Opieka techniczna", "Aktualizacje, kopie zapasowe i szybka pomoc techniczna."],
];

const pricing = [
  {
    name: "START",
    price: "999",
    features: ["1 strona", "Responsywność", "Formularz kontaktowy", "Mapa Google", "Podstawowe SEO"],
  },
  {
    name: "BUSINESS",
    price: "1799",
    popular: true,
    features: ["4–6 stron", "Indywidualny projekt", "Responsywność", "Formularz kontaktowy", "Mapa Google", "Podstawowe SEO", "Galeria zdjęć"],
  },
  {
    name: "PREMIUM",
    price: "2999",
    features: ["Indywidualny projekt", "Nieograniczona liczba podstron", "Rezerwacje online", "Integracje", "Zaawansowane SEO", "CMS", "Wsparcie po wdrożeniu"],
  },
];

const faqs = [
  ["Ile trwa stworzenie strony?", "Standardowa strona firmowa jest gotowa zazwyczaj w ciągu kilku dni do około 2 tygodni, zależnie od zakresu projektu."],
  ["Czy strona będzie działać na telefonie?", "Tak. Wszystkie nasze strony są projektowane z myślą o komputerach, tabletach i smartfonach."],
  ["Czy pomagacie z domeną i hostingiem?", "Tak. Możemy pomóc w wyborze domeny, hostingu oraz konfiguracji całej strony."],
  ["Czy mogę zamówić stronę bez spotkania?", "Oczywiście. Cały proces możemy przeprowadzić online."],
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Button({ children, primary = false, href = "#contact", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 ${
        primary
          ? "bg-[linear-gradient(135deg,#8b6cff,#5b46e8)] text-white shadow-[0_0_35px_rgba(124,92,255,.22)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(124,92,255,.35)]"
          : "border border-white/12 bg-white/2.5 text-white hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/6"
      }`}
    >
      {children}
      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function Logo() {
  return (
    <a href="#top" className="leading-none" aria-label="RENFI DIGITAL — strona główna">
      <span className="block text-lg font-black tracking-[0.16em] text-white">RENFI</span>
      <span className="block text-[8px] font-semibold tracking-[0.34em] text-violet-300">DIGITAL</span>
    </a>
  );
}

function ProjectVisual({ tone, image = null, alt = "" }) {
  const themes = {
    makris: {
      shell: "bg-[#e9e2d8]",
      ink: "text-[#171513]",
      muted: "bg-black/10",
      accent: "bg-[#b8a18b]",
      line: "bg-black/15",
      label: "MAKRIS",
    },
    tire: {
      shell: "bg-[#101114]",
      ink: "text-white",
      muted: "bg-white/15",
      accent: "bg-red-500",
      line: "bg-white/15",
      label: "TIRE LAB",
    },
    modo: {
      shell: "bg-[#241c18]",
      ink: "text-[#f4e9dc]",
      muted: "bg-white/12",
      accent: "bg-[#b96f4d]",
      line: "bg-white/12",
      label: "MODO",
    },
  };
  const t = themes[tone] || themes.tire;

  if (image) {
    return (
      <div className={`relative aspect-[1.34] overflow-hidden ${t.shell} ${t.ink}`}>
        <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/10" />
        <div className={`absolute inset-x-4 top-4 flex items-center justify-between border-b ${tone === "makris" ? "border-white/15" : "border-white/15"} pb-3`}>
          <span className="text-[9px] font-bold tracking-[0.22em] text-white">{t.label}</span>
          <span className="rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
            LIVE
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5 h-px bg-white/20" />
        <div className="absolute bottom-3 right-5 text-[7px] font-medium uppercase tracking-[0.18em] text-white/60">RENFI DIGITAL</div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[1.34] overflow-hidden ${t.shell} ${t.ink}`}>
      <div className={`absolute inset-0 ${tone === "tire" ? "bg-[radial-gradient(circle_at_72%_32%,rgba(239,68,68,.28),transparent_34%)]" : tone === "modo" ? "bg-[radial-gradient(circle_at_70%_28%,rgba(185,111,77,.35),transparent_38%)]" : "bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,.45),transparent_36%)]"}`} />
      <div className={`absolute inset-x-5 top-5 flex items-center justify-between border-b ${tone === "makris" ? "border-black/10" : "border-white/10"} pb-3`}>
        <span className="text-[9px] font-bold tracking-[0.22em]">{t.label}</span>
        <div className="flex gap-1.5">
          <span className={`h-1.5 w-6 rounded-full ${t.muted}`} />
          <span className={`h-1.5 w-6 rounded-full ${t.muted}`} />
          <span className={`h-1.5 w-6 rounded-full ${t.muted}`} />
        </div>
      </div>

      {tone === "makris" ? (
        <>
          <div className="absolute left-[10%] top-[28%] h-[56%] w-[34%] border border-black/10 bg-black/5" />
          <div className="absolute left-[15%] top-[34%] h-24 w-20 rounded-t-[45%] border border-black/10 bg-[#d8d0c5]" />
          <div className="absolute right-[12%] top-[32%] text-right">
            <p className="text-[8px] uppercase tracking-[0.22em] opacity-50">atelier</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">Forma.</p>
            <div className="mt-3 ml-auto h-px w-20 bg-black/20" />
          </div>
        </>
      ) : (
        <>
          <div className={`absolute left-[8%] top-[39%] h-2 w-28 rounded-full ${t.muted}`} />
          <div className="absolute left-[8%] top-[48%] flex items-end gap-2">
            <span className={`text-2xl font-bold tracking-[-0.06em] ${tone === "tire" ? "italic" : ""}`}>{tone === "tire" ? "CONTROL" : "MODO"}</span>
            <span className={`mb-1 h-2 w-2 rounded-full ${t.accent}`} />
          </div>
          <div className={`absolute right-[9%] bottom-[15%] h-20 w-28 rounded-lg border ${tone === "tire" ? "border-white/10 bg-white/[0.03]" : "border-white/10 bg-black/20"}`} />
        </>
      )}

      <div className={`absolute inset-x-5 bottom-5 h-px ${t.line}`} />
      <div className={`absolute bottom-2 right-5 text-[7px] font-medium uppercase tracking-[0.18em] opacity-40`}>RENFI DIGITAL</div>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [state, handleSubmit] = useForm("maeyykgy");

  const closeMobile = () => setMobileOpen(false);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#050507] text-white selection:bg-violet-500/30">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6">
          <div className="glass flex h-[68px] items-center justify-between rounded-2xl px-5">
            <Logo />
            <nav className="hidden items-center gap-7 lg:flex">
              {[
                ["Strona główna", "#top"],
                ["Realizacje", "#realizacje"],
                ["Oferta", "#oferta"],
                ["Cennik", "#cennik"],
                ["Kontakt", "#contact"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="text-xs font-medium text-zinc-400 transition hover:text-white">
                  {label}
                </a>
              ))}
            </nav>
            <div className="hidden lg:block">
              <Button primary>Darmowa wycena</Button>
            </div>
            <button
              className="rounded-xl border border-white/10 p-2 text-zinc-200 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mt-2 rounded-2xl p-4 lg:hidden"
            >
              {[
                ["Strona główna", "#top"],
                ["Realizacje", "#realizacje"],
                ["Oferta", "#oferta"],
                ["Cennik", "#cennik"],
                ["Kontakt", "#contact"],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMobile} className="block rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                  {label}
                </a>
              ))}
              <div className="mt-2">
                <Button primary href="#contact">Darmowa wycena</Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <main>
        <section className="relative isolate pt-36 sm:pt-44">
          <div className="hero-grid absolute inset-0 -z-20" />
          <div className="absolute left-1/2 top-16 -z-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:pb-32">
            <div>
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                  <Sparkles size={12} />
                  Strony internetowe, które pracują na Twój biznes
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                  Nowoczesne strony internetowe dla{" "}
                  <span className="gradient-text">Twojego biznesu.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                  Projektujemy szybkie, nowoczesne strony internetowe, które budują zaufanie, wyróżniają markę i zamieniają odwiedzających w klientów.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button primary href="#realizacje">Zobacz realizacje</Button>
                  <Button href="#contact">Darmowa wycena</Button>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500">
                  {[
                    [Sparkles, "Nowoczesny design"],
                    [Smartphone, "Responsywne"],
                    [Rocket, "Szybkie ładowanie"],
                    [Search, "SEO Friendly"],
                  ].map(([Icon, label]) => (
                    <span key={label} className="flex items-center gap-2">
                      <Icon size={14} className="text-violet-300" />
                      {label}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="relative">
              <div className="absolute -inset-8 rounded-full bg-violet-600/15 blur-[90px]" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="mx-auto max-w-[650px] rounded-[22px] border border-white/15 bg-zinc-950 p-2 shadow-[0_35px_100px_rgba(0,0,0,.6)]">
                  <div className="rounded-[16px] border border-white/10 bg-black p-4">
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-400/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
                      <span className="h-2 w-2 rounded-full bg-green-400/70" />
                      <div className="ml-3 h-5 flex-1 rounded-full bg-white/5" />
                    </div>
                    <ProjectVisual tone="tire" />
                  </div>
                </div>
                <div className="mx-auto h-4 w-[92%] rounded-b-[50%] bg-zinc-900 shadow-[0_18px_35px_rgba(0,0,0,.8)]" />
              </motion.div>
            </Reveal>
          </div>
        </section>

        <section id="realizacje" className="section-shell">
          <Reveal>
            <SectionLabel>Nasze realizacje</SectionLabel>
            <SectionTitle>Strony, które <span className="gradient-text">robią wrażenie</span></SectionTitle>
            <SectionText>Każdy projekt tworzymy z myślą o konkretnej branży, grupie klientów i celu biznesowym.</SectionText>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="card group overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="block w-full text-left"
                    aria-label={`Otwórz case study ${project.title}`}
                  >
                    <div className="relative">
                      <ProjectVisual tone={project.tone} image={project.image} alt={project.title} />
                      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-white backdrop-blur-sm">
                        {project.number}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                          <p className="mt-2 text-sm leading-5 text-zinc-400">{project.subtitle}</p>
                        </div>
                        <span className="mt-1 text-zinc-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-300">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-[10px] text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 border-t border-white/7 pt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-600">
                        {project.meta}
                      </div>
                    </div>
                  </button>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="#contact">Porozmawiajmy o Twoim projekcie</Button>
          </div>

          {selectedProject && (
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={`Case study ${selectedProject.title}`}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#09090c] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-violet-300">CASE {selectedProject.number}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    <span className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">{selectedProject.meta}</span>
                  </div>
                  <button type="button" onClick={() => setSelectedProject(null)} className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white" aria-label="Zamknij case study">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <ProjectVisual tone={selectedProject.tone} image={selectedProject.image} alt={selectedProject.title} />
                  </div>
                  <div className="mt-7 grid gap-8 md:grid-cols-[1.2fr_.8fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">{selectedProject.title}</p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{selectedProject.subtitle}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">{selectedProject.description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Zakres</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-7 flex flex-col gap-3">
                        <a href={selectedProject.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-violet-100">
                          Otwórz stronę <ArrowUpRight size={16} />
                        </a>
                        <a href="#contact" onClick={() => setSelectedProject(null)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/[0.06]">
                          Chcę podobną stronę <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </section>

        <section id="oferta" className="section-shell">
          <Reveal>
            <SectionLabel>Co możemy dla Ciebie zrobić</SectionLabel>
            <SectionTitle>Kompleksowe rozwiązania dla Twojej firmy</SectionTitle>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([Icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <motion.div whileHover={{ y: -5 }} className="card h-full p-6">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.07] text-violet-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/[0.08] to-transparent p-8 sm:p-12">
              <div className="absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-violet-600/15 blur-[90px]" />
              <SectionLabel>Dlaczego RENFI DIGITAL?</SectionLabel>
              <SectionTitle>Nie tworzymy stron. Tworzymy narzędzia dla Twojego biznesu.</SectionTitle>
              <SectionText>Twoja strona powinna robić coś więcej niż tylko dobrze wyglądać. Powinna budować zaufanie, generować zapytania i pomagać Ci rozwijać biznes.</SectionText>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  ["01", "Design", "Projektujemy z myślą o Twojej marce i Twoich klientach."],
                  ["02", "Performance", "Szybkie i responsywne strony stworzone z myślą o użytkowniku."],
                  ["03", "Business", "Każdy element ma konkretny cel — pomóc Twojej firmie zdobywać klientów."],
                ].map(([num, title, text]) => (
                  <div key={num} className="rounded-2xl border border-white/8 bg-black/20 p-6">
                    <span className="text-xs text-violet-300">{num}</span>
                    <h3 className="mt-5 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section-shell">
          <Reveal>
            <SectionLabel>Jak wygląda współpraca</SectionLabel>
            <SectionTitle>Prosty proces — <span className="gradient-text">świetny efekt</span></SectionTitle>
          </Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-5 hidden border-t border-dashed border-violet-400/20 md:block" />
            {[
              ["01", "Krótka rozmowa", "Poznajemy Twoje potrzeby i cele biznesowe."],
              ["02", "Projekt", "Tworzymy projekt strony dopasowany do Twojej marki."],
              ["03", "Realizacja", "Kodujemy, testujemy i dbamy o każdy szczegół."],
              ["04", "Publikacja", "Twoja strona trafia do sieci i zaczyna pracować."],
            ].map(([num, title, text], i) => (
              <Reveal key={num} delay={i * 0.08}>
                <div className="relative text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-violet-400/30 bg-[#08080c] text-sm font-semibold text-violet-200 shadow-[0_0_25px_rgba(124,92,255,.12)]">
                    {num}
                  </div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-zinc-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="cennik" className="section-shell">
          <Reveal>
            <SectionLabel>Cennik</SectionLabel>
            <SectionTitle>Wybierz pakiet dla siebie</SectionTitle>
            <SectionText>Proste i przejrzyste ceny. Bez ukrytych kosztów.</SectionText>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08}>
                <div className={`relative h-full rounded-2xl border p-7 ${plan.popular ? "border-violet-400/50 bg-violet-500/[0.06] shadow-[0_0_50px_rgba(124,92,255,.12)]" : "border-white/10 bg-white/[0.025]"}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em]">
                      Najpopularniejszy
                    </span>
                  )}
                  <p className="text-xs font-semibold tracking-[0.12em] text-zinc-400">{plan.name}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-5xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="pb-2 text-sm text-zinc-500">zł</span>
                  </div>
                  <div className="my-7 h-px bg-white/8" />
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-zinc-300">
                        <Check size={16} className="mt-0.5 shrink-0 text-violet-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button primary={plan.popular}>Wybieram pakiet</Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-zinc-500">Opieka nad stroną już od <span className="text-zinc-300">149 zł / miesiąc</span></p>
        </section>

        <section className="section-shell">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Masz pytania? Mamy odpowiedzi.</SectionTitle>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/8 rounded-2xl border border-white/10 bg-white/[0.02] px-6">
            {faqs.map(([question, answer], i) => {
              const open = openFaq === i;
              return (
                <div key={question}>
                  <button
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {question}
                    <ChevronDown className={`shrink-0 transition-transform ${open ? "rotate-180 text-violet-300" : "text-zinc-500"}`} size={18} />
                  </button>
                  <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
                    <p className="pb-5 pr-8 text-sm leading-6 text-zinc-500">{answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section-shell pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.03] to-transparent p-7 sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
              <div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
                <div>
                  <SectionLabel>07 — Kontakt</SectionLabel>
                  <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
                    Opowiedz nam o swoim projekcie.
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-6 text-zinc-400">
                    Wypełnij formularz, a przygotujemy bezpłatną wycenę dopasowaną do Twojej firmy.
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      ["01", "Bezpłatna wycena", "Bez zobowiązań."],
                      ["02", "Indywidualny projekt", "Dopasowany do Twojej marki."],
                      ["03", "Odpowiedź do 24h", "Szybki i konkretny kontakt."],
                    ].map(([num, title, sub]) => (
                      <div key={num} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.07] text-[10px] font-bold text-violet-300">{num}</span>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{title}</p>
                          <p className="text-xs text-zinc-500">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-black/20 text-violet-300">
                      <Headphones size={16} />
                    </div>
                    kontakt@renfidigital.pl
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/10 bg-black/25 p-5 sm:p-7"
                >
                  {state.succeeded ? (
                    <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-2xl text-emerald-300">
                        ✓
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold text-white">Dziękujemy za wiadomość!</h3>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                        Twoje zapytanie zostało wysłane. Odpowiemy na podany adres e-mail zazwyczaj w ciągu 24 godzin.
                      </p>
                      <a href="#top" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-white/5">
                        Wróć na początek
                      </a>
                    </div>
                  ) : (
                    <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="field">
                      <span>Imię i nazwisko *</span>
                      <input name="name" type="text" required placeholder="Jan Kowalski" />
                    </label>
                    <label className="field">
                      <span>Nazwa firmy</span>
                      <input name="company" type="text" placeholder="Twoja firma" />
                    </label>
                    <label className="field">
                      <span>E-mail *</span>
                      <input name="email" type="email" required placeholder="jan@firma.pl" />
                      <ValidationError prefix="E-mail" field="email" errors={state.errors} />
                    </label>
                    <label className="field">
                      <span>Telefon</span>
                      <input name="phone" type="tel" placeholder="+48 000 000 000" />
                    </label>
                  </div>

                  <label className="field mt-4">
                    <span>Rodzaj strony *</span>
                    <select name="project_type" required defaultValue="">
                      <option value="" disabled>Wybierz rodzaj projektu</option>
                      <option>Strona firmowa</option>
                      <option>Landing page</option>
                      <option>Sklep internetowy</option>
                      <option>Rezerwacje online</option>
                      <option>Inny projekt</option>
                    </select>
                  </label>

                  <label className="field mt-4">
                    <span>Orientacyjny budżet</span>
                    <select name="budget" defaultValue="">
                      <option value="">Wybierz budżet</option>
                      <option>Do 1 000 zł</option>
                      <option>1 000–2 000 zł</option>
                      <option>2 000–3 000 zł</option>
                      <option>3 000 zł+</option>
                      <option>Nie wiem — potrzebuję wyceny</option>
                    </select>
                  </label>

                  <label className="field mt-4">
                    <span>Opowiedz o projekcie *</span>
                    <textarea name="message" required rows="5" placeholder="Czego potrzebujesz? Masz już domenę, logo lub obecną stronę?"></textarea>
                    <ValidationError prefix="Wiadomość" field="message" errors={state.errors} />
                  </label>

                  <input type="hidden" name="_subject" value="Nowe zapytanie — RENFI DIGITAL" />
                  <input type="hidden" name="_language" value="pl" />

                  <label className="mt-4 flex items-start gap-3 text-[11px] leading-5 text-zinc-500">
                    <input name="consent" value="yes" type="checkbox" required className="mt-1 accent-violet-500" />
                    <span>Wyrażam zgodę na kontakt w sprawie mojego zapytania. *</span>
                  </label>

                  {state.errors && !state.succeeded && (
                    <p role="alert" className="mt-3 text-center text-xs text-red-300">
                      Formspree nie przyjął formularza. Sprawdź zaznaczenie zgody i spróbuj ponownie.
                    </p>
                  )}

                  <button type="submit" disabled={state.submitting} className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-violet-100 disabled:cursor-wait disabled:opacity-60">
                    {state.submitting ? "WYSYŁANIE..." : "WYŚLIJ ZAPYTANIE"}
                    {!state.submitting && <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </button>

                  <p className="mt-3 text-center text-[10px] leading-5 text-zinc-600">
                    Odpowiadamy zazwyczaj w ciągu 24 godzin. Pola oznaczone * są wymagane.
                  </p>
                    </>
                  )}
                </form>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/8">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">Tworzymy nowoczesne strony internetowe dla ambitnych firm.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300">Nawigacja</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <a className="block hover:text-white" href="#top">Strona główna</a>
              <a className="block hover:text-white" href="#realizacje">Realizacje</a>
              <a className="block hover:text-white" href="#oferta">Oferta</a>
              <a className="block hover:text-white" href="#cennik">Cennik</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300">Kontakt</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-500">
              <a className="block hover:text-white" href="mailto:kontakt@renfidigital.pl">kontakt@renfidigital.pl</a>
              <a className="block hover:text-white" href="#contact">Darmowa wycena</a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/8 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 RENFI DIGITAL. Wszelkie prawa zastrzeżone.</span>
          <span>Design that works. Websites that sell.</span>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">{children}</p>;
}

function SectionTitle({ children }) {
  return <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{children}</h2>;
}

function SectionText({ children }) {
  return <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">{children}</p>;
}

export default App;