import type { Metadata } from "next";
import GalleryGrid, { type GalleryTile } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeri | Zeplin Media",
  description: "Zeplin Media galeri sayfası.",
};

const galleryTiles: GalleryTile[] = [
  {
    id: "tile-1",
    title: "Bursluluk Operasyonu",
    description: "Sınav dönemi için awareness ve kayıt dönüşümü odaklı kreatif akış.",
    radiusProfile: "24px",
    speed: 0.4,
    width: 340,
    colors: {
      light: { from: "#FCA5D8", to: "#EC4899", accent: "rgba(251,113,133,0.45)" },
      dark: { from: "#6E1C4A", to: "#BE185D", accent: "rgba(244,114,182,0.32)" },
    },
  },
  {
    id: "tile-2",
    title: "Erken Kayıt Dalgası",
    description: "Kampanya döneminde hızlanan içerik üretimi ve görünürlük yönetimi.",
    radiusProfile: "24px",
    speed: 0.9,
    width: 460,
    colors: {
      light: { from: "#F472B6", to: "#DB2777", accent: "rgba(255,255,255,0.22)" },
      dark: { from: "#541434", to: "#9D174D", accent: "rgba(251,207,232,0.18)" },
    },
  },
  {
    id: "tile-3",
    title: "Funnel Kurgusu",
    description: "Reels, story ve post hattını tek dönüşüm yoluna bağlayan sistem.",
    radiusProfile: "24px",
    speed: 0.5,
    width: 300,
    colors: {
      light: { from: "#FB7185", to: "#E11D48", accent: "rgba(251,146,60,0.35)" },
      dark: { from: "#5F1A2E", to: "#9F1239", accent: "rgba(251,113,133,0.24)" },
    },
  },
  {
    id: "tile-4",
    title: "Sınav Motivasyon",
    description: "YKS döneminde dikkat toplayan mesaj dili ve kreatif yönlendirme.",
    radiusProfile: "24px",
    speed: 1.1,
    width: 380,
    colors: {
      light: { from: "#FBCFE8", to: "#F472B6", accent: "rgba(219,39,119,0.38)" },
      dark: { from: "#4A1434", to: "#831843", accent: "rgba(244,114,182,0.24)" },
    },
  },
  {
    id: "tile-5",
    title: "Fiziksel Materyal",
    description: "Dijitalden baskıya aynı dilde ilerleyen bütüncül tasarım üretimi.",
    radiusProfile: "24px",
    speed: 0.3,
    width: 420,
    colors: {
      light: { from: "#FDA4AF", to: "#FB7185", accent: "rgba(255,255,255,0.24)" },
      dark: { from: "#612038", to: "#9F1239", accent: "rgba(255,241,242,0.15)" },
    },
  },
  {
    id: "tile-6",
    title: "Marka Dili",
    description: "Ajans tonunu tüm temas noktalarına taşıyan görsel standardizasyon.",
    radiusProfile: "24px",
    speed: 0.8,
    width: 280,
    colors: {
      light: { from: "#F9A8D4", to: "#EC4899", accent: "rgba(255,255,255,0.2)" },
      dark: { from: "#5B1A40", to: "#A21CAF", accent: "rgba(244,114,182,0.2)" },
    },
  },
  {
    id: "tile-7",
    title: "Sosyal Takvim",
    description: "Aylık planlamada içerik sırası, format dağılımı ve yayın ritmi.",
    radiusProfile: "24px",
    speed: 0.6,
    width: 360,
    colors: {
      light: { from: "#F472B6", to: "#BE185D", accent: "rgba(255,255,255,0.18)" },
      dark: { from: "#4A1531", to: "#831843", accent: "rgba(244,114,182,0.2)" },
    },
  },
  {
    id: "tile-8",
    title: "Reels Sprint",
    description: "Kısa formatta yüksek etkileşim hedefleyen seri video üretimi.",
    radiusProfile: "24px",
    speed: 1.0,
    width: 400,
    colors: {
      light: { from: "#FDA4AF", to: "#EC4899", accent: "rgba(244,114,182,0.3)" },
      dark: { from: "#5F2137", to: "#BE185D", accent: "rgba(251,113,133,0.2)" },
    },
  },
  {
    id: "tile-9",
    title: "Fotoğraf Hatları",
    description: "Mekan ve ürün çekimlerinde sahne bütünlüğünü koruyan kurgu.",
    radiusProfile: "24px",
    speed: 0.4,
    width: 320,
    colors: {
      light: { from: "#FBCFE8", to: "#F43F5E", accent: "rgba(253,186,116,0.28)" },
      dark: { from: "#4B162C", to: "#9F1239", accent: "rgba(251,146,60,0.14)" },
    },
  },
  {
    id: "tile-10",
    title: "Kreatif Final",
    description: "Kampanya kapanışında tüm görsel hatları tek akışta birleştiren final.",
    radiusProfile: "24px",
    speed: 0.7,
    width: 480,
    colors: {
      light: { from: "#FB7185", to: "#DB2777", accent: "rgba(255,255,255,0.18)" },
      dark: { from: "#651D38", to: "#BE185D", accent: "rgba(255,255,255,0.12)" },
    },
  },
  {
    id: "tile-11",
    title: "Yayın Anı",
    description: "Planlanan içeriklerin doğru anda yayınlanmasını sağlayan operasyon akışı.",
    radiusProfile: "24px",
    speed: 1.0,
    width: 300,
    colors: {
      light: { from: "#F9A8D4", to: "#FB7185", accent: "rgba(255,255,255,0.2)" },
      dark: { from: "#58223A", to: "#A21CAF", accent: "rgba(244,114,182,0.2)" },
    },
  },
  {
    id: "tile-12",
    title: "Operasyon Kontrol",
    description: "Tüm kampanyaların tek dashboard mantığında takibini sağlayan katman.",
    radiusProfile: "24px",
    speed: 0.5,
    width: 380,
    colors: {
      light: { from: "#F472B6", to: "#E11D48", accent: "rgba(255,255,255,0.18)" },
      dark: { from: "#5B1E35", to: "#9D174D", accent: "rgba(253,164,175,0.14)" },
    },
  },
];

export default function GaleriPage() {
  return (
    <main className="min-h-screen overflow-hidden pt-28 md:pt-32">
      <GalleryGrid tiles={galleryTiles} />
    </main>
  );
}
