/**
 * @fileoverview Error classes for the GetHourWiththeMostPostsCreatedInaDay use case.
 * @packageDocumentation
 */
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace GetHourWiththeMostPostsCreatedInaDayErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Could not find the post with the specified date.`
      } as UseCaseError);
    }
  }
}
