import * as actionCreators from '../actionCreators';
import { usersService } from '../../services';

function deleteUser(username: string) {
  return async (dispatch: any, getState?: any) => {
    // dispatch(actionCreators.deletingUser(username));

    const result = await usersService.deleteUser(username);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingUserFailure(error));
    } else {
      dispatch(actionCreators.creatingUserSuccess());
    }
  };
}

export { deleteUser };
