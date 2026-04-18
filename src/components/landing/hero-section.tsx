"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const cyclingWords = [
  "операциями",
  "дежурствами",
  "обходами",
  "конференциями",
  "командировками",
];

const floatingCards = [
  {
    icon: "👨‍⚕️",
    value: "2 700+",
    label: "врачей на платформе",
    pos: "top-6 -left-4 md:top-10 md:-left-8",
    delay: "0s",
    duration: "6s",
  },
  {
    icon: "✦",
    value: "144 ЗЕТ",
    label: "за 5-летний цикл НМО",
    pos: "top-6 -right-4 md:top-10 md:-right-8",
    delay: "1.5s",
    duration: "7s",
  },
  {
    icon: "⚡",
    value: "5–15 мин",
    label: "один обучающий модуль",
    pos: "bottom-24 -left-4 md:bottom-28 md:-left-10",
    delay: "0.8s",
    duration: "8s",
  },
  {
    icon: "🎓",
    value: "НМО",
    label: "аккредитованные курсы",
    pos: "bottom-24 -right-4 md:bottom-28 md:-right-10",
    delay: "2s",
    duration: "6.5s",
  },
];

// ECG/heartbeat path — realistic sinus rhythm, viewBox 0 0 400 60
const ECG_PATH =
  "M0,30 L30,30 L38,30 L42,10 L46,50 L50,20 L54,38 L58,30 L90,30 L98,30 L102,10 L106,50 L110,20 L114,38 L118,30 L150,30 L158,30 L162,10 L166,50 L170,20 L174,38 L178,30 L210,30 L218,30 L222,10 L226,50 L230,20 L234,38 L238,30 L270,30 L278,30 L282,10 L286,50 L290,20 L294,38 L298,30 L330,30 L338,30 L342,10 L346,50 L350,20 L354,38 L358,30 L400,30";

export function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % cyclingWords.length);
        setFading(false);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden min-h-[90vh]">

      {/* ── Animated gradient mesh background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blob 1 — clinical blue */}
        <div
          className="absolute rounded-full blur-3xl opacity-[0.12]"
          style={{
            width: 700, height: 500,
            background: "radial-gradient(circle, #2D7DD2, transparent 70%)",
            top: "5%", left: "50%",
            transform: "translateX(-50%)",
            animation: "blob1 18s ease-in-out infinite",
          }}
        />
        {/* Blob 2 — vital green */}
        <div
          className="absolute rounded-full blur-3xl opacity-[0.07]"
          style={{
            width: 500, height: 400,
            background: "radial-gradient(circle, #0FCB8E, transparent 70%)",
            top: "30%", left: "15%",
            animation: "blob2 22s ease-in-out infinite",
          }}
        />
        {/* Blob 3 — blue accent */}
        <div
          className="absolute rounded-full blur-3xl opacity-[0.08]"
          style={{
            width: 400, height: 350,
            background: "radial-gradient(circle, #3A8AE0, transparent 70%)",
            top: "20%", right: "10%",
            animation: "blob3 16s ease-in-out infinite",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#8D99AE 1px, transparent 1px), linear-gradient(90deg, #8D99AE 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative max-w-4xl w-full flex flex-col items-center gap-7">

        <Badge
          variant="outline"
          className="border-clinical/40 text-clinical bg-clinical/10 px-4 py-1.5 text-sm animate-fade-in"
        >
          ✦ Медицинское образование нового поколения
        </Badge>

        {/* Headline with cycling word */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-onest), var(--font-inter), sans-serif", fontWeight: 700 }}
        >
          Учитесь между{" "}
          <span
            className="text-clinical inline-block transition-all duration-300"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(6px)" : "translateY(0)",
              minWidth: "14ch",
              textAlign: "left",
            }}
          >
            {cyclingWords[wordIdx]},
          </span>
          <br />а не вместо них
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Интеллектуальный тренажёр для практикующих хирургов и ординаторов.
          Клинические случаи, 3D‑анатомия и НМО‑баллы — в модулях по 5–15 минут.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-clinical hover:bg-clinical/90 text-white px-8 h-12 text-base shadow-lg shadow-clinical/20">
              Попробовать бесплатно
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="border-border hover:border-clinical/50 h-12 text-base">
              Смотреть демо →
            </Button>
          </Link>
        </div>

        {/* ── Floating glassmorphism cards ── */}
        <div className="relative w-full mt-8">
          {/* ECG line */}
          <div className="w-full overflow-hidden mb-8">
            <svg
              viewBox="0 0 400 60"
              className="w-full h-12 opacity-30"
              preserveAspectRatio="none"
            >
              <path
                d={ECG_PATH}
                fill="none"
                stroke="#2D7DD2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 1200,
                  animation: "ecg 3s linear infinite",
                }}
              />
              {/* Glowing dot that travels the line */}
              <circle r="3" fill="#0FCB8E" opacity="0.9">
                <animateMotion dur="3s" repeatCount="indefinite" path={ECG_PATH} />
              </circle>
            </svg>
          </div>

          {/* Stats cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {floatingCards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm px-4 py-3 flex flex-col gap-1 text-left"
                style={{
                  animation: `float ${card.duration} ease-in-out infinite`,
                  animationDelay: card.delay,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{card.icon}</span>
                  <span className="font-bold text-foreground text-sm">{card.value}</span>
                </div>
                <span className="text-[11px] text-muted-foreground leading-tight">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CSS Animations (injected as style tag) ── */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
          33%       { transform: translateX(-45%) translateY(-30px) scale(1.05); }
          66%       { transform: translateX(-55%) translateY(20px) scale(0.97); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(40px, -50px) scale(1.08); }
          70%       { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%       { transform: translate(-30px, 40px) scale(1.06); }
          65%       { transform: translate(20px, -20px) scale(0.96); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-7px); }
        }
        @keyframes ecg {
          0%   { stroke-dashoffset: 1200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes animate-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}
