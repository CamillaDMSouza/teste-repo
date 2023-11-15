import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

export interface ForumState {
  isSubmittingPost: boolean;
  isSubmittingPostSuccess: boolean;
  isSubmittingPostFailure: boolean;

  isGettingRecentPosts: boolean;
  isGettingRecentPostsSuccess: boolean;
  isGettingRecentPostsFailure: boolean;

  isGettingPostsByDate: boolean;
  isGettingPostsByDateSuccess: boolean;
  isGettingPostsByDateFailure: boolean;

  isGettingAveragePostsByDate: boolean;
  isGettingAveragePostsByDateSuccess: boolean;
  isGettingAveragePostsByDateFailure: boolean;

  isGettingAverageCommentsByDate: boolean;
  isGettingAverageCommentsByDateSuccess: boolean;
  isGettingAverageCommentsByDateFailure: boolean;

  isGettingAscendingPosts: boolean;
  isGettingAscendingPostsSuccess: boolean;
  isGettingAscendingPostsFailure: boolean;

  isGettingPostBySlug: boolean;
  isGettingPostBySlugSuccess: boolean;
  isGettingPostBySlugFailure: boolean;

  isCreatingReplyToPost: boolean;
  isCreatingReplyToPostSuccess: boolean;
  isCreatingReplyToPostFailure: boolean;

  isGettingComments: boolean;
  isGettingCommentsSuccess: boolean;
  isGettingCommentsFailure: boolean;

  isGettingPopularPosts: boolean;
  isGettingPopularPostsSuccess: boolean;
  isGettingPopularPostsFailure: boolean;

  isGettingCommentByCommentId: boolean;
  isGettingCommentByCommentIdSuccess: boolean;
  isGettingCommentByCommentIdFailure: boolean;

  isCreatingReplyToComment: boolean;
  isCreatingReplyToCommentSuccess: boolean;
  isCreatingReplyToCommentFailure: boolean;

  isUpvotingComment: boolean;
  isUpvotingCommentSuccess: boolean;
  isUpvotingCommentFailure: boolean;

  isDownvotingComment: boolean;
  isDownvotingCommentSuccess: boolean;
  isDownvotingCommentFailure: boolean;

  isUpvotingPost: boolean;
  isUpvotingPostSuccess: boolean;
  isUpvotingPostFailure: boolean;

  isDownvotingPost: boolean;
  isDownvotingPostSuccess: boolean;
  isDownvotingPostFailure: boolean;

  isGettingPercentageOfPostsWithoutCommentsByDate: boolean;
  isGettingPercentageOfPostsWithoutCommentsByDateSuccess: boolean;
  isGettingPercentageOfPostsWithoutCommentsByDateFailure: boolean;

  isGettingHourWiththeMostPostsCreatedInaDay: boolean;
  isGettingHourWiththeMostPostsCreatedInaDaySuccess: boolean;
  isGettingHourWiththeMostPostsCreatedInaDayFailure: boolean;

  recentPosts: Post[];
  postsByDate: Post[];
  averagePostsByDate: Number;
  averageCommentsByDate: Number;
  popularPosts: Post[];
  ascendingPosts: Post[];

  post: Post | {};

  comments: Comment[];

  comment: Comment | {};

  error: string;

  isSettingNumPosts: boolean;
  isSettingNumPostsSuccess: boolean;
  isSettingNumPostsFailure: boolean;

  isSettingNumComments: boolean;
  isSettingNumCommentsSuccess: boolean;
  isSettingNumCommentsFailure: boolean;
}

const initialForumState: ForumState = {
  isSubmittingPost: false,
  isSubmittingPostSuccess: false,
  isSubmittingPostFailure: false,

  isGettingRecentPosts: false,
  isGettingRecentPostsSuccess: false,
  isGettingRecentPostsFailure: false,

  isGettingPostsByDate: false,
  isGettingPostsByDateSuccess: false,
  isGettingPostsByDateFailure: false,

  isGettingAveragePostsByDate: false,
  isGettingAveragePostsByDateSuccess: false,
  isGettingAveragePostsByDateFailure: false,

  isGettingAverageCommentsByDate: false,
  isGettingAverageCommentsByDateSuccess: false,
  isGettingAverageCommentsByDateFailure: false,

  isGettingAscendingPosts: false,
  isGettingAscendingPostsSuccess: false,
  isGettingAscendingPostsFailure: false,

  isGettingPostBySlug: false,
  isGettingPostBySlugSuccess: false,
  isGettingPostBySlugFailure: false,

  isCreatingReplyToPost: false,
  isCreatingReplyToPostSuccess: false,
  isCreatingReplyToPostFailure: false,

  isGettingComments: false,
  isGettingCommentsSuccess: false,
  isGettingCommentsFailure: false,

  isGettingPopularPosts: false,
  isGettingPopularPostsSuccess: false,
  isGettingPopularPostsFailure: false,

  isGettingCommentByCommentId: false,
  isGettingCommentByCommentIdSuccess: false,
  isGettingCommentByCommentIdFailure: false,

  isCreatingReplyToComment: false,
  isCreatingReplyToCommentSuccess: false,
  isCreatingReplyToCommentFailure: false,

  isUpvotingComment: false,
  isUpvotingCommentSuccess: false,
  isUpvotingCommentFailure: false,

  isDownvotingComment: false,
  isDownvotingCommentSuccess: false,
  isDownvotingCommentFailure: false,

  isUpvotingPost: false,
  isUpvotingPostSuccess: false,
  isUpvotingPostFailure: false,

  isDownvotingPost: false,
  isDownvotingPostSuccess: false,
  isDownvotingPostFailure: false,

  isGettingPercentageOfPostsWithoutCommentsByDate: false,
  isGettingPercentageOfPostsWithoutCommentsByDateSuccess: false,
  isGettingPercentageOfPostsWithoutCommentsByDateFailure: false,

  isGettingHourWiththeMostPostsCreatedInaDay: false,
  isGettingHourWiththeMostPostsCreatedInaDaySuccess: false,
  isGettingHourWiththeMostPostsCreatedInaDayFailure: false,

  comments: [],

  recentPosts: [],
  postsByDate: [],
  averagePostsByDate: 0,
  popularPosts: [],
  ascendingPosts: [],
  averageCommentsByDate: 0,

  post: {},

  comment: {},

  error: '',

  isSettingNumPosts: false,
  isSettingNumPostsSuccess: false,
  isSettingNumPostsFailure: false,

  isSettingNumComments: false,
  isSettingNumCommentsSuccess: false,
  isSettingNumCommentsFailure: false
};

export default initialForumState;
