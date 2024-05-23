import { Request, Response } from 'express';
import { checkError } from '../errors/errorHandling';
import * as TodoService from '../services/todoService';

export const addLabelHandler = (request: Request, response: Response): void => {
    const id: string = request.params.id;
    const label: string = request.body.label;
    TodoService.addLabel(id, label, (err, todos) => {
        if (checkError(err, response)) return;
        response.json({ status: 'ok' });
    });
};
