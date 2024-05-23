import { Request, Response } from 'express';
import { checkError } from '../errors/errorHandling';
import * as TodoService from '../services/todosService';

export const getTodosHandler = (request: Request, response: Response): void => {
    const showPending = request.query.showPending as string;
    TodoService.getTodos(showPending, (err, todos) => {
        if (checkError(err, response)) return;
        response.json({ todos: todos });
    });
};
