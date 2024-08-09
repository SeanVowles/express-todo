import React, { useState } from 'react';
import { Todo } from '../types/todoTypes';
import TodoItem from './TodoItem';
import { Box, Button, TextField, Typography } from '@mui/material';

interface TodoListProps {
    todos: Todo[];
    addTodo: (name: string) => void;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number, complete: boolean) => void;
    addLabel: (id: number, label: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, addTodo, deleteTodo, toggleComplete, addLabel }) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() === '') return;
        addTodo(newTodo);
        setNewTodo('');
    };

    return (
        <Box>
            <Typography variant='h4' component='h1' gutterBottom>
                Todo List
            </Typography>
            <Box display='flex' alignItems='center' mb='10px' gap='10px'>
                <TextField
                    label='New Todo'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    variant='outlined'
                    size='small'
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddTodo}
                >
                    Add Todo
                </Button>
            </Box>
            <Box display='flex' flexWrap='wrap' gap='10px'>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        toggleComplete={toggleComplete}
                        addLabel={addLabel}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TodoList;
