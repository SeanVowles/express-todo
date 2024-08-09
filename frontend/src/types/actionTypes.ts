import { Actions } from '../enums/actions';
import { Todo } from './todoTypes';

interface AddTodoAction {
    type: Actions.AddTodo;
    payload: Todo;
}

interface DeleteTodoAction {
    type: Actions.DeleteTodo;
    payload: { id: number };
}

interface ToggleCompleteAction {
    type: Actions.ToggleComplete;
    payload: { id: number; complete: boolean };
}

interface AddLabelAction {
    type: Actions.AddLabel;
    payload: { id: number; label: string };
}

interface SetTodosAction {
    type: Actions.SetTodos,
    payload: Todo[],
}


export type TodoActionTypes = AddTodoAction | DeleteTodoAction | ToggleCompleteAction | AddLabelAction | SetTodosAction;
