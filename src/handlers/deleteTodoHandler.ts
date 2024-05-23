import { Request, Response } from 'express';
import { checkError } from '../errors/errorHandling';
import * as TodoService from '../services/todoService';

export const deleteTodoHandler = (request: Request, response: Response): void => {
    const id: string = request.params.id;
    TodoService.deleteTodo(id, (err, todos) => {
        if (checkError(err, response)) return;
        response.json({ status: 'ok' });
    });
};
