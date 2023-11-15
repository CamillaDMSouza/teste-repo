import { postRepo } from "../../../repos";
import { GetPercentageOfPostsWithoutComments } from "./getPercentageOfPostsWithoutComments";
import { GetPercentageOfPostsWithoutCommentsController } from "./getPercentageOfPostsWithoutCommentsController";

const getPercentageOfPostsWithoutComments =
  new GetPercentageOfPostsWithoutComments(postRepo);

const getPercentageOfPostsWithoutCommentsController =
  new GetPercentageOfPostsWithoutCommentsController(
    getPercentageOfPostsWithoutComments
  );

export {
  getPercentageOfPostsWithoutComments,
  getPercentageOfPostsWithoutCommentsController
};
