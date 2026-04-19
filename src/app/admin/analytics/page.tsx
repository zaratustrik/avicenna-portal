"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Данные для воронки
const funnelData = [
  { label: "Зарегистрировались", value: 2714, pct: 100, color: "bg-clinical" },
  { label: "Начали хотя бы 1 курс", value: 2201, pct: 81, color: "bg-clinical" },
  { label: "Завершили хотя бы 1 курс", value: 1487, pct: 55, color: "bg-vital" },
  { label: "Получили НМО-баллы", value: 983, pct: 36, color: "bg-vital" },
];

// Данные по курсам
const courseStats = [
  { title: "Лапароскопическая холецистэктомия", specialty: "Хирургия", students: 412, completion: 87, avgScore: 84, dropLesson: "Урок 5: Осложнения" },
  { title: "УЗИ в гинекологии", specialty: "Гинекология", students: 287, completion: 79, avgScore: 78, dropLesson: "Урок 8: Патология" },
  { title: "ЭКГ в практике терапевта", specialty: "Кардиология", students: 356, completion: 74, avgScore: 71, dropLesson: "Урок 6: Аритмии" },
  { title: "Регионарная анестезия", specialty: "Анестезиология", students: 198, completion: 68, avgScore: 76, dropLesson: "Урок 4: Блокады" },
  { title: "Онкомаркеры: интерпретация", specialty: "Онкология", students: 143, completion: 61, avgScore: 69, dropLesson: "Урок 3: Специфика" },
];

// Активность по часам (0-23)
const hourlyActivity = [
  2, 1, 1, 0, 0, 1, 3, 8, 15, 22, 31, 28,
  24, 19, 21, 25, 30, 35, 42, 48, 44, 38, 28, 14,
];

// Retention данные
const retentionData = [
  { label: "Д+1", value: 78 },
  { label: "Д+3", value: 61 },
  { label: "Д+7", value: 48 },
  { label: "Д+14", value: 39 },
  { label: "Д+30", value: 31 },
];

// Специальности распределение
const specialtyDist = [
  { label: "Хирургия", value: 34, color: "bg-clinical" },
  { label: "Гинекология", value: 22, color: "bg-vital" },
  { label: "Кардиология", value: 19, color: "bg-accent" },
  { label: "Анестезиология", value: 14, color: "bg-warning" },
  { label: "Онкология", value: 11, color: "bg-critical" },
];

const maxHourly = Math.max(...hourlyActivity);

