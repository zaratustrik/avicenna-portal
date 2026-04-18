import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { courses, specialties } from "@/lib/courses-data";

const activeCourses = courses.filter((c) => c.status === "active");
const completedCourses = courses.filter((c) => c.status === "completed");
const recommendedCourses = courses.filter((c) => c.status === "locked").slice(0, 6);

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

const stats = [
  { label: "НМО баллов",      value: "72",  sub: "из 144 за 5 лет",    icon: "✦", color: "text-vital"    },
  { label: "Курсов пройдено", value: "1",   sub: "+3 в процессе",       icon: "▦", color: "text-clinical" },
  { label: "Часов обучения",  value: "14",  sub: "этот квартал",        icon: "⏱", color: "text-accent"   },
  { label: "Сертификатов",    value: "1",   sub: "с НМО-аккредитацией", icon: "🎓", color: "text-warning"  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 border-b border-border bg-background/80 backdrop-blur-md">
        <div>
          <h1 className="text-base font-semibold text-foreground">Добро пожаловать, д-р Иванов</h1>
          <p className="text-xs text-muted-foreground">Суббота, 19 апреля 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-vital/40 text-vital bg-vital/10 text-xs">
            ✦ 72 НМО балла
          </Badge>
          <Button size="sm" className="bg-clinical hover:bg-clinical/90 text-white h-8 text-xs">
            + Новый курс
          </Button>
        </div>
      </header>

      <div className="flex-1 px-8 py-8 flex flex-col gap-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="p-5 bg-card border-border flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className={`text-sm ${s.color}`}>{s.icon}</span>
              </div>
              <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.sub}</span>
            </Card>
          ))}
        </div>

        {/* НМО Progress */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-sm">Прогресс НМО за цикл 2023–2028</h3>
              <p className="text-xs text-muted-foreground mt-0.5">72 из 144 ЗЕТ — осталось 2.5 года</p>
            </div>
            <Badge variant="outline" className="border-vital/40 text-vital bg-vital/10 text-xs">50%</Badge>
          </div>
          <Progress value={50} className="h-2" />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Повышение квалификации: 48 ЗЕТ</span>
            <span>Вебинары и конференции: 24 ЗЕТ</span>
            <span>Осталось: 72 ЗЕТ</span>
          </div>
        </Card>

        {/* Continue learning */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base">Продолжить обучение</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">
              Все курсы →
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCourses.map((course) => (
              <Card key={course.id} className="p-5 bg-card border-border hover:border-clinical/40 transition-colors cursor-pointer group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <Badge className={`w-fit text-xs ${tagColorMap[course.tagColor]}`}>
                        {course.tag}
                      </Badge>
                      <h3 className="font-medium text-sm leading-snug group-hover:text-clinical transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <span className={`text-xs font-medium flex-shrink-0 ${levelColor[course.level]}`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.progress}% выполнено</span>
                      <span>{course.modules} модулей · {course.minutes} мин</span>
                    </div>
                    <Progress value={course.progress ?? 0} className="h-1.5" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{course.instructor}</span>
                    <Link href={`/dashboard/courses/${course.id}/lesson`}>
                      <Button size="sm" className="h-7 text-xs bg-clinical/10 hover:bg-clinical/20 text-clinical border-0">
                        Продолжить →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="opacity-30" />

        {/* Specialties filter */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base">Рекомендовано для вас</h2>
            <span className="text-xs text-muted-foreground">По специальности: Хирургия</span>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {specialties.slice(0, 6).map((s, i) => (
              <button
                key={s.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  i === 0
                    ? "border-clinical bg-clinical/10 text-clinical"
                    : "border-border text-muted-foreground hover:border-clinical/40 hover:text-foreground"
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
                <span className="opacity-60">({s.count})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="p-5 bg-card border-border hover:border-clinical/40 transition-all cursor-pointer group flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${tagColorMap[course.tagColor]}`}>
                    {course.tag}
                  </Badge>
                  <span className={`text-[11px] font-medium ${levelColor[course.level]}`}>
                    {course.level}
                  </span>
                </div>

                <h3 className="font-medium text-sm leading-snug group-hover:text-clinical transition-colors flex-1">
                  {course.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                  <div className="flex gap-3">
                    <span>📚 {course.modules} мод.</span>
                    <span>⏱ {course.minutes} мин</span>
                    <span className="text-vital font-medium">✦ {course.nmo} НМО</span>
                  </div>
                  <span className="text-clinical font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Начать →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Completed */}
        {completedCourses.length > 0 && (
          <>
            <Separator className="opacity-30" />
            <section>
              <h2 className="font-semibold text-base mb-4">Завершённые курсы</h2>
              <div className="flex flex-col gap-2">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="px-5 py-4 bg-card border-border flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-vital/15 flex items-center justify-center text-vital text-sm flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-sm font-medium truncate">{course.title}</span>
                      <span className="text-xs text-muted-foreground">{course.instructor}</span>
                    </div>
                    <Badge className="text-xs bg-vital/10 text-vital border-0 flex-shrink-0">
                      +{course.nmo} НМО
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground flex-shrink-0">
                      Сертификат
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
