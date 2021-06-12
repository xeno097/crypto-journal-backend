import { BaseError } from '../base-error.abstract-error';

export class InvalidOperationInput extends BaseError {
  constructor(context: string, reason: string) {
    super();

    super.getErrorMessage(context, reason);

    Object.setPrototypeOf(this, InvalidOperationInput.prototype);
  }
}
