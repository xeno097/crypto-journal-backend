import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class EntityNotFoundError extends BaseError {
  code = ErrorCode.ENTITY_NOT_FOUND;

  constructor(entityName: string) {
    super();

    Object.setPrototypeOf(this, EntityNotFoundError.prototype);

    this.message = `${entityName} not found`;
  }
}
