import { UseCase } from "../../../../../shared/core/UseCase";
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { getPercentageOfPostsWithoutCommentsDTO } from "./getPercentageOfPostsWithoutCommentsDTO";

type Response = Either<AppError.UnexpectedError, Result<number>>;

export class GetPercentageOfPostsWithoutComments
  implements UseCase<getPercentageOfPostsWithoutCommentsDTO, Promise<Response>>
{
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute(
    req: getPercentageOfPostsWithoutCommentsDTO
  ): Promise<Response> {
    const percentage =
      ((await this.postRepo.getNumberOfPostsWithoutCommentsByDate(req.date)) /
        (await this.postRepo.getTotalNumberOfPosts())) *
      100;

    return right(Result.ok<number>(Number(percentage.toFixed(2))));
  }
}
