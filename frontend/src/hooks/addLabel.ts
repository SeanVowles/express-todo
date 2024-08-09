import axios from 'axios';
import { TodoActionTypes } from '../types/actionTypes';
import { Actions } from '../enums/actions';

const useAddLabel = (dispatch: React.Dispatch<TodoActionTypes>) => {
    const addLabel = (id: number, label: string) => {
        const url = `/todos/${id}/add-label`;

        axios.put(url, { label })
            .then(() => {
                dispatch({
                    type: Actions.AddLabel,
                    payload: { id, label }
                });
            });
    };

    return addLabel;
};

export default useAddLabel;
