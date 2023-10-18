"use client";

import { useState } from "react";

export default function IdeaInput({ words }: { words?: string[] }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const submitIdea = async () => {
    // 내려받은 단어 없을 때
    if (!words || (words && words.length < 1)) {
      return;
    }

    const titleArr = title.split(" ");
    // 교집합
    const intersection = words.filter((word) => titleArr.indexOf(word) !== -1);
    if (intersection.length < 2) {
      // 단어 2개이상 안썼을 때
      alert("At least combine 2 words!");
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <h3>Title</h3>
      <input
        className="outline outline-offset-2 outline-4"
        name="title"
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
      <h3>Description !!! </h3>
      <input
        className="outline outline-offset-2 outline-4 h-60"
        name="description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={submitIdea}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
}
