/* ── Service Data Types ────────────────────────────────────────────── */

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  category: "tasarim" | "icerik" | "video" | "otomasyon";
  categoryLabel: string;
  shortDesc: string;
  longDesc: string;
  heroImage: string;
  features: ServiceFeature[];
  process: ServiceProcess[];
  relatedSlugs: string[];
  customPage?: "ai" | "video";
  /** Image overlay style */
  dark?: boolean;
}

/* ── Tab structure for /hizmetler listing page ────────────────────── */

export interface ServiceTab {
  id: string;
  label: string;
  cards: {
    slug: string;
    title: string;
    desc: string;
    img: string;
    dark: boolean;
  }[];
}

/* ── All Services ─────────────────────────────────────────────────── */

export const services: ServiceData[] = [
  /* ── Tasarım ──────────────────────────────────────────────────── */
  {
    slug: "post-tasarimi",
    title: "Post Tasarımı",
    category: "tasarim",
    categoryLabel: "Tasarım",
    shortDesc: "Sosyal medya için dikkat çekici görseller",
    longDesc:
      "Markanızın sosyal medya varlığını güçlendiren, dikkat çekici ve paylaşılabilir post tasarımları üretiyoruz. Her platformun dinamiklerine uygun, tutarlı bir görsel dil oluşturuyoruz.",
    heroImage: "/images/dag-optimized.webp",
    dark: true,
    features: [
      { title: "Platform Optimizasyonu", desc: "Instagram, Facebook, LinkedIn ve X için optimize edilmiş boyut ve formatlar" },
      { title: "Marka Tutarlılığı", desc: "Renk paleti, tipografi ve görsel dilinize uygun tasarımlar" },
      { title: "A/B Test Varyantları", desc: "Farklı görsel ve metin kombinasyonlarıyla test edilebilir tasarımlar" },
      { title: "Hızlı Revizyon", desc: "Geri bildirimlerinize 24 saat içinde revizyon" },
    ],
    process: [
      { step: "01", title: "Brief", desc: "Hedef kitle ve mesajınızı anlıyoruz" },
      { step: "02", title: "Konsept", desc: "Görsel yön ve tema belirliyoruz" },
      { step: "03", title: "Tasarım", desc: "Platformlara uygun görseller üretiyoruz" },
      { step: "04", title: "Revizyon & Teslimat", desc: "Son düzenlemeler ve dosya teslimi" },
    ],
    relatedSlugs: ["kartvizit-tasarimi", "logo-tasarimi", "banner-afis"],
  },
  {
    slug: "kartvizit-tasarimi",
    title: "Kartvizit Tasarımı",
    category: "tasarim",
    categoryLabel: "Tasarım",
    shortDesc: "Profesyonel ve akılda kalıcı kartvizitler",
    longDesc:
      "İlk izlenimi kalıcı kılan, markanızı yansıtan profesyonel kartvizit tasarımları. Baskı kalitesinden kağıt seçimine kadar her detayı düşünüyoruz.",
    heroImage: "/images/wherehavee-optimized.webp",
    dark: false,
    features: [
      { title: "Özel Kesim & Lak", desc: "Kabartma, folyo ve özel kesim seçenekleri" },
      { title: "Çift Taraflı Tasarım", desc: "Ön ve arka yüz uyumlu tasarım" },
      { title: "Baskıya Hazır Dosya", desc: "CMYK, yüksek çözünürlük, baskı payı dahil" },
      { title: "Dijital Kartvizit", desc: "QR kodlu dijital paylaşım seçeneği" },
    ],
    process: [
      { step: "01", title: "Brief", desc: "Markanız ve ihtiyaçlarınız" },
      { step: "02", title: "Tasarım", desc: "3 farklı konsept önerisi" },
      { step: "03", title: "Revizyon", desc: "Seçilen konseptte ince ayar" },
      { step: "04", title: "Teslimat", desc: "Baskıya hazır dosya teslimi" },
    ],
    relatedSlugs: ["post-tasarimi", "logo-tasarimi", "banner-afis"],
  },
  {
    slug: "logo-tasarimi",
    title: "Logo Tasarımı",
    category: "tasarim",
    categoryLabel: "Tasarım",
    shortDesc: "Markanızı tanımlayan özgün logolar",
    longDesc:
      "Markanızın kimliğini tek bir sembolde özetleyen, akılda kalıcı ve ölçeklenebilir logo tasarımları. Dijitalden baskıya her ortamda kusursuz görünen logolar üretiyoruz.",
    heroImage: "/images/dag-optimized.webp",
    dark: false,
    features: [
      { title: "Araştırma & Analiz", desc: "Sektör ve rakip analizi ile özgün yön belirleme" },
      { title: "Çoklu Konsept", desc: "En az 3 farklı logo konsepti sunumu" },
      { title: "Marka Kılavuzu", desc: "Logo kullanım kuralları ve renk kodları" },
      { title: "Tüm Formatlar", desc: "SVG, PNG, PDF — her ortam için hazır" },
    ],
    process: [
      { step: "01", title: "Keşif", desc: "Markanızın hikayesini dinliyoruz" },
      { step: "02", title: "Eskiz", desc: "El çizimi ve dijital eskizler" },
      { step: "03", title: "Tasarım", desc: "Seçilen yönde detaylı çalışma" },
      { step: "04", title: "Finalize", desc: "Marka kılavuzu ve dosya teslimi" },
    ],
    relatedSlugs: ["kartvizit-tasarimi", "post-tasarimi", "banner-afis"],
  },
  {
    slug: "banner-afis",
    title: "Banner & Afiş",
    category: "tasarim",
    categoryLabel: "Tasarım",
    shortDesc: "Dijital ve basılı reklam görselleri",
    longDesc:
      "Google Ads, sosyal medya reklamları ve fiziksel afiş tasarımlarıyla markanızın mesajını etkili bir şekilde iletiyoruz. Dönüşüm odaklı, dikkat çekici görseller üretiyoruz.",
    heroImage: "/images/wherehavee-optimized.webp",
    dark: true,
    features: [
      { title: "Dijital Banner", desc: "Google Display, Facebook ve Instagram reklam görselleri" },
      { title: "Basılı Afiş", desc: "Billboard, roll-up ve broşür tasarımları" },
      { title: "Responsive Tasarım", desc: "Her ekran boyutuna uygun adaptasyon" },
      { title: "Kampanya Seti", desc: "Tutarlı görsel dille komple kampanya paketi" },
    ],
    process: [
      { step: "01", title: "Brief", desc: "Kampanya hedefleri ve mesaj" },
      { step: "02", title: "Konsept", desc: "Görsel yön ve layout" },
      { step: "03", title: "Üretim", desc: "Tüm boyutlarda tasarım üretimi" },
      { step: "04", title: "Teslimat", desc: "Platforma uygun format ve boyutlar" },
    ],
    relatedSlugs: ["post-tasarimi", "logo-tasarimi", "kartvizit-tasarimi"],
  },

  /* ── İçerik ───────────────────────────────────────────────────── */
  {
    slug: "blog-yazilari",
    title: "Blog Yazıları",
    category: "icerik",
    categoryLabel: "İçerik",
    shortDesc: "SEO uyumlu, değer katan blog içerikleri",
    longDesc:
      "Markanızın otoritesini artıran, organik trafiği büyüten SEO uyumlu blog içerikleri üretiyoruz. Anahtar kelime stratejisinden içerik takvimine kadar uçtan uca yönetiyoruz.",
    heroImage: "/images/wherehavee-optimized.webp",
    dark: true,
    features: [
      { title: "SEO Optimizasyonu", desc: "Anahtar kelime araştırması ve on-page SEO" },
      { title: "İçerik Takvimi", desc: "Düzenli yayın planı ve konu stratejisi" },
      { title: "Sektörel Uzmanlık", desc: "Araştırmaya dayalı, derinlikli içerikler" },
      { title: "Analitik Takip", desc: "Performans ölçümü ve optimizasyon" },
    ],
    process: [
      { step: "01", title: "Strateji", desc: "Anahtar kelime ve konu planlaması" },
      { step: "02", title: "Yazım", desc: "SEO uyumlu içerik üretimi" },
      { step: "03", title: "Düzenleme", desc: "Editöryal kontrol ve optimizasyon" },
      { step: "04", title: "Yayın", desc: "İçerik yayını ve performans takibi" },
    ],
    relatedSlugs: ["sosyal-medya-metni", "e-posta-pazarlama", "senaryo-script"],
  },
  {
    slug: "sosyal-medya-metni",
    title: "Sosyal Medya Metni",
    category: "icerik",
    categoryLabel: "İçerik",
    shortDesc: "Etkileşim odaklı caption ve copyler",
    longDesc:
      "Her platformun diline hakim, etkileşim oranlarını artıran sosyal medya metinleri yazıyoruz. Caption'dan hikaye metnine, CTA'dan hashtag stratejisine kadar her detayı kapsıyoruz.",
    heroImage: "/images/dag-optimized.webp",
    dark: false,
    features: [
      { title: "Platform Dili", desc: "Instagram, X, LinkedIn — her platforma özel ton" },
      { title: "Hashtag Stratejisi", desc: "Erişimi artıran hashtag araştırması" },
      { title: "CTA Optimizasyonu", desc: "Dönüşüm sağlayan çağrı metinleri" },
      { title: "Marka Sesi", desc: "Tutarlı marka kişiliği ve ton" },
    ],
    process: [
      { step: "01", title: "Analiz", desc: "Mevcut performans ve rakip analizi" },
      { step: "02", title: "Strateji", desc: "İçerik pillars ve ton belirleme" },
      { step: "03", title: "Yazım", desc: "Aylık içerik paketi üretimi" },
      { step: "04", title: "Optimizasyon", desc: "Performansa göre ince ayar" },
    ],
    relatedSlugs: ["blog-yazilari", "e-posta-pazarlama", "senaryo-script"],
  },
  {
    slug: "e-posta-pazarlama",
    title: "E-posta Pazarlama",
    category: "icerik",
    categoryLabel: "İçerik",
    shortDesc: "Dönüşüm sağlayan e-posta kampanyaları",
    longDesc:
      "Açılma oranlarını ve dönüşümleri artıran profesyonel e-posta kampanyaları tasarlıyor ve yönetiyoruz. Otomatik akışlardan bültenlere, segmentasyondan A/B testlere kadar tam hizmet.",
    heroImage: "/images/dag-optimized.webp",
    dark: true,
    features: [
      { title: "Şablon Tasarımı", desc: "Responsive ve marka uyumlu e-posta şablonları" },
      { title: "Otomasyon Akışları", desc: "Hoş geldin, terk edilmiş sepet, re-engagement" },
      { title: "Segmentasyon", desc: "Hedef kitle segmentasyonu ile kişiselleştirme" },
      { title: "A/B Test", desc: "Konu satırı, CTA ve içerik testleri" },
    ],
    process: [
      { step: "01", title: "Strateji", desc: "Hedefler ve segmentasyon planı" },
      { step: "02", title: "Tasarım & Yazım", desc: "Şablon ve içerik üretimi" },
      { step: "03", title: "Test & Gönderim", desc: "A/B test ve zamanlama optimizasyonu" },
      { step: "04", title: "Analiz", desc: "Performans raporu ve iyileştirme" },
    ],
    relatedSlugs: ["blog-yazilari", "sosyal-medya-metni", "senaryo-script"],
  },
  {
    slug: "senaryo-script",
    title: "Senaryo & Script",
    category: "icerik",
    categoryLabel: "İçerik",
    shortDesc: "Video ve reklam senaryoları",
    longDesc:
      "Tanıtım filmlerinden reklam spotlarına, sosyal medya videolarından podcast scriptlerine kadar her format için profesyonel senaryo ve script yazıyoruz.",
    heroImage: "/images/wherehavee-optimized.webp",
    dark: false,
    features: [
      { title: "Video Senaryosu", desc: "Tanıtım filmi ve reklam spotu senaryoları" },
      { title: "Kısa Form", desc: "Reels, Shorts ve TikTok scriptleri" },
      { title: "Storyboard", desc: "Sahne sahne görsel planlaması" },
      { title: "Seslendirme Metni", desc: "Voiceover ve podcast scriptleri" },
    ],
    process: [
      { step: "01", title: "Brief", desc: "Mesaj, hedef kitle ve format" },
      { step: "02", title: "Taslak", desc: "İlk senaryo taslağı" },
      { step: "03", title: "Revizyon", desc: "Geri bildirimle ince ayar" },
      { step: "04", title: "Final", desc: "Prodüksiyona hazır senaryo" },
    ],
    relatedSlugs: ["blog-yazilari", "sosyal-medya-metni", "e-posta-pazarlama"],
  },

  /* ── Video (özel sayfa) ───────────────────────────────────────── */
  {
    slug: "video-produksiyon",
    title: "Video Prodüksiyon",
    category: "video",
    categoryLabel: "Video",
    shortDesc: "Profesyonel video prodüksiyon hizmetleri",
    longDesc:
      "Tanıtım filmlerinden reklam spotlarına, sosyal medya içeriklerinden motion graphics'e kadar tüm video ihtiyaçlarınızı tek çatı altında karşılıyoruz. Fikir aşamasından final teslimata uçtan uca profesyonel prodüksiyon.",
    heroImage: "/images/wherehavee-optimized.webp",
    dark: true,
    customPage: "video",
    features: [
      { title: "Tanıtım Filmi", desc: "Markanızı anlatan profesyonel prodüksiyon" },
      { title: "Reels & Shorts", desc: "Viral kısa video içerikleri" },
      { title: "Reklam Spotu", desc: "Dijital platformlar için reklam videoları" },
      { title: "Motion Graphics", desc: "Animasyon ve hareketli grafikler" },
    ],
    process: [
      { step: "01", title: "Script", desc: "Senaryo ve storyboard hazırlığı" },
      { step: "02", title: "Pre-prod", desc: "Ekip, lokasyon ve ekipman planlaması" },
      { step: "03", title: "Çekim", desc: "Profesyonel set ve çekim günü" },
      { step: "04", title: "Post-prod", desc: "Kurgu, renk ve ses düzenleme" },
      { step: "05", title: "Teslimat", desc: "Platform uyumlu final dosyalar" },
    ],
    relatedSlugs: ["post-tasarimi", "senaryo-script", "banner-afis"],
  },

  /* ── Otomasyon (özel sayfa) ───────────────────────────────────── */
  {
    slug: "yapay-zeka",
    title: "Yapay Zeka Hizmetleri",
    category: "otomasyon",
    categoryLabel: "Otomasyon",
    shortDesc: "AI destekli otomasyon çözümleri",
    longDesc:
      "Chatbot, callbot ve otomasyon akışlarını markanızın günlük operasyonuna sade ama güçlü bir katman olarak yerleştiriyoruz. 7/24 müşteri desteğinden CRM entegrasyonuna, iş akışı otomasyonundan veri analitiğine kadar yapay zeka gücünü işinize katıyoruz.",
    heroImage: "/images/dag-optimized.webp",
    dark: true,
    customPage: "ai",
    features: [
      { title: "AI Chatbot", desc: "7/24 akıllı müşteri destek sistemi" },
      { title: "AI Callbot", desc: "Sesli yanıt ve yönlendirme otomasyonu" },
      { title: "İş Akışı Otomasyonu", desc: "Tekrarlayan süreçlerin otomasyonu" },
      { title: "CRM Entegrasyonu", desc: "Mevcut sistemlerinizle entegrasyon" },
    ],
    process: [
      { step: "01", title: "Analiz", desc: "Mevcut süreçlerinizi inceliyoruz" },
      { step: "02", title: "Tasarım", desc: "AI çözüm mimarisini kuruyoruz" },
      { step: "03", title: "Geliştirme", desc: "Sistemi geliştirip entegre ediyoruz" },
      { step: "04", title: "Test", desc: "Kapsamlı test ve optimizasyon" },
      { step: "05", title: "Canlı", desc: "Sistemi devreye alıp izliyoruz" },
    ],
    relatedSlugs: ["e-posta-pazarlama", "blog-yazilari", "post-tasarimi"],
  },
];

