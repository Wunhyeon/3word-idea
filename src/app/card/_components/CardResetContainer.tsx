import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardResetContainer({
  word,
  resetOne,
  isAllReset,
  setIsAllReset,
}: {
  word: string;
  resetOne: (word: string) => string;
  isAllReset: boolean;
  setIsAllReset: (is: boolean) => void;
}) {
  const [word1, setWord1] = useState<string>(word);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleCardFlip = () => {
    setIsFlipped(true);
    setIsAllReset(false);
  };

  const resetOneCard = () => {
    if (!isFlipped) {
      return;
    }
    const newWord = resetOne(word);
    setIsFlipped(false);
    setTimeout(() => setWord1(newWord), 500);
  };

  useEffect(() => {
    if (isAllReset) {
      resetOneCard();
    }
  });

  return (
    <div className="h-[80%]">
      <Card
        word={word1}
        isFlipped={isFlipped}
        handleCardFlip={handleCardFlip}
      />
      <button className="items-center" onClick={resetOneCard}>
        새로고침
      </button>
    </div>
  );
}
