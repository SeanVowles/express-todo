import axios from 'axios';
import { Actions } from '../enums/actions';
import { TodoActionTypes } from '../types/actionTypes';

const useToggleComplete = (dispatch: React.Dispatch<TodoActionTypes>) => {
    const toggleComplete = (id: number, complete: boolean) => {
        const url = `/todos/${id}/${complete ? 'complete' : 'incomplete'}`;

        axios.put(url)
            .then(() => {
                dispatch({ type: Actions.ToggleComplete, payload: { id, complete } });
            });
    };

    return toggleComplete
};

export default useToggleComplete;
