import HeroBanner from "@/components/HeroBanner";
import BentoGrid from "@/components/BentoGrid";
import FirstScrollSnap from "@/components/FirstScrollSnap";
import HomeScrollReset from "@/components/HomeScrollReset";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const ServiceCircleDiagram = dynamic(() => import("@/components/ServiceCircleDiagram"));
const VideoTestimonials = dynamic(() => import("@/components/VideoTestimonials"));
const BrandMarquee = dynamic(() => import("@/components/BrandMarquee"));

const videoTestimonials = [
  {
    id: "emma",
    videoSrc: "/videos/emma.mp4",
    posterSrc: "/videos/posters/emma-poster.png",
    brandName: "Emma",
    personName: "Referans Video",
    personRole: "Zeplin Media",
  },
  {
    id: "oguz-abi",
    videoSrc: "/videos/oguz-abi.mp4",
    posterSrc: "/videos/posters/oguz-abi-poster.png",
    brandName: "Oğuz Abi",
    personName: "Referans Video",
    personRole: "Zeplin Media",
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
      ...projects.map((p) => ({
        slug: p.slug,
        name: p.name,
        description: p.shortDesc,
        image: p.image,
        imagePosition: p.imagePosition,
        tags: p.tags,
        variant: p.variant,
        year: p.year,
        client: p.client,
      })),
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
      <HomeScrollReset />
      <FirstScrollSnap targetId="home-first-section" />

      <HeroBanner />

      <BentoGrid blocks={blocks} sectionId="home-first-section" />

      <ServiceCircleDiagram />

      <VideoTestimonials testimonials={videoTestimonials} />

      <BrandMarquee
        brands={[
          { name: "Gentleman", logo: "/brand-logos/gentleman-logo.webp" },
          { name: "Hisar", logo: "/brand-logos/hisar-logo.webp" },
          { name: "Kadıköy Sin", logo: "/brand-logos/kadikoy-sin-logo.webp" },
          { name: "Master", logo: "/brand-logos/master-logo.webp" },
          { name: "Mertcan Ağca", logo: "/brand-logos/mertcan-agca-logo.webp" },
          { name: "Pam Akademi", logo: "/brand-logos/pam-akademi-logo.webp" },
          { name: "Babi İstanbul", logo: "/brand-logos/babi-logo.webp" },
          { name: "Ritim Jewellery", logo: "/brand-logos/ritim-logo.webp" },
          { name: "Foton Sağlık Çözümleri", logo: "/brand-logos/foton-logo.svg" },
        ]}
      />
    </main>
  );
}
