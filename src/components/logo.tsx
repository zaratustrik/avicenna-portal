import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showDescriptor?: boolean;
  className?: string;
  href?: string;
}

const sizes = {
  sm: { mark: "w-10 h-10", text: "text-[30px]", desc: "text-[9px]"  },
  md: { mark: "w-12 h-12", text: "text-[36px]", desc: "text-[10px]" },
  lg: { mark: "w-16 h-16", text: "text-[48px]", desc: "text-sm"     },
};

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A8AE0" />
          <stop offset="100%" stopColor="#1A5FB8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />

      {/* Left page — slight trapezoid for depth */}
      <path d="M7 11 L19.5 13 L19.5 29.5 L7 29.5 Z" fill="white" opacity="0.92" />

      {/* Right page */}
      <path d="M20.5 13 L33 11 L33 29.5 L20.5 29.5 Z" fill="white" opacity="0.85" />

      {/* Spine highlight */}
      <rect x="19" y="12.5" width="2" height="17.5" rx="1" fill="white" opacity="0.5" />

      {/* Text lines — left page */}
      <line x1="9.5" y1="17"   x2="18" y2="17.6" stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <line x1="9.5" y1="20.5" x2="18" y2="21.1" stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
      <line x1="9.5" y1="24"   x2="15" y2="24.4" stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />

      {/* Text lines — right page */}
      <line x1="22" y1="17.6" x2="30.5" y2="17"   stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <line x1="22" y1="21.1" x2="30.5" y2="20.5" stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.45" />
      <line x1="22" y1="24.4" x2="27"   y2="24"   stroke="#1A5FB8" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />

      {/* Bottom cover arc */}
      <path d="M7 29.5 Q20 33 33 29.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.65" />
    </svg>
  );
}

export function Logo({
  size = "sm",
  showText = true,
  showDescriptor = true,
  className,
  href = "/",
}: LogoProps) {
  const s = sizes[size];

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 select-none hover:opacity-80 transition-opacity", className)}
    >
      <div className={cn("flex-shrink-0 rounded-xl overflow-hidden", s.mark)}>
        <BookIcon />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn("tracking-tight text-foreground leading-none", s.text)}
            style={{ fontFamily: "var(--font-marck), cursive" }}
          >
            Авиценна
          </span>
          {showDescriptor && (
            <span
              className={cn("text-muted-foreground tracking-wide uppercase mt-0.5", s.desc)}
              style={{ letterSpacing: "0.06em" }}
            >
              Медицинское образование
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

// Kept for internal use where Link wrapper is not needed
export function LogoMark({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className={cn("flex-shrink-0 rounded-xl overflow-hidden", sizes[size].mark)}>
      <BookIcon />
    </div>
  );
}
