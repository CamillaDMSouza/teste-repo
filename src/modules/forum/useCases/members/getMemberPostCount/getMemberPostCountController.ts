import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetMemberPostCountRequestDTO } from "./getMemberPostCountRequestDTO";
import { GetMemberPostCountResponseDTO } from "./getMemberPostCountResponseDTO";
import { GetMemberPostCount } from "./getMemberPostCount";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

import * as express from "express";

/**
 * Controller class for getting the post count of a member.
 */
export class GetMemberPostCountController extends BaseController {
  private useCase: GetMemberPostCount;

  /**
   * Creates a new instance of GetMemberPostCountController.
   * @param useCase The use case for getting the post count of a member.
   */
  constructor(useCase: GetMemberPostCount) {
    super();
    this.useCase = useCase;
  }

  /**
   * Executes the controller logic to get the post count of a member.
   * @param req The decoded express request.
   * @param res The express response.
   * @returns A promise that resolves to the response object.
   */
  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetMemberPostCountRequestDTO = {
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
        const memberPostCount = result.value.getValue();

        return res.json({ memberPostCount });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
