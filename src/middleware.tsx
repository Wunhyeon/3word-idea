import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value;
          },
          set(name, value, options) {
            // If the cookie is updated, update the cookies for the request and response
            req.cookies.set({
              name,
              value,
              ...options,
            });
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            // If the cookie is removed, update the cookies for the request and response
            req.cookies.delete({
              name,
              ...options,
            });
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            res.cookies.delete({
              name,
              ...options,
            });
          },
        },
      }
    );

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getSession();

    // If the session was refreshed, the request and response cookies will have been updated
    // If the session was not refreshed, the request and response cookies will be unchanged
    return res;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // TODO: Feel free to remove this `try catch` block once you have
    // your Next.js app connected to your Supabase project.
    return res;
  }
}
