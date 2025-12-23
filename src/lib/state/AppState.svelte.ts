import { getGrades, supabaseClient } from "$lib/supabase_db/client/supabaseClient";
import type { Tables } from "$lib/supabase_db/database.types";
import { createContext } from "svelte";

interface AppState {
    grades: Tables<"grades">[];
    gradesLoading: boolean
}

export interface AlertDialogState {
    title?: string,
    description?: string
}


export class AppStateClass implements AppState {
    grades = $state<Tables<"grades">[]>([]);
    gradesLoading = $state<boolean>(false);

    loadInitialData = async () => {
        this.gradesLoading = true;
        const initialData = await getGrades();
        this.gradesLoading = false;
        this.pushGrade(...initialData);
    };



    gradesChanges = supabaseClient.channel('realtime_grade_changes').on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'grades'
        },

        (payload) => {
            const grade = payload.new as Tables<'grades'>;
            this.pushGrade(grade);
        }
    )

    AppStateClass() { }

    pushGrade(...grade: Tables<"grades">[]) {
        this.grades.push(...grade);
    }
}

export const [getAppContext, setAppContext] = createContext<AppStateClass>();