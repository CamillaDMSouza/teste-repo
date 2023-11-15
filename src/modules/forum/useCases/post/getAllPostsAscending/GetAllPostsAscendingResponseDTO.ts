import { PostDTO } from "../../../dtos/postDTO";

/**
 * Represents the get all posts ascending response data transfer object (DTO).
 */
export interface GetAllPostsAscendingResponseDTO {
  // Gets or sets the posts.
  posts: PostDTO[];
}
