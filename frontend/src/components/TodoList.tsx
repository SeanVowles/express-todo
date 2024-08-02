import React from 'react';
import { Todo } from '../types/TodoTypes';
import TodoItem from './TodoItem';
import { Grid } from '@mui/material';

interface TodoListProps {
    todos: Todo[];
    toggleComplete: (id: number, complete: boolean) => void;
    addLabel: (id: number, label: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, addLabel }) => {
    return (
        <Grid container spacing={2}>
            {todos.map(todo => (
                <Grid item xs={12} sm={6} md={4} key={todo.id}>
                    <TodoItem todo={todo}
                        toggleComplete={toggleComplete}
                        addLabel={addLabel}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TodoList;
