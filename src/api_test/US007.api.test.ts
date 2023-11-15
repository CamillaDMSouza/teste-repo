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
import { repeat } from "lodash";

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

let accessToken: string;
let refreshToken: string;
let slug: string;

describe("TC-US007 - Comment a Post", (): void => {
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

      /**
       * Testing on Create User
       */

      it("Post - Create User", async (): Promise<void> => {
        const response = await users.post(
          "switch1",
          "switch1@gmail.com",
          "123456"
        );

        expect(response.status).toBe(200);
      });

      /**
       * Testing Log In
       */
      it("Post Login", async (): Promise<void> => {
        const response = await users.postLogin("switch1", "123456");
        expect(response.status).toBe(200);

        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      });

      /**
       * Testing Get Me Access Token
       */
      it("Get Me", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);

        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("switch1");
      });

      /**
       * Testing Creating Posts
       */

      it("Creates a post", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        //parameters of create a post  - accessToken,title, postType, text, link
        const response = await posts.postCreatePost(
          accessToken,
          "Sprint B",
          "text",
          "<p>Novo Comentário Sprint B</p>",
          ""
        );
        expect(response.status).toBe(200);
      });

      /**
       * Testing Get Slug of the Recent Post
       */

      it("Get slug of a post", async (): Promise<void> => {
        const response = await posts.getRecentPosts();

        expect(response.status).toBe(200);

        const postData = response.data.posts[0];

        expect(postData.slug).toBeDefined();

        slug = postData.slug;
      });

      /**
       * US 007 - Comment a Post
       * Test 01 - Testing sucess comments - Must be logged in and comment must have between 20 and 10000 characters
       */

      it("US007 - Test 01: Testing sucess comments - Must be logged in and comment must have between 20 and 10000 characters", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "<p>Comentário de Sucesso</p>"
        );

        expect(response.status).toBe(200);
      });

      /**
       * US 007 - Comment a Post
       * Test 02 - Testing the Numbers of Characters (20) in the Comment - Must have between 20 and 10000 characters
       */

      it("US007 - Test 02: Testing the Numbers of Characters (20) in the Comment - Must have between 20 and 10000 characters", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "<p>1234567891234</p>"
        );

        expect(response.status).toBe(200);
      });

      /**
       * US 007 - Comment a Post
       * Test 03 - Testing the Numbers of Characters (10000) in the Comment - Must have between 20 and 10000 characters
       */

      it("US007 - Test 03: Testing the Numbers of Characters (10000) in the Comment - Must have between 20 and 10000 characters", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "S".repeat(10000)
        );

        expect(response.status).toBe(200);
      });

      /**
       * US 007 - Comment a Post
       * Test 04 - Testing the Comment of a Post without a user logged in
       */

      it("US007 - Test 04: Testing the Comment of a Post without a user logged in", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          "",
          slug,
          "<p> Comentário sem Login </p>"
        );

        expect(response.status).toBe(403);
      });
      /**
       * US 007 - Comment a Post
       * Test 05 - Testing the Numbers of Characters (19) in the Comment
       */

      it("US007 - Test 05: Testing the Numbers of Characters (19) in the Comment", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost("", slug, "A".repeat(19));

        expect(response.status).toBe(500);
      });

      /**
       * US 007 - Comment a Post
       * Test 06 - Testing the Numbers of Characters (10001) in the Comment
       */

      it("US007 - Test 06: Testing the Numbers of Characters (10001) in the Comment", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "D".repeat(10001)
        );
        expect(response.status).toBe(500);
      });
    });
  });
});

export default {};
