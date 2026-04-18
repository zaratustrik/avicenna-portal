"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses-data";

const tagColorMap: Record<string, string> = {
  clinical: "bg-clinical/10 text-clinical border-0",
  vital:    "bg-vital/10 text-vital border-0",
  critical: "bg-critical/10 text-critical border-0",
  warning:  "bg-warning/10 text-warning border-0",
};

const levelColor: Record<string, string> = {
  "Базовый":     "text-vital",
  "Резидент":    "text-clinical",
  "Продвинутый": "text-warning",
  "Экспертный":  "text-critical",
};

const filters = [
  { id: "all",       label: "Все",            icon: "🏥", tag: null           },
  { id: "lap",       label: "Лапароскопия",   icon: "🔬", tag: "Лапароскопия" },
  { id: "gyn",       label: "Гинекология",    icon: "🩺", tag: "Гинекология"  },
  { id: "card",      label: "Кардиология",    icon: "❤️", tag: "Кардиология"  },
  { id: "anest",     label: "Анестезиология", icon: "💉", tag: "Анестезиология"},
  { id: "onco",      label: "Онкология",      icon: "🧬", tag: "Онкология"    },
];

export function CatalogSection() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? courses.slice(0, 9)
    : courses.filter((c) => c.tag === filters.find((f) => f.id === active)?.tag).slice(0, 9);

  return (
    <section id="catalog" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent/40 text-accent bg-accent/10">
            Специальности
          </Badge>
          <h2 className="font-heading text-4xl mb-4">Каталог направлений</h2>
          <p className="text-muted-foreground">
            Начните с вашей специальности — контент адаптируется под ваш профиль
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                active === f.id
                  ? "border-clinical bg-clinical/10 text-clinical shadow-sm shadow-clinical/10"
                  : "border-border text-muted-foreground hover:border-clinical/40 hover:text-foreground"
              }`}
            >
              <span>{f.icon}</span>
              {f.label}
              <span className="text-xs opacity-60">
                ({f.tag ? courses.filter((c) => c.tag === f.tag).length : courses.length})
              </span>
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
          {filtered.map((course) => (
            <Card
              key={course.id}
              className="p-5 bg-card border-border hover:border-clinical/40 transition-all cursor-pointer group flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${tagColorMap[course.tagColor]}`}>
                  {course.tag}
                </Badge>
                <span className={`text-[11px] font-medium ${levelColor[course.level]}`}>
                  {course.level}
                </span>
              </div>

              <h3 className="font-semibold text-sm leading-snug group-hover:text-clinical transition-colors flex-1">
                {course.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50 mt-auto">
                <div className="flex gap-3">
                  <span>📚 {course.modules} мод.</span>
                  <span>⏱ {course.minutes} мин</span>
                  <span className="text-vital font-medium">✦ {course.nmo} НМО</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{course.instructor}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link href="/dashboard/courses">
            <Button variant="outline" className="border-border hover:border-clinical/50 gap-2">
              Смотреть все курсы →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
