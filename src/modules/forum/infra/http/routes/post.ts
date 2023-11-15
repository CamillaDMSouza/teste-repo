import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createPostController } from "../../../useCases/post/createPost";
import { getRecentPostsController } from "../../../useCases/post/getRecentPosts";
import { getPostsByDateController } from "../../../useCases/post/getPostByDate";
import { getPostBySlugController } from "../../../useCases/post/getPostBySlug";
import { getPopularPostsController } from "../../../useCases/post/getPopularPosts";
import { getAllPostsAscendingController } from "../../../useCases/post/getAllPostsAscending";
import { getAveragePostsForDayController } from "../../../useCases/post/getAveragePostsForDay";
import { upvotePostController } from "../../../useCases/post/upvotePost";
import { downvotePostController } from "../../../useCases/post/downvotePost";
import { getPercentageOfPostsWithoutCommentsController } from "../../../useCases/post/getPercentageOfPostsWithoutComments";
import { getHourWiththeMostPostsCreatedInaDayController } from "../../../useCases/post/getHourWiththeMostPostsCreatedInaDay";
import { getUsernamesWithoutPostsAndWithoutCommentsByDateController } from "../../../useCases/post/getUsernamesWithoutPostsAndWithoutCommentsByDate";
import { get } from "lodash";

const postRouter = express.Router();

postRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  createPostController.execute(req, res)
);

postRouter.get(
  "/recent",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getRecentPostsController.execute(req, res)
);

postRouter.get(
  "/popular",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPopularPostsController.execute(req, res)
);

postRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  getPostBySlugController.execute(req, res)
);

postRouter.post("/upvote", middleware.ensureAuthenticated(), (req, res) =>
  upvotePostController.execute(req, res)
);

postRouter.post("/downvote", middleware.ensureAuthenticated(), (req, res) =>
  downvotePostController.execute(req, res)
);

/**
 * Enables the GET to "/allascending" route to return all posts sorted by points and creation date ascending.
 */
postRouter.get(
  "/allascending",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getAllPostsAscendingController.execute(req, res)
);

/**
 * Enables the GET to "/return all posts from a specific day
 */
postRouter.get(
  "/specificDay",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPostsByDateController.execute(req, res)
);

/**
 * Enables the GET to "/averageposts" route to return the average of posts per user for a specific day.
 */

postRouter.get("/averageposts", middleware.ensureAuthenticated(), (req, res) =>
  getAveragePostsForDayController.execute(req, res)
);

postRouter.get(
  "/PercentageOfPostsWithoutComments",
  middleware.ensureAuthenticated(),
  (req, res) => getPercentageOfPostsWithoutCommentsController.execute(req, res)
);
//Sprint E
postRouter.get(
  "/gethourwiththemostpostscreatedinaday",
  middleware.ensureAuthenticated(),
  (req, res) => getHourWiththeMostPostsCreatedInaDayController.execute(req, res)
);

postRouter.get(
  "/getlistofusernames",
  middleware.ensureAuthenticated(),
  (req, res) =>
    getUsernamesWithoutPostsAndWithoutCommentsByDateController.execute(req, res)
);

export { postRouter };
