import { supabaseServer } from "$lib/supabase_db/server/supabaseServer.service";
import type { Actions } from "@sveltejs/kit";

export const actions = {
    create_grade: async ({ request }) => {
        const data = await request.formData();
        const grade_name = data.get('name')?.toString();

        if (grade_name == null) {
            return false;
        }

        await supabaseServer.from("grades").insert({
            id: undefined,
            created_at: undefined,
            name: grade_name
        })

        console.log(`Grade: ${grade_name} added successfully`);
        return true;
    }
} satisfies Actions;