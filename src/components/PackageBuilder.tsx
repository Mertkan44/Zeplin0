"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  price: number;
}

const SERVICES: Service[] = [
  { id: "reel-video", name: "Reel Video", price: 2500 },
  { id: "fotograf", name: "Fotoğraf", price: 1500 },
  { id: "chatbot", name: "Chatbot", price: 3000 },
  { id: "sosyal-medya", name: "Sosyal Medya", price: 2000 },
  { id: "web-gelistirme", name: "Web Geliştirme", price: 5000 },
  { id: "marka-danismanligi", name: "Marka Danışmanlığı", price: 2500 },
];

function getDiscount(ids: string[]): { percent: number; label: string } | null {
  if (ids.length >= 5) return { percent: 25, label: "5+ servis" };
  if (ids.length >= 3) return { percent: 15, label: "3+ servis" };
  if (ids.includes("reel-video") && ids.includes("fotograf"))
    return { percent: 10, label: "Reel + Fotoğraf" };
  return null;
}

// ─── Shelf card (draggable, top rail) ────────────────────────────────────────

function ShelfCard({ service, isUsed }: { service: Service; isUsed: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: service.id,
    disabled: isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all select-none ${
        isUsed
          ? "opacity-30 cursor-not-allowed border-white/5 bg-white/3"
          : isDragging
          ? "opacity-30 border-pink-500/30 bg-zinc-900"
          : "cursor-grab active:cursor-grabbing border-white/10 bg-zinc-900 hover:border-pink-500/40 hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(255,45,120,0.2)]"
      }`}
      style={{ width: "120px" }}
    >
      <img
        src={`/icons/${service.id}.png`}
        alt={service.name}
        className={`w-14 h-14 object-contain transition-all ${isUsed ? "grayscale" : ""}`}
        draggable={false}
      />
      <span className="text-xs font-semibold text-white/80 text-center leading-tight">
        {service.name}
      </span>
      <span className="text-xs text-pink-400 font-bold">
        {service.price.toLocaleString("tr-TR")}₺
      </span>
    </div>
  );
}

// ─── Craft card (dropped, inside drop zone) ───────────────────────────────────

function CraftCard({
  service,
  onRemove,
  glowing,
}: {
  service: Service;
  onRemove: () => void;
  glowing: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, y: -30, opacity: 0 }}
      animate={{
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 420, damping: 24 },
      }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
      className="relative flex flex-col items-center gap-2.5 p-5 rounded-2xl bg-zinc-950/90 border border-white/10 group backdrop-blur-sm"
      style={{
        width: "140px",
        boxShadow: glowing
          ? "0 0 30px rgba(255,45,120,0.5), 0 0 0 1px rgba(255,45,120,0.4)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.5s ease",
      }}
    >
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF2D78] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white text-sm font-bold z-10 shadow-lg hover:scale-110"
      >
        ×
      </button>
      <img
        src={`/icons/${service.id}.png`}
        alt={service.name}
        className="w-16 h-16 object-contain"
        draggable={false}
      />
      <span className="text-sm font-bold text-white text-center leading-tight">
        {service.name}
      </span>
      <span className="text-sm text-pink-400 font-bold">
        {service.price.toLocaleString("tr-TR")}₺
      </span>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PackageBuilder() {
  const [selected, setSelected] = useState<Service[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [glowing, setGlowing] = useState<Set<string>>(new Set());

  const { setNodeRef: dropRef, isOver } = useDroppable({ id: "craft-area" });

  // ── Helpers ──

  const flashGlow = (id: string) => {
    setGlowing((p) => new Set([...p, id]));
    setTimeout(
      () =>
        setGlowing((p) => {
          const n = new Set(p);
          n.delete(id);
          return n;
        }),
      700
    );
  };

  const addService = (serviceId: string) => {
    setSelected((prev) => {
      if (prev.find((s) => s.id === serviceId)) return prev;
      const s = SERVICES.find((s) => s.id === serviceId);
      if (!s) return prev;
      return [...prev, s];
    });
    flashGlow(serviceId);
  };

  const removeService = (id: string) =>
    setSelected((p) => p.filter((s) => s.id !== id));

  // ── DnD ──

  const handleDragStart = (e: DragStartEvent) =>
    setActiveId(e.active.id as string);

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    if (e.over?.id === "craft-area") addService(e.active.id as string);
  };

  // ── Randomize ──

  const handleRandomize = () => {
    const count = Math.floor(Math.random() * 3) + 2;
    const picks = [...SERVICES].sort(() => Math.random() - 0.5).slice(0, count);
    setSelected([]);
    setGlowing(new Set());
    picks.forEach((s, i) =>
      setTimeout(() => {
        setSelected((p) => [...p, s]);
        flashGlow(s.id);
      }, (i + 1) * 200)
    );
  };

  // ── Price ──

  const selectedIds = selected.map((s) => s.id);
  const discount = getDiscount(selectedIds);
  const total = selected.reduce((sum, s) => sum + s.price, 0);
  const discounted = discount
    ? Math.round(total * (1 - discount.percent / 100))
    : total;

  const whatsappMsg = `Merhaba! ${selected.map((s) => s.name).join(", ")} paketine ilgi duyuyorum. Toplam fiyat: ${discounted.toLocaleString("tr-TR")}₺`;
  const whatsappUrl = `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(whatsappMsg)}`;

  const activeService = SERVICES.find((s) => s.id === activeId);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              paket oluşturucu
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              servisini sürükle, fiyatını anında gör — sonra WhatsApp&apos;a gönder.
            </p>
          </div>

          {/* ── Top shelf ── */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-5 scrollbar-hide">
            {SERVICES.map((s) => (
              <ShelfCard
                key={s.id}
                service={s}
                isUsed={!!selected.find((x) => x.id === s.id)}
              />
            ))}
          </div>

          {/* ── Craft area ── */}
          <div
            ref={dropRef}
            className="relative rounded-3xl transition-all duration-300"
            style={{
              minHeight: "280px",
              backgroundColor: "rgba(12, 2, 18, 0.75)",
              backgroundImage:
                "radial-gradient(circle, rgba(200, 30, 100, 0.35) 1.5px, transparent 1.5px)",
              backgroundSize: "30px 30px",
              backdropFilter: "blur(8px)",
              border: isOver
                ? "2px solid #FF2D78"
                : "2px dashed rgba(255, 45, 120, 0.25)",
              boxShadow: isOver
                ? "inset 0 0 60px rgba(255,45,120,0.12), 0 0 40px rgba(255,45,120,0.08)"
                : "inset 0 0 80px rgba(80,0,40,0.3)",
            }}
          >
            {/* Pulse border when empty */}
            {selected.length === 0 && (
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "inset 0 0 0 0px rgba(255,45,120,0)",
                    "inset 0 0 0 1.5px rgba(255,45,120,0.4)",
                    "inset 0 0 0 0px rgba(255,45,120,0)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            )}

            {/* Empty state */}
            {selected.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-pink-500/30 flex items-center justify-center">
                  <span className="text-2xl text-pink-500/40">+</span>
                </div>
                <p className="text-sm text-pink-300/30 tracking-wide">
                  servisleri buraya sürükle
                </p>
              </div>
            )}

            {/* Dropped cards */}
            <div className="p-6 flex flex-wrap gap-4 content-start min-h-[280px]">
              <AnimatePresence>
                {selected.map((s) => (
                  <CraftCard
                    key={s.id}
                    service={s}
                    onRemove={() => removeService(s.id)}
                    glowing={glowing.has(s.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Price center ── */}
          <div className="text-center py-10">
            <AnimatePresence mode="wait">
              {selected.length === 0 ? (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl text-zinc-500 dark:text-zinc-500 font-medium"
                >
                  paketini oluştur
                </motion.p>
              ) : (
                <motion.div
                  key="price-block"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Discount badge */}
                  <AnimatePresence>
                    {discount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="inline-flex items-center gap-1.5 bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        indirim uygulandı — %{discount.percent} ({discount.label})
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Price with flip */}
                  <div className="overflow-hidden" style={{ height: "4.5rem" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={discounted}
                        initial={{ y: -72, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { type: "spring", stiffness: 380, damping: 30 },
                        }}
                        exit={{ y: 72, opacity: 0, transition: { duration: 0.12 } }}
                        className="text-6xl font-extrabold text-white leading-none"
                      >
                        {discounted.toLocaleString("tr-TR")}₺
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {discount && total !== discounted && (
                    <p className="text-base text-zinc-600 line-through mt-1">
                      {total.toLocaleString("tr-TR")}₺
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Buttons ── */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={handleRandomize}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-xl bg-zinc-800 text-white/80 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              🎲 rastgele oluştur
            </motion.button>

            <motion.a
              href={selected.length > 0 ? whatsappUrl : undefined}
              target={selected.length > 0 ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileTap={selected.length > 0 ? { scale: 0.97 } : {}}
              className={`px-7 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 ${
                selected.length > 0
                  ? "bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/25 cursor-pointer"
                  : "bg-green-500/15 text-white/25 cursor-not-allowed pointer-events-none"
              }`}
            >
              WhatsApp&apos;a Gönder
            </motion.a>
          </div>

        </div>
      </section>

      {/* Floating drag ghost */}
      <DragOverlay>
        {activeService ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 3 }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-zinc-900/95 border border-pink-500/40 shadow-2xl shadow-pink-500/20 cursor-grabbing"
            style={{ width: "120px" }}
          >
            <img
              src={`/icons/${activeService.id}.png`}
              alt={activeService.name}
              className="w-12 h-12 object-contain"
              draggable={false}
            />
            <span className="text-xs font-semibold text-white text-center leading-tight">
              {activeService.name}
            </span>
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
