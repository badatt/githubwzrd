import { BAD_REQUEST } from 'http-status';
import { IExtendableError } from './ExtendableError';
import APIError from './APIError';

interface IValidationError {
  property: string;
  type: string;
  message: string;
}

export interface IRequestValidationError extends IExtendableError {
  errors?: IValidationError[];
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class RequestValidationError extends APIError {
  errors: IValidationError[];
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({ message, stack, errors, status = BAD_REQUEST }: IRequestValidationError) {
    super({
      message,
      stack,
      status,
      errors,
    });
    this.errors = errors;
  }
}

export default RequestValidationError;
