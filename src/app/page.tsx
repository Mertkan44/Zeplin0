import HeroBanner from "@/components/HeroBanner";
import BentoGrid from "@/components/BentoGrid";
import FirstScrollSnap from "@/components/FirstScrollSnap";
import dynamic from "next/dynamic";

const ServiceCircleDiagram = dynamic(() => import("@/components/ServiceCircleDiagram"));
const VideoTestimonials = dynamic(() => import("@/components/VideoTestimonials"));
const BrandMarquee = dynamic(() => import("@/components/BrandMarquee"));

const videoTestimonials = [
  {
    id: "brand-a",
    videoSrc: "/videos/testimonial-a.mp4",
    posterSrc: "/images/dag-optimized.webp",
    brandName: "Marka A",
    personName: "Ahmet Yılmaz",
    personRole: "Pazarlama Direktörü",
  },
  {
    id: "brand-b",
    videoSrc: "/videos/testimonial-b.mp4",
    posterSrc: "/images/dag-optimized.webp",
    brandName: "Marka B",
    personName: "Elif Demir",
    personRole: "Kurucu Ortak",
  },
];


const blocks = [
  {
    title: "hizmetlerimiz",
    description: "dijital strateji, sosyal medya yönetimi, içerik üretimi ve marka danışmanlığı.",
    items: ["Sosyal Medya Yönetimi", "İçerik Üretimi", "Marka Danışmanlığı", "Dijital Strateji"],
    backgroundImage: "/images/services-digital-premium-optimized.webp",
    href: "/hizmetler",
  },
  {
    title: "projelerimiz",
    description: "markaların dijital dönüşüm hikayelerini birlikte yazıyoruz.",
    items: ["UI/UX Tasarım", "Web Geliştirme", "AI İçerik", "Video Prodüksiyon"],
    href: "/projeler",
    projects: [
      {
        name: "Milo Restaurant",
        description: "Menü, Reels ve Fotoğraf Çekimi",
        image: "/images/projects-milo-cover.webp",
        imagePosition: "center 46%",
        tags: ["Menü Çekimi", "Reels", "Fotoğraf"],
      },
      {
        name: "Babi Restaurant",
        description: "Fotoğraf ve Video Çekimi",
        image: "/images/projects-babi-cover.webp",
        imagePosition: "center 45%",
        tags: ["Fotoğraf", "Video", "Restaurant"],
      },
      {
        name: "Ritim Jewellery",
        description: "Yapay Zeka Reklam Filmi",
        image: "/images/projects-ritim-jewellery-cover.webp",
        imagePosition: "center 58%",
        tags: ["Yapay Zeka", "Reklam Filmi", "Jewellery"],
      },
      {
        name: "Pam Akademi",
        description: "Kimlik İnşası, Web Sitesi ve Sosyal Medya Tasarımları",
        image: "/images/projects-pam-akademi-cover.webp",
        imagePosition: "center 62%",
        tags: ["Kimlik İnşası", "Web Sitesi", "Sosyal Medya"],
      },
      {
        name: "Foton Sağlık Çözümleri",
        description: "Kurumsal Web Sitesi Tasarımı ve Geliştirme",
        image: "/images/projects-foton-medical-cover.webp",
        imagePosition: "center",
        tags: ["Web Sitesi", "UI/UX", "Kurumsal"],
      },
      { name: "Sosyal Medya Kampanya", image: "/images/dag-optimized.webp" },
      { name: "Video Prodüksiyon", image: "/images/dag-optimized.webp" },
      { name: "AI İçerik Projesi", image: "/images/dag-optimized.webp" },
    ],
  },
  {
    title: "hakkımızda",
    description: "yaratıcı çözümlerle markaların dijital dünyada fark yaratmasını sağlıyoruz.",
    items: [],
    backgroundImage: "/images/dag-optimized.webp",
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
    </main>
  );
}
