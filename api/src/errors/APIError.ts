import { INTERNAL_SERVER_ERROR } from 'http-status';
import { IExtendableError } from './ExtendableError';
import ExtendableError from './ExtendableError';

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({ message, stack, errors, status = INTERNAL_SERVER_ERROR }: IExtendableError) {
    super({
      message,
      stack,
      status,
      errors,
    });
  }
}

export default APIError;
