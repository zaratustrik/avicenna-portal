"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { courseDetail, currentLesson } from "@/lib/lesson-data";
import { cn } from "@/lib/utils";

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const progress = 36; // 05:22 / 14:40

  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-video group">
      {/* Placeholder frame — replaced by Mux player in production */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-surface/60 to-black/80" />

        {/* Fake surgical scene backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="text-8xl">🔬</div>
        </div>

        {/* Play button */}
        <button
          onClick={() => setPlaying(!playing)}
          className="relative z-10 w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all group-hover:scale-110"
        >
          {playing
            ? <span className="text-white text-xl">⏸</span>
            : <span className="text-white text-xl ml-1">▶</span>
          }
        </button>
      </div>

      {/* Top-left: lesson badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-black/50 text-white border-white/20 backdrop-blur-sm text-xs">
          🔴 Лапароскопия
        </Badge>
      </div>

      {/* Top-right: NMO badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-vital/20 text-vital border-vital/30 backdrop-blur-sm text-xs">
          ✦ +6 НМО
        </Badge>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
        {/* Timeline */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-white/70 text-xs tabular-nums">05:22</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer">
            <div
              className="h-full bg-clinical rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow -translate-x-1/2" />
            </div>
          </div>
          <span className="text-white/70 text-xs tabular-nums">14:40</span>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying(!playing)} className="text-white hover:text-clinical transition-colors">
              {playing ? "⏸" : "▶"}
            </button>
            <button className="text-white/60 hover:text-white transition-colors text-sm">⏮ −10</button>
            <button className="text-white/60 hover:text-white transition-colors text-sm">+10 ⏭</button>
            <span className="text-white/60 text-xs">🔊</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <button className="hover:text-white transition-colors">0.75×</button>
            <button className="text-white hover:text-clinical transition-colors font-medium">1×</button>
            <button className="hover:text-white transition-colors">1.5×</button>
            <button className="hover:text-white transition-colors">CC</button>
            <button className="hover:text-white transition-colors">⛶</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LessonPage() {
  const allLessons = courseDetail.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.current);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top breadcrumb bar */}
      <header className="h-14 flex items-center gap-2 px-6 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 text-sm">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          Главная
        </Link>
        <span className="text-muted-foreground/40">›</span>
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          Мои курсы
        </Link>
        <span className="text-muted-foreground/40">›</span>
        <span className="text-muted-foreground truncate max-w-[200px]">{courseDetail.title}</span>
        <span className="text-muted-foreground/40">›</span>
        <span className="text-foreground font-medium truncate max-w-[180px]">{currentLesson.title}</span>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden md:block">
            Урок {currentIndex + 1} из {allLessons.length}
          </span>
          <div className="w-32 hidden md:block">
            <Progress value={courseDetail.progress} className="h-1.5" />
          </div>
          <Badge variant="outline" className="border-vital/40 text-vital bg-vital/10 text-xs hidden md:flex">
            {courseDetail.progress}%
          </Badge>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Video + Tabs ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <div className="p-6 flex flex-col gap-6">
            {/* Lesson title */}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{currentLesson.moduleTitle}</p>
              <h1 className="text-xl font-semibold leading-snug">{currentLesson.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">⏱ {currentLesson.duration}</span>
                <span className="text-xs text-muted-foreground">👤 {courseDetail.instructor}</span>
              </div>
            </div>

            {/* Video */}
            <VideoPlayer />

            {/* Tabs: Конспект / Материалы / PubMed */}
            <Tabs defaultValue="synopsis" className="flex flex-col gap-0">
              <TabsList className="bg-surface border border-border h-10 p-1 w-fit">
                <TabsTrigger value="synopsis"  className="text-xs px-4 data-[state=active]:bg-clinical/15 data-[state=active]:text-clinical">
                  Конспект
                </TabsTrigger>
                <TabsTrigger value="materials" className="text-xs px-4 data-[state=active]:bg-clinical/15 data-[state=active]:text-clinical">
                  Материалы
                </TabsTrigger>
                <TabsTrigger value="pubmed"    className="text-xs px-4 data-[state=active]:bg-clinical/15 data-[state=active]:text-clinical">
                  PubMed
                </TabsTrigger>
              </TabsList>

              {/* Конспект */}
              <TabsContent value="synopsis" className="mt-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
                    {currentLesson.synopsis.trim().split("\n\n").map((block, i) => {
                      if (block.startsWith("**") && block.endsWith("**")) {
                        return (
                          <h3 key={i} className="font-semibold text-foreground mt-4 mb-2 text-sm">
                            {block.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (block.includes("**")) {
                        const parts = block.split(/\*\*(.*?)\*\*/g);
                        return (
                          <p key={i} className="text-sm text-muted-foreground mb-3">
                            {parts.map((p, j) =>
                              j % 2 === 1
                                ? <strong key={j} className="text-foreground font-semibold">{p}</strong>
                                : p
                            )}
                          </p>
                        );
                      }
                      if (block.match(/^\d\./m)) {
                        const lines = block.split("\n").filter(Boolean);
                        return (
                          <ol key={i} className="list-decimal list-inside space-y-1 mb-3">
                            {lines.map((l, j) => (
                              <li key={j} className="text-sm text-muted-foreground">{l.replace(/^\d\.\s/, "")}</li>
                            ))}
                          </ol>
                        );
                      }
                      if (block.match(/^—/m)) {
                        const lines = block.split("\n").filter(Boolean);
                        return (
                          <ul key={i} className="space-y-1 mb-3">
                            {lines.map((l, j) => (
                              <li key={j} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-critical flex-shrink-0">—</span>
                                {l.replace(/^—\s/, "")}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i} className="text-sm text-muted-foreground mb-3">{block}</p>;
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Материалы */}
              <TabsContent value="materials" className="mt-4">
                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                  {currentLesson.materials.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-surface/50 transition-colors cursor-pointer group">
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                        m.type === "pdf" ? "bg-critical/15 text-critical" : "bg-warning/15 text-warning"
                      )}>
                        {m.type.toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className="text-sm font-medium truncate group-hover:text-clinical transition-colors">
                          {m.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{m.size}</span>
                      </div>
                      <button className="text-xs text-clinical opacity-0 group-hover:opacity-100 transition-opacity font-medium flex-shrink-0">
                        ↓ Скачать
                      </button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* PubMed */}
              <TabsContent value="pubmed" className="mt-4">
                <div className="flex flex-col gap-3">
                  {currentLesson.pubmed.map((ref, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2 hover:border-clinical/30 transition-colors cursor-pointer group">
                      <span className="text-sm font-medium leading-snug group-hover:text-clinical transition-colors">
                        {ref.title}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="italic">{ref.journal}</span>
                        <span className="px-2 py-0.5 bg-clinical/10 text-clinical rounded text-[11px]">
                          PMID: {ref.pmid}
                        </span>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Источники подобраны автоматически по теме урока
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2 pb-6">
              <Button variant="outline" className="gap-2 border-border" disabled={currentIndex === 0}>
                ← Предыдущий урок
              </Button>
              <Button className="gap-2 bg-clinical hover:bg-clinical/90 text-white">
                Следующий урок →
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: Course outline ── */}
        <aside className="w-80 flex-shrink-0 border-l border-border hidden lg:flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm">Содержание курса</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {courseDetail.totalModules} модулей · {courseDetail.totalMinutes} мин
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Прогресс</span>
                <span className="text-vital font-medium">{courseDetail.progress}%</span>
              </div>
              <Progress value={courseDetail.progress} className="h-1.5" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 flex flex-col gap-1">
              {courseDetail.modules.map((mod) => (
                <div key={mod.id}>
                  {/* Module header */}
                  <div className="px-3 py-2 mt-2 first:mt-0">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {mod.title}
                    </span>
                  </div>

                  {/* Lessons */}
                  {mod.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        lesson.current
                          ? "bg-clinical/15 text-clinical"
                          : lesson.completed
                            ? "text-foreground/60 hover:bg-surface"
                            : "text-muted-foreground hover:bg-surface"
                      )}
                    >
                      {/* Status icon */}
                      <span className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border",
                        lesson.current
                          ? "bg-clinical border-clinical text-white"
                          : lesson.completed
                            ? "bg-vital/20 border-vital/40 text-vital"
                            : "border-border"
                      )}>
                        {lesson.current ? "▶" : lesson.completed ? "✓" : ""}
                      </span>

                      <span className="text-xs leading-snug flex-1">{lesson.title}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0 tabular-nums">
                        {lesson.duration}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Test CTA */}
          <div className="p-4 border-t border-border">
            <div className="bg-vital/10 border border-vital/20 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-vital">Готовы к тесту?</span>
                <span className="text-xs text-muted-foreground">Завершите все уроки модуля 3, чтобы разблокировать итоговый тест</span>
              </div>
              <Progress value={40} className="h-1.5" />
              <span className="text-[11px] text-muted-foreground">2 из 5 уроков модуля пройдено</span>
              <Button
                size="sm"
                disabled
                className="bg-vital/30 text-vital border-0 h-8 text-xs cursor-not-allowed"
              >
                ✎ Пройти тест
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
