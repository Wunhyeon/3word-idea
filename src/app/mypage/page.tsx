import { cookies } from "next/headers";
import List from "../list/page";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      MyPage
      <div>deatail</div>
      <List limit={20} ascDsc="DSC" orderby="created_at" userId={user?.id} />
    </div>
  );
}
