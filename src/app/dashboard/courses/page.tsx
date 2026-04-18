import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const active    = courses.filter((c) => c.status === "active");
const completed = courses.filter((c) => c.status === "completed");
const available = courses.filter((c) => c.status === "locked").slice(0, 8);

function CourseCard({ course, showProgress = false }: { course: typeof courses[0]; showProgress?: boolean }) {
  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <Card className="p-6 bg-card border-border hover:border-clinical/40 transition-all cursor-pointer group h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <Badge className={`text-xs flex-shrink-0 ${tagColorMap[course.tagColor]}`}>
            {course.tag}
          </Badge>
          <span className={`text-xs font-medium flex-shrink-0 ${levelColor[course.level]}`}>
            {course.level}
          </span>
        </div>

        <h3 className="font-semibold text-sm leading-snug flex-1 group-hover:text-clinical transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {showProgress && course.progress !== undefined && (
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{course.progress}% пройдено</span>
              <span className="text-vital font-medium">✦ {course.nmo} НМО</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50 mt-auto">
          <div className="flex gap-3">
            <span>📚 {course.modules} мод.</span>
            <span>⏱ {course.minutes} мин</span>
            {!showProgress && (
              <span className="text-vital font-medium">✦ {course.nmo} НМО</span>
            )}
          </div>
          {course.status === "completed" ? (
            <span className="text-vital font-semibold">✓ Завершён</span>
          ) : course.status === "active" ? (
            <span className="text-clinical font-semibold">Продолжить →</span>
          ) : (
            <span className="text-muted-foreground group-hover:text-clinical transition-colors font-medium">Начать →</span>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 border-b border-border bg-background/80 backdrop-blur-md">
        <div>
          <h1 className="text-base font-semibold">Мои курсы</h1>
          <p className="text-xs text-muted-foreground">
            {active.length} в процессе · {completed.length} завершено
          </p>
        </div>
        <Button size="sm" className="bg-clinical hover:bg-clinical/90 text-white h-8 text-xs">
          + Найти курс
        </Button>
      </header>

      <div className="flex-1 px-8 py-8">
        <Tabs defaultValue="active" className="flex flex-col gap-6">
          <TabsList className="bg-surface border border-border h-10 p-1 w-fit">
            <TabsTrigger value="active" className="text-xs px-4 gap-2 data-[state=active]:bg-clinical/15 data-[state=active]:text-clinical">
              В процессе
              <Badge className="bg-clinical/20 text-clinical border-0 text-[10px] px-1.5 py-0 h-4">
                {active.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs px-4 gap-2 data-[state=active]:bg-vital/15 data-[state=active]:text-vital">
              Завершённые
              <Badge className="bg-vital/20 text-vital border-0 text-[10px] px-1.5 py-0 h-4">
                {completed.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="available" className="text-xs px-4 gap-2 data-[state=active]:bg-clinical/15 data-[state=active]:text-clinical">
              Доступные
              <Badge className="bg-muted text-muted-foreground border-0 text-[10px] px-1.5 py-0 h-4">
                {available.length}+
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {active.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                <span className="text-4xl">📚</span>
                <p className="text-sm">Нет активных курсов</p>
                <Link href="/dashboard/catalog">
                  <Button size="sm" className="bg-clinical/10 text-clinical border-0 hover:bg-clinical/20">
                    Найти курс →
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {active.map((c) => <CourseCard key={c.id} course={c} showProgress />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                <span className="text-4xl">🎓</span>
                <p className="text-sm">Завершённых курсов пока нет</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {completed.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available">
            <p className="text-xs text-muted-foreground mb-5">
              Курсы, доступные для записи по вашей специальности
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {available.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
