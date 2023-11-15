import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAveragePostsForDayRequestDTO } from "./GetAveragePostsForDayRequestDTO";
import { GetAveragePostsForDay } from "./GetAveragePostsForDay";
import { GetAveragePostsForDayResponseDTO } from "./GetAveragePostsForDayResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";

/**
 * Get the average posts for a specific day controller.
 *
 * This controller is responsible for handling requests for the "/averageposts" route and calling the use cases layers.
 */
export class GetAveragePostsForDayController extends BaseController {
  private useCase: GetAveragePostsForDay;

  /**
   * Controller constructor.
   *
   * @param useCase the use case associated to the business requirements of the get the average posts per user for a specific day.
   */
  constructor(useCase: GetAveragePostsForDay) {
    super();
    this.useCase = useCase;
  }

  /**
   * Handler responsible for handling the request and forward it to the use cases layer.
   * It picks the request context, transforms it into a `GetAveragePostsForDayRequestDTO` that it passed to the use case.
   * The use case then returns the `PostDetails[]` and it is mapped into the `GetAveragePostsForDayResponseDTO`.
   *
   * If an error occurs calling the use case it calls the BaseController.fail method to handle the error properly.
   *
   * @param req the request context.
   * @param res the response handler.
   * @returns the resulting result response as `GetAveragePostsForDayResponseDTO` Data Transfer Object.
   */
  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetAveragePostsForDayRequestDTO = {
      userId: !!req.decoded === true ? req.decoded.userId : null,
      day: new Date(req.query.day)
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok<GetAveragePostsForDayResponseDTO>(res, {
          average: result.value.getValue()
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
