import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { icon: "◯", label: "Врачей на платформе", value: "2 714", delta: "+47 за неделю", color: "text-clinical", bg: "bg-clinical/10" },
  { icon: "▦", label: "Активных курсов", value: "32", delta: "5 в черновиках", color: "text-vital", bg: "bg-vital/10" },
  { icon: "✦", label: "НМО ЗЕТ выдано", value: "1 840", delta: "за этот месяц", color: "text-accent", bg: "bg-accent/10" },
  { icon: "⚡", label: "MAU (активных/30д)", value: "1 203", delta: "+12% к прошлому месяцу", color: "text-warning", bg: "bg-warning/10" },
];

// Данные активности за 30 дней (сессии в день)
const activityData = [
  42, 38, 55, 61, 48, 70, 82, 79, 65, 88,
  91, 75, 68, 84, 95, 102, 88, 76, 110, 98,
  87, 115, 108, 92, 126, 118, 103, 134, 129, 141,
];

const topCourses = [
  { title: "Лапароскопическая холецистэктомия", specialty: "Хирургия", completion: 87, students: 412 },
  { title: "УЗИ в гинекологии", specialty: "Гинекология", completion: 79, students: 287 },
  { title: "ЭКГ в практике терапевта", specialty: "Кардиология", completion: 74, students: 356 },
  { title: "Регионарная анестезия", specialty: "Анестезиология", completion: 68, students: 198 },
  { title: "Онкомаркеры: интерпретация", specialty: "Онкология", completion: 61, students: 143 },
];

const recentUsers = [
  { name: "Петров А.С.", specialty: "Хирург", region: "Москва", date: "19 апр 2026", status: "active" },
  { name: "Смирнова О.В.", specialty: "Гинеколог", region: "СПб", date: "19 апр 2026", status: "active" },
  { name: "Козлов М.Р.", specialty: "Кардиолог", region: "Екатеринбург", date: "18 апр 2026", status: "active" },
  { name: "Фёдорова Н.К.", specialty: "Анестезиолог", region: "Казань", date: "18 апр 2026", status: "pending" },
  { name: "Волков И.Д.", specialty: "Онколог", region: "Новосибирск", date: "17 апр 2026", status: "active" },
];

const alerts = [
  { type: "moderation", text: "2 курса ожидают модерации", link: "/admin/courses", color: "text-warning", bg: "bg-warning/10" },
  { type: "cert", text: "8 заявок на сертификаты НМО", link: "/admin/nmo", color: "text-vital", bg: "bg-vital/10" },
  { type: "users", text: "3 новых врача на верификации", link: "/admin/users", color: "text-clinical", bg: "bg-clinical/10" },
];

const maxActivity = Math.max(...activityData);

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Дашборд</h1>
          <p className="text-sm text-muted-foreground mt-1">19 апреля 2026 · Всё в норме</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="bg-clinical hover:bg-clinical/90 text-white gap-2">
            + Новый курс
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-5 bg-card border-border">
            <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center mb-3`}>
              <span className={`text-lg ${kpi.color}`}>{kpi.icon}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
            <div className={`text-xs mt-2 ${kpi.color}`}>{kpi.delta}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground">Активность платформы</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Сессии в день, последние 30 дней</p>
            </div>
            <Badge variant="outline" className="text-vital border-vital/40 bg-vital/10 text-xs">
              ↑ 141 сегодня
            </Badge>
          </div>
          {/* SVG Bar Chart */}
          <div className="flex items-end gap-[3px] h-40">
            {activityData.map((v, i) => {
              const h = Math.round((v / maxActivity) * 100);
              const isToday = i === activityData.length - 1;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: isToday
                      ? "var(--color-vital)"
                      : `oklch(0.57 0.155 254 / ${0.25 + (h / 100) * 0.55})`,
                  }}
                  title={`День ${i + 1}: ${v} сессий`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>1 апр</span><span>10 апр</span><span>19 апр</span>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-6 bg-card border-border flex flex-col gap-4">
          <h2 className="font-semibold text-foreground">Требуют внимания</h2>
          <div className="flex flex-col gap-3 flex-1">
            {alerts.map((a) => (
              <Link key={a.type} href={a.link}>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${a.bg} hover:opacity-80 transition-opacity cursor-pointer`}>
                  <span className={`text-xs font-medium ${a.color} flex-1`}>{a.text}</span>
                  <span className={`text-xs ${a.color}`}>→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t border-border pt-4">
            <div className="text-xs text-muted-foreground mb-1">Статус системы</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vital animate-pulse" />
              <span className="text-xs text-foreground">Все сервисы работают</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Courses + Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">Топ курсов по завершаемости</h2>
            <Link href="/admin/courses">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">
                Все курсы →
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {topCourses.map((c, i) => (
              <div key={c.title} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-sm text-foreground truncate max-w-[200px]">{c.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{c.students} врачей</span>
                    <span className="text-xs font-bold text-vital">{c.completion}%</span>
                  </div>
                </div>
                <Progress value={c.completion} className="h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Registrations */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">Последние регистрации</h2>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">
                Все врачи →
              </Button>
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {recentUsers.map((u) => (
              <div key={u.name} className="flex items-center gap-3 py-2.5">
                <div className="w-7 h-7 rounded-full bg-clinical/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-clinical">
                    {u.name.split(" ").map(p => p[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{u.name}</div>
                  <div className="text-[11px] text-muted-foreground">{u.specialty} · {u.region}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">{u.date}</span>
                  <Badge
                    className={`text-[9px] px-1.5 py-0 h-4 border-0 ${
                      u.status === "active" ? "bg-vital/20 text-vital" : "bg-warning/20 text-warning"
                    }`}
                  >
                    {u.status === "active" ? "Активен" : "Верификация"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
