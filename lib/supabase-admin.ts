import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://jfsinzmzaizgeigmlugx.supabase.co";
// Fall back to the anon key (already embedded in supabase.ts) so module eval never fails at build time.
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmc2luem16YWl6Z2VpZ21sdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTIwODUsImV4cCI6MjA4OTY4ODA4NX0.RHXLnZz18aeuuVUNOYVh0j3sfOnWrNHeUHsL6JDA9Lg";

export const supabaseAdmin = createClient(url, key);
export const STORAGE_BUCKET = "jewelry-images";
// redeploy Fri Mar 27 03:17:48 +07 2026
// fix Fri Mar 27 03:30:17 +07 2026
// pooler Fri Mar 27 03:51:58 +07 2026
