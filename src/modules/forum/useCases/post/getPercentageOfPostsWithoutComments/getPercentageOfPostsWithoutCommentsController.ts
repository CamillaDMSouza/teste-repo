import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetPercentageOfPostsWithoutComments } from "./getPercentageOfPostsWithoutComments";
import { getPercentageOfPostsWithoutCommentsDTO } from "./getPercentageOfPostsWithoutCommentsDTO";
import { GetPercentageOfPostsWithoutCommentsErrors } from "./getPercentageOfPostsWithoutCommentsErrors";

export class GetPercentageOfPostsWithoutCommentsController extends BaseController {
  private useCase: GetPercentageOfPostsWithoutComments;

  constructor(useCase: GetPercentageOfPostsWithoutComments) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: getPercentageOfPostsWithoutCommentsDTO = {
      date: req.query.date ? new Date(req.query.date) : null
    };
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetPercentageOfPostsWithoutCommentsErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res, {
          percentage: result.value.getValue()
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
