"use client";
import { useState } from "react";
import Header from "@/components/Header";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "@/components/ui";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sendLink = async () => {
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-semibold">Logga in</h1>
        <p className="mt-2 text-slate-600">Vi skickar en inloggningslänk till din email.</p>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-xl border p-3" placeholder="din@email.se" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="w-full" onClick={sendLink}>Skicka länk</Button>
          {sent && <div className="text-emerald-700">Kolla din inkorg ✅</div>}
          {err && <div className="text-rose-700">{err}</div>}
        </div>
      </div>
    </div>
  );
}
