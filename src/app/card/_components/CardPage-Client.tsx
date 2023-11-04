"use client";

import { generate } from "@/constants/word";
import { useEffect, useState } from "react";
import CardResetContainer from "./CardResetContainer";
import styles from "./Card.module.scss";
import { User } from "@supabase/supabase-js";
import IdeaInput from "./IdeaInput";

export default function CardPageContainer({ user }: { user: User | null }) {
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
      <div>card page</div>
      <div className="flex justify-between h-64">
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
      <IdeaInput user={user} words={words} allReset={allReset} />
    </div>
  );
}
