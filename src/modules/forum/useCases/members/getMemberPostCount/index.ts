import { postRepo, memberRepo } from "../../../repos";
import { userRepo } from "../../../../users/repos";
import { GetMemberPostCount } from "./getMemberPostCount";
import { GetMemberPostCountController } from "./getMemberPostCountController";

const getMemberPostCount = new GetMemberPostCount(
  postRepo,
  memberRepo,
  userRepo
);

/**
 * Creates a new instance of GetMemberPostCountController with the provided getMemberPostCount use case.
 * @param {Function} getMemberPostCount - The use case function for getting the post count of a member.
 * @returns {GetMemberPostCountController} - A new instance of GetMemberPostCountController.
 */
const getMemberPostCountController = new GetMemberPostCountController(
  getMemberPostCount
);

export { getMemberPostCount, getMemberPostCountController };
