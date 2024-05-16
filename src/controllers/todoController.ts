import { Request, Response } from 'express';
import fs from 'fs';

const DB_JSON = './store/todos.json';

interface Todo {
    id: number;
    name: string;
    complete: boolean;
    label?: string;
}

const checkError = (err: NodeJS.ErrnoException | null, response: Response): Response | void => {
    if (err) {
        return response.status(500).send('Sorry, something went wrong.');
    }
};

const findTodoById = (todos: Array<Todo>, id: string): number => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(id)) {
            return i;
        }
    }
    return -1;
};

export const completeTodo = (request: Request, response: Response): void => {
    const id: string = request.params.id;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        if (err) {
            response.status(500).send('Sorry, something went wrong.');
            return;
        }

        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            response.status(404).send('Sorry, todo not found.');
            return;
        }

        todos[todoIndex].complete = true;

        fs.writeFile(DB_JSON, JSON.stringify(todos), (): void => {
            response.json({ 'status': 'ok' });
        });
    });
};

export const markTodoAsIncomplete = (request: Request, response: Response): void => {
    const id: string = request.params.id;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            response.status(404).send('Sorry, todo not found.');
            return;
        }

        todos[todoIndex].complete = false;

        fs.writeFile(DB_JSON, JSON.stringify(todos), (): void => {
            response.json({ 'status': 'ok' });
        });
    });
};

export const addLabel = (request: Request, response: Response): void => {
    const id: string = request.params.id;
    const label: string = request.body.label;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            response.status(404).send('Sorry, todo not found.');
            return;
        }

        todos[todoIndex].label = label;

        fs.writeFile(DB_JSON, JSON.stringify(todos), (): void => {
            response.json({ 'status': 'ok' });
        });
    });
};

export const addTodo = (request: Request, response: Response): void => {
    if (!request.body.name) {
        response.status(400).send('Missing name');
        return;
    }

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

        const maxId: number = Math.max(...todos.map(t => t.id));

        todos.push({
            id: maxId + 1,
            name: request.body.name,
            complete: false
        });

        fs.writeFile(DB_JSON, JSON.stringify(todos), (): void => {
            response.json({ 'status': 'ok' });
        });
    });
}

export const deleteTodo = (request: Request, response: Response): void => {
    const id: string = request.params.id;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

        const todoIndex: number = findTodoById(todos, id);

        if (todoIndex === -1) {
            response.status(404).send('Sorry, todo not found.');
            return;
        }

        const todosWithoutDeleted: Array<Todo> = todos.filter(t => t.id !== parseInt(id));

        fs.writeFile(DB_JSON, JSON.stringify(todosWithoutDeleted), (): void => {
            response.json({ 'status': 'ok' });
        });
    });
}
