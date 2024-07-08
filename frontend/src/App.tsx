import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
    id: number;
    name: string;
    complete: boolean;
};

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

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.name} </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
