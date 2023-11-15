

import * as actionCreators from '../actionCreators'
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getAscendingPosts (offset?: number) {
  return async (dispatch: any) => {

    dispatch(actionCreators.getAscendingPosts());

    const result = await postService.getAscendingPosts(offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getAscendingPostsFailure(error))
    } else {
      const posts: Post[] = result.value.getValue(); 
      dispatch(actionCreators.getAscendingPostsSuccess(posts));
    }
  };
}

export { getAscendingPosts };
