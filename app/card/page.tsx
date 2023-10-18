import { generate } from "random-words";
import CardSection from "../component/card/cardSection-client";
import IdeaInput from "../component/card/ideaInput-server";

export default function Card() {
  let get3Word = generate(3);

  return (
    <div>
      Card Page
      <CardSection words={get3Word} />
      <IdeaInput words={get3Word} />
    </div>
  );
}
