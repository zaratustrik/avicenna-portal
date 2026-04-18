import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { CatalogSection } from "@/components/landing/catalog-section";
import { HeroSection } from "@/components/landing/hero-section";

const features = [
  {
    icon: "⚡",
    title: "Microlearning",
    desc: "Модули по 5–15 минут. Обучение между операциями, в ординаторской, в пути.",
    colorClass: "text-vital",
  },
  {
    icon: "🩻",
    title: "Case-based Learning",
    desc: "Разбор реальных клинических случаев — от анамнеза до послеоперационного периода.",
    colorClass: "text-clinical",
  },
  {
    icon: "🎓",
    title: "НМО-аккредитация",
    desc: "Баллы засчитываются в системе непрерывного медицинского образования РФ.",
    colorClass: "text-accent",
  },
  {
    icon: "🌙",
    title: "Dark Mode по умолчанию",
    desc: "Интерфейс создан для ночных дежурств. Глаза не устают, концентрация выше.",
    colorClass: "text-muted-foreground",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" href="/" />
            <Badge variant="secondary" className="text-xs hidden sm:flex">Beta</Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#catalog" className="hover:text-foreground transition-colors">Каталог</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Войти</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-clinical hover:bg-clinical/90 text-white">
                Начать обучение
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero (animated) ── */}
      <HeroSection />

      <Separator className="opacity-30" />

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-vital/40 text-vital bg-vital/10">
              Возможности платформы
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl mb-4">
              Создан врачами для врачей
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Каждая функция спроектирована с учётом реального рабочего дня хирурга
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="p-8 bg-card border-border hover:border-clinical/30 transition-colors">
                <div className="flex items-start gap-5">
                  <span className="text-3xl flex-shrink-0">{f.icon}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className={`font-semibold text-lg ${f.colorClass}`}>{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-30" />

      <CatalogSection />

      <Separator className="opacity-30" />

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="font-heading text-4xl md:text-5xl">
            Готовы к обучению<br />нового уровня?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Первые 3 модуля бесплатно. Без привязки карты. Начните прямо сейчас.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-vital hover:bg-vital/90 text-background font-semibold px-10 h-12 text-base">
              Создать аккаунт
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground">Уже 2 700+ врачей обучаются на платформе</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo size="sm" href="/" />
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Оферта</a>
            <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
