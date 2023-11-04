import { useEffect } from "react";
import IdeaListContainer from "./_components/IdeaListContainer";
import { selectWordsIdea } from "@/server-actions/actions";

export default async function List({
  limit,
  orderby,
  ascDsc,
  isVisible,
  userId,
}: {
  limit: number;
  orderby: "created_at";
  ascDsc: "ASC" | "DSC";
  isVisible?: boolean;
  userId?: string;
}) {
  const ideaList = await selectWordsIdea({
    limit: limit,
    orderby: orderby,
    ascDsc: ascDsc,
    isVisible,
    userId,
  });

  return (
    <div>
      RECENT IDEA LIST
      {ideaList.data ? <IdeaListContainer ideaArray={ideaList.data} /> : null}
    </div>
  );
}
