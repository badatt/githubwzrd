export interface IExtendableError {
  message: string;
  status: number;
  stack?: string;
}

/**
 * @extends Error
 */

class ExtendableError extends Error {
  status: number;
  message: string;
  constructor({ message, stack, status }: IExtendableError) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}

export default ExtendableError;
