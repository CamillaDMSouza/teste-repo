import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetMemberCommentRequestDTO } from "./getMemberCommentCountRequestDTO";
import { GetMemberCommentCountResponseDTO } from "./getMemberCommentCountResponseDTO";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IUserRepo } from "../../../../users/repos/userRepo";

type Response = Either<AppError.UnexpectedError, Result<number>>;

/**
 * Use case to get the number of comments made by a member.
 */
export class GetMemberCommentCount
  implements UseCase<GetMemberCommentRequestDTO, Promise<Response>>
{
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;
  private userRepo: IUserRepo;

  /**
   * Creates an instance of GetMemberCommentCount.
   * @param {ICommentRepo} commentRepo - The comment repository.
   * @param {IMemberRepo} memberRepo - The member repository.
   */
  constructor(
    commentRepo: ICommentRepo,
    memberRepo: IMemberRepo,
    userRepo: IUserRepo
  ) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
    this.userRepo = userRepo;
  }

  /**
   * Executes the use case to get the number of comments made by a member.
   * @param {GetMemberCommentRequestDTO} dto - The data transfer object containing the user ID.
   * @returns {Promise<Response>} A promise that resolves to a response containing the number of comments made by the member.
   */
  public async execute(dto: GetMemberCommentRequestDTO): Promise<Response> {
    let memberCommentCount: number;
    let memberId: MemberId;
    let userId: string;

    try {
      userId = await this.userRepo.getUserIdByUserName(dto.username);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    try {
      memberId = await this.memberRepo.getMemberIdByUserId(userId);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    try {
      memberCommentCount = await this.commentRepo.getMemberCommentCount(
        memberId
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return right(Result.ok<number>(memberCommentCount));
  }
}
