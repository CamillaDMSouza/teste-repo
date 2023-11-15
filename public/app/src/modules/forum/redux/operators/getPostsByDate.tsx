import * as actionCreators from '../actionCreators';
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getPostsByDate(date?: Date | string) {
  return async (dispatch: any) => {
    dispatch(actionCreators.getPostsByDate());

    const result = await postService.getPostsByDate(date);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.getPostsByDateFailure(error));
    } else {
      const posts: Post[] = result.value.getValue();
      dispatch(
        actionCreators.getPostsByDateSuccess(
          posts.sort((a, b) => {
            return b.numComments - a.numComments;
          })
        )
      );
      return posts;
    }
  };
}

export { getPostsByDate };
