import { query } from "$app/server";
import { assert } from "console";
import type { TablesInsert } from "./database.types";
import { supabaseServer } from "./server/supabse.server";

export const getGrades = query(async () => {
    const result = await supabaseServer.from("grades").select();
    return result.data ?? [];
})

export const createGrade = query(
    "unchecked",
    async (data: { "number": number, name: string }) => {
        const grade: TablesInsert<"grades"> = {
            id: undefined,
            number: data.number,
            name: data.name,
            created_at: new Date().toISOString(),
        }
        const { error } = await supabaseServer.from("grades").insert(grade);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);