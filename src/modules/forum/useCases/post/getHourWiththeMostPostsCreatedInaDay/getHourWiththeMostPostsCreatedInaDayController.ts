/**
 * Controller for getting the hour with the most posts created in a day.
 * @remarks
 * This controller handles HTTP requests and responses.
 * It uses the GetHourWiththeMostPostsCreatedInaDay use case to retrieve the hour with the most posts created in a day.
 */
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetHourWiththeMostPostsCreatedInaDay } from "./getHourWiththeMostPostsCreatedInaDay";
import { getHourWiththeMostPostsCreatedInaDayDTO } from "./getHourWiththeMostPostsCreatedInaDayDTO";
import { GetHourWiththeMostPostsCreatedInaDayErrors } from "./getHourWiththeMostPostsCreatedInaDayErrors";

export class GetHourWiththeMostPostsCreatedInaDayController extends BaseController {
  private useCase: GetHourWiththeMostPostsCreatedInaDay;

  constructor(useCase: GetHourWiththeMostPostsCreatedInaDay) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: getHourWiththeMostPostsCreatedInaDayDTO = {
      date: req.query.date ? new Date(req.query.date) : null
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetHourWiththeMostPostsCreatedInaDayErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res, {
          hour: result.value.getValue()
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