/* ── Helpers ──────────────────────────────────────────────────────── */

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceData[] {
  return slugs.map((s) => services.find((svc) => svc.slug === s)).filter(Boolean) as ServiceData[];
}

/** Mapping from individual video/otomasyon card slugs to their custom page slug */
export const categoryRedirects: Record<string, string> = {
  "tanitim-filmi": "video-produksiyon",
  "reels-shorts": "video-produksiyon",
  "reklam-spotu": "video-produksiyon",
  "motion-graphics": "video-produksiyon",
  "ai-chatbot": "yapay-zeka",
  "ai-callbot": "yapay-zeka",
  "is-akisi": "yapay-zeka",
  "crm-entegrasyonu": "yapay-zeka",
};

/* ── Tab structure for /hizmetler listing ─────────────────────────── */

export const serviceTabs: ServiceTab[] = [
  {
    id: "tasarim",
    label: "Tasarım",
    cards: [
      { slug: "post-tasarimi", title: "Post Tasarımı", desc: "Sosyal medya için dikkat çekici görseller", img: "/images/dag-optimized.webp", dark: true },
      { slug: "kartvizit-tasarimi", title: "Kartvizit Tasarımı", desc: "Profesyonel ve akılda kalıcı kartvizitler", img: "/images/wherehavee-optimized.webp", dark: false },
      { slug: "logo-tasarimi", title: "Logo Tasarımı", desc: "Markanızı tanımlayan özgün logolar", img: "/images/dag-optimized.webp", dark: false },
      { slug: "banner-afis", title: "Banner & Afiş", desc: "Dijital ve basılı reklam görselleri", img: "/images/wherehavee-optimized.webp", dark: true },
    ],
  },
  {
    id: "icerik",
    label: "İçerik",
    cards: [
      { slug: "blog-yazilari", title: "Blog Yazıları", desc: "SEO uyumlu, değer katan blog içerikleri", img: "/images/wherehavee-optimized.webp", dark: true },
      { slug: "sosyal-medya-metni", title: "Sosyal Medya Metni", desc: "Etkileşim odaklı caption ve copyler", img: "/images/dag-optimized.webp", dark: false },
      { slug: "e-posta-pazarlama", title: "E-posta Pazarlama", desc: "Dönüşüm sağlayan e-posta kampanyaları", img: "/images/dag-optimized.webp", dark: true },
      { slug: "senaryo-script", title: "Senaryo & Script", desc: "Video ve reklam senaryoları", img: "/images/wherehavee-optimized.webp", dark: false },
    ],
  },
  {
    id: "video",
    label: "Video",
    cards: [
      { slug: "video-produksiyon", title: "Tanıtım Filmi", desc: "Markanızı anlatan profesyonel prodüksiyon", img: "/images/wherehavee-optimized.webp", dark: true },
      { slug: "video-produksiyon", title: "Reels & Shorts", desc: "Viral kısa video içerikleri", img: "/images/dag-optimized.webp", dark: false },
      { slug: "video-produksiyon", title: "Reklam Spotu", desc: "Dijital platformlar için reklam videoları", img: "/images/dag-optimized.webp", dark: true },
      { slug: "video-produksiyon", title: "Motion Graphics", desc: "Animasyon ve hareketli grafikler", img: "/images/wherehavee-optimized.webp", dark: false },
    ],
  },
  {
    id: "otomasyon",
    label: "Otomasyon",
    cards: [
      { slug: "yapay-zeka", title: "AI Chatbot", desc: "7/24 akıllı müşteri destek sistemi", img: "/images/dag-optimized.webp", dark: true },
      { slug: "yapay-zeka", title: "AI Callbot", desc: "Sesli yanıt ve yönlendirme otomasyonu", img: "/images/wherehavee-optimized.webp", dark: false },
      { slug: "yapay-zeka", title: "İş Akışı", desc: "Tekrarlayan süreçlerin otomasyonu", img: "/images/wherehavee-optimized.webp", dark: true },
      { slug: "yapay-zeka", title: "CRM Entegrasyonu", desc: "Mevcut sistemlerinizle entegrasyon", img: "/images/dag-optimized.webp", dark: false },
    ],
  },
];
