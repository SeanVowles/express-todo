import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_JSON = './store/todos.json';

interface Todo {
    id: number;
    name: string;
    complete: boolean;
    label?: string;
}

const findTodoById = (todos: Array<Todo>, id: string): number => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === parseInt(id)) {
            return i;
        }
    }

    return -1;
};

const checkError = (err: NodeJS.ErrnoException | null, response: Response): Response | void => {
    if (err) {
        return response.status(500).send('Sorry, something went wrong.');
    }
};

app.get('/todos', (request: Request, response: Response): void => {
    const showPending = request.query.showPending as string;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

        if (showPending !== "1") {
            response.json({ todos: todos });
        } else {
            response.json({ todos: todos.filter(t => !t.complete) });
        }
    });
});

app.put('/todos/:id/complete', (request: Request, response: Response): void => {
    const id: string = request.params.id;

    fs.readFile(DB_JSON, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
        const todos: Array<Todo> = JSON.parse(data);

        checkError(err, response);

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
});

app.put('/todos/:id/incomplete', (request: Request, response: Response): void => {
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
});

app.put('/todos/:id/add-label', (request: Request, response: Response): void => {
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
});

app.post('/todo', (request: Request, response: Response): void => {
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
});

app.delete('/todos/:id/delete', (request: Request, response: Response): void => {
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
});

app.listen(3000, (): void => {
    console.log('Application running on http://localhost:3000');
});
