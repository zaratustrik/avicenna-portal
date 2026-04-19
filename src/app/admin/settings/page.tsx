import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Платформа",
    items: [
      { label: "Название платформы", value: "Авиценна", type: "text" },
      { label: "URL платформы", value: "https://avicenna-portal.vercel.app", type: "text" },
      { label: "Email поддержки", value: "support@avicenna.ru", type: "text" },
      { label: "Язык интерфейса", value: "Русский", type: "select" },
    ],
  },
  {
    title: "НМО-интеграция",
    items: [
      { label: "Endpoint edu.rosminzdrav.ru", value: "https://edu.rosminzdrav.ru/api/v2", type: "text" },
      { label: "API-ключ", value: "••••••••••••••••", type: "secret" },
      { label: "Автосинхронизация", value: "Каждые 6 часов", type: "select" },
    ],
  },
  {
    title: "Видео-хостинг",
    items: [
      { label: "Провайдер", value: "Mux (не подключён)", type: "text" },
      { label: "MUX_TOKEN_ID", value: "—", type: "secret" },
      { label: "MUX_TOKEN_SECRET", value: "—", type: "secret" },
    ],
  },
  {
    title: "Аутентификация",
    items: [
      { label: "Провайдер", value: "Clerk (не подключён)", type: "text" },
      { label: "CLERK_PUBLISHABLE_KEY", value: "—", type: "secret" },
    ],
  },
];

const roles = [
  { name: "Администратор", count: 1, permissions: "Полный доступ ко всем разделам", color: "text-warning" },
  { name: "Редактор контента", count: 3, permissions: "Курсы, уроки, материалы — без аналитики пользователей", color: "text-clinical" },
  { name: "Врач (студент)", count: 2714, permissions: "Только свой дашборд и курсы", color: "text-vital" },
];

export default function AdminSettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
        <p className="text-sm text-muted-foreground mt-1">Конфигурация платформы и интеграций</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title} className="p-6 bg-card border-border">
            <h2 className="font-semibold text-foreground mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div key={item.label}>
                  {i > 0 && <Separator className="opacity-30 mb-4" />}
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-sm ${item.type === "secret" ? "text-muted-foreground font-mono" : "text-foreground"}`}>
                        {item.value}
                      </span>
                      <Button variant="outline" size="sm" className="h-7 text-xs border-border">
                        {item.type === "secret" ? "Изменить" : "Редакт."}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Roles */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-foreground">Роли и доступ</h2>
          <Button variant="outline" size="sm" className="text-xs border-border">+ Добавить роль</Button>
        </div>
        <div className="flex flex-col divide-y divide-border">
          {roles.map((role) => (
            <div key={role.name} className="flex items-center gap-4 py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${role.color}`}>{role.name}</span>
                  <Badge className="bg-muted/50 text-muted-foreground border-0 text-[10px] px-1.5 h-4">
                    {role.count.toLocaleString("ru")}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{role.permissions}</div>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground px-2">
                Настроить →
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 bg-card border-critical/20 border">
        <h2 className="font-semibold text-critical mb-4">Опасная зона</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-foreground">Сбросить все данные платформы</div>
            <div className="text-xs text-muted-foreground mt-0.5">Удалит всех пользователей, курсы и сертификаты. Необратимо.</div>
          </div>
          <Button variant="outline" size="sm" className="text-xs border-critical/40 text-critical hover:bg-critical/10">
            Удалить всё
          </Button>
        </div>
      </Card>
    </div>
  );
}
