import AuthButtonServer from "./authButton-server";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function HeaderComponent({
  session,
}: {
  session: Session | null;
}) {
  return (
    <div className="flex justify-between">
      <h1>3Word IDEA!!!</h1>
      <AuthButtonServer session={session} />
    </div>
  );
}
