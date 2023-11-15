import * as actionCreators from '../actionCreators';
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getAveragePostsByDate(date?: Date | string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getAveragePostsByDate());

    const result = await postService.getAveragePostsByDate(date);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getAveragePostsByDateFailure(error));
    } else {
      const average: Number = result.value.getValue();
      dispatch(actionCreators.getAveragePostsByDateSuccess(average));
      return average;
    }
  };
}

export { getAveragePostsByDate };
