import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetAllPostsAscendingRequestDTO } from "./GetAllPostsAscendingRequestDTO";
import { GetAllPostsAscending } from "./GetAllPostsAscending";
import { GetAllPostsAscendingResponseDTO } from "./GetAllPostsAscendingResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";

/**
 * Get all posts ascending controller.
 *
 * This controller is responsible for handling requests for the "/allpostsacending" route and calling the use cases layers.
 */
export class GetAllPostsAscendingController extends BaseController {
  private useCase: GetAllPostsAscending;

  /**
   * Controller constructor.
   *
   * @param useCase the use case associated to the business requirements of the get all posts sorted by points and creation date ascending.
   */
  constructor(useCase: GetAllPostsAscending) {
    super();
    this.useCase = useCase;
  }

  /**
   * Handler responsible for handling the request and forward it to the use cases layer.
   * It picks the request context, transforms it into a `GetAllPostsAscendingRequestDTO` that it passed to the use case.
   * The use case then returns the `PostDetails[]` and it is mapped into the `GetAllPostsAscendingResponseDTO`.
   *
   * If an error occurs calling the use case it calls the BaseController.fail method to handle the error properly.
   *
   * @param req the request context.
   * @param res the response handler.
   * @returns the resulting result response as `GetAllPostsAscendingResponseDTO` Data Transfer Object.
   */
  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetAllPostsAscendingRequestDTO = {
      userId: !!req.decoded === true ? req.decoded.userId : null
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
        const postDetails = result.value.getValue();
        return this.ok<GetAllPostsAscendingResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
