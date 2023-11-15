import * as actions from './actions';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { Member } from '../models/Member';

export type ForumAction = { [key: string]: actions.ForumActionType | any };

function submittingPost(): ForumAction {
  return {
    type: actions.SUBMITTING_POST
  };
}

function submittingPostSuccess(): ForumAction {
  return {
    type: actions.SUBMITTING_POST_SUCCESS
  };
}

function submittingPostFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.SUBMITTING_POST_FAILURE,
    error
  };
}

function getRecentPosts(): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

function getRecentPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS_SUCCESS,
    posts
  };
}

function getRecentPostsFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

function getPostsByDate(): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS
  };
}

function getPostsByDateSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_RECENT_POSTS_SUCCESS,
    posts
  };
}

function getPostsByDateFailure(error: string): ForumAction & { error: string } {
  return {
    type: actions.GETTING_RECENT_POSTS_FAILURE,
    error
  };
}

function getAveragePostsByDate(): ForumAction {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE
  };
}

function getAveragePostsByDateSuccess(average: Number): ForumAction {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE_SUCCESS,
    average
  };
}

function getAveragePostsByDateFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE_FAILURE,
    error
  };
}

function getAverageCommentsByDate(): ForumAction {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE
  };
}

function getAverageCommentsByDateSuccess(average: Number): ForumAction {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE_SUCCESS,
    average
  };
}

function getAverageCommentsByDateFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_AVERAGE_POSTS_BY_DATE_FAILURE,
    error
  };
}

function getAscendingPosts(): ForumAction {
  return {
    type: actions.GETTING_ASCENDING_POSTS
  };
}

function getAscendingPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_ASCENDING_POSTS_SUCCESS,
    posts
  };
}

function getAscendingPostsFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_ASCENDING_POSTS_FAILURE,
    error
  };
}

function gettingPostBySlug(): ForumAction {
  return {
    type: actions.GETTING_POST_BY_SLUG
  };
}

function gettingPostBySlugSuccess(post: Post): ForumAction & { post: Post } {
  return {
    type: actions.GETTING_POST_BY_SLUG_SUCCESS,
    post
  };
}

function gettingPostBySlugFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POST_BY_SLUG_FAILURE,
    error
  };
}

function creatingReplyToPost(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST
  };
}

function creatingReplyToPostSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_SUCCESS
  };
}

function creatingReplyToPostFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_POST_FAILURE,
    error
  };
}

function gettingComments(): ForumAction {
  return {
    type: actions.GETTING_COMMENTS
  };
}

function gettingCommentsSuccess(comments: Comment[]): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_SUCCESS,
    comments
  };
}

function gettingCommentsFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENTS_FAILURE,
    error
  };
}

function getPopularPosts(): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS
  };
}

function getPopularPostsSuccess(posts: Post[]): ForumAction {
  return {
    type: actions.GETTING_POPULAR_POSTS_SUCCESS,
    posts
  };
}

function getPopularPostsFailure(
  error: string
): ForumAction & { error: string } {
  return {
    type: actions.GETTING_POPULAR_POSTS_FAILURE,
    error
  };
}

function gettingCommentByCommentId(): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID
  };
}

function gettingCommentByCommentIdSuccess(comment: Comment): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
    comment
  };
}

function gettingCommentByCommentIdFailure(error: string): ForumAction {
  return {
    type: actions.GETTING_COMMENT_BY_COMMENT_ID_FAILURE,
    error
  };
}

function creatingReplyToComment(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT
  };
}

function creatingReplyToCommentSuccess(): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_SUCCESS
  };
}

function creatingReplyToCommentFailure(error: string): ForumAction {
  return {
    type: actions.CREATING_REPLY_TO_COMMENT_FAILURE,
    error
  };
}

function upvotingPost(): ForumAction {
  return {
    type: actions.UPVOTING_POST
  };
}

function upvotingPostSuccess(postSlug: string): ForumAction {
  return {
    type: actions.UPVOTING_POST_SUCCESS,
    postSlug
  };
}

function upvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_POST_FAILURE,
    error
  };
}

function downvotingPost(): ForumAction {
  return {
    type: actions.DOWNVOTING_POST
  };
}

function downvotingPostSuccess(postSlug: string): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_SUCCESS,
    postSlug
  };
}

function downvotingPostFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_POST_FAILURE,
    error
  };
}

function upvotingComment(): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT
  };
}

function upvotingCommentSuccess(commentId: string): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_SUCCESS,
    commentId
  };
}

function upvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.UPVOTING_COMMENT_FAILURE,
    error
  };
}

function downvotingComment(): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT
  };
}

function downvotingCommentSuccess(commentId: string): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_SUCCESS,
    commentId
  };
}

