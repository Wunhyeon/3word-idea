import { createBrowserClient } from "@supabase/ssr";

export const client = () => {
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_UR!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};