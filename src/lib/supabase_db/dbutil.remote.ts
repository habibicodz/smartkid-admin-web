import { query } from "$app/server";
import { supabaseServer } from "./server/supabse.server";

export const getGrades = query(async () => {
    const result = await supabaseServer.from("grades").select();
    return result.data;
})