"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const certificates = [
  { id: "NMO-2026-0412", name: "Иванов Дмитрий Александрович", course: "Лапароскопическая холецистэктомия", zet: 6, date: "15 апр 2026", status: "issued", sync: "synced" },
  { id: "NMO-2026-0411", name: "Смирнова Ольга Васильевна", course: "УЗИ в гинекологии: базовый курс", zet: 8, date: "14 апр 2026", status: "issued", sync: "synced" },
  { id: "NMO-2026-0410", name: "Новикова Анна Петровна", course: "Лапароскопия в гинекологии", zet: 6, date: "13 апр 2026", status: "issued", sync: "pending" },
  { id: "NMO-2026-0409", name: "Волков Игорь Дмитриевич", course: "ЭКГ в практике терапевта", zet: 6, date: "12 апр 2026", status: "issued", sync: "synced" },
  { id: "NMO-2026-0408", name: "Соколова Мария Юрьевна", course: "Регионарная анестезия: основы", zet: 6, date: "11 апр 2026", status: "issued", sync: "synced" },
  { id: "NMO-2026-0407", name: "Морозов Сергей Викторович", course: "Лапароскопическая аппендэктомия", zet: 4, date: "10 апр 2026", status: "issued", sync: "error" },
  { id: "NMO-2026-0406", name: "Козлов Михаил Романович", course: "ЭКГ в практике терапевта", zet: 6, date: "9 апр 2026", status: "pending", sync: "—" },
  { id: "NMO-2026-0405", name: "Петров Алексей Сергеевич", course: "Грыжесечение лапароскопическое", zet: 4, date: "8 апр 2026", status: "pending", sync: "—" },
];

const accreditedCourses = [
  { title: "Лапароскопическая холецистэктомия", zet: 6, accNum: "НМО-2024-ЛАП-001", expires: "31 дек 2026", status: "valid" },
  { title: "УЗИ в гинекологии: базовый курс", zet: 8, accNum: "НМО-2024-ГИН-003", expires: "30 июн 2026", status: "valid" },
  { title: "ЭКГ в практике терапевта", zet: 6, accNum: "НМО-2025-КАР-002", expires: "31 мар 2027", status: "valid" },
  { title: "Регионарная анестезия: основы", zet: 6, accNum: "НМО-2025-АНЕ-001", expires: "31 мая 2026", status: "expiring" },
  { title: "Онкомаркеры: интерпретация", zet: 4, accNum: "НМО-2023-ОНК-004", expires: "15 июн 2026", status: "expiring" },
  { title: "Лапароскопическая аппендэктомия", zet: 4, accNum: "НМО-2024-ЛАП-002", expires: "28 фев 2027", status: "valid" },
];

const syncColor: Record<string, string> = {
  synced: "bg-vital/20 text-vital",
  pending: "bg-warning/20 text-warning",
  error: "bg-critical/20 text-critical",
  "—": "bg-muted/30 text-muted-foreground",
};
const syncLabel: Record<string, string> = {
  synced: "Синхр.", pending: "Очередь", error: "Ошибка", "—": "—",
};
const certStatusColor: Record<string, string> = {
  issued: "bg-vital/20 text-vital",
  pending: "bg-warning/20 text-warning",
};

export default function AdminNmoPage() {
  const [search, setSearch] = useState("");

  const filtered = certificates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.course.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const issued = certificates.filter(c => c.status === "issued").length;
  const pending = certificates.filter(c => c.status === "pending").length;
  const errors = certificates.filter(c => c.sync === "error").length;
  const totalZet = certificates.filter(c => c.status === "issued").reduce((a, c) => a + c.zet, 0);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">НМО-центр</h1>
          <p className="text-sm text-muted-foreground mt-1">Реестр свидетельств и аккредитация курсов</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-vital/10 border border-vital/20">
            <div className="w-1.5 h-1.5 rounded-full bg-vital animate-pulse" />
            <span className="text-xs text-vital">edu.rosminzdrav.ru: онлайн</span>
          </div>
          <Button variant="outline" size="sm" className="text-xs border-border">
            Синхронизировать
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Выдано свидетельств", value: issued, color: "text-vital", bg: "bg-vital/10" },
          { label: "На рассмотрении", value: pending, color: "text-warning", bg: "bg-warning/10" },
          { label: "Ошибки синхронизации", value: errors, color: "text-critical", bg: "bg-critical/10" },
          { label: "ЗЕТ выдано (апр)", value: `${totalZet} ЗЕТ`, color: "text-clinical", bg: "bg-clinical/10" },
        ].map(k => (
          <Card key={k.label} className="p-4 bg-card border-border">
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
          </Card>
        ))}
      </div>

      {/* Certificate Registry */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Реестр свидетельств НМО</h2>
          <Button variant="outline" size="sm" className="text-xs border-border">
            Экспорт XLS
          </Button>
        </div>
        <input
          type="text"
          placeholder="Поиск по имени, курсу или номеру..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-clinical mb-4"
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Номер</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Врач</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Курс</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">ЗЕТ</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Дата</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Статус</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Реестр РФ</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/5"}`}>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{c.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">{c.course}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge className="bg-clinical/15 text-clinical border-0 text-xs">{c.zet} ЗЕТ</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.date}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge className={`border-0 text-xs ${certStatusColor[c.status]}`}>
                      {c.status === "issued" ? "Выдано" : "Ожидание"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge className={`border-0 text-xs ${syncColor[c.sync]}`}>
                      {syncLabel[c.sync]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground px-2">
                      PDF →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Accredited Courses */}
      <Card className="p-6 bg-card border-border">
        <h2 className="font-semibold text-foreground mb-5">Аккредитованные курсы</h2>
        <div className="flex flex-col divide-y divide-border">
          {accreditedCourses.map((c) => (
            <div key={c.accNum} className="flex items-center gap-4 py-3.5">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">{c.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">{c.accNum}</div>
              </div>
              <Badge className="bg-clinical/15 text-clinical border-0 text-xs flex-shrink-0">{c.zet} ЗЕТ</Badge>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-xs text-muted-foreground">до {c.expires}</span>
                <Badge className={`border-0 text-xs flex-shrink-0 ${
                  c.status === "valid" ? "bg-vital/20 text-vital" : "bg-warning/20 text-warning"
                }`}>
                  {c.status === "valid" ? "Актуальна" : "Истекает"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground px-2 flex-shrink-0">
                Продлить
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
