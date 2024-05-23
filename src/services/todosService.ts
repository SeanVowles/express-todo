import { Todo } from '../types/todo';
import { readFile } from './fileService';

export const getTodos = (showPending: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);

        if (showPending !== "1") {
            return callback(null, todos);
        } else {
            return callback(null, todos.filter(t => !t.complete));
        }
    });
};
