import { ApplicationError } from '../protocols';

export function gamesAlreadyFinishedError(): ApplicationError {
  return {
    name: 'GamesAlreadyFinishedError',
    message: "Cannot finish a game who's already finished!",
  };
}
