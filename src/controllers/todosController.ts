import { Request, Response } from 'express';
import fs from 'fs';

interface Todo {
    id: number;
    name: string;
    complete: boolean;
    label?: string;
}

const DB_JSON = './store/todos.json';

export const getTodos = (request: Request, response: Response): void => {
    const showPending = request.query.showPending as string;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        if (err) {
            response.status(500).send('Sorry, something went wrong.');
            return;
        }

        if (showPending !== "1") {
            response.json({ todos: todos });
        } else {
            response.json({ todos: todos.filter(t => !t.complete) });
        }
    });
};
