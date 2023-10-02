import { ApplicationError } from '../protocols';

export function participantNotFoundError(): ApplicationError {
  return {
    name: 'ParticipantNotFoundError',
    message: 'Cannot find participants with the provided ID!',
  };
};