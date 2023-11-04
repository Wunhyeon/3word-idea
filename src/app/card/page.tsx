import CardPageContainer from "./_components/CardPage-Client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Card() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <CardPageContainer user={user} />;
}
