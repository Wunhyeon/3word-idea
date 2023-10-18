"use client";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import CardResetContainer from "./cardResetContainer-client";
import IdeaInput from "./ideaInput-server";

export default function CardSection({ words }: { words: string[] }) {
  return (
    <div>
      cardSection
      <div className="flex">
        {words.map((word) => (
          <CardResetContainer key={word} word={word} />
        ))}
      </div>
    </div>
  );
}
