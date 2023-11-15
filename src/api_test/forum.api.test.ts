/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";
import * as jwt from "jsonwebtoken";
import { JWTClaims } from "../modules/users/domain/jwt";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";
import Members from "./endpoints/member";

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
let members: Members;

let accessToken: string;
let refreshToken: string;
let slug: string;
let commentId: string;
let userId: string;
let email: string;
let username: string;
let memberId: string;

describe("All functionalities working - status code: 200", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();
    comments = new Comments();
    members = new Members();
  });

  // testing on create user, log in, and get me access token//

  it("Post - Create User", async (): Promise<void> => {
    const response = await users.post("123", "123@gmail.com", "123456");

    expect(response.status).toBe(200);
  });

  it("Post Login", async (): Promise<void> => {
    const response = await users.postLogin("123", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    const decodedToken = jwt.decode(accessToken) as JWTClaims;

    userId = decodedToken.userId;
    email = decodedToken.email;
    username = decodedToken.username;
  });

  it("Get Me", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("123");
  });

  //testing creating posts, get popular posts, get recent posts, get slug of a post, upvote a post, downvote a post

  it("Creates a post", async (): Promise<void> => {
    //parameters of create a post  - accessToken,title, postType, text, link
    const response = await posts.postCreatePost(
      accessToken,
      "Novo post através de VSCode",
      "text",
      "<p>Post através de VSCode</p>",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Creates a post - Sem Comment", async (): Promise<void> => {
    //parameters of create a post  - accessToken,title, postType, text, link
    const response = await posts.postCreatePost(
      accessToken,
      "Novo post através de VSCode - Sem Comment",
      "text",
      "<p>Post através de VSCode - Sem Comment</p>",
      ""
    );
    expect(response.status).toBe(200);
  });

  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("Get slug of a post", async (): Promise<void> => {
    const response = await posts.getRecentPosts();

    expect(response.status).toBe(200);

    const postData = response.data.posts[0];

    expect(postData.slug).toBeDefined();

    slug = postData.slug;
  });

  it("Upvote a post", async (): Promise<void> => {
    const response = await posts.postUpvotePosts(accessToken, slug);
    expect(response.status).toBe(200);
  });

  it("Downvote a post", async (): Promise<void> => {
    const response = await posts.postDownvotePosts(accessToken, slug);

    expect(response.status).toBe(200);
  });

  // testing on comments and upvote and downvote comments

  it("Reply to a post", async (): Promise<void> => {
    const response = await comments.replyPost(
      accessToken,
      slug,
      "<p>Comentário a um post através de VSCode</p>"
    );

    expect(response.status).toBe(200);
  });

  it("Get commentID of a comment of a post", async (): Promise<void> => {
    const response = await comments.getPostComments(slug);
    expect(response.status).toBe(200);

    expect(response.data.comments).toBeDefined();
    expect(response.data.comments.length).toBeGreaterThan(0);

    const commentI = response.data.comments[0].commentId;
    expect(commentI).toBeDefined();

    commentId = response.data.comments[0].commentId;
  });

  it("Comment a comment of a post", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "<p>Comentário a um comentário através de VSCode</p>"
    );
    expect(response.status).toBe(200);
  });

  it("Upvote a comment", async (): Promise<void> => {
    const response = await comments.upvoteComment(accessToken, commentId);
    expect(response.status).toBe(200);
  });

  it("Downvote a comment", async (): Promise<void> => {
    const response = await comments.downvoteComment(accessToken, commentId);
    expect(response.status).toBe(200);
  });

  it("Get Percentage of Posts without Comments", async (): Promise<void> => {
    const day = 15;
    const month = 10;
    const year = 2023;

    const date = new Date(year, month - 1, day);
    const response = await posts.getPercentageOfPostsWithoutComments(
      accessToken,
      date
    );

    expect(response.status).toBe(200);

    console.log(response.data);
  });

  it("Get list of Usernames without Posts and without Comments", async (): Promise<void> => {
    const day = 15;
    const month = 10;
    const year = 2023;

    const date = new Date(year, month - 1, day);
    const response =
      await posts.getUsernamesWithoutPostsAndWithoutCommentsByDateController(
        accessToken,
        date
      );

    expect(response.status).toBe(200);

    console.log(response.data);
  });

  //testing on get user by username

  it("Get a user by username", async (): Promise<void> => {
    const response = await users.getUserByUsername(username, accessToken);
    expect(response.status).toBe(200);
  });

  // testing on delete user

  it("Delete a user", async (): Promise<void> => {
    const response = await users.deleteUser(accessToken, username);
    expect(response.status).toBe(200);
  });

  it("Login 2nd try", async (): Promise<void> => {
    const response = await users.postLogin("123", "123456");
    expect(response.status).toBe(500);
  });

  it("Member Logout of the Forum", async (): Promise<void> => {
    const response = await users.postLogout(accessToken);
    expect(response.status).toBe(200);
  });

  it("Get Member by username", async (): Promise<void> => {
    const response = await members.getMemberByUserName(username, accessToken);
    expect(response.status).toBe(200);
  });

  it("Get Member Post Count", async (): Promise<void> => {
    const response = await members.getMemberPostCount(username);

    expect(response.status).toBe(200);
  });

  it("Get Member Comment Count", async (): Promise<void> => {
    const response = await members.getMemberCommentCount(username);

    expect(response.status).toBe(200);
  });
});

export default {};
