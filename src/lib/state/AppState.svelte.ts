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
        this.pushGrade(...initialData ?? []);
    };



    gradesChanges = supabaseClient
        .channel('realtime_grade_changes')
        .on(
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
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'grades'
            },
            (payload) => {
                const grade = payload.new as Tables<'grades'>;
                this.updateGrade(grade);
            }
        )
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: 'grades'
            },
            (payload) => {
                const gradeId = payload.old.id as string;
                this.removeGrade(gradeId);
            }
        )

    AppStateClass() { }

    // Add new grades
    pushGrade(...grades: Tables<'grades'>[]) {
        this.grades.push(...grades);
    }

    // Update existing grade(s) by ID
    updateGrade(...grades: Tables<'grades'>[]) {
        grades.forEach((updatedGrade) => {
            const index = this.grades.findIndex((g) => g.id === updatedGrade.id);
            if (index !== -1) {
                this.grades[index] = updatedGrade;
            }
        });
    }

    // Remove grade(s) by ID
    removeGrade(...gradeIds: string[]) {
        gradeIds.forEach((id) => {
            const index = this.grades.findIndex((g) => g.id === id);
            if (index !== -1) {
                this.grades.splice(index, 1);
            }
        });
    }
}

export const [getAppContext, setAppContext] = createContext<AppStateClass>();