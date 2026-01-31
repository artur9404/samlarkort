"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s?.user));
    return () => sub.subscription.unsubscribe();
  }, []);

  const linkCls = (href: string) =>
    "text-sm transition-colors " +
    (pathname === href ? "text-sky-700 underline underline-offset-8 decoration-2" : "text-slate-600 hover:text-slate-900");

  const logout = async () => { const supabase = supabaseBrowser(); await supabase.auth.signOut(); location.href = "/"; };

  return (
    <header className="border-b border-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-mobile.png" alt="Logo" width={56} height={56} className="block sm:hidden" />
            <Image src="/logo.png" alt="Logo" width={240} height={80} className="hidden sm:block h-auto w-auto" />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link className={linkCls("/")} href="/">Hem</Link>
            <Link className={linkCls("/byten")} href="/byten">Byten</Link>
            <Link className={linkCls("/listings")} href="/listings">Annonser</Link>
            <Link className={linkCls("/listings/new")} href="/listings/new">Lägg upp kort</Link>

            {!authed ? (
              <Link href="/login"><Button className="rounded-full">Logga in</Button></Link>
            ) : (
              <Button className="rounded-full" variant="outline" onClick={logout}>Logga ut</Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
