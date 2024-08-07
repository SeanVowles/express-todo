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

    const addTodo = (name: string) => {
        // Because the add-todo endpoint only returns a status: OK.
        // We need to manually build up a todo object that we can push back to the front end.
        // The issue with this is that we have to manually put an ID on the todo. This requires
        //  knowing about the data store behavior. In this instance, simply adding +1 to the last
        //  ID will work fine, but if this was an RDS, when we delete one, the ID of the next added
        //  todo will not match what is in the database.
        //  E.g. we have ID 1, 2, 3, 4 in the database. We delete 4. When we add a new one, on the
        //  on the front end, it'll have an ID of 4, but in the DB it'll have an ID of 5.
        // This function will need to be refactored.
        const newTodo: Todo = {
            id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
            name,
            complete: false,
        };

        const url = '/todo';

        axios.post(url, { name, complete: false })
            .then(response => {
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            })
            .catch((error) => {
                console.error('Error adding todos!', error);
            });
    };

    const deleteTodo = (id: number) => {
        const url = `/todos/${id}/delete`;

        axios.delete(url)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.filter(todo => todo.id !== id)
                );
            })
            .catch((error) => {
                console.error('Error deleting todo!', error)
            });
    };

    const toggleComplete = (id: number, complete: boolean): void  => {
        const url = `/todos/${id}/${complete ? 'complete' : 'incomplete'}`;

        axios.put(url)
            .then(response => {
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo.id === id ? { ...todo, complete } : todo
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
                addTodo={addTodo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                addLabel={addLabel}
            />
        </Container>
    );
};

export default App;
