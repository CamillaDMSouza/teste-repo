import * as actionCreators from '../actionCreators';
import { postService } from '../../services';

function fetchCommentCount(username: string) {
  return async (dispatch: any, getState?: any) => {
    dispatch(actionCreators.setNumComments());

    const result = await postService.fetchMemberCommentCount(username);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.setNumCommentsFailure(error));
    } else {
      dispatch(actionCreators.setNumCommentsSuccess());
    }
  };
}

export { fetchCommentCount };
