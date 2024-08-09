import axios from 'axios';
import { Actions } from '../enums/actions';
import { TodoActionTypes } from '../types/actionTypes';

const useDeleteTodo = (dispatch: React.Dispatch<TodoActionTypes>) => {
    const deleteTodo = (id: number) => {
        const url = `/todos/${id}/delete`;

        axios.delete(url)
            .then(() => {
                dispatch({ type: Actions.DeleteTodo, payload: { id } });
            });
    }

    return deleteTodo;

};

export default useDeleteTodo;
