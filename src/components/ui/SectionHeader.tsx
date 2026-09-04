import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  isMainPageTitle?: boolean;
}

export function SectionHeader({
  badgeText,
  badgeIcon,
  title,
  subtitle,
  centered = true,
  className,
  isMainPageTitle = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10 md:mb-14",
        centered ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {badgeText && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200/60 shadow-xs">
          {badgeIcon}
          <span>{badgeText}</span>
        </div>
      )}

      {isMainPageTitle ? (
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          {title}
        </h1>
      ) : (
        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="font-sans text-sm sm:text-base font-medium text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
