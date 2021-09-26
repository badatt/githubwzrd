export interface IExtendableError {
  message: string;
  status: number;
  errors?: any[];
  stack?: string;
}

/**
 * @extends Error
 */

class ExtendableError extends Error {
  status: number;
  errors: any[];
  constructor({ message, stack, status, errors }: IExtendableError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.stack = stack;
    this.status = status;
    this.errors = errors;
  }
}

export default ExtendableError;
