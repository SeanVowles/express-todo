import { Todo } from '../types/todoTypes';

export interface TodosState {
    todos: Todo[];
};

export const initialState: TodosState = {
    todos: [],
};
