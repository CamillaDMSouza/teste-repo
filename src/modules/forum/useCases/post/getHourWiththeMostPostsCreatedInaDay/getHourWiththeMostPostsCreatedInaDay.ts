/**
 * Use case that retrieves the hour with the most posts created in a day.
 */

import { UseCase } from "../../../../../shared/core/UseCase";
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { getHourWiththeMostPostsCreatedInaDayDTO } from "./getHourWiththeMostPostsCreatedInaDayDTO";

type Response = Either<AppError.UnexpectedError, Result<number>>;

export class GetHourWiththeMostPostsCreatedInaDay
  implements
    UseCase<getHourWiththeMostPostsCreatedInaDayDTO, Promise<Response>>
{
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute(
    req: getHourWiththeMostPostsCreatedInaDayDTO
  ): Promise<Response> {
    const hour = await this.postRepo.getHourWiththeMostPostsCreatedInaDay(
      req.date
    );

    return right(Result.ok<number>(hour));
  }
}
