import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { AIServicePage } from "@/components/services/AIServicePage";
import { VideoServicePage } from "@/components/services/VideoServicePage";
import { ChatbotServicePage } from "@/components/services/ChatbotServicePage";
import { VoiceServicePage } from "@/components/services/VoiceServicePage";
import { SoftwareServicePage } from "@/components/services/SoftwareServicePage";

import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services
    .filter((s) => !s.slug.startsWith("__"))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Hizmet Bulunamadı | Zeplin" };

  return {
    title: `${service.title} | Zeplin Ajans`,
    description: service.longDesc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  if (service.customPage === "chatbot") {
    return <ChatbotServicePage service={service} />;
  }

  if (service.customPage === "voice") {
    return <VoiceServicePage service={service} />;
  }

  if (service.customPage === "software") {
    return <SoftwareServicePage service={service} />;
  }

  if (service.customPage === "ai") {
    return <AIServicePage service={service} />;
  }

  if (service.customPage === "video") {
    return <VideoServicePage service={service} />;
  }

  return <ServiceDetailTemplate service={service} />;
}
