import { Todo } from '../../types/todo';
import * as FileService from '../fileService';

jest.mock('../fileService');

const mockTodos: Array<Todo> = [
    {
        id: 1,
        name: 'test-1',
        complete: false,
    },
    {
        id: 2,
        name: 'test-2',
        complete: false,
    },
    {
        id: 3,
        name: 'test-3',
        complete: false,
    },
];

describe('todoService', () => {
    beforeEach(() => {
        (FileService.readFile as jest.Mock).mockImplementation((callback) => {
            callback(null, JSON.stringify(mockTodos));
        });
    });
})
