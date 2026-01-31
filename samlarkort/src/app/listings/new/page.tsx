"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useState } from "react";

export default function NewListingPage() {
  const supabase = supabaseBrowser();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async () => {
    setMsg(null);
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return setMsg("Du måste vara inloggad.");

    const priceCents = price.trim() === "" ? null : Math.round(Number(price) * 100);

    const { data: listing, error: e1 } = await supabase
      .from("card_listings")
      .insert({
        user_id: user.id,
        title,
        price_cents: priceCents,
        trade_only: priceCents === null,
        status: "PENDING",
      })
      .select("id")
      .single();

    if (e1 || !listing) return setMsg(e1?.message ?? "Kunde inte skapa annons.");

    const uploadedPaths: string[] = [];
    if (files?.length) {
      for (const f of Array.from(files)) {
        const path = `${user.id}/${listing.id}/${crypto.randomUUID()}-${f.name}`;
        const up = await supabase.storage.from("listing-images").upload(path, f, { cacheControl: "3600", upsert: false });
        if (up.error) return setMsg(up.error.message);
        uploadedPaths.push(path);
      }
    }

    if (uploadedPaths.length) {
      const { error: e3 } = await supabase.from("listing_images").insert(
        uploadedPaths.map((p) => ({ listing_id: listing.id, user_id: user.id, path: p }))
      );
      if (e3) return setMsg(e3.message);
    }

    setMsg("Annons skapad! Den väntar på admin-godkännande ✅");
    setTitle("");
    setPrice("");
    setFiles(null);
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-semibold">Lägg upp kort</h1>
        <p className="mt-2 text-slate-600">Din annons hamnar i kö tills admin godkänner.</p>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-xl border p-3" placeholder="Titel (ex: Charizard Holo 1st Edition)" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full rounded-xl border p-3" placeholder="Pris (SEK) – lämna tomt om bara byte" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className="w-full" type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
          <Button className="w-full" onClick={submit}>Skicka in annons</Button>
          {msg && <div className="text-slate-700">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
