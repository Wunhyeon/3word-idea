"use server";

import {
  Session,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDB = () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  return supabase;
};

const getSession = async () => {
  const supabase = getDB();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

/**
 * 여기서 종합적으로 해줌. 각각 아이디어만 저장하는 함수. postgres function으로 transaction처럼 수행.
 * ideas 테이블에 넣고, 반환받은 아이디로 words_ideas 테이블(조인테이블)에 넣음
 * @param idea
 * @param intersection
 */
export const insertWordAndIdea = async (
  idea: { title: string; description: string; isVisible: boolean },
  intersection: string[]
  // session: Session | null
) => {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient<Database>({
  //   cookies: () => cookieStore,
  // });
  const supabase = getDB();
  const session = await getSession();
  // idea 저장
  const data = await supabase.rpc("insert_word_idea_after_insert_idea", {
    idea_title: idea.title,
    idea_description: idea.description,
    idea_is_visible: session && !idea.isVisible ? false : true,
    words: intersection,
    profile_id: session?.user.id,
  });

  return data;
};

/**
 * Idea만 저장
 * @param param0
 * @returns
 */
const insertIdea = async ({
  title,
  description,
  isVisible,
  session,
}: {
  title: string;
  description: string;
  isVisible: boolean;
  session: Session | null;
}) => {
  try {
    const supabase = getDB();
    const session = await getSession();
    const insertResult = await supabase.from("ideas").insert({
      title: title,
      description: description,
      is_visible: isVisible,
      profile_id: session?.user.id,
    });

    return insertResult;
  } catch (err) {
    return err;
  }
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
}: {
  limit: number;
  orderby: "created_at";
  ascDsc: "ASC" | "DSC";
}) => {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient<Database>({
  //   cookies: () => cookieStore,
  // });
  const supabase = getDB();
  // const session = await getSession();
  const { data, error } = await supabase
    .from("ideas")
    .select("id, title,description, words_ideas(words_id), profiles(name)")
    .eq("is_visible", true)
    .order(orderby, { ascending: ascDsc === "ASC" })
    .limit(limit);
  // console.log("data : ", data);
  // console.log("error : ", error);
  return { data, error };
};
