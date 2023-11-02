import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  // const formData = await request.formData();
  // const email = String(formData.get("email"));
  // const password = String(formData.get("password"));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // https://supabase.com/docs/guides/auth/social-login/auth-google
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(`${data.url}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
  // return NextResponse.redirect(`${requestUrl.origin}`, {
  //   // a 301 status is required to redirect from a POST to a GET route
  //   status: 301,
  // });
}
// 요청 => signInWithOAuth => data.url return. 여기서 google인증을 위한 url만들어줌  => nextResponse.redirect(data.url 구글). 구글 인증으로 이동 =>
// auth/callback (signInWithOAuth에 redirectTo로 등록했던. data.url에 보면 들어가있음. 여기에 code를 심어서 줌. Ex.http://localhost:3000/auth/callback?code=06a756c0-2248-49b5-9d6e-648503454e7e)
// => auth/callback 에서
// 이부분은 불확실 supabase? => supabase에 등록된 사이트로 code를 param으로 담아서. (여기선 Local host)
// auth/callback 에서 NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url)) 이게 localhost:3000임.

// https://vyxbbclezyzniwvidxpx.supabase.co/auth/v1/callback
