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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={`h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 transition-colors duration-700 ease-in-out overflow-hidden ${t.bg}`}
    >
      <div
        className={`max-w-[88%] sm:max-w-xl w-full max-h-[85dvh] sm:max-h-[90dvh] flex flex-col rounded-[2.5rem] shadow-2xl p-5 sm:p-10 relative border transition-colors duration-700 ease-in-out ${t.card} ${t.border}`}
      >
        {/* Theme Switcher Dots */}
        <div className="absolute top-8 right-8 flex gap-2.5 z-10">
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`w-4 h-4 rounded-full  hover:scale-110 transition-all duration-300 ${THEMES[key].dot} ${
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
          <div className=" group relative mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out flex-1 overflow-y-auto min-h-0 pr-2 pb-2">
            {/* Corrected Version */}
            <div
              className={`p-6 rounded-2xl transition-colors duration-700 border ${t.accentBg} ${t.border}`}
            >
              <span
                className={`text-xs font-bold uppercase tracking-wider ${t.accentLabel}`}
              >
                Corrected
              </span>
              <button
                onClick={() => copyToClipboard(result.corrected)}
                className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/10 ${t.accentText}`}
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
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
                    className={`group flex items-start text-base leading-relaxed ${t.textMain}`}
                  >
                    <div className="flex items-start">
                      <span
                        className={`mr-3 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-700 ${t.dot}`}
                      ></span>
                      {alt}
                    </div>
                    <button
                      onClick={() => copyToClipboard(alt)}
                      className="ml-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition hover:bg-white/10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
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
