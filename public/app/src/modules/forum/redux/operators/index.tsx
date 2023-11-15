import { submitPost } from './submitPost';
import { PostType } from '../../models/Post';
import { getRecentPosts } from './getRecentPosts';
import { getPostsByDate } from './getPostsByDate';
import { getAveragePostsByDate } from './getAveragePostsByDate';
import { getAverageCommentsByDate } from './getAverageCommentsByDate';
import { getAscendingPosts } from './getAscendingPosts';
import { getPostBySlug } from './getPostBySlug';
import { createReplyToPost } from './createReplyToPost';
import { getComments } from './getComments';
import { getPopularPosts } from './getPopularPosts';
import { getCommentByCommentId } from './getCommentByCommentId';
import { creatingReplyToComment } from '../actionCreators';
import { getCommentReplies } from './getCommentReplies';
import { createReplyToComment } from './createReplyToComment';
import { downvotePost } from './downvotePost';
import { upvotePost } from './upvotePost';
import { upvoteComment } from './upvoteComment';
import { downvoteComment } from './downvoteComment';
import { fetchPostCount } from './fetchPostCount';
import { fetchCommentCount } from './fetchCommentCount';
import { getPercentageOfPostsWithoutCommentsByDate } from './getPercentageOfPostsWithoutComments';
import { getHourWiththeMostPostsCreatedInaDay } from './getHourWiththeMostPostsCreatedInaDay';

export interface IForumOperations {
  submitPost: (
    title: string,
    type: PostType,
    text?: string,
    link?: string
  ) => void;
  getRecentPosts: (offset?: number) => void;
  getPostsByDate: (date?: Date | string) => Promise<void>;
  getAveragePostsByDate: (date?: Date | string) => Promise<void>;
  getAverageCommentsByDate: (
    date?: Date | string,
    memberId?: string,
    commentMemberId?: string
  ) => Promise<void>;
  getPostBySlug(slug: string): void;
  createReplyToPost(text: string, slug: string): void;
  getComments(slug: string, offset?: number): void;
  getPopularPosts(offset?: number): void;
  getAscendingPosts(offset?: number): void;
  getCommentByCommentId(commentId: string): void;
  createReplyToComment(
    comment: string,
    parentCommentId: string,
    slug: string
  ): void;
  getCommentReplies(slug: string, commentId: string, offset?: number): void;
  downvotePost(postSlug: string): void;
  upvotePost(postSlug: string): void;
  upvoteComment(commentId: string): void;
  downvoteComment(commentId: string): void;
  fetchPostCount(username: string): void;
  fetchCommentCount(username: string): void;
  getPercentageOfPostsWithoutCommentsByDate: (
    date?: Date | string
  ) => Promise<void>;
  getHourWiththeMostPostsCreatedInaDay: (date?: Date | string) => Promise<void>;
}

export {
  submitPost,
  getRecentPosts,
  getPostsByDate,
  getAveragePostsByDate,
  getAverageCommentsByDate,
  getAscendingPosts,
  getPostBySlug,
  createReplyToPost,
  getComments,
  getPopularPosts,
  getCommentByCommentId,
  creatingReplyToComment,
  getCommentReplies,
  createReplyToComment,
  downvotePost,
  upvotePost,
  upvoteComment,
  downvoteComment,
  fetchPostCount,
  fetchCommentCount,
  getPercentageOfPostsWithoutCommentsByDate,
  getHourWiththeMostPostsCreatedInaDay
};
