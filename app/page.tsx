import Image from "next/image";
import HeaderComponent from "./component/header/headerComponent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Card from "./card/page";
import List from "./list/page";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-full max-w-md mx-auto">
      <HeaderComponent session={session} />
      <main className="flex justify-center">Home</main>
      <Card session={session} />
      <List />
    </div>
  );
}
