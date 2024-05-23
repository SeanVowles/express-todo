import fs from 'fs';

const DB_JSON = './store/todos.json';

export const readFile = (callback: (err: NodeJS.ErrnoException | null, data: string) => void): void => {
    fs.readFile(DB_JSON, 'utf-8', callback);
}

export const writeFile = (data: string, callback: () => void): void => {
    fs.writeFile(DB_JSON, data, callback);
}
