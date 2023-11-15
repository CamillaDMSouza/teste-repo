import { UseCase } from "../../../../../shared/core/UseCase";
import { GetAllPostsAscendingRequestDTO } from "./GetAllPostsAscendingRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";

type Response = Either<AppError.UnexpectedError, Result<PostDetails[]>>;

/**
 * This use case is responsible for calling the data layer in order to get the all posts sorted by creation date.
 */
export class GetAllPostsAscending
  implements UseCase<GetAllPostsAscendingRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;

  /**
   * Use case constructor.
   *
   * @param postRepo the posts repository interface.
   */
  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  /**
   * The use case execution method that invokes the data layer to fetch the desired results.
   *
   * If an error occurs while calling the posts repository an `AppError.UnexpectedError` is returned.
   *
   * @param req the use case request parameters as `GetAllPostsAscendingRequestDTO` representation.
   * @returns the posts as `PostDetails[]`.
   */
  public async execute(req: GetAllPostsAscendingRequestDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getAllPostsAscending();
      return right(Result.ok<PostDetails[]>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
