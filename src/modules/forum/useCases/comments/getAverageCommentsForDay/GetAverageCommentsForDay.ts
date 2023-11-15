import { UseCase } from "../../../../../shared/core/UseCase";
import { GetAverageCommentsForDayRequestDTO } from "./GetAverageCommentsForDayRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ICommentRepo } from "../../../repos/commentRepo";

type Response = Either<AppError.UnexpectedError, Result<Number>>;

export class GetAverageCommentsForDay
  implements UseCase<GetAverageCommentsForDayRequestDTO, Promise<Response>>
{
  private commentRepo: ICommentRepo;

  constructor(commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }

  public async execute(
    request: GetAverageCommentsForDayRequestDTO
  ): Promise<Response> {
    try {
      console.log(request);
      const averageCommentDay =
        await this.commentRepo.getNumberOfCommentsOnDate(request.date);

      const averageCommentMembersDay =
        await this.commentRepo.getNumberOfCommentsMembersOnDate(
          request.date,
          request.memberId,
          request.commentMemberId
        );

      const average = averageCommentDay / averageCommentMembersDay;
      return right(Result.ok<number>(average));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
