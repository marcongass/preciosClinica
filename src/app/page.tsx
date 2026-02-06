import TariffTable from "@/components/TariffTable";
import tariffData from "@/data/tariffs.json";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Abstract Background Element */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl text-gradient" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold tracking-tight text-secondary">
              Precios<span className="text-primary text-gradient">Clínica</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#tarifas" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-premium hover:opacity-90 transition-all">
              Ver Tarifas
            </a>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-6">
            Transparencia total en servicios de salud
          </div>
          <h1 className="mb-8 font-heading text-5xl font-extrabold tracking-tight text-secondary sm:text-7xl">
            ¡Hola <span className="text-gradient">mami! ❤️</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary/60 leading-relaxed font-sans">
            Aquí tienes que actualizar los precios de los procedimientos de la clínica.
            Consulta las tarifas oficiales y ajusta lo que necesites fácilmente.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#tarifas" className="flex h-14 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-semibold text-white shadow-premium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Ver Catálogo de Precios
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-32 max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Precios Actualizados",
                desc: "Información verificada directamente con las clínicas locales.",
                icon: "📅",
              },
              {
                title: "Comparativas Reales",
                desc: "Compara costos entre diferentes centros médicos de tu ciudad.",
                icon: "⚖️",
              },
              {
                title: "Gestión Directa",
                desc: "Solicita citas o información adicional con un solo clic.",
                icon: "⚡",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-3xl bg-card p-8 shadow-premium transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-secondary">{feature.title}</h3>
                <p className="text-secondary/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tariff Section */}
        <section id="tarifas" className="mt-32 border-t border-border pt-20">
          <TariffTable data={tariffData} />
        </section>
      </main>

      <footer className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-secondary/40">
            © 2026 Precios Clínica. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
