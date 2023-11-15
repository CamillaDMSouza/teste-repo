import { GetMemberCommentCount } from "./getMemberCommentCount";
import { GetMemberCommentCountController } from "./getMemberCommentCountController";
import { commentRepo, memberRepo } from "../../../repos";
import { userRepo } from "../../../../users/repos";

const getMemberCommentCount = new GetMemberCommentCount(
  commentRepo,
  memberRepo,
  userRepo
);

/**
 * Creates a new instance of GetMemberCommentCountController with the provided getMemberCommentCount use case.
 * @param getMemberCommentCount - The use case for getting the comment count of a member.
 * @returns A new instance of GetMemberCommentCountController.
 */
const getMemberCommentCountController = new GetMemberCommentCountController(
  getMemberCommentCount
);

export { getMemberCommentCount, getMemberCommentCountController };
