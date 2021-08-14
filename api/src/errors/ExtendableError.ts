/**
 * @extends Error
 */

export interface IExtendableError {
  message: string;
  errors?: string[];
  status?: number;
  isPublic?: boolean;
  stack?: string;
}

class ExtendableError extends Error {
  public errors: string[];
  public status: number;
  public isPublic: boolean;
  public isOperational: boolean;
  constructor(props: IExtendableError) {
    super(props.message);
    this.name = this.constructor.name;
    this.message = props.message;
    this.errors = props.errors;
    this.status = props.status;
    this.isPublic = props.isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = props.stack;
  }
}

export default ExtendableError;
