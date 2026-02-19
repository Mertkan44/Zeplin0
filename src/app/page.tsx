import HeroBanner from "@/components/HeroBanner";
import BentoCard from "@/components/BentoCard";
import ServiceCircleDiagram from "@/components/ServiceCircleDiagram";
import PackageBuilder from "@/components/PackageBuilder";

const blocks = [
  {
    title: "hizmetlerimiz",
    description: "dijital strateji, sosyal medya yönetimi, içerik üretimi ve marka danışmanlığı.",
    items: ["Sosyal Medya Yönetimi", "İçerik Üretimi", "Marka Danışmanlığı", "Dijital Strateji"],
  },
  {
    title: "projelerimiz",
    description: "markaların dijital dönüşüm hikayelerini birlikte yazıyoruz.",
    items: ["UI/UX Tasarım", "Web Geliştirme", "AI İçerik", "Video Prodüksiyon"],
  },
  {
    title: "operasyonlar",
    description: "end-to-end proje yönetimi, raporlama ve performans analizi.",
    items: ["Proje Yönetimi", "Raporlama", "Performans Analizi", "End-to-End Süreç"],
  },
  {
    title: "hakkımızda",
    description: "old school kalitesini modern dünyaya taşıyan ekip.",
    items: ["Kurucumuz", "Ekibimiz", "Değerlerimiz", "İletişim"],
  },
];

export default function Home() {
  return (
    <main>
      <HeroBanner />

      {/* Bloklar - 2x2 grid, üst sıra uzun alt sıra kısa */}
      <section className="px-6 md:px-12 py-20">
        <div
          className="max-w-6xl mx-auto grid gap-5"
          style={{
            gridTemplateColumns: "3fr 2fr",
            gridTemplateRows: "420px 250px",
          }}
        >
          {blocks.map((block, i) => (
            <BentoCard key={i} {...block} />
          ))}
        </div>
      </section>

      <ServiceCircleDiagram />

      <PackageBuilder />
    </main>
  );
}
