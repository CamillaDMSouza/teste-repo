import { GetAllPostsAscending } from "./GetAllPostsAscending";
import { postRepo } from "../../../repos";
import { GetAllPostsAscendingController } from "./GetAllPostsAscendingController";

const getAllPostsAscending = new GetAllPostsAscending(postRepo);

const getAllPostsAscendingController = new GetAllPostsAscendingController(
  getAllPostsAscending,
);

export { getAllPostsAscending, getAllPostsAscendingController };
