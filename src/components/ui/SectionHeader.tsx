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
        "space-y-4 mb-12",
        centered ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {badgeText && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shadow-sm">
          {badgeIcon}
          <span>{badgeText}</span>
        </div>
      )}

      {isMainPageTitle ? (
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>
      ) : (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
