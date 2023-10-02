import { ApplicationError } from '../protocols';

export function gameNotFoundError(): ApplicationError {
  return {
    name: 'GameNotFoundError',
    message: 'Cannot find game with the provided ID!',
  };
};
