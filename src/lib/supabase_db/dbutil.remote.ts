import { query } from "$app/server";
import { assert } from "console";
import type { TablesInsert } from "./database.types";
import { supabaseServer } from "./server/supabse.server";

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

export const createSubject = query(
    "unchecked",
    async (data: { "subject": TablesInsert<"subjects"> }) => {
        const { error } = await supabaseServer.from("subjects").insert(data.subject);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);