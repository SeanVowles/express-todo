import { Todo } from '../types/todo';

export const findTodoById = (todos: Array<Todo>, id: string): number => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(id)) {
            return i;
        }
    }
    return -1;
};
