/**
 * FILEPATH: /c:/Users/nunof/Switch-QA-PROJETOS/switch-qa-23-project-switch-qa-23-3/src/modules/forum/useCases/post/getHourWiththeMostPostsCreatedInaDay/index.ts
 *
 * Imports the necessary modules and creates instances of the GetHourWiththeMostPostsCreatedInaDay and GetHourWiththeMostPostsCreatedInaDayController classes.
 *
 * @packageDocumentation
 */
import { postRepo } from "../../../repos";
import { GetHourWiththeMostPostsCreatedInaDay } from "./getHourWiththeMostPostsCreatedInaDay";
import { GetHourWiththeMostPostsCreatedInaDayController } from "./getHourWiththeMostPostsCreatedInaDayController";

const getHourWiththeMostPostsCreatedInaDay =
  new GetHourWiththeMostPostsCreatedInaDay(postRepo);

const getHourWiththeMostPostsCreatedInaDayController =
  new GetHourWiththeMostPostsCreatedInaDayController(
    getHourWiththeMostPostsCreatedInaDay
  );

export {
  getHourWiththeMostPostsCreatedInaDay,
  getHourWiththeMostPostsCreatedInaDayController
};
