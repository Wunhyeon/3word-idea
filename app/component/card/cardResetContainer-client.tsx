import { useState } from "react";
import Card from "./card";

export default function CardResetContainer({ word }: { word: string }) {
  const [word1, setWord1] = useState<string>(word);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleCardFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div className="flex">
      <Card word={word} isFlipped={isFlipped} handleCardFlip={handleCardFlip} />
    </div>
  );
}
