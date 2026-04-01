"use client";
import { useState } from "react";
// Adjust the import path based on where you saved the file!
import { THEMES, ThemeKey } from "@/lib/themes";

export default function Home() {
  const [theme, setTheme] = useState<ThemeKey>("onyx");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const t = THEMES[theme];

  const handleFix = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/fix", {
        method: "POST",
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 transition-colors duration-700 ease-in-out overflow-hidden ${t.bg}`}
    >
      <div
        className={`max-w-xl w-full max-h-[100dvh] sm:max-h-[90dvh] flex flex-col rounded-[2rem] shadow-2xl p-6 sm:p-10 relative border transition-colors duration-700 ease-in-out ${t.card} ${t.border}`}
      >
        {/* Theme Switcher Dots */}
        <div className="absolute top-8 right-8 flex gap-2.5 z-10">
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${THEMES[key].dot} ${
                theme === key
                  ? "ring-2 ring-offset-2 ring-offset-transparent ring-white/30 scale-110"
                  : "opacity-30 hover:opacity-100"
              }`}
              aria-label={`Switch to ${key} theme`}
            />
          ))}
        </div>

        {/* Header - Stays Fixed */}
        <div className="mb-6 mt-2 shrink-0">
          <h2
            className={`text-xs font-bold uppercase tracking-[0.25em] ${t.accentLabel} mb-3`}
          >
            Rewordy
          </h2>
          <h1 className={`text-4xl font-semibold tracking-tight ${t.textMain}`}>
            Help me say this
          </h1>
        </div>

        {/* Textarea - Stays Fixed */}
        <textarea
          className={`w-full p-5 rounded-2xl outline-none resize-none mb-4 text-xl leading-relaxed transition-all duration-300 ring-1 ring-transparent shrink-0 ${t.inputBg} ${t.textMain} placeholder:${t.textSec} ${t.focus}`}
          rows={3}
          placeholder="Write anything… broken English, mixed thoughts…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Action Button - Stays Fixed */}
        <button
          onClick={handleFix}
          disabled={loading || !input.trim()}
          className={`w-full py-4 rounded-xl font-medium text-lg tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ${t.btn} ${t.glow}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
            </span>
          ) : (
            "Make it better"
          )}
        </button>

        {/* Error State */}
        {error && (
          <div className="mt-4 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-center shrink-0">
            <p className="text-red-400 text-base font-medium">{error}</p>
          </div>
        )}

        {/* Output Cards - SCROLLABLE AREA */}
        {result && !error && result.alternatives && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out flex-1 overflow-y-auto min-h-0 pr-2 pb-2">
            {/* Corrected Version */}
            <div
              className={`p-6 rounded-2xl transition-colors duration-700 border ${t.accentBg} ${t.border}`}
            >
              <span
                className={`text-xs font-bold uppercase tracking-wider ${t.accentLabel}`}
              >
                Corrected
              </span>
              <p
                className={`text-2xl mt-3 leading-relaxed font-medium ${t.accentText}`}
              >
                {result.corrected}
              </p>
            </div>

            {/* Explanation */}
            <div className={`p-5 rounded-2xl border ${t.inputBg} ${t.border}`}>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${t.accentLabel}`}
              >
                Why?
              </span>
              <p className={`mt-2 leading-relaxed text-base ${t.textSec}`}>
                {result.explanation}
              </p>
            </div>

            {/* Alternatives */}
            <div className={`p-5 rounded-2xl border ${t.inputBg} ${t.border}`}>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${t.textSec}`}
              >
                Better ways to say it
              </span>
              <ul className="mt-4 space-y-4">
                {result.alternatives.map((alt: string, i: number) => (
                  <li
                    key={i}
                    className={`flex items-start text-base leading-relaxed ${t.textMain}`}
                  >
                    <span
                      className={`mr-3 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-700 ${t.dot}`}
                    ></span>
                    {alt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
