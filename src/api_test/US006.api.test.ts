/*
 * Creating a new user;
 * Creation verification (accesstoken);
 * User login;
 * Post creation (title and text) successfully;
 * verification of the post creation;
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

      // testing on create user, log in, and get me access token//

      it("US006 - Post - Create User", async (): Promise<void> => {
        const response = await users.post(
          "US006",
          "PostRecent@gmail.com",
          "123456",
        );
        expect(response.status).toBe(200);
      });
      it("US006 - Post Login", async (): Promise<void> => {
        const response = await users.postLogin("US006", "123456");
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();
        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      });

      it("US006 - Get Me", async (): Promise<void> => {
        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);

        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("US006");
      });

      //parameters of create a post full sucess
      it("US006 - Creates a post", async (): Promise<void> => {
        const response = await posts.postCreatePost(
          accessToken,
          "US006-Postrecent",
          "text",
          "US006-verificação de Post recent",
          "",
        );
        expect(response.status).toBe(200);
      });

      //parameters of get recent post
      it("US006 - Get recent posts (US006-Postrecent)", async (): Promise<void> => {
        const response = await posts.getRecentPosts();
        expect(response.status).toBe(200);
        expect(response.data.posts).toBeDefined();
      });
    });
  });
});

export default {};
