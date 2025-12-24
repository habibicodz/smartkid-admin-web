import { query } from "$app/server";
import { assert } from "console";
import type { Tables, TablesInsert, TablesUpdate } from "./database.types";
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

export const updateGrade = query(
    "unchecked",
    async (data: { "grade": Tables<"grades"> }) => {
        const { error } = await supabaseServer.from("grades").update(data.grade).eq("id", data.grade.id);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
)

export const createSubject = query(
    "unchecked",
    async (data: { "subject": TablesInsert<"subjects"> }) => {
        const { error } = await supabaseServer.from("subjects").insert(data.subject);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);

export const updateSubject = query(
    "unchecked",
    async (data: { "subject": TablesUpdate<"subjects"> }) => {
        const { error } = await supabaseServer.from("subjects").update(data.subject).eq("id", data.subject.id!);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);

export const deleteSubject = query(
    "unchecked",
    async (data: { "subject": Tables<"subjects"> }) => {
        const { error } = await supabaseServer.from("subjects").delete().eq("id", data.subject.id);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
)

export const createTopic = query(
    "unchecked",
    async (data: { "topic": TablesInsert<"topics"> }) => {
        const { error } = await supabaseServer.from("topics").insert(data.topic)
        assert(error == null, `${error?.message} ${error?.cause}`)
        return error == null;
    }
)

export const updateTopic = query(
    "unchecked",
    async (data: { "topic": TablesUpdate<"topics"> }) => {
        const { error } = await supabaseServer.from("topics").update(data.topic).eq("id", data.topic.id!);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);

export const deleteTopic = query(
    "unchecked",
    async (data: { "topic": Tables<"topics"> }) => {
        const { error } = await supabaseServer.from("topics").delete().eq("id", data.topic.id!);
        assert(error == null, `${error?.message} ${error?.cause}`);
        return error == null;
    }
);