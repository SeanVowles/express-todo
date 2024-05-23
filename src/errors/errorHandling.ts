import { Response } from 'express';

export const checkError = (err: NodeJS.ErrnoException | null, response: Response): boolean => {
    if (err) {
        response.status(500).send('Sorry, something went wrong.');
        return true;
    }
    return false;
};
