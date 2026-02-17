"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Gündüz moduna geç" : "Gece moduna geç"}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="relative w-4 h-4">
        {/* Güneş */}
        <svg
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0) scale(1)",
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Ay */}
        <svg
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}
