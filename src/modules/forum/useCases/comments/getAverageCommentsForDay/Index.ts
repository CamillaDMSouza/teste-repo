import { GetAverageCommentsForDay } from "./GetAverageCommentsForDay";
import { commentRepo } from "../../../repos";
import { GetAverageCommentsForDayController } from "./GetAverageCommentsForDayController";

const getAverageCommentsForDay = new GetAverageCommentsForDay(commentRepo);

const getAverageCommentsForDayController =
  new GetAverageCommentsForDayController(getAverageCommentsForDay);

export { getAverageCommentsForDay, getAverageCommentsForDayController };
