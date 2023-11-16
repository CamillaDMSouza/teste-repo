/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let users: Users;
let comments: Comments;

let accessToken: string;
let refreshToken: string;
let slug: string;
let commentId: string;

describe("US008 - reply to a comment of a post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();
    comments = new Comments();
  });

  // testing on create user, log in, and get me access token//

  it("US008 Post - Create User", async (): Promise<void> => {
    const response = await users.post("US008", "US008@gmail.com", "123456");

    expect(response.status).toBe(200);
  });

  it("US008 Post Login", async (): Promise<void> => {
    const response = await users.postLogin("US008", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("US008 Get Me", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("US008");
  });

  //testing creating posts, get popular posts, get recent posts, get slug of a post, upvote a post, downvote a post

  it("US008 Creates a post", async (): Promise<void> => {
    //parameters of create a post  - accessToken,title, postType, text, link
    const response = await posts.postCreatePost(
      accessToken,
      "US008 New post",
      "text",
      "US008 Post text",
      "",
    );
    expect(response.status).toBe(200);
  });

  it("US008 Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US008 Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US008 Get slug of a post", async (): Promise<void> => {
    const response = await posts.getRecentPosts();

    expect(response.status).toBe(200);

    const postData = response.data.posts[0];

    expect(postData.slug).toBeDefined();

    slug = postData.slug;
  });

  // testing on comments and upvote and downvote comments

  it("US008 Reply to a post", async (): Promise<void> => {
    const response = await comments.replyPost(
      accessToken,
      slug,
      "US008 Comment text to a post",
    );

    expect(response.status).toBe(200);
  });

  it("US008 Get commentID of a comment of a post", async (): Promise<void> => {
    const response = await comments.getPostComments(slug);
    expect(response.status).toBe(200);

    expect(response.data.comments).toBeDefined();
    expect(response.data.comments.length).toBeGreaterThan(0);

    const commentI = response.data.comments[0].commentId;
    expect(commentI).toBeDefined();

    commentId = response.data.comments[0].commentId;
  });

  it("US008 Comment a comment of a post", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "US008 Comment text to a comment of a post",
    );
    expect(response.status).toBe(200);
  });

  it("US008 Comment a comment of a post with less chars on text (1) - Must have between 20 and 10 000", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "U",
    );
    expect(response.status).toBe(500);
  });

  it("US008 Comment a comment of a post with less chars on text (19) - Must have between 20 and 10 000", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "U".repeat(19),
    );
    expect(response.status).toBe(500);
  });

  it("US008 Comment a comment of a post with less chars on text (20) - Must have between 20 and 10 000", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "U".repeat(20),
    );
    expect(response.status).toBe(200);
  });

  it("US008 Comment a comment of a post with more chars on text (10 000) - Must have between 20 and 10 000", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "U".repeat(10000),
    );
    expect(response.status).toBe(200);
  });

  it("US008 Comment a comment of a post with more chars on text (10 001) - Must have between 20 and 10 000", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "U".repeat(10001),
    );
    expect(response.status).toBe(500);
  });

  it("US008 Comment a comment of a post while not logged in successfully", async (): Promise<void> => {
    const response = await comments.replyComment(
      (accessToken = ""),
      slug,
      commentId,
      "US008 Comment text to a comment of a post",
    );
    expect(response.status).toBe(403);
  });
});

export default {};
