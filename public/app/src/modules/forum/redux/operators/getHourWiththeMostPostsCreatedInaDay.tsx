/*Use case that retrieves the hour with the most posts created in a day
return hours number
*/
import * as actionCreators from '../actionCreators';
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getHourWiththeMostPostsCreatedInaDay(date?: Date | string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getHourWiththeMostPostsCreatedInaDay());

    const result = await postService.getHourWiththeMostPostsCreatedInaDay(date);
    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(
        actionCreators.getHourWiththeMostPostsCreatedInaDayFailure(error)
      );
    } else {
      const hours: number = result.value.getValue();
      dispatch(
        actionCreators.getHourWiththeMostPostsCreatedInaDaySuccess(hours)
      );
      return hours;
    }
  };
}

export { getHourWiththeMostPostsCreatedInaDay };
