import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Samlarkort.se", description: "Samla, byta och upptäck dina kort." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="sv"><body className="min-h-screen bg-white text-slate-900">{children}</body></html>);
}
