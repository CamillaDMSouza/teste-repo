import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { EditPost } from "./EditPost";
import { EditPostDTO } from "./EditPostDTO";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { EditPostErrors } from "./EditPostErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import * as express from "express";

export class EditPostController extends BaseController {
  private useCase: EditPost;

  constructor(useCase: EditPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { userId } = req.decoded;
    const postId = req.params.id; 

    const dto: EditPostDTO = {
      postId: postId,
      title: TextUtils.sanitize(req.body.title),
      text: !!req.body.text ? TextUtils.sanitize(req.body.text) : null,
      userId: userId,
      link: !!req.body.link ? TextUtils.sanitize(req.body.link) : null,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case EditPostErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
