import AuthButtonClient from "./authButton-client";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function AuthButtonServer({
  session,
}: {
  session: Session | null;
}) {
  return <AuthButtonClient session={session} />;
}
