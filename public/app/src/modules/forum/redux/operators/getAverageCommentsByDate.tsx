import * as actionCreators from '../actionCreators';
import { commentService } from '../../services';

function getAverageCommentsByDate(date?: Date | string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getAverageCommentsByDate());

    const result = await commentService.getAverageCommentsByDate(date);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getAverageCommentsByDateFailure(error));
    } else {
      const average: Number = result.value.getValue();
      dispatch(actionCreators.getAverageCommentsByDateSuccess(average));
      return average;
    }
  };
}

export { getAverageCommentsByDate };
