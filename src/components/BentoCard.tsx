"use client";

interface BentoCardProps {
  title: string;
  description: string;
  items: string[];
  backgroundImage?: string;
  mobile?: boolean;
}

export default function BentoCard({
  title,
  description,
  backgroundImage,
}: BentoCardProps) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl transition-shadow duration-300 md:rounded-3xl md:cursor-pointer md:hover:shadow-[0_20px_48px_rgba(219,39,119,0.15)]"
      style={{
        backgroundColor: "#1a1a1a",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* İnce pembe accent çizgi */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full md:top-4 md:bottom-4 md:w-[4px]"
        style={{ background: "linear-gradient(180deg, #F472B6, #DB2777)" }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end p-5 pl-6 md:p-8 md:pl-10">
        <h3 className="text-lg font-bold text-white leading-tight md:text-3xl md:mb-2">{title}</h3>
        <p className="text-xs text-white/50 mt-1 line-clamp-2 md:text-base md:text-white/60">{description}</p>
      </div>
    </div>
  );
}
