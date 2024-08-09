import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Todo } from '../types/todoTypes';

interface TodoItemProps {
    todo: Todo;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number, complete: boolean) => void;
    addLabel: (id: number, label: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, toggleComplete, addLabel }) => {
    const [label, setLabel] = useState('');

    const handleAddLabel = () => {
        addLabel(todo.id, label);
        setLabel('')
    }

    return (
        <Card
            variant='outlined'
            sx={{
                backgroundColor: todo.complete ? '#d3ffd3' : '#ecc9c9',
                flexGrow: '3',
            }}
        >
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h5' component='div'>
                        {todo.name}
                    </Typography>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => deleteTodo(todo.id)}
                    >
                        Delete
                    </Button>
                </Box>
                {todo.label && (
                    <Typography color='textSecondary'>
                        {todo.label}
                    </Typography>
                )}
                <Box display='flex' alignItems='center' mb={2} mt={2}>
                    <TextField
                        label='Add Label'
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        variant='outlined'
                        size='small'
                        style={{ marginRight: '10px' }}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAddLabel}
                    >
                        Add Label
                    </Button>
                </Box>
                <Box display='flex' alignItems='center' mt={2}>
                    <Button
                        variant='contained'
                        color={todo.complete ? 'secondary' : 'primary'}
                        onClick={() => toggleComplete(todo.id, !todo.complete)}
                    >
                        {todo.complete ? 'Mark Incomplete' : 'Mark Complete'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
 };

export default TodoItem;
