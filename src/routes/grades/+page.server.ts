import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { data } = await supabase.from("grades").select();
    console.log(data);
    return {
        grades: data ?? []
    }
}