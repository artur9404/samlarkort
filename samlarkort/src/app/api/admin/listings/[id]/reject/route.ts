import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const form = await req.formData();
  const reason = String(form.get("reason") ?? "");

  const supabase = supabaseAdmin();
  await supabase.from("card_listings").update({ status: "REJECTED", reject_reason: reason || "Avvisad av admin" }).eq("id", params.id);

  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin/moderation", url.origin));
}
