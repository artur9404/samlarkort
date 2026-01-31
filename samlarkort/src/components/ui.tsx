import * as React from "react";
export function cn(...classes: Array<string | undefined | false | null>) { return classes.filter(Boolean).join(" "); }

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "danger" }) {
  const { className, variant = "primary", ...rest } = props;
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "bg-sky-700 text-white hover:bg-sky-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };
  return <button className={cn(base, variants[variant], className)} {...rest} />;
}

export function Card({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-slate-200 bg-white shadow-sm", className)} {...rest} />;
}

export function Badge({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-sky-700", className)} {...rest} />
  );
}
