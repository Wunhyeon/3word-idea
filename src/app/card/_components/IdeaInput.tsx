import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { insertWordAndIdea } from "@/server-actions/actions";

export default function IdeaInput({
  words,
  allReset,
  user,
}: {
  words: string[];
  allReset: () => void;
  user: User | null;
}) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isVisible, setIsVisible] = useState(user ? true : true);
  const router = useRouter();

  const onChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const onChangeDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionInput(e.target.value);
  };

  const submit = async () => {
    const titleInputArray = titleInput.split(" ");
    // 교집합
    const intersection = words.filter((word) => {
      return titleInputArray.indexOf(word) !== -1;
    });

    // supabase 저장
    const insertResult = await insertWordAndIdea(
      {
        title: titleInput,
        description: descriptionInput,
        isVisible: isVisible,
      },
      words
      // session
    );
    if (insertResult.error !== null) {
      alert("error");
    }
    setTitleInput("");
    setDescriptionInput("");
    alert("submitted!");
    allReset();
  };

  const handleIsVisible = () => {
    if (!user) {
      setIsVisible(true);
      alert("로그인을 해야지만 바꿀 수 있다!");
      return;
    }

    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div>
        <h3>Title</h3>
        <input
          type="text"
          className="outline outline-offset-2 outline-4"
          value={titleInput}
          onChange={onChangeTitleInput}
        />
      </div>
      <div>
        <h3>Description</h3>
        <input
          className="outline outline-offset-2 outline-4"
          type="text"
          value={descriptionInput}
          onChange={onChangeDescriptionInput}
        />
      </div>
      <div className="mt-5">
        <div>
          <input
            type="checkbox"
            checked={isVisible}
            onChange={handleIsVisible}
          />
          <span>공개</span>
        </div>
        <button onClick={submit}>submit</button>
      </div>
    </div>
  );
}