const tabs = ["Обучение", "Контент", "Когорты"] as const;
type Tab = typeof tabs[number];

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Обучение");

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Аналитика</h1>
          <p className="text-sm text-muted-foreground mt-1">Данные обновляются в реальном времени</p>
        </div>
        <Badge variant="outline" className="border-vital/40 text-vital bg-vital/10">
          Live · апрель 2026
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* === Tab: Обучение === */}
      {activeTab === "Обучение" && (
        <div className="space-y-6">
          {/* Funnel */}
          <Card className="p-6 bg-card border-border">
            <h2 className="font-semibold text-foreground mb-6">Воронка обучения</h2>
            <div className="space-y-4">
              {funnelData.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-muted-foreground">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground">{step.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">{step.value.toLocaleString("ru")}</span>
                        <span className="text-xs text-muted-foreground w-8 text-right">{step.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${step.color} transition-all`}
                        style={{ width: `${step.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Hourly Heatmap + Retention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly */}
            <Card className="p-6 bg-card border-border">
              <h2 className="font-semibold text-foreground mb-2">Активность по часам суток</h2>
              <p className="text-xs text-muted-foreground mb-4">Пик: 20:00–22:00 (ночные смены)</p>
              <div className="flex items-end gap-1 h-28">
                {hourlyActivity.map((v, i) => {
                  const h = Math.round((v / maxHourly) * 100);
                  const isPeak = i >= 19 && i <= 22;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: `${Math.max(h, 3)}%`,
                          background: isPeak ? "var(--color-vital)" : `oklch(0.57 0.155 254 / ${0.2 + h / 100 * 0.6})`,
                        }}
                        title={`${i}:00 — ${v} сессий`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
              </div>
            </Card>

            {/* Retention */}
            <Card className="p-6 bg-card border-border">
              <h2 className="font-semibold text-foreground mb-2">Retention кривая</h2>
              <p className="text-xs text-muted-foreground mb-4">% врачей, вернувшихся после регистрации</p>
              <div className="space-y-3">
                {retentionData.map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-10">{r.label}</span>
                    <Progress value={r.value} className="flex-1 h-2" />
                    <span className="text-sm font-bold text-foreground w-10 text-right">{r.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-vital/5 rounded-lg border border-vital/20">
                <p className="text-xs text-muted-foreground">
                  <span className="text-vital font-medium">Д+30 retention 31%</span> — выше среднего по EdTech (22%)
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* === Tab: Контент === */}
      {activeTab === "Контент" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="font-semibold text-foreground mb-6">Эффективность курсов</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 text-xs font-medium text-muted-foreground">Курс</th>
                    <th className="text-center pb-3 text-xs font-medium text-muted-foreground">Студентов</th>
                    <th className="text-left pb-3 text-xs font-medium text-muted-foreground w-36">Завершаемость</th>
                    <th className="text-center pb-3 text-xs font-medium text-muted-foreground">Ср. балл теста</th>
                    <th className="text-left pb-3 text-xs font-medium text-muted-foreground">Точка отсева</th>
                  </tr>
                </thead>
                <tbody>
                  {courseStats.map((c) => (
                    <tr key={c.title} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3.5">
                        <div className="text-sm text-foreground">{c.title}</div>
                        <div className="text-[11px] text-muted-foreground">{c.specialty}</div>
                      </td>
                      <td className="py-3.5 text-center text-sm text-foreground">{c.students}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <Progress value={c.completion} className="h-1.5 flex-1" />
                          <span className="text-xs font-bold text-vital w-8">{c.completion}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`text-sm font-bold ${c.avgScore >= 75 ? "text-vital" : "text-warning"}`}>
                          {c.avgScore}%
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-warning">{c.dropLesson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* === Tab: Когорты === */}
      {activeTab === "Когорты" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Specialty Distribution */}
            <Card className="p-6 bg-card border-border">
              <h2 className="font-semibold text-foreground mb-6">Распределение по специальностям</h2>
              <div className="space-y-4">
                {specialtyDist.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${s.color}`} />
                    <span className="text-sm text-foreground flex-1">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                      </div>
                      <span className="text-xs font-bold text-foreground w-8 text-right">{s.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Geography */}
            <Card className="p-6 bg-card border-border">
              <h2 className="font-semibold text-foreground mb-6">Топ регионов</h2>
              <div className="space-y-3">
                {[
                  { region: "Москва и МО", count: 847, pct: 31 },
                  { region: "Санкт-Петербург", count: 412, pct: 15 },
                  { region: "Екатеринбург", count: 218, pct: 8 },
                  { region: "Новосибирск", count: 187, pct: 7 },
                  { region: "Краснодарский край", count: 164, pct: 6 },
                  { region: "Другие регионы", count: 886, pct: 33 },
                ].map((r) => (
                  <div key={r.region} className="flex items-center gap-3">
                    <span className="text-sm text-foreground flex-1">{r.region}</span>
                    <span className="text-xs text-muted-foreground">{r.count.toLocaleString("ru")}</span>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-clinical" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-6 text-right">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Comparison table */}
          <Card className="p-6 bg-card border-border">
            <h2 className="font-semibold text-foreground mb-6">Сравнение когорт по специальностям</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Специальность", "Врачей", "Avg курсов", "Avg НМО ЗЕТ", "Retention Д+30", "Ср. балл теста"].map(h => (
                      <th key={h} className="text-left pb-3 text-xs font-medium text-muted-foreground pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { spec: "Хирургия", n: 923, avgCourses: 3.2, avgNmo: 58, ret: 34, score: 82 },
                    { spec: "Гинекология", n: 597, avgCourses: 3.8, avgNmo: 64, ret: 38, score: 79 },
                    { spec: "Кардиология", n: 516, avgCourses: 2.9, avgNmo: 49, ret: 29, score: 71 },
                    { spec: "Анестезиология", n: 380, avgCourses: 2.4, avgNmo: 41, ret: 27, score: 76 },
                    { spec: "Онкология", n: 298, avgCourses: 2.1, avgNmo: 36, ret: 24, score: 68 },
                  ].map((r) => (
                    <tr key={r.spec} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 font-medium text-foreground">{r.spec}</td>
                      <td className="py-3 text-muted-foreground pr-4">{r.n.toLocaleString("ru")}</td>
                      <td className="py-3 text-muted-foreground pr-4">{r.avgCourses}</td>
                      <td className="py-3 text-muted-foreground pr-4">{r.avgNmo} ЗЕТ</td>
                      <td className="py-3 pr-4">
                        <span className={r.ret >= 30 ? "text-vital" : "text-warning"}>{r.ret}%</span>
                      </td>
                      <td className="py-3">
                        <span className={r.score >= 75 ? "text-vital" : "text-warning"}>{r.score}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
