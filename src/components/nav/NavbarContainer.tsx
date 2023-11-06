import { createBrowserClient, createServerClient } from "@supabase/ssr";
import AuthStatus from "./Auth-status";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function NavbarContainer() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    // sm:px-16 sm(640px)가 넘으면 padding x 가 16

    <header>
      <nav className="border-2 border-red-500 max-container px-8 sm:px-16 flex justify-between items-center">
        <div>
          <Link href="/">Logo</Link>
        </div>
        <div>
          <Link href="/audiopage">Audio Page</Link>
          <AuthStatus user={user} />
        </div>
      </nav>
    </header>
  );
}