function downvotingCommentFailure(error: string): ForumAction {
  return {
    type: actions.DOWNVOTING_COMMENT_FAILURE,
    error
  };
}

function setNumPosts(): ForumAction {
  return {
    type: actions.SET_NUM_POSTS
  };
}

function setNumPostsSuccess(): ForumAction {
  return {
    type: actions.SET_NUM_POSTS_SUCCESS
  };
}

function setNumPostsFailure(error: string): ForumAction {
  return {
    type: actions.SET_NUM_POSTS_FAILURE,
    error
  };
}

function setNumComments(): ForumAction {
  return {
    type: actions.SET_NUM_COMMENTS
  };
}

function setNumCommentsSuccess(): ForumAction {
  return {
    type: actions.SET_NUM_COMMENTS_SUCCESS
  };
}

function setNumCommentsFailure(error: string): ForumAction {
  return {
    type: actions.SET_NUM_COMMENTS_FAILURE,
    error
  };
}

function getPercentageOfPostsWithoutCommentsByDate(): ForumAction {
  return {
    type: actions.GET_PERCENTAGE_OF_POSTS_WITHOUT_COMMENTS_BY_DATE
  };
}

function getPercentageOfPostsWithoutCommentsByDateSuccess(
  percentage: number
): ForumAction {
  return {
    type: actions.GET_PERCENTAGE_OF_POSTS_WITHOUT_COMMENTS_BY_DATE_SUCCESS,
    percentage
  };
}

function getPercentageOfPostsWithoutCommentsByDateFailure(
  error: string
): ForumAction {
  return {
    type: actions.GET_PERCENTAGE_OF_POSTS_WITHOUT_COMMENTS_BY_DATE_FAILURE,
    error
  };
}
function getHourWiththeMostPostsCreatedInaDay(): ForumAction {
  return {
    type: actions.GETTING_HOUR_WITH_MOST_POSTS_CREATED_IN_A_DAY
  };
}
function getHourWiththeMostPostsCreatedInaDaySuccess(
  hour: number
): ForumAction {
  return {
    type: actions.GETTING_HOUR_WITH_MOST_POSTS_CREATED_IN_A_DAY_SUCCESS,
    hour
  };
}
function getHourWiththeMostPostsCreatedInaDayFailure(
  error: string
): ForumAction {
  return {
    type: actions.GETTING_HOUR_WITH_MOST_POSTS_CREATED_IN_A_DAY_FAILURE,
    error
  };
}

export {
  submittingPost,
  submittingPostSuccess,
  submittingPostFailure,
  getRecentPosts,
  getRecentPostsSuccess,
  getRecentPostsFailure,
  getPostsByDate,
  getPostsByDateSuccess,
  getPostsByDateFailure,
  getAveragePostsByDate,
  getAveragePostsByDateSuccess,
  getAveragePostsByDateFailure,
  getAverageCommentsByDate,
  getAverageCommentsByDateSuccess,
  getAverageCommentsByDateFailure,
  getAscendingPosts,
  getAscendingPostsSuccess,
  getAscendingPostsFailure,
  gettingPostBySlug,
  gettingPostBySlugSuccess,
  gettingPostBySlugFailure,
  creatingReplyToPost,
  creatingReplyToPostSuccess,
  creatingReplyToPostFailure,
  gettingComments,
  gettingCommentsSuccess,
  gettingCommentsFailure,
  getPopularPosts,
  getPopularPostsSuccess,
  getPopularPostsFailure,
  gettingCommentByCommentId,
  gettingCommentByCommentIdSuccess,
  gettingCommentByCommentIdFailure,
  creatingReplyToComment,
  creatingReplyToCommentSuccess,
  creatingReplyToCommentFailure,
  upvotingPost,
  upvotingPostSuccess,
  upvotingPostFailure,
  downvotingPost,
  downvotingPostSuccess,
  downvotingPostFailure,
  upvotingComment,
  upvotingCommentSuccess,
  upvotingCommentFailure,
  downvotingComment,
  downvotingCommentSuccess,
  downvotingCommentFailure,
  setNumPosts,
  setNumPostsSuccess,
  setNumPostsFailure,
  setNumComments,
  setNumCommentsSuccess,
  setNumCommentsFailure,
  getPercentageOfPostsWithoutCommentsByDate,
  getPercentageOfPostsWithoutCommentsByDateSuccess,
  getPercentageOfPostsWithoutCommentsByDateFailure,
  getHourWiththeMostPostsCreatedInaDay,
  getHourWiththeMostPostsCreatedInaDaySuccess,
  getHourWiththeMostPostsCreatedInaDayFailure
};
