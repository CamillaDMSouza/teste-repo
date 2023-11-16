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
import { AxiosResponse } from "axios";

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

describe("Posts endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();

    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  describe("Users endpoint", (): void => {
    beforeAll(async (): Promise<void> => {
      users = new Users();

      log.debug("1. Users Base url: " + users.getBaseUrl());
    });

    describe("Comments endpoint", (): void => {
      beforeAll(async (): Promise<void> => {
        comments = new Comments();

        log.debug("1. Comments Base url: " + comments.getBaseUrl());
      });

      /** Testing on create user */

      it("Post - Create User", async (): Promise<void> => {
        const response = await users.post(
          "Camilla",
          "Camilla@gmail.com",
          "123456789",
        );
        expect(response.status).toBe(200);
      });

      /** Testing log in */

      it("Post Login", async (): Promise<void> => {
        const response = await users.postLogin("Camilla", "123456789");
        expect(response.status).toBe(200);

        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      });

      /** Testing to get access token */

      it("Get Me", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);

        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("Camilla");
      });

      /** Testing creating posts */

      it("Creates a post", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        /**parameters of create a post  - accessToken,title, postType, text, link */
        const response = await posts.postCreatePost(
          accessToken,
          "Novo post através de VSCode",
          "text",
          "<p>Post através de VSCode</p>",
          "",
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

      /** Testing the comments */

      it("Reply to a post", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "<p>Camillaaa</p>",
        );

        expect(response.status).toBe(200);
      });

      it("Get commentID of a comment of a post", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.getPostComments(slug);
        expect(response.status).toBe(200);

        expect(response.data.comments).toBeDefined();
        expect(response.data.comments.length).toBeGreaterThan(0);

        const commentI = response.data.comments[0].commentId;
        expect(commentI).toBeDefined();

        commentId = response.data.comments[0].commentId;
      });

      /** US010 - Testing votes on comments
       *
       * Testing upvote and downvote comments   */
      it("Upvote a comment with correctly registered user ", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.upvoteComment(accessToken, commentId);
        expect(response.status).toBe(200);
      });

      it("Downvote a comment with correctly registered user ", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.downvoteComment(accessToken, commentId);
        expect(response.status).toBe(200);
      });

      /** Testing upvote and downvote comments with invalid credentials */
      it("Upvote a comment with invalid credentials", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.upvoteComment(
          (accessToken = "X"),
          commentId,
        );
        expect(response.status).toBe(403);
      });

      it("Downvote a comment with invalid credentials", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.downvoteComment(
          (accessToken = "X"),
          commentId,
        );
        expect(response.status).toBe(403);
      });

      /** Testing upvote and downvote comments without credentials */
      it("Upvote a comment without credentials", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.upvoteComment(
          (accessToken = ""),
          commentId,
        );
        expect(response.status).toBe(500);
      });

      it("Downvote a comment without credentials", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);
        log.debug("commentId " + commentId);

        const response = await comments.downvoteComment(
          (accessToken = ""),
          commentId,
        );
        expect(response.status).toBe(500);
      });
    });
  });
});
