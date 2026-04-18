"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { courses } from "@/lib/courses-data";
import { courseDetail } from "@/lib/lesson-data";
import { cn } from "@/lib/utils";

const tagColorMap: Record<string, string> = {
  clinical: "bg-clinical/10 text-clinical border-0",
  vital:    "bg-vital/10 text-vital border-0",
  critical: "bg-critical/10 text-critical border-0",
  warning:  "bg-warning/10 text-warning border-0",
};

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === id);
  const [openModules, setOpenModules] = useState<string[]>(["m1", "m2", "m3"]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId) ? prev.filter((m) => m !== moduleId) : [...prev, moduleId]
    );
  };

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-muted-foreground">
        <span className="text-5xl">🔍</span>
        <p>Курс не найден</p>
        <Link href="/dashboard/courses">
          <Button variant="outline" size="sm">← Все курсы</Button>
        </Link>
      </div>
    );
  }

  const detail = id === "lap-01" ? courseDetail : null;
  const allLessons = detail?.modules.flatMap((m) => m.lessons) ?? [];
  const completedLessons = allLessons.filter((l) => l.completed).length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <header className="sticky top-0 z-30 h-14 flex items-center gap-2 px-8 border-b border-border bg-background/80 backdrop-blur-md text-sm">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Главная</Link>
        <span className="text-muted-foreground/40">›</span>
        <Link href="/dashboard/courses" className="text-muted-foreground hover:text-foreground transition-colors">Мои курсы</Link>
        <span className="text-muted-foreground/40">›</span>
        <span className="text-foreground font-medium truncate">{course.title}</span>
      </header>

      <div className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full flex flex-col gap-8">

        {/* Course hero */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Badge className={`text-xs ${tagColorMap[course.tagColor]}`}>{course.tag}</Badge>
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">{course.level}</Badge>
            {course.status === "active" && (
              <Badge className="text-xs bg-clinical/10 text-clinical border-0">В процессе</Badge>
            )}
            {course.status === "completed" && (
              <Badge className="text-xs bg-vital/10 text-vital border-0">✓ Завершён</Badge>
            )}
          </div>

          <h1 className="font-heading text-3xl leading-snug">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>👤</span>
            <span>{detail?.instructor ?? course.instructor}</span>
            {detail && (
              <span className="text-muted-foreground/50">· {detail.instructorTitle}</span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Модулей",      value: `${course.modules}`,       icon: "📚" },
            { label: "Длительность", value: `${course.minutes} мин`,   icon: "⏱"  },
            { label: "НМО баллов",   value: `✦ ${course.nmo}`,         icon: "🎓" },
            { label: "Уровень",      value: course.level,               icon: "📊" },
          ].map((s) => (
            <Card key={s.label} className="p-4 bg-card border-border flex items-center gap-3">
              <span className="text-xl">{s.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className="font-semibold text-sm text-foreground">{s.value}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress bar (if active) */}
        {course.status === "active" && (
          <Card className="p-5 bg-card border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Прогресс курса</span>
              <span className="text-clinical font-semibold">{course.progress}%</span>
            </div>
            <Progress value={course.progress ?? 0} className="h-2" />
            {detail && (
              <p className="text-xs text-muted-foreground">
                {completedLessons} из {allLessons.length} уроков пройдено
              </p>
            )}
          </Card>
        )}

        {/* Module list */}
        {detail ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-base">Содержание курса</h2>

            {detail.modules.map((mod, modIdx) => {
              const isOpen = openModules.includes(mod.id);
              const modCompleted = mod.lessons.filter((l) => l.completed).length;

              return (
                <Collapsible
                  key={mod.id}
                  open={isOpen}
                  onOpenChange={() => toggleModule(mod.id)}
                >
                  <Card className="bg-card border-border overflow-hidden">
                    <CollapsibleTrigger className="w-full flex items-center gap-4 px-5 py-4 hover:bg-surface/50 transition-colors text-left">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                        modCompleted === mod.lessons.length
                          ? "bg-vital/20 text-vital"
                          : modCompleted > 0
                            ? "bg-clinical/20 text-clinical"
                            : "bg-muted text-muted-foreground"
                      )}>
                        {modCompleted === mod.lessons.length ? "✓" : modIdx + 1}
                      </div>

                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className="font-medium text-sm">{mod.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {modCompleted}/{mod.lessons.length} уроков · {mod.lessons.reduce((acc, l) => {
                            const [m, s] = l.duration.split(":").map(Number);
                            return acc + m * 60 + s;
                          }, 0) / 60 | 0} мин
                        </span>
                      </div>

                      <span className={cn(
                        "text-muted-foreground transition-transform flex-shrink-0 text-sm",
                        isOpen && "rotate-180"
                      )}>
                        ▾
                      </span>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t border-border divide-y divide-border/50">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-surface/30 transition-colors"
                          >
                            <span className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] border flex-shrink-0",
                              lesson.current
                                ? "bg-clinical border-clinical text-white"
                                : lesson.completed
                                  ? "bg-vital/20 border-vital/40 text-vital"
                                  : "border-border"
                            )}>
                              {lesson.current ? "▶" : lesson.completed ? "✓" : ""}
                            </span>

                            <span className={cn(
                              "text-sm flex-1",
                              lesson.current ? "text-clinical font-medium" : lesson.completed ? "text-foreground/70" : "text-muted-foreground"
                            )}>
                              {lesson.title}
                            </span>

                            <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0">
                              {lesson.duration}
                            </span>

                            <Link href={`/dashboard/courses/${id}/lesson`} className="flex-shrink-0">
                              <Button
                                size="sm"
                                variant={lesson.current ? "default" : "ghost"}
                                className={cn(
                                  "h-7 text-xs",
                                  lesson.current
                                    ? "bg-clinical hover:bg-clinical/90 text-white"
                                    : lesson.completed
                                      ? "text-muted-foreground"
                                      : "text-muted-foreground"
                                )}
                              >
                                {lesson.current ? "Продолжить" : lesson.completed ? "Повторить" : "Начать"}
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        ) : (
          <Card className="p-10 bg-card border-border flex flex-col items-center gap-4 text-center text-muted-foreground">
            <span className="text-4xl">🚧</span>
            <p className="text-sm">Содержание курса появится после записи</p>
          </Card>
        )}

        {/* CTA */}
        <div className="flex items-center gap-4 pt-2 pb-8">
          <Link href={`/dashboard/courses/${id}/lesson`}>
            <Button className="bg-clinical hover:bg-clinical/90 text-white px-8">
              {course.status === "active" ? "Продолжить курс →" : "Начать курс →"}
            </Button>
          </Link>
          <Link href="/dashboard/courses">
            <Button variant="outline" className="border-border">
              ← Все курсы
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
