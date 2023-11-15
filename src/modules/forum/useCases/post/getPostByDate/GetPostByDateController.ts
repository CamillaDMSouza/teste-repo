import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GettPostsByDateRequestDTO } from "./GetPostByDateRequestDTO";
import { GetPostsByDate } from "./GetPostByDate";
import { GettPostsByDateResponseDTO } from "./GetPostByDateResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";

export class GetPostsByDateController extends BaseController {
  private useCase: GetPostsByDate;

  constructor(useCase: GetPostsByDate) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: GettPostsByDateRequestDTO = {
      date: req.query.date ? new Date(req.query.date) : null
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
        return this.ok<GettPostsByDateResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
