import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { Todo } from '../types/TodoTypes';

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: number, complete: boolean) => void;
    addLabel: (id: number, label: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, addLabel }) => {
    const [label, setLabel] = useState('');

    const handleAddLabel = () => {
        addLabel(todo.id, label);
        setLabel('')
    }

    return (
        <Card
            variant='outlined'
            sx={{
                marginBottom: '10px',
                backgroundColor: todo.complete ? '#d3ffd3' : '#ecc9c9',
            }}
        >
            <CardContent>
                <Box display={'flex'} alignItems={'left'} gap={5}>
                    <Typography variant='h5' component='div'>
                        {todo.name}
                    </Typography>
                    <Typography variant='body2'>
                        {todo.complete ? 'Completed' : 'Not Completed'}
                    </Typography>
                </Box>

                {todo.label && (
                    <Typography color='textSecondary'>
                        {todo.label}
                    </Typography>
                )}

                <Box display={'flex'} alignItems={'center'} mb={2}>
                    <TextField
                        label="Add Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '10px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddLabel}
                    >
                        Add Label
                    </Button>
                </Box>

                <Box display={'flex'} alignItems={'center'} mt={2}>
                <Button
                    variant='contained'
                    color={todo.complete ? 'secondary' : 'primary'}
                    onClick={() => toggleComplete(todo.id, !todo.complete)}
                >
                    {todo.complete ? "Mark Incomplete" : "Mark Complete"}

                </Button>
                </Box>

            </CardContent>
        </Card>
    );
 };

export default TodoItem;
