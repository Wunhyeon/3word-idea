import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { insertWordAndIdea } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function IdeaInput({
  words,
  session,
  allReset,
}: {
  words: string[];
  session: Session | null;
  allReset: () => void;
}) {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isVisible, setIsVisible] = useState(session ? true : true);
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

    if (intersection.length < 2) {
      alert("please combine over 2 words in Title!");
    } else {
      // supabase 저장
      const insertResult = await insertWordAndIdea(
        {
          title: titleInput,
          description: descriptionInput,
          isVisible: isVisible,
        },
        intersection
      );
      if (insertResult.error !== null) {
        alert("error");
      }
      setTitleInput("");
      setDescriptionInput("");
      alert("submitted!");
      allReset();
    }
  };

  const handleIsVisible = () => {
    if (!session) {
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
