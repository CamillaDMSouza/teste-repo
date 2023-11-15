import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { GetMemberPostCountRequestDTO } from "./getMemberPostCountRequestDTO";
import { GetMemberPostCountResponseDTO } from "./getMemberPostCountResponseDTO";
import { AppError } from "../../../../../shared/core/AppError";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IUserRepo } from "../../../../users/repos/userRepo";

type Response = Either<AppError.UnexpectedError, Result<number>>;

/**
 * Use case to get the post count of a member.
 */
export class GetMemberPostCount
  implements UseCase<GetMemberPostCountRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;
  private userRepo: IUserRepo;

  /**
   * Creates an instance of GetMemberPostCount.
   * @param {IPostRepo} postRepo - The post repository.
   * @param {IMemberRepo} memberRepo - The member repository.
   */
  constructor(
    postRepo: IPostRepo,
    memberRepo: IMemberRepo,
    userRepo: IUserRepo
  ) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
    this.userRepo = userRepo;
  }

  /**
   * Executes the use case to get the post count of a member.
   * @param {GetMemberPostCountRequestDTO} dto - The data transfer object containing the user ID.
   * @returns {Promise<Response>} A promise that resolves to a response containing the member's post count.
   */
  public async execute(dto: GetMemberPostCountRequestDTO): Promise<Response> {
    let memberPostCount: number;
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
      memberPostCount = await this.postRepo.getMemberPostCount(memberId);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return right(Result.ok<number>(memberPostCount));
  }
}
