import * as actionCreators from '../actionCreators';
import { postService } from '../../services';

function fetchPostCount(username: string) {
  return async (dispatch: any, getState?: any) => {
    dispatch(actionCreators.setNumPosts());

    const result = await postService.fetchMemberPostCount(username);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.setNumPostsFailure(error));
    } else {
      dispatch(actionCreators.setNumPostsSuccess());
    }
  };
}

export { fetchPostCount };
