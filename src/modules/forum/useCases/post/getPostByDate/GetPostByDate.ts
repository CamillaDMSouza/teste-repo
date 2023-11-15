import { UseCase } from "../../../../../shared/core/UseCase";
import { GettPostsByDateRequestDTO } from "./GetPostByDateRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";

type Response = Either<AppError.UnexpectedError, Result<PostDetails[]>>;

export class GetPostsByDate
  implements UseCase<GettPostsByDateRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute(req: GettPostsByDateRequestDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getPostsByDate(req.date);
      return right(Result.ok<PostDetails[]>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
