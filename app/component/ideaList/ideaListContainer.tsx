"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import IdeaList from "./ideaList";

export default function IdeaListContainer({
  ideaArray,
}: {
  ideaArray: {
    id: string;
    title: string;
    description: string | null;
    words_ideas: {
      words_id: string;
    }[];
    profiles: {
      name: string | null;
    } | null;
  }[];
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime idea")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ideas" },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div>
      {ideaArray.map((idea) => (
        <IdeaList key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
