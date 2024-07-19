import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Todo } from '../types/TodoTypes';

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: number, complete: boolean) => void;
}

 const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete }) => {
    return (
        <Card
            variant='outlined'
            sx={{
                marginBottom: '10px',
                backgroundColor: todo.complete ? '#d3ffd3' : '#ecc9c9',
            }}
        >
            <CardContent>
                <Typography variant='h5' component='div'>
                    {todo.name}
                </Typography>
                {todo.label && (
                    <Typography color='textSecondary'>
                        {todo.label}
                    </Typography>
                )}
                <Typography variant='body2'>
                    {todo.complete ? 'Completed' : 'Not Completed'}
                </Typography>
                <Button
                    variant='contained'
                    color={todo.complete ? 'secondary' : 'primary'}
                    onClick={() => toggleComplete(todo.id, !todo.complete)}
                >
                    {todo.complete ? "Mark Incomplete" : "Mark Complete"}

                </Button>
            </CardContent>
        </Card>
    );
 };

export default TodoItem;
