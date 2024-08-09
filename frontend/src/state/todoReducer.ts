import { Actions } from '../enums/actions';
import { TodoActionTypes } from '../types/actionTypes';
import { TodosState } from './todoState';

export const todoReducer = (
    state: TodosState,
    action: TodoActionTypes,
): TodosState => {
    switch (action.type) {
        case Actions.SetTodos:
            return {
                ...state,
                todos: action.payload
            };
        case Actions.AddTodo:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case Actions.DeleteTodo:
            return {
                ...state,
                todos: state.todos.filter((t) => t.id !== action.payload.id)
            };
        case Actions.ToggleComplete:
            return {
                ...state,
                todos: state.todos.map((t) =>
                    t.id === action.payload.id ? { ...t, complete: !t.complete } : t
                ),
            };
        case Actions.AddLabel:
            return {
                ...state,
                todos: state.todos.map((t) =>
                    t.id === action.payload.id ? { ...t, label: action.payload.label } : t
                ),
            };
        default:
            return state;
    };
};
