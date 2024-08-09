import axios from 'axios';
import { TodoActionTypes } from '../types/actionTypes';
import { Actions } from '../enums/actions';
import { Todo } from '../types/todoTypes';

const useAddTodo = (dispatch: React.Dispatch<TodoActionTypes>, todos: Todo[]) => {
    const addTodo = (name: string) => {
        const newTodo: Todo = {
            id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
            name,
            complete: false,
        };

        const url = '/todo';

        axios.post(url, { name, complete: false })
            .then(() => {
                dispatch({ type: Actions.AddTodo, payload: newTodo });
            });
    };

    return addTodo;
};

export default useAddTodo;
