import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDate } from "./getUsernamesWithoutPostsAndWithoutCommentsByDate";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDateDTO } from "./getUsernamesWithoutPostsAndWithoutCommentsByDateDTO";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDateErrors } from "./getUsernamesWithoutPostsAndWithoutCommentsByDateErrors";

export class GetUsernamesWithoutPostsAndWithoutCommentsByDateController extends BaseController {
  private useCase: GetUsernamesWithoutPostsAndWithoutCommentsByDate;

  constructor(useCase: GetUsernamesWithoutPostsAndWithoutCommentsByDate) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: GetUsernamesWithoutPostsAndWithoutCommentsByDateDTO = {
      date: req.query.date ? new Date(req.query.date) : null
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetUsernamesWithoutPostsAndWithoutCommentsByDateErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res, {
          usernames: result.value.getValue()
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
