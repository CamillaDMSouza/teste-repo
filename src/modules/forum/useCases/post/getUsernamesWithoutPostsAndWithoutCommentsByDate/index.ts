import { postRepo } from "../../../repos";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDate } from "./getUsernamesWithoutPostsAndWithoutCommentsByDate";
import { GetUsernamesWithoutPostsAndWithoutCommentsByDateController } from "./getUsernamesWithoutPostsAndWithoutCommentsByDateController";

const getUsernamesWithoutPostsAndWithoutCommentsByDate =
  new GetUsernamesWithoutPostsAndWithoutCommentsByDate(postRepo);

const getUsernamesWithoutPostsAndWithoutCommentsByDateController =
  new GetUsernamesWithoutPostsAndWithoutCommentsByDateController(
    getUsernamesWithoutPostsAndWithoutCommentsByDate
  );

export {
  getUsernamesWithoutPostsAndWithoutCommentsByDate,
  getUsernamesWithoutPostsAndWithoutCommentsByDateController
};
