import HeroBanner from "@/components/HeroBanner";
import BentoGrid from "@/components/BentoGrid";
import VideoTestimonials from "@/components/VideoTestimonials";
import ServiceCircleDiagram from "@/components/ServiceCircleDiagram";
import BrandMarquee from "@/components/BrandMarquee";
import ServiceCarousel from "@/components/ServiceCarousel";
import FirstScrollSnap from "@/components/FirstScrollSnap";

const videoTestimonials = [
  {
    id: "brand-a",
    videoSrc: "/videos/testimonial-a.mp4",
    posterSrc: "/images/dag.png",
    brandName: "Marka A",
    personName: "Ahmet Yılmaz",
    personRole: "Pazarlama Direktörü",
  },
  {
    id: "brand-b",
    videoSrc: "/videos/testimonial-b.mp4",
    posterSrc: "/images/dag.png",
    brandName: "Marka B",
    personName: "Elif Demir",
    personRole: "Kurucu Ortak",
  },
  {
    id: "brand-c",
    videoSrc: "/videos/testimonial-c.mp4",
    posterSrc: "/images/dag.png",
    brandName: "Marka C",
    personName: "Can Baran",
    personRole: "CEO",
  },
  {
    id: "brand-d",
    videoSrc: "/videos/testimonial-d.mp4",
    posterSrc: "/images/dag.png",
    brandName: "Marka D",
    personName: "Selin Aydın",
    personRole: "Marka Müdürü",
  },
];


const blocks = [
  {
    title: "hizmetlerimiz",
    description: "dijital strateji, sosyal medya yönetimi, içerik üretimi ve marka danışmanlığı.",
    items: ["Sosyal Medya Yönetimi", "İçerik Üretimi", "Marka Danışmanlığı", "Dijital Strateji"],
    backgroundImage: "/images/dag.png",
    href: "/hizmetler",
  },
  {
    title: "projelerimiz",
    description: "markaların dijital dönüşüm hikayelerini birlikte yazıyoruz.",
    items: ["UI/UX Tasarım", "Web Geliştirme", "AI İçerik", "Video Prodüksiyon"],
    href: "/projeler",
    projects: [
      { name: "Marka X Lansmanı", image: "/images/dag.png" },
      { name: "E-Ticaret Rebrand", image: "/images/dag.png" },
      { name: "Sosyal Medya Kampanya", image: "/images/dag.png" },
      { name: "Video Prodüksiyon", image: "/images/dag.png" },
      { name: "AI İçerik Projesi", image: "/images/dag.png" },
    ],
  },
  {
    title: "hakkımızda",
    description: "yaratıcı çözümlerle markaların dijital dünyada fark yaratmasını sağlıyoruz.",
    items: [],
    backgroundImage: "/images/dag.png",
    socials: [
      { name: "Instagram", url: "https://www.instagram.com/zeplin.media/" },
      { name: "LinkedIn", url: "https://www.linkedin.com/company/zeplin-media/" },
      { name: "WhatsApp", url: "https://wa.me/905459407690" },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <FirstScrollSnap targetId="home-first-section" />

      <HeroBanner />

      <BentoGrid blocks={blocks} sectionId="home-first-section" />

      <ServiceCircleDiagram />

      <VideoTestimonials testimonials={videoTestimonials} />

      <BrandMarquee
        brands={[
          { name: "Koç Holding" },
          { name: "Turkcell" },
          { name: "Migros" },
          { name: "THY" },
          { name: "Garanti BBVA" },
          { name: "Vodafone" },
          { name: "LC Waikiki" },
          { name: "Trendyol" },
          { name: "Hepsiburada" },
          { name: "N11" },
        ]}
      />

      <ServiceCarousel />
    </main>
  );
}
