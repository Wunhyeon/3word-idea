"use client";
// login 했나 안했나 구분해서 다른 컴포넌트 보여줌. 이 컴포넌트는 구별하는 역할
import { createClient } from "@/utils/supabase/server";
import { Session, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";
export default function AuthStatus({ user }: { user: User | null }) {
  return (
    <div>
      {user ? (
        <div className="flex gap-3">
          <Link href="/mypage">My Page</Link>
          <form className="" action="/auth/sign-out" method="post">
            <button>로그아웃</button>
          </form>
        </div>
      ) : (
        <div>
          {/* <button onClick={handleSignIn}>로그인</button> */}
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action="/auth/sign-in"
            method="post"
          >
            <button>구글 로그인</button>
          </form>
        </div>
      )}
    </div>
  );
}
