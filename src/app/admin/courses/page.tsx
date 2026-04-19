"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const allCourses = [
  { id: "lap-01", title: "Лапароскопическая холецистэктомия", specialty: "Хирургия", modules: 4, lessons: 13, students: 412, completion: 87, nmo: 6, status: "active", updated: "15 апр 2026" },
  { id: "lap-02", title: "Лапароскопическая аппендэктомия", specialty: "Хирургия", modules: 3, lessons: 10, students: 298, completion: 72, nmo: 4, status: "active", updated: "10 апр 2026" },
  { id: "lap-03", title: "Грыжесечение лапароскопическое", specialty: "Хирургия", modules: 3, lessons: 9, students: 187, completion: 65, nmo: 4, status: "active", updated: "8 апр 2026" },
  { id: "gyn-01", title: "УЗИ в гинекологии: базовый курс", specialty: "Гинекология", modules: 5, lessons: 18, students: 287, completion: 79, nmo: 8, status: "active", updated: "12 апр 2026" },
  { id: "gyn-02", title: "Лапароскопия в гинекологии", specialty: "Гинекология", modules: 4, lessons: 14, students: 201, completion: 68, nmo: 6, status: "active", updated: "5 апр 2026" },
  { id: "card-01", title: "ЭКГ в практике терапевта", specialty: "Кардиология", modules: 4, lessons: 16, students: 356, completion: 74, nmo: 6, status: "active", updated: "14 апр 2026" },
  { id: "card-02", title: "Острый коронарный синдром", specialty: "Кардиология", modules: 3, lessons: 11, students: 244, completion: 61, nmo: 4, status: "draft", updated: "18 апр 2026" },
  { id: "anest-01", title: "Регионарная анестезия: основы", specialty: "Анестезиология", modules: 4, lessons: 15, students: 198, completion: 68, nmo: 6, status: "active", updated: "3 апр 2026" },
  { id: "onco-01", title: "Онкомаркеры: интерпретация", specialty: "Онкология", modules: 3, lessons: 10, students: 143, completion: 61, nmo: 4, status: "active", updated: "1 апр 2026" },
  { id: "onco-02", title: "Онкология лёгкого: диагностика", specialty: "Онкология", modules: 5, lessons: 17, students: 0, completion: 0, nmo: 8, status: "draft", updated: "19 апр 2026" },
];

const specialties = ["Все", "Хирургия", "Гинекология", "Кардиология", "Анестезиология", "Онкология"];
const statuses = ["Все статусы", "active", "draft", "archived"];
const statusLabel: Record<string, string> = { active: "Активный", draft: "Черновик", archived: "Архив" };
const statusColor: Record<string, string> = {
  active: "bg-vital/20 text-vital",
  draft: "bg-warning/20 text-warning",
  archived: "bg-muted/50 text-muted-foreground",
};

export default function AdminCoursesPage() {
  const [specialty, setSpecialty] = useState("Все");
  const [status, setStatus] = useState("Все статусы");
  const [search, setSearch] = useState("");

  const filtered = allCourses.filter((c) => {
    const matchSpec = specialty === "Все" || c.specialty === specialty;
    const matchStatus = status === "Все статусы" || c.status === status;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchStatus && matchSearch;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Управление курсами</h1>
          <p className="text-sm text-muted-foreground mt-1">{allCourses.length} курсов · {allCourses.filter(c => c.status === "active").length} активных</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="bg-clinical hover:bg-clinical/90 text-white">+ Новый курс</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Поиск по названию курса..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-clinical"
          />
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  specialty === s
                    ? "bg-clinical text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
            <div className="ml-auto">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs bg-muted border border-border text-muted-foreground focus:outline-none focus:ring-1 focus:ring-clinical"
              >
                {statuses.map((s) => <option key={s}>{s === "Все статусы" ? s : statusLabel[s] || s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Курс</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Специальность</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Уроков</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Врачей</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-36">Завершаемость</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">НМО</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Статус</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/5"}`}>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-foreground">{c.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{c.modules} модуля · обновлён {c.updated}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-muted-foreground">{c.specialty}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm text-foreground">{c.lessons}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm text-foreground">{c.students}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Progress value={c.completion} className="h-1.5 flex-1" />
                      <span className="text-xs text-vital font-medium w-8 text-right">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Badge className="bg-clinical/15 text-clinical border-0 text-xs">{c.nmo} ЗЕТ</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Badge className={`border-0 text-xs ${statusColor[c.status]}`}>
                      {statusLabel[c.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/courses/${c.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground px-2">
                          Открыть
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-warning px-2">
                        Редакт.
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">Курсы не найдены</div>
          )}
        </div>
      </Card>
    </div>
  );
}
