import { BaseError } from './base-error.abstract-error';

export class EmailError extends BaseError {
  constructor() {
    super();

    Object.setPrototypeOf(this, EmailError.prototype);
  }
}
