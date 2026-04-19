"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/admin",            icon: "◈", label: "Дашборд"      },
  { href: "/admin/courses",    icon: "▦", label: "Курсы"        },
  { href: "/admin/users",      icon: "◯", label: "Врачи"        },
  { href: "/admin/analytics",  icon: "⟁", label: "Аналитика"   },
  { href: "/admin/nmo",        icon: "✦", label: "НМО-центр"    },
  { href: "/admin/settings",   icon: "⚙", label: "Настройки"   },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col border-r border-border bg-sidebar z-40">
      <div className="h-16 flex items-center px-5 border-b border-border gap-3">
        <Logo size="sm" href="/" />
        <Badge className="text-[10px] px-1.5 py-0 h-4 bg-warning/20 text-warning border-0 flex-shrink-0">
          Admin
        </Badge>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-clinical/15 text-clinical"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-warning/20 text-warning text-xs font-bold">
              АД
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-sidebar-foreground truncate">Администратор</span>
            <span className="text-[10px] text-sidebar-foreground/50 truncate">admin@avicenna.ru</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
