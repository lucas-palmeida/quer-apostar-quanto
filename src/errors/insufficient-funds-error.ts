import { ApplicationError } from '../protocols';

export function insufficientFundsError(): ApplicationError {
  return {
    name: 'InsufficientFundsError',
    message: "The participant doesn't have enough balance for the bet!",
  };
};