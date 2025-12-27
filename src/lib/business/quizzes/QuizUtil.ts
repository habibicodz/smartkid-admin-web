export enum QuestionMediaType {
    text = 'Text'
}

export interface QuizOption {
    id: string,
    content: string
}

export interface Option {
    id: string;
    content: string;
}

export interface Answer {
    type: 'text'; // | 'image' | 'pair' | 'number';
    options?: Option[];
    content?: string;
    is_correct?: boolean;
    meta: object;
}

export interface Question {
    id: string;
    type: 'mcq' | 'scq' | 'true_false';
    media_type: 'text';
    media_url?: string,
    font_key?: string,
    content: string;
    answer: Answer;
}