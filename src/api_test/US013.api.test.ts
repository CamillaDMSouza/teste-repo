/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import * as jwt from "jsonwebtoken";
import { JWTClaims } from "../modules/users/domain/jwt";
import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";
import Members from "./endpoints/member";
import { is } from "sequelize/types/lib/operators";
import e from "express";

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
let isdeleted: boolean;

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

  //testing on get user by username

  it("Get a user by username", async (): Promise<void> => {
    const response = await users.getUserByUsername(username, accessToken);
    expect(response.status).toBe(200);
  });

  // testing on delete user

  it("Delete a user", async (): Promise<void> => {
    const response = await users.deleteUser(accessToken, "123");
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
  //criar um user, fazer login, get me, delete user
  it("create a user us013", async (): Promise<void> => {
    const response = await users.post("us013-1", "us013-1@gmail.com", "123456");
    expect(response.status).toBe(200);
  });
  it("Post Login us013-1", async (): Promise<void> => {
    const response = await users.postLogin("us013-1", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;

    const decodedToken = jwt.decode(accessToken) as JWTClaims;

    userId = decodedToken.userId;
  });
  it("Get Me us013-1", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("us013-1");
  });
  it("delete a user us013", async (): Promise<void> => {
    const response = await users.deleteUser(accessToken, "us013-1");
    expect(response.status).toBe(200);
  });
  it("Post logout us013-1", async (): Promise<void> => {
    const response = await users.postLogout(accessToken);
    expect(response.status).toBe(200);
  });
  //cretae a user, login, get me logout
  it("create a user us013-2", async (): Promise<void> => {
    const response = await users.post("us013-2", "us013-2@live.com", "123456");
    expect(response.status).toBe(200);
  });
  it("Post Login us013-2", async (): Promise<void> => {
    const response = await users.postLogin("us013-2", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });
  it("Get Me us013-2", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("us013-2");
  });
  it("Post logout us013-2", async (): Promise<void> => {
    const response = await users.postLogout(accessToken);
    expect(response.status).toBe(200);
  });
  /*
  it("list all users us013-2", async (): Promise<void> => {
    const response = await users.ListUsers(accessToken, username);
    expect(response.status).toBe(200);
    expect(response.data.users).toBeDefined();
    expect(response.data.users).toContain("123");
    console.log(response);
  });*/
});

export default {};
