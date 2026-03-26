import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://jfsinzmzaizgeigmlugx.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmc2luem16YWl6Z2VpZ21sdWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTIwODUsImV4cCI6MjA4OTY4ODA4NX0.RHXLnZz18aeuuVUNOYVh0j3sfOnWrNHeUHsL6JDA9Lg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we should use Supabase (vs mock)
export const USE_SUPABASE = !!process.env.SUPABASE_ANON_KEY || !!process.env.NEXT_PUBLIC_SUPABASE_URL;
