import { GetPostsByDate } from "./GetPostByDate";
import { postRepo } from "../../../repos";
import { GetPostsByDateController } from "./GetPostByDateController";

const getPostsByDate = new GetPostsByDate(postRepo);
const getPostsByDateController = new GetPostsByDateController(getPostsByDate);

export { getPostsByDate, getPostsByDateController };
