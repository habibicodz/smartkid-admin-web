import { supabaseClient } from "$lib/supabase_db/client/supabaseClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const { data } = await supabaseClient.from('grades').select();
    return {
        grades: data ?? []
    };
}