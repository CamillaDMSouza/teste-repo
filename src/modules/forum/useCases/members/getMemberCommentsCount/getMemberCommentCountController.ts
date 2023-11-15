import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetMemberCommentCount } from "./getMemberCommentCount";
import { GetMemberCommentRequestDTO } from "./getMemberCommentCountRequestDTO";
import { GetMemberCommentCountResponseDTO } from "./getMemberCommentCountResponseDTO";

import * as express from "express";

/**
 * Controller class for getting the comment count of a member.
 */
export class GetMemberCommentCountController extends BaseController {
  private useCase: GetMemberCommentCount;

  /**
   * Creates an instance of GetMemberCommentCountController.
   * @param {GetMemberCommentCount} useCase - The use case for getting the comment count of a member.
   */
  constructor(useCase: GetMemberCommentCount) {
    super();
    this.useCase = useCase;
  }

  /**
   * Executes the controller action to get the comment count of a member.
   * @param {DecodedExpressRequest} req - The decoded express request object.
   * @param {express.Response} res - The express response object.
   * @returns {Promise<any>} - A promise that resolves to the response object.
   */
  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetMemberCommentRequestDTO = {
      username: req.params.username
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
        const memberCommentCount = result.value.getValue();

        return res.json({ memberCommentCount });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
