import { query } from "$app/server";
import type { TablesInsert } from "./database.types";
import { supabaseServer } from "./server/supabse.server";

export const getGrades = query(async () => {
    const result = await supabaseServer.from("grades").select();
    return result.data ?? [];
})

export const createGrade = query(
    "unchecked",
    async (name: string) => {
        const grade: TablesInsert<"grades"> = {
            "id": undefined,
            "name": name,
            "created_at": undefined
        }
        const { error } = await supabaseServer.from("grades").insert(grade);

        return error == null;
    }
);