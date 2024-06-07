import { getTodos } from '../todosService';
import { Todo } from '../../types/todo';
import * as FileService from '../fileService';

jest.mock('../fileService');

const mockTodos: Array<Todo> = [
    { id: 1, name: 'Test Todo 1', complete: false },
    { id: 2, name: 'Test Todo 2', complete: true },
];


describe('Todos Service', () => {
    beforeEach(() => {
        (FileService.readFile as jest.Mock).mockImplementation((callback) => {
            callback(null, JSON.stringify(mockTodos));
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getTodos should return all todos', (done) => {
        getTodos('0', (err, todos) => {
            expect(err).toBeNull();
            expect(todos).toEqual(mockTodos);
            done();
        });
    });

    test('getTodos should return only pending todos', (done) => {
        getTodos('1', (err, todos) => {
            expect(err).toBeNull();
            expect(todos).toEqual([mockTodos[0]]);
            done();
        });
    });
});
