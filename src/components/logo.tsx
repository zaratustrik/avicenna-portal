import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
}

const sizes = {
  sm: { mark: "w-8 h-8",   text: "text-sm"  },
  md: { mark: "w-10 h-10", text: "text-base" },
  lg: { mark: "w-14 h-14", text: "text-xl"   },
};

function LogoMark({ size }: { size: "sm" | "md" | "lg" }) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-3 select-none")}>
      <div className={cn("flex-shrink-0 rounded-xl overflow-hidden", s.mark)}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3A8AE0" />
              <stop offset="100%" stopColor="#1A5FB8" />
            </linearGradient>
            <linearGradient id="flame-grad" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#bg-grad)" />
          <path d="M20 6 C20 6 12 14 12 21 C12 25.4 15.6 29 20 29 C24.4 29 28 25.4 28 21 C28 14 20 6 20 6Z" fill="url(#flame-grad)" />
          <path d="M20 13 C20 13 17 17 17 20.5 C17 22.4 18.3 24 20 24 C21.7 24 23 22.4 23 20.5 C23 17 20 13 20 13Z" fill="#2D7DD2" opacity="0.45" />
          <rect x="15" y="31" width="10" height="2.5" rx="1.25" fill="white" opacity="0.6" />
          <circle cx="11" cy="11" r="1" fill="white" opacity="0.4" />
          <circle cx="29" cy="13" r="0.8" fill="white" opacity="0.3" />
          <circle cx="13" cy="30" r="0.7" fill="white" opacity="0.25" />
        </svg>
      </div>
      <span className={cn("font-semibold tracking-tight text-foreground leading-none", s.text)}>
        Авиценна
      </span>
    </div>
  );
}

export function Logo({ size = "sm", showText = true, className, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3 select-none hover:opacity-80 transition-opacity", className)}>
      <div className={cn("flex-shrink-0 rounded-xl overflow-hidden", sizes[size].mark)}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3A8AE0" />
              <stop offset="100%" stopColor="#1A5FB8" />
            </linearGradient>
            <linearGradient id="logo-flame" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />
          <path d="M20 6 C20 6 12 14 12 21 C12 25.4 15.6 29 20 29 C24.4 29 28 25.4 28 21 C28 14 20 6 20 6Z" fill="url(#logo-flame)" />
          <path d="M20 13 C20 13 17 17 17 20.5 C17 22.4 18.3 24 20 24 C21.7 24 23 22.4 23 20.5 C23 17 20 13 20 13Z" fill="#2D7DD2" opacity="0.45" />
          <rect x="15" y="31" width="10" height="2.5" rx="1.25" fill="white" opacity="0.6" />
          <circle cx="11" cy="11" r="1" fill="white" opacity="0.4" />
          <circle cx="29" cy="13" r="0.8" fill="white" opacity="0.3" />
          <circle cx="13" cy="30" r="0.7" fill="white" opacity="0.25" />
        </svg>
      </div>
      {showText && (
        <span className={cn("font-semibold tracking-tight text-foreground leading-none", sizes[size].text)}>
          Авиценна
        </span>
      )}
    </Link>
  );
}

// Kept for internal use where Link is not needed (avoids nested <a> inside <a>)
export { LogoMark };
