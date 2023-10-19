import { selectWordsIdea } from "@/actions/actions";
import IdeaList from "../component/ideaList/ideaList";
import { useEffect } from "react";
import IdeaListContainer from "../component/ideaList/ideaListContainer";

export default async function List() {
  const ideaList = await selectWordsIdea({
    limit: 5,
    orderby: "created_at",
    ascDsc: "DSC",
  });

  return (
    <div>
      RECENT IDEA LIST
      {ideaList.data ? <IdeaListContainer ideaArray={ideaList.data} /> : null}
    </div>
  );
}
