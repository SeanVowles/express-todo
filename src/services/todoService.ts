import { Todo } from '../types/todo';
import { readFile, writeFile } from '../services/fileService';
import { findTodoById } from '../helpers/helperFunctions';

export const completeTodo = (id: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);
        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            return callback(new Error('Todo not found'));
        }

        todos[todoIndex].complete = true;

        writeFile(JSON.stringify(todos), () => callback(null, todos));
    });
};

export const markTodoAsIncomplete = (id: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);
        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            return callback(new Error('Todo not found'));
        }

        todos[todoIndex].complete = false;

        writeFile(JSON.stringify(todos), () => callback(null, todos));
    });
};

export const addLabel = (id: string, label: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);
        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            return callback(new Error('Todo not found'));
        }

        todos[todoIndex].label = label;

        writeFile(JSON.stringify(todos), () => callback(null, todos));
    });
};

export const addTodo = (name: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);
        const maxId: number = Math.max(...todos.map(t => t.id));

        todos.push({
            id: maxId + 1,
            name,
            complete: false
        });

        writeFile(JSON.stringify(todos), () => callback(null, todos));
    });
};

export const deleteTodo = (id: string, callback: (err: NodeJS.ErrnoException | null, todos?: Array<Todo>) => void): void => {
    readFile((err, data) => {
        if (err) return callback(err);

        const todos: Array<Todo> = JSON.parse(data);
        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            return callback(new Error('Todo not found'));
        }

        const todosWithoutDeleted: Array<Todo> = todos.filter(t => t.id !== parseInt(id));

        writeFile(JSON.stringify(todosWithoutDeleted), () => callback(null, todosWithoutDeleted));
    });
};
