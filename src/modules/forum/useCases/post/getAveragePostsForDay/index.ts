import { GetAveragePostsForDay } from "./GetAveragePostsForDay";
import { postRepo } from "../../../repos";
import { GetAveragePostsForDayController } from "./GetAveragePostsForDayController";

const getAveragePostsForDay = new GetAveragePostsForDay(postRepo);

const getAveragePostsForDayController = new GetAveragePostsForDayController(
  getAveragePostsForDay
);

export { getAveragePostsForDay, getAveragePostsForDayController };
