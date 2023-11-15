import{ EditPostController } from './EditPostController';
import { EditPost } from './EditPost';
import { postRepo } from "../../../repos";

const editPost = new EditPost(postRepo);
const editPostController = new EditPostController(editPost);

export { editPost, editPostController };


