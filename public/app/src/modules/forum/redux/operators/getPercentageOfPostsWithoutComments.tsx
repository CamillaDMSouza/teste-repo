import * as actionCreators from '../actionCreators';
import { postService } from '../../services';

function getPercentageOfPostsWithoutCommentsByDate(date?: Date | string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getPercentageOfPostsWithoutCommentsByDate());

    const result = await postService.getPercentageOfPostsWithoutCommentsByDate(
      date
    );
    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(
        actionCreators.getPercentageOfPostsWithoutCommentsByDateFailure(error)
      );
    } else {
      const percentage: number = result.value.getValue();
      dispatch(
        actionCreators.getPercentageOfPostsWithoutCommentsByDateSuccess(
          percentage
        )
      );
      return percentage;
    }
  };
}

export { getPercentageOfPostsWithoutCommentsByDate };
