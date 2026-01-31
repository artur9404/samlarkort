import Header from "@/components/Header";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Button, Card } from "@/components/ui";

async function getSignedUrls(paths: string[]) {
  const supabase = supabaseAdmin();
  const res = await Promise.all(
    paths.map(async (p) => {
      const { data, error } = await supabase.storage.from("listing-images").createSignedUrl(p, 60 * 30);
      if (error) return null;
      return data.signedUrl;
    })
  );
  return res.filter(Boolean) as string[];
}

export default async function ModerationDetail({ params }: { params: { id: string } }) {
  const supabase = supabaseAdmin();

  const { data: listing, error: e1 } = await supabase.from("card_listings").select("*").eq("id", params.id).single();
  if (e1 || !listing) {
    return (
      <div>
        <Header />
        <div className="p-6">Hittade inte annons.</div>
      </div>
    );
  }

  const { data: imgs } = await supabase.from("listing_images").select("path").eq("listing_id", listing.id);
  const signed = await getSignedUrls((imgs ?? []).map((i) => i.path));

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">{listing.title}</h1>
        <div className="mt-2 text-slate-600">Status: {listing.status}</div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {signed.map((u) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={u} src={u} alt="" className="rounded-xl border object-cover" />
          ))}
        </div>

        <Card className="mt-8 p-4">
          <form action={`/api/admin/listings/${listing.id}/approve`} method="post">
            <Button className="w-full" type="submit">Godkänn</Button>
          </form>

          <form className="mt-3 space-y-3" action={`/api/admin/listings/${listing.id}/reject`} method="post">
            <textarea name="reason" className="w-full rounded-xl border p-3" placeholder="Orsak vid avslag (visas för användaren)" />
            <Button className="w-full" variant="danger" type="submit">Avvisa</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
