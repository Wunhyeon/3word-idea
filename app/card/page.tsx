"use client";

import { generate } from "@/word";
import { useEffect, useState } from "react";
import CardResetContainer from "../component/card/cardResetContainer";
import IdeaInput from "../component/card/ideaInput";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function Card({ session }: { session: Session | null }) {
  const [words, setWords] = useState<string[]>([]);
  const [isAllReset, setIsAllReset] = useState<boolean>(false);

  useEffect(() => {
    const get3Word = generate(3);
    setWords(get3Word);
  }, []);

  // reset one
  // 기존 words 배열에 있던 단어중 하나를 빼고, 새롭게 단어를 생성해서 추가해준다. 그리고 새롭게 생성된 단어 return
  const resetOne = (word: string) => {
    const indexOf = words.indexOf(word);
    const get1Word = generate(1)[0];
    words[indexOf] = get1Word;

    return get1Word;
  };

  // all reset
  const allReset = () => {
    setIsAllReset(true);
  };

  return (
    <div>
      Card Page
      <div className="flex">
        {words.length > 0 &&
          words.map((word) => (
            <CardResetContainer
              key={word}
              word={word}
              resetOne={resetOne}
              isAllReset={isAllReset}
              setIsAllReset={setIsAllReset}
            />
          ))}
      </div>
      <div>
        <button onClick={allReset}>전체 새로고침</button>
      </div>
      <div>
        <IdeaInput words={words} session={session} allReset={allReset} />
      </div>
    </div>
  );
}
