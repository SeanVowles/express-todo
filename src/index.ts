import express, { Request, Response } from 'express';
import { getTodosHandler } from './handlers/getTodosHandler';
import { completeTodoHandler } from './handlers/completeTodoHandler';
import { markTodoAsIncompleteHandler } from './handlers/incompleteTodoHandler';
import { addLabelHandler } from './handlers/addLabelHandler';
import { addTodoHandler } from './handlers/addTodoHandler';
import { deleteTodoHandler } from './handlers/deleteTodoHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/todos', getTodosHandler);
app.put('/todos/:id/complete', completeTodoHandler);
app.put('/todos/:id/incomplete', markTodoAsIncompleteHandler);
app.put('/todos/:id/add-label', addLabelHandler);
app.post('/todo', addTodoHandler);
app.delete('/todos/:id/delete', deleteTodoHandler);

app.listen(3000, (): void => {
    console.log('Application running on http://localhost:3000');
});
