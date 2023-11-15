import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostDetails } from "../domain/postDetails";
import { MemberId } from "../domain/memberId";

export interface IPostRepo {
  getPostDetailsBySlug(slug: string): Promise<PostDetails>;
  getPostBySlug(slug: string): Promise<Post>;
  getRecentPosts(offset?: number): Promise<PostDetails[]>;
  getPostsByDate(date?: Date | string): Promise<PostDetails[]>;
  getPopularPosts(offset?: number): Promise<PostDetails[]>;
  getNumberOfCommentsByPostId(postId: PostId | string): Promise<number>;
  getPostByPostId(postId: PostId | string): Promise<Post>;
  getAllPostsAscending(): Promise<PostDetails[]>;
  getAveragePostsForDay(day: Date): Promise<Number>;
  getMemberPostCount(memberId: MemberId): Promise<number>;
  exists(postId: PostId): Promise<boolean>;
  save(post: Post): Promise<void>;
  delete(postId: PostId): Promise<void>;
  getTotalNumberOfPosts(): Promise<number>;
  getNumberOfPostsWithoutCommentsByDate(date?: Date | string): Promise<number>;
  //Sprint E
  getHourWiththeMostPostsCreatedInaDay(date?: Date | String): Promise<number>;
  getListOfUsernamesWithoutPostAndWithoutCommentsByDate(
    date?: Date | String
  ): Promise<string[]>;
}
