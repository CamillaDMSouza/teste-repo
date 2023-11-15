/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let posts: Posts;
let users: Users;
let comments: Comments;

let accessTokenForPostOwner: string;
let accessTokenForPostVoter: string;
let accessTokenForPostSecondVoter: string;
let tc005LastPositionPostSlug: string;
let tc006LastPositionPostSlug: string;
let tc007LastPositionPostSlug: string;
let tc008LastPositionPostSlug: string;
let tc009LastPositionPostSlug: string;
let tc009CommentId: string;

function waitMilliseconds(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Popular posts", (): void => {
  beforeAll(async () => {
    posts = new Posts();
    users = new Users();
    comments = new Comments();
    jest.setTimeout(60000);
  });

  afterEach(async () => {
    await waitMilliseconds(200);
  });

  // Test pre-requisites - Create user, login and get token

  it("Pre-requisites.01 - Create Post Owner User", async (): Promise<void> => {
    const responseCreatePostsOwner = await users.post(
      "mppuser",
      "mpp@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsOwner.status).toBe(200);
  });

  it("Pre-requisites.02 - Login Post Owner User", async (): Promise<void> => {
    const responseLoginPostsOwner = await users.postLogin(
      "mppuser",
      "complexPwd"
    );
    expect(responseLoginPostsOwner.status).toBe(200);
    expect(responseLoginPostsOwner.data.accessToken).toBeDefined();
    accessTokenForPostOwner = responseLoginPostsOwner.data.accessToken;
  });

  it("Pre-requisites.03 - Create Post Voter User", async (): Promise<void> => {
    const responseCreatePostsVoter = await users.post(
      "mppvoteuser",
      "mppvoter@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsVoter.status).toBe(200);
  });

  it("Pre-requisites.04 - Login Post Voter User", async (): Promise<void> => {
    const responseLoginPostsVoter = await users.postLogin(
      "mppvoteuser",
      "complexPwd"
    );
    expect(responseLoginPostsVoter.status).toBe(200);
    expect(responseLoginPostsVoter.data.accessToken).toBeDefined();
    accessTokenForPostVoter = responseLoginPostsVoter.data.accessToken;
  });

  it("Pre-requisites.05 - Create Post Second Voter User", async (): Promise<void> => {
    const responseCreatePostsSecondVoter = await users.post(
      "mppsecvotuser",
      "mppsecvoter@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsSecondVoter.status).toBe(200);
  });

  it("Pre-requisites.06 - Login Post Second Voter User", async (): Promise<void> => {
    const responseLoginPostsSecondVoter = await users.postLogin(
      "mppsecvotuser",
      "complexPwd"
    );
    expect(responseLoginPostsSecondVoter.status).toBe(200);
    expect(responseLoginPostsSecondVoter.data.accessToken).toBeDefined();
    accessTokenForPostSecondVoter =
      responseLoginPostsSecondVoter.data.accessToken;
  });

  // End of test pre-requisites

  /******
   *
   * TC001 - Check that no popular post exist for a clean database
   *
   ******/
  it("TC001.01 - Check that no popular post exist for a clean database", async (): Promise<void> => {
    // Arrange
    // Was the database cleanup

    // Act
    const response = await posts.getPopularPosts();

    // Assert
    expect(response.status).toBe(200);
    const responsePosts = response.data.posts;
    expect(responsePosts).toHaveLength(0);
  });

  /******
   *
   * TC002 - After creating one post it should appear on the popular posts
   *
   ******/

  it("TC002.01 - After creating one post it should appear on the popular posts - Create mpp001", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp001",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC002.02 - Assert new popular posts - Should have 1 popular post", async (): Promise<void> => {
    // Act
    const popularResponse = await posts.getPopularPosts();

    // Assert
    expect(popularResponse.status).toBe(200);
    const responsePosts = popularResponse.data.posts;
    expect(responsePosts).toHaveLength(1);
  });

  /******
   *
   * TC003 - After creating 14 new posts, 15 (14 + 1 previous test) should appear on the popular posts
   *
   ******/

  it("TC003.01 - After creating 14 new posts, 15 (14 + 1 previous test) should appear on the popular posts - Create mpp002", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp002",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.02 - Create mpp003", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp003",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.03 - Create mpp004", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp004",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.04 - Create mpp005", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp005",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.05 - Create mpp006", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp006",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.06 - Create mpp007", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp007",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.07 - Create mpp008", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp008",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.08 - Create mpp009", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp009",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.09 - Create mpp010", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp010",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.10 - Create mpp011", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp011",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.11 - Create mpp012", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp012",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.12 - Create mpp013", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp013",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.13 - Create mpp014", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp014",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.14 - Create mpp015", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp015",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.15 - Assert new popular posts - Should have 15 posts", async (): Promise<void> => {
    // Act
    const popularResponse = await posts.getPopularPosts();

    // Assert
    expect(popularResponse.status).toBe(200);
    const responsePosts = popularResponse.data.posts;
    expect(responsePosts).toHaveLength(15);
  });

  /******
   *
   * TC004 - After adding the 16th post only returns 15
   *
   ******/

  it("TC004.01 - After adding the 16th post only returns 15 - Create mpp016", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp016",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC004.02 - Assert new popular posts - Should only returns 15", async (): Promise<void> => {
    // Act
    const popularResponse = await posts.getPopularPosts();

    // Assert
    expect(popularResponse.status).toBe(200);
    const responsePosts = popularResponse.data.posts;
    expect(responsePosts).toHaveLength(15);
  });

  /******
   *
   * TC005 - After voting on one post it should appear on a higher position
   *
   ******/

  it("TC005.01 - After voting on one post it should appear on a higher position - Get last popular post", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);
    // Pick the last post from the most popular
    tc005LastPositionPostSlug = popularResponse.data.posts[14].slug;
  });

  it("TC005.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc005LastPositionPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC005.03 - Assert new popular posts order - The post that was last should now be on an higher position", async (): Promise<void> => {
    // Act
    const popularPostsResponse = await posts.getPopularPosts();

    // Assert
    expect(popularPostsResponse.status).toBe(200);
    expect(popularPostsResponse.data.posts[14].slug).not.toBe(
      tc005LastPositionPostSlug
    );
    const tc005post = popularPostsResponse.data.posts.find(
      (p) => p.slug == tc005LastPositionPostSlug
    );
    const tc005position = popularPostsResponse.data.posts.indexOf(tc005post);
    expect(tc005position).toBeLessThan(14);
  });

  /******
   *
   * TC006 - After voting on one post twice it should appear on the first position
   *
   ******/

  it("TC006.01 - After voting on one post twice it should appear on the first position - Get the last popular post", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);
    // Pick the last post from the most popular
    tc006LastPositionPostSlug = popularResponse.data.posts[14].slug;
  });

  it("TC006.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc006LastPositionPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC006.03 - Vote2 (using mppuser)", async (): Promise<void> => {
    const vote2response = await posts.postUpvotePosts(
      accessTokenForPostOwner,
      tc006LastPositionPostSlug
    );
    expect(vote2response.status).toBe(200);
  });

  it("TC006.04 - Assert new popular posts order - Should be first and have 2 points (votes)", async (): Promise<void> => {
    // Act
    const popularPostsResponse = await posts.getPopularPosts();
    // Assert
    expect(popularPostsResponse.status).toBe(200);
    expect(popularPostsResponse.data.posts[0].slug).toBe(
      tc006LastPositionPostSlug
    );
    expect(popularPostsResponse.data.posts[0].points).toBe(2);
  });

  /******
   *
   * TC007 - Voting 3 times on the last post of list should make it go to first position
   *
   ******/

  it("TC007.01 - Voting 3 times on the last post of list should make it go to first position - Get last popular post", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);

    // Pick the last post from the most popular
    tc007LastPositionPostSlug = popularResponse.data.posts[14].slug;
  });

  it("TC007.02 - Vote1 (using mppsecvotuser)", async (): Promise<void> => {
    const vote1 = await posts.postUpvotePosts(
      accessTokenForPostSecondVoter,
      tc007LastPositionPostSlug
    );
    expect(vote1.status).toBe(200);
  });

  it("TC007.03 - Vote2 (using mppvoteuser)", async (): Promise<void> => {
    const vote2 = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc007LastPositionPostSlug
    );
    expect(vote2.status).toBe(200);
  });

  it("TC007.04 - Vote3 (using mppuser)", async (): Promise<void> => {
    const vote3 = await posts.postUpvotePosts(
      accessTokenForPostOwner,
      tc007LastPositionPostSlug
    );
    expect(vote3.status).toBe(200);
  });

  it("TC007.05 - Assert new popular posts order - Should be on first position and have 3 votes (points)", async (): Promise<void> => {
    // Act
    const popularPostsResponse = await posts.getPopularPosts();

    // Assert
    expect(popularPostsResponse.status).toBe(200);
    expect(popularPostsResponse.data.posts[0].slug).toBe(
      tc007LastPositionPostSlug
    );
    expect(popularPostsResponse.data.posts[0].points).toBe(3);
  });

  /******
   *
   * TC008 - Down voting 3 times on the first post of list should make it leave the first position
   *
   ******/
  it("TC008.01 - Down voting 3 times on the first post of list should make it leave the first position - First post should have 3 votes (points)", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);
    expect(popularResponse.data.posts[0].points).toBe(3);

    // Pick the first post from the most popular
    tc008LastPositionPostSlug = popularResponse.data.posts[0].slug;
  });

  it("TC008.02 - Down vote 1", async (): Promise<void> => {
    const downvoteResponse = await posts.postDownvotePosts(
      accessTokenForPostVoter,
      tc008LastPositionPostSlug
    );
    expect(downvoteResponse.status).toBe(200);
  });

  it("TC008.03 - Down vote 2", async (): Promise<void> => {
    const downvoteResponse = await posts.postDownvotePosts(
      accessTokenForPostSecondVoter,
      tc008LastPositionPostSlug
    );
    expect(downvoteResponse.status).toBe(200);
  });

  it("TC008.04 - Down vote 3", async (): Promise<void> => {
    const downvoteResponse = await posts.postDownvotePosts(
      accessTokenForPostOwner,
      tc008LastPositionPostSlug
    );
    expect(downvoteResponse.status).toBe(200);
  });

  it("TC008.05 - Assert new popular posts order - The first popular post slug is not the same that was down voted", async (): Promise<void> => {
    // Act
    const popularPostsResponse = await posts.getPopularPosts();

    // Assert
    expect(popularPostsResponse.status).toBe(200);
    expect(popularPostsResponse.data.posts[0].slug).not.toBe(
      tc008LastPositionPostSlug
    );
  });

  /******
   *
   * TC009 - Upvoting on post (without votes) comment should move it up on the popular posts
   *
   ******/
  it("TC009.01 - Upvoting on post (without votes) comment should move it up on the popular posts - Get last popular post", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);
    // Ensure it was no votes
    expect(popularResponse.data.posts[14].points).toBe(0);

    // Pick the last post from the most popular
    tc009LastPositionPostSlug = popularResponse.data.posts[14].slug;
  });

  it("TC009.02 - Create a comment", async (): Promise<void> => {
    const commentCreationResponse = await comments.replyPost(
      accessTokenForPostVoter,
      tc009LastPositionPostSlug,
      "this is a comment to the post..."
    );
    expect(commentCreationResponse.status).toBe(200);
  });

  it("TC009.03 - Get the comment id from the post comment", async (): Promise<void> => {
    const postCommentsResponse = await comments.getPostComments(
      tc009LastPositionPostSlug
    );
    expect(postCommentsResponse.status).toBe(200);
    const postComments = postCommentsResponse.data.comments;
    expect(postComments).toHaveLength(1);
    tc009CommentId = postComments[0].commentId;
  });

  it("TC009.04 - Upvote the comment", async (): Promise<void> => {
    const commentUpvoteResponse = await comments.upvoteComment(
      accessTokenForPostSecondVoter,
      tc009CommentId
    );
    expect(commentUpvoteResponse.status).toBe(200);
  });

  it("TC009.05 - Assert that the post moved up on the popular posts list - Ensure that the post is not in last position", async (): Promise<void> => {
    // Act
    const popularResponse = await posts.getPopularPosts();

    // Assert
    expect(popularResponse.status).toBe(200);
    const tc009post = popularResponse.data.posts.find(
      (p) => p.slug == tc009LastPositionPostSlug
    );
    const tc009position = popularResponse.data.posts.indexOf(tc009post);
    expect(tc009position).toBeLessThan(14);
  });
});
