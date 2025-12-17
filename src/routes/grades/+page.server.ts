import { getClients } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
    const grades = getClients();

    return {
        result: grades
    };
}