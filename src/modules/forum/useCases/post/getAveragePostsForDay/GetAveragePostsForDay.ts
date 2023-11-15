import { UseCase } from "../../../../../shared/core/UseCase";
import { GetAveragePostsForDayRequestDTO } from "./GetAveragePostsForDayRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { IPostRepo } from "../../../repos/postRepo";

type Response = Either<AppError.UnexpectedError, Result<Number>>;

/**
 * This use case is responsible for calling the data layer in order to get the average posts per user for a specific day.
 */
export class GetAveragePostsForDay
  implements UseCase<GetAveragePostsForDayRequestDTO, Promise<Response>>
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
   * @param req the use case request parameters as `GetAveragePostsForDayRequestDTO` representation.
   * @returns the average posts per user for a specific day as `GetAveragePostsForDayResponseDTO`.
   */
  public async execute(
    req: GetAveragePostsForDayRequestDTO
  ): Promise<Response> {
    try {
      const average = await this.postRepo.getAveragePostsForDay(req.day);
      return right(Result.ok<Number>(average));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
