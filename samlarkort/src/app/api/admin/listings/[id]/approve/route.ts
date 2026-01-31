import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin();
  await supabase.from("card_listings").update({ status: "APPROVED", reject_reason: null }).eq("id", params.id);
  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin/moderation", url.origin));
}
