import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <main>
      <HeroBanner />

      {/* Hizmetler - placeholder */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">hizmetlerimiz</h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">bu alan yakında dolacak.</p>
        </div>
      </section>

      {/* Projeler - placeholder */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">projelerimiz</h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">bu alan yakında dolacak.</p>
        </div>
      </section>

      {/* Hakkımızda - placeholder */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">hakkımızda</h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">bu alan yakında dolacak.</p>
        </div>
      </section>
    </main>
  );
}
