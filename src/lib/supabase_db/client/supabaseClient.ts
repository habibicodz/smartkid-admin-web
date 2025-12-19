import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Database } from "../database.types";

export const supabaseClient = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)

