import express, { Request, Response } from 'express';
import { getTodos } from './controllers/todosController';
import { addLabel, addTodo, completeTodo, deleteTodo, markTodoAsIncomplete } from './controllers/todoController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_JSON = './store/todos.json';

app.get('/todos', getTodos);
app.put('/todos/:id/complete', completeTodo);
app.put('/todos/:id/incomplete', markTodoAsIncomplete);
app.put('/todos/:id/add-label', addLabel);
app.post('/todo', addTodo);
app.delete('/todos/:id/delete', deleteTodo);

app.listen(3000, (): void => {
    console.log('Application running on http://localhost:3000');
});
