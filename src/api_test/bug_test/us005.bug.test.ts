/* * Error in Link Validation When Creating a Post
Creating a new user;
* Creation verification (accesstoken);
* User login;
* Post creation (title and link) successfully - 200 - caracter 8;
* Post creation (title and link) successfully - 200 - caracter 500;
* Error Creation (link) - Error 500 - caracter 7
* Error Creation (link) - Error 500 - caracter 501
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

describe("TC-US005 - Bug Tests", (): void => {
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
      it("US005 - Post - Create User", async (): Promise<void> => {
        const response = await users.post(
          "US005-bug",
          "US005-bug@gmail.com",
          "123456"
        );
        expect(response.status).toBe(200);
      });

      it("US005 - Post Login", async (): Promise<void> => {
        const response = await users.postLogin("US005-bug", "123456");
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();
        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      });

      it("US005 - Get Me", async (): Promise<void> => {
        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);
        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("US005-bug");
      });
      //link border changes
      // parameters of create a post  title sucess and link sucess (8 characters)
      it("US005 - Creates a post sucess link 8 characters", async (): Promise<void> => {
        const response = await posts.postCreatePost(
          accessToken,
          "US005 - link7",
          "link",
          "",
          "www.bcom"
        );
        expect(response.status).toBe(200);
      });
      // parameters of create a post  title sucess and link sucess (500 characters)
      it("US005 - Creates a post sucess link 500 characters", async (): Promise<void> => {
        const response = await posts.postCreatePost(
          accessToken,
          "US005 - link500",
          "link",
          "",
          "www.google.com/googlegooglegooglegooglegooglegooglegooglegooglegooglegoogle.com/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegookhfdz500"
        );
        expect(response.status).toBe(200);
      });
      // parameters of create a post  title error (7 characters)
      it("US005 - Creates a post error link 7 characters", async (): Promise<void> => {
        const response = await posts.postCreatePost(
          accessToken,
          "US005 - link6",
          "link",
          "",
          "www.bcm"
        );
        expect(response.status).toBe(500);
      });
      // parameters of create a post  title error (501 characters)
      it("US005 - Creates a post error link 501 characters", async (): Promise<void> => {
        const response = await posts.postCreatePost(
          accessToken,
          "US005 - link501",
          "link",
          "",
          "www.google.com/googlegooglegooglegooglegooglegooglegooglegooglegooglegoogle.com/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegooglegooglegooglegoooglegoooglegooogelgoogleerrocom/googlegooglegooglegooglegookhfdz5001"
        );
        expect(response.status).toBe(500);
      });
    });
  });
});
export default {};
