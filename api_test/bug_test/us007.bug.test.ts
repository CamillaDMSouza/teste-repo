/* When creating a reply to the comment, 1 positive vote is automatically assigned.
the bug has already been fixed.
These are the guarantee tests that the comment is created with zero votes
create a user (bug US00)
login (bug US007)
getMe (bug US007)
create a post (bug US007)
get popular posts (bug US007)
get recent posts (bug US007)
receive a post (bug US007)
reply to a post (bug US007)
get comments with zero votes (bug US007)
*/

import { Logger } from "tslog";
import ConfigHandler from "../config/configHandler";

import Users from "../endpoints/Users";
import Posts from "../endpoints/Posts";
import Comments from "../endpoints/Comments";

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
let commentId: string;

describe("TC-US007 - Bug Tests", (): void => {
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

      it("US007-bug Post - Create User", async (): Promise<void> => {
        const response = await users.post(
          "US007-bug",
          "US007-bug@gmail.com",
          "123456"
        );

        expect(response.status).toBe(200);
      });

      /**
       * Testing Log In
       */
      it("US007-bug Post Login", async (): Promise<void> => {
        const response = await users.postLogin("US007-bug", "123456");
        expect(response.status).toBe(200);

        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      });

      /**
       * Testing Get Me Access Token
       */
      it("US007-bug Get Me", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);

        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("US007-bug");
      });

      /**
       * Testing Creating Posts
       */

      it("US007-bug Creates a post", async (): Promise<void> => {
        log.debug("Access token: " + accessToken);

        //parameters of create a post  - accessToken,title, postType, text, link
        const response = await posts.postCreatePost(
          accessToken,
          "Sprint c",
          "text",
          "<p>Novo Comentário Sprint C</p>",
          ""
        );
        expect(response.status).toBe(200);
      });

      /**
       * Testing Get Slug of the Recent Post
       */

      it("US007-bug Get slug of a post", async (): Promise<void> => {
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

      it(" US007-bug - Test 01: Testing sucess comments - Must be logged in and comment must have between 20 and 10000 characters", async (): Promise<void> => {
        log.debug("slug " + slug);
        log.debug("Access token: " + accessToken);

        const response = await comments.replyPost(
          accessToken,
          slug,
          "<p>Comentário de Sucesso</p>"
        );

        expect(response.status).toBe(200);
      });
      //zero votes verification test when creating a comment
      it("US007-bug get comment2 points(ok 0 vote)", async (): Promise<void> => {
        const response = await comments.getComment2(
          slug,
          "<p>Comentário de Sucesso</p>",
          0
        );
        expect(response.status).toBe(200);
      });
    });
  });
});

export default {};
