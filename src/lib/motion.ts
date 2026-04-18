export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FONT = { fontFamily: 'var(--font-jost), sans-serif' } as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.985, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: EASE, delay },
  }),
};
