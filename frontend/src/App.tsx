import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import TodoList from './components/TodoList';
import { Todo } from './types/TodoTypes';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('/todos')
            .then(response => {
                setTodos(response.data.todos);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const toggleComplete = (id: number, complete: boolean): void  => {
        const url = `/todos/${id}/${complete ? 'complete' : 'incomplete'}`;

        axios.put(url)
            .then(response => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo.id === id ? { ...todo, complete} : todo
                    )
                );
            })
            .catch(error => {
                console.error('There was an error!', error)
            });
    };

    const addLabel = (id: number, label: string): void => {
        const url = `/todos/${id}/add-label`;

        axios.put(url, { label })
            .then(response => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo.id === id ? { ...todo, label } : todo
                    )
                );
            })
            .catch (error => {
                console.error('There was an error!', error)
            });
    }

    return (
        <Container>
            <TodoList todos={todos}
                toggleComplete={toggleComplete}
                addLabel={addLabel}
            />
        </Container>
    );
};

export default App;
