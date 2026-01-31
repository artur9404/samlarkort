import { supabaseServer } from "@/lib/supabase/server";
export async function getMyRole() {
  const supabase = supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return { user: null, role: null as null | string };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  return { user, role: profile?.role ?? "user" };
}
