import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import TodoList from './components/TodoList';
import { todoReducer } from './state/todoReducer';
import { initialState } from './state/todoState';
import useAddTodo from './hooks/addTodo';
import useDeleteTodo from './hooks/deleteTodo';
import useAddLabel from './hooks/addLabel';
import useToggleComplete from './hooks/toggleComplete';
import { Actions } from './enums/actions';

const App: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        axios.get('/todos')
            .then(response => {
                dispatch({ type: Actions.SetTodos, payload: response.data.todos })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <Container>
            <TodoList todos={state.todos}
                addTodo={useAddTodo(dispatch, state.todos)}
                deleteTodo={useDeleteTodo(dispatch)}
                toggleComplete={useToggleComplete(dispatch)}
                addLabel={useAddLabel(dispatch)}
            />
        </Container>
    );
};

export default App;
