export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FONT = { fontFamily: 'var(--font-jost), sans-serif' } as const;

export const revealVariants = {
  hidden: { opacity: 0.16, y: 24, scale: 0.99 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: EASE, delay },
  }),
};

export const revealViewport = {
  once: true,
  amount: 0.01,
  margin: "0px 0px 64px 0px",
} as const;
