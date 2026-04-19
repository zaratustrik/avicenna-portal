"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { id: 1, name: "Иванов Дмитрий Александрович", specialty: "Хирург", region: "Москва", courses: 4, nmo: 72, nmoTotal: 144, lastSeen: "сегодня", status: "active", registered: "14 янв 2026" },
  { id: 2, name: "Петров Алексей Сергеевич", specialty: "Хирург", region: "Москва", courses: 3, nmo: 48, nmoTotal: 144, lastSeen: "вчера", status: "active", registered: "22 янв 2026" },
  { id: 3, name: "Смирнова Ольга Васильевна", specialty: "Гинеколог", region: "СПб", courses: 5, nmo: 96, nmoTotal: 144, lastSeen: "2 дня назад", status: "active", registered: "5 фев 2026" },
  { id: 4, name: "Козлов Михаил Романович", specialty: "Кардиолог", region: "Екатеринбург", courses: 2, nmo: 24, nmoTotal: 144, lastSeen: "неделю назад", status: "active", registered: "18 фев 2026" },
  { id: 5, name: "Фёдорова Наталья Кирилловна", specialty: "Анестезиолог", region: "Казань", courses: 1, nmo: 6, nmoTotal: 144, lastSeen: "2 недели назад", status: "pending", registered: "17 апр 2026" },
  { id: 6, name: "Волков Игорь Дмитриевич", specialty: "Онколог", region: "Новосибирск", courses: 3, nmo: 54, nmoTotal: 144, lastSeen: "3 дня назад", status: "active", registered: "3 мар 2026" },
  { id: 7, name: "Новикова Анна Петровна", specialty: "Гинеколог", region: "Москва", courses: 6, nmo: 120, nmoTotal: 144, lastSeen: "сегодня", status: "active", registered: "10 янв 2026" },
  { id: 8, name: "Морозов Сергей Викторович", specialty: "Хирург", region: "Краснодар", courses: 2, nmo: 30, nmoTotal: 144, lastSeen: "5 дней назад", status: "active", registered: "25 мар 2026" },
  { id: 9, name: "Лебедев Павел Андреевич", specialty: "Кардиолог", region: "Ростов-на-Дону", courses: 0, nmo: 0, nmoTotal: 144, lastSeen: "не заходил", status: "inactive", registered: "19 апр 2026" },
  { id: 10, name: "Соколова Мария Юрьевна", specialty: "Анестезиолог", region: "СПб", courses: 4, nmo: 66, nmoTotal: 144, lastSeen: "вчера", status: "active", registered: "12 фев 2026" },
];

const specialties = ["Все", "Хирург", "Гинеколог", "Кардиолог", "Анестезиолог", "Онколог"];
const statusLabel: Record<string, string> = { active: "Активен", pending: "Верификация", inactive: "Не активен" };
const statusColor: Record<string, string> = {
  active: "bg-vital/20 text-vital",
  pending: "bg-warning/20 text-warning",
  inactive: "bg-muted/50 text-muted-foreground",
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(p => p[0]).join("");
}

export default function AdminUsersPage() {
  const [specialty, setSpecialty] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    const matchSpec = specialty === "Все" || u.specialty === specialty;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.region.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">База врачей</h1>
          <p className="text-sm text-muted-foreground mt-1">{users.length} зарегистрировано · {users.filter(u => u.status === "active").length} активных</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs border-border">
            Экспорт CSV
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-border">
            Назначить курс
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Активных", value: users.filter(u => u.status === "active").length, color: "text-vital" },
          { label: "На верификации", value: users.filter(u => u.status === "pending").length, color: "text-warning" },
          { label: "Не активных", value: users.filter(u => u.status === "inactive").length, color: "text-muted-foreground" },
          { label: "Ср. прогресс НМО", value: Math.round(users.reduce((a, u) => a + u.nmo, 0) / users.length) + " ЗЕТ", color: "text-clinical" },
        ].map(s => (
          <Card key={s.label} className="p-4 bg-card border-border">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Поиск по имени или региону..."
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
                  specialty === s ? "bg-clinical text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Врач</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Специальность</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Регион</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Курсов</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-40">НМО прогресс</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Последний вход</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Статус</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/5"}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-clinical/10 text-clinical text-[10px] font-bold">
                          {initials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">{u.name}</div>
                        <div className="text-[11px] text-muted-foreground">с {u.registered}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.specialty}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.region}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{u.courses}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={(u.nmo / u.nmoTotal) * 100} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-16 text-right">{u.nmo}/{u.nmoTotal}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.lastSeen}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge className={`border-0 text-xs ${statusColor[u.status]}`}>
                      {statusLabel[u.status]}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground px-2">
                      Профиль →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">Врачи не найдены</div>
          )}
        </div>
      </Card>
    </div>
  );
}
