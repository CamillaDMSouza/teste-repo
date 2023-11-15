import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace GetUsernamesWithoutPostsAndWithoutCommentsByDateErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Couldn't find a user with the supplied id.`
      } as UseCaseError);
    }
  }
}
