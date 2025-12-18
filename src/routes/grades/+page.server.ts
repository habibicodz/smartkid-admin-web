import { supabase } from "$lib/supabase_db/supabaseClient";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { data } = await supabase.from('grades').select();
    return  {
        grades: data ?? []
    };
}