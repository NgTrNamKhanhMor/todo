<<<<<<< Updated upstream
export type Todo = {
    id: number,
    name: string,
    description: string,
    category: string,
    date: string,
    completed: boolean,
    user: number
=======
export interface Todo {
    id: number;
    name: string;
    description: string;
    category: string;
    completed: boolean;
    date: string;
    user: number,
>>>>>>> Stashed changes
}