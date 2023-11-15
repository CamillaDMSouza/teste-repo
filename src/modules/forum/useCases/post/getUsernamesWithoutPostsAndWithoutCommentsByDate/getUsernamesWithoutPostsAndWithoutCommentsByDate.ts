import { UseCase } from "../../../../../shared/core/UseCase";
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDateDTO } from "./getUsernamesWithoutPostsAndWithoutCommentsByDateDTO";

type Response = Either<AppError.UnexpectedError, Result<string[]>>;

export class GetUsernamesWithoutPostsAndWithoutCommentsByDate
  implements
    UseCase<
      GetUsernamesWithoutPostsAndWithoutCommentsByDateDTO,
      Promise<Response>
    >
{
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute(
    req: GetUsernamesWithoutPostsAndWithoutCommentsByDateDTO
  ): Promise<Response> {
    const usernames =
      await this.postRepo.getListOfUsernamesWithoutPostAndWithoutCommentsByDate(
        req.date
      );

    return right(Result.ok<string[]>(usernames));
  }
}
