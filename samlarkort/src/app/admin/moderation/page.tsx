import Link from "next/link";
import Header from "@/components/Header";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Card } from "@/components/ui";

export default async function ModerationPage() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("card_listings")
    .select("id,title,created_at,status")
    .eq("status", "PENDING")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Moderering</h1>
        <p className="mt-2 text-slate-600">Nya annonser som väntar på godkännande.</p>

        {error && <div className="mt-6 text-rose-700">Fel: {error.message}</div>}

        <div className="mt-6 space-y-3">
          {(data ?? []).map((l) => (
            <Link key={l.id} href={`/admin/moderation/${l.id}`}>
              <Card className="p-4 hover:bg-slate-50">
                <div className="font-semibold">{l.title}</div>
                <div className="text-sm text-slate-600">{new Date(l.created_at).toLocaleString("sv-SE")}</div>
              </Card>
            </Link>
          ))}

          {!data?.length && !error && <div className="text-slate-600">Inga pending just nu.</div>}
        </div>
      </div>
    </div>
  );
}
