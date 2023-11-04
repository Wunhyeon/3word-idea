"use server";

import { Database } from "@/db/database.types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const getDB = () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return supabase;
};

const getUser = async () => {
  const supabase = getDB();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

/**
 * 여기서 종합적으로 해줌. 각각 아이디어만 저장하는 함수. postgres function으로 transaction처럼 수행.
 * ideas 테이블에 넣고, 반환받은 아이디로 words_ideas 테이블(조인테이블)에 넣음
 * @param idea
 * @param intersection
 */
export const insertWordAndIdea = async (
  idea: { title: string; description: string; isVisible: boolean },
  words: string[]
  // session: Session | null
) => {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient<Database>({
  //   cookies: () => cookieStore,
  // });
  const supabase = getDB();
  const user = await getUser();
  // idea 저장
  const data = await supabase.rpc("insert_word_idea_after_insert_idea", {
    idea_title: idea.title,
    idea_description: idea.description,
    idea_is_visible: user && !idea.isVisible ? false : true,
    words: words,
    profile_id: user?.id,
  });

  return data;
  // 변경. 원래는 title에 들어가있는 단어들만 넣어주려 했으나, 그냥 단어 전부 넣는걸로 변경
};

/**
 * return idea. idea+연결된 words join table.
 * 메인에 보여주기 위한것이기 때문에 isVisible이 true인 것들만
 * @param param0
 * @returns
 */
export const selectWordsIdea = async ({
  limit,
  orderby,
  ascDsc,
  isVisible,
  userId,
}: {
  limit: number;
  orderby: "created_at";
  ascDsc: "ASC" | "DSC";
  isVisible?: boolean;
  userId?: string;
}) => {
  const supabase = getDB();
  let query = supabase
    .from("ideas")
    .select(
      "id, title,description, is_visible, words_ideas(words_id), profiles(name)"
    );
  if (typeof isVisible === "boolean") {
    query.eq("is_visible", isVisible);
  }
  if (userId) {
    query.eq("profile_id", userId);
  }
  query.order(orderby, { ascending: ascDsc === "ASC" }).limit(limit);
  // console.log("data : ", data);
  // console.log("error : ", error);
  const { data, error } = await query;
  return { data, error };
};
