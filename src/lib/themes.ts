export type ThemeKey = "onyx" | "pearl" | "sapphire" | "sage" | "aubergine";

export interface ThemeConfig {
  bg: string;
  card: string;
  textMain: string;
  textSec: string;
  accentText: string;
  accentLabel: string;
  accentBg: string;
  btn: string;
  glow: string;
  dot: string;
  focus: string;
  inputBg: string;
  border: string;
}

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  // Premium slightly dark theme
  onyx: {
    bg: "bg-[#0A0A0B]",
    card: "bg-[#141415]",
    textMain: "text-zinc-100",
    textSec: "text-zinc-400",
    accentText: "text-zinc-100",
    accentLabel: "text-zinc-500",
    accentBg: "bg-zinc-800/30",
    btn: "bg-zinc-100 hover:bg-white text-zinc-900",
    glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    dot: "bg-zinc-400",
    focus: "focus:ring-zinc-500/30",
    inputBg: "bg-black/40",
    border: "border-white/5",
  },
  // Premium Light Mode (Sand/Cream)
  pearl: {
    bg: "bg-[#DED8D7]",
    card: "bG-[#F7DEDC]",
    textMain: "text-stone-900",
    textSec: "text-stone-500",
    accentText: "text-stone-800",
    accentLabel: "text-amber-700/70",
    accentBg: "bg-amber-500/10",
    btn: "bg-stone-900 hover:bg-stone-800 text-white",
    glow: "hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]",
    dot: "bg-stone-300",
    focus: "focus:ring-stone-500/20",
    inputBg: "bg-[#F7F5F2]",
    border: "border-black/5",
  },
  // Deep luxurious blue
  sapphire: {
    bg: "bg-[#0B0F19]",
    card: "bg-[#111827]",
    textMain: "text-slate-100",
    textSec: "text-slate-400",
    accentText: "text-blue-300",
    accentLabel: "text-blue-400/80",
    accentBg: "bg-blue-500/10",
    btn: "bg-blue-600 hover:bg-blue-500 text-white",
    glow: "hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]",
    dot: "bg-blue-400",
    focus: "focus:ring-blue-500/30",
    inputBg: "bg-black/20",
    border: "border-blue-500/10",
  },
  // Earthy, calming green
  sage: {
    bg: "bg-[#121614]",
    card: "bg-[#1A201D]",
    textMain: "text-stone-100",
    textSec: "text-stone-400",
    accentText: "text-emerald-300",
    accentLabel: "text-emerald-500",
    accentBg: "bg-emerald-500/10",
    btn: "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    dot: "bg-emerald-500",
    focus: "focus:ring-emerald-500/30",
    inputBg: "bg-black/20",
    border: "border-emerald-500/10",
  },
  // Deep, rich purple
  aubergine: {
    bg: "bg-[#140F16]",
    card: "bg-[#1D1620]",
    textMain: "text-zinc-100",
    textSec: "text-zinc-400",
    accentText: "text-fuchsia-300",
    accentLabel: "text-fuchsia-400/80",
    accentBg: "bg-fuchsia-500/10",
    btn: "bg-fuchsia-600/20 hover:bg-fuchsia-600/30 text-fuchsia-300",
    glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.15)]",
    dot: "bg-fuchsia-400",
    focus: "focus:ring-fuchsia-500/30",
    inputBg: "bg-black/20",
    border: "border-fuchsia-500/10",
  },
};
