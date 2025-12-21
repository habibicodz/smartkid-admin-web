import { supabaseClient } from "$lib/supabase_db/client/supabaseClient";
import type { Tables } from "$lib/supabase_db/database.types";
import { getGrades } from "$lib/supabase_db/dbutil.remote";
import type { NavigationTarget, Page } from "@sveltejs/kit";
import { createContext } from "svelte";
import { parseArgs } from "util";

interface AppState {
    grades: Tables<"grades">[];
    gradesLoading: boolean,
    navState: NavState
}

interface NavState {
    selectedGradeId: string | undefined,
    selectedSubjectId: string | undefined,
    selectedTopicId: string | undefined
}

export class AppStateClass implements AppState {
    navState: NavState = $state<NavState>({
        selectedGradeId: undefined,
        selectedSubjectId: undefined,
        selectedTopicId: undefined
    });



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

    setNavState(page: Page<{ gradeId?: string; }, "/" | "/grades" | "/grades/[gradeId]" | null>) {
        this.navState.selectedGradeId = page.params.gradeId;
    }

    setNavState(target: NavigationTarget) {
        this.navState.selectedGradeId = page.params.gradeId;
    }
}

export const [getAppContext, setAppContext] = createContext<AppStateClass>();