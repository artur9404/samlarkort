import Header from "@/components/Header";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Button, Card } from "@/components/ui";

export default async function ListingsPage() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("card_listings")
    .select("id,title,price_cents,created_at")
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Annonser</h1>
          <Link href="/listings/new"><Button variant="outline">Lägg upp kort</Button></Link>
        </div>

        {error && <div className="mt-6 text-rose-700">Fel: {error.message}</div>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data ?? []).map((l) => (
            <Card key={l.id} className="p-4">
              <div className="font-semibold">{l.title}</div>
              <div className="mt-2 text-slate-600">
                {l.price_cents ? `${Math.round(l.price_cents / 100)} kr` : "Endast byte"}
              </div>
              <div className="mt-2 text-xs text-slate-500">{new Date(l.created_at).toLocaleString("sv-SE")}</div>
            </Card>
          ))}
        </div>

        {!data?.length && !error && <div className="mt-6 text-slate-600">Inga annonser ännu.</div>}
      </div>
    </div>
  );
}
