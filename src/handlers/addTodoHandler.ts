import { Request, Response } from 'express';
import { checkError } from '../errors/errorHandling';
import * as TodoService from '../services/todoService';

export const addTodoHandler = (request: Request, response: Response): void => {
    const name: string = request.body.name;
    if (!name) {
        response.status(400).send('Missing name');
        return;
    }
    TodoService.addTodo(name, (err, todos) => {
        if (checkError(err, response)) return;
        response.json({ status: 'ok' });
    });
};
