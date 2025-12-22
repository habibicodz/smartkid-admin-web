import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Database } from "../database.types";

export const supabaseClient = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export const getGradeById = async (gradeId: string) => {
    const result = await supabaseClient.from("grades").select().eq("id", gradeId).limit(1);
    return result.data?.[0] ?? undefined;
}

export const getGrades = async () => {
    const result = await supabaseClient.from("grades").select();
    return result.data ?? [];
};

export const getSubjects = async (gradeId: string) => {
    const result = await supabaseClient.from("subjects").select().eq("grade_id", gradeId);

    if (result.error) {
        return null;
    }

    return result.data ?? [];
}