import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";
import * as jwt from "jsonwebtoken";
import { JWTClaims } from "../modules/users/domain/jwt";
import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";

const config = ConfigHandler.getInstance();
/**
 * Creates a new Logger instance with the specified configuration options.
 * @param {object} options - The configuration options for the Logger instance.
 * @param {string} options.minLevel - The minimum log level to output.
 * @param {string} [options.dateTimeTimezone] - The timezone to use for log timestamps. If not specified, the system timezone will be used.
 */
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let posts: Posts;
let users: Users;
let comments: Comments;

let commentId: string;
let userId: string;
let email: string;
let username: string;
let password: string;
let accessToken: string;
let refreshToken: string;
let slug: string;

let accessTokenAdminUser: string;
let accessTokenUserNumber1: string;
let accessTokenUserNumber2: string;
let accessTokenUserNumber3: string;

let refreshTokenAdminUser: string;
let refreshTokenUserNumber1: string;
let refreshTokenUserNumber2: string;

let slugAdminUserPost1: string;
let slugAdminUserPost2: string;
let slugAdminUserPost3: string;
let slugUserNumber1Post1: string;
let slugUserNumber1Post2: string;
let slugUserNumber1Post3: string;
let slugUserNumber2Post1: string;
let slugUserNumber2Post2: string;
let slugUserNumber2Post3: string;

let commentIdUserNumber1CommentToAdminPost1: string;
let idCommentUserNumber1CommentToAdminPost1: string;
let commentIdUserNumber1CommentToAdminPost3: string;
let idCommentUserNumber1CommentToAdminPost3: string;

/******
 * US012 - Display Information of Member
 *
 * Test Case Scenario:
 *
 * A. Creation of 4 users:
 *    - adminuser
 *    - user-number1
 *    - user-number2
 *    - user-number3
 *
 *------------------------------------------------------------------------------------
 * B. Login with each user
 *
 * C. Number of posts Created by each user:
 *   - adminuser: 4
 *   - user-number1: 3
 *   - user-number2: 3
 *   - user-number3: 0
 *
 *------------------------------------------------------------------------------------
 * D. Total number of comments received by each user on all it´s posts
 *   - adminuser: 4
 *   - user-number1: 1
 *   - user-number2: 2
 *   - user-number3: 0
 *
 *------------------------------------------------------------------------------------
 * E. Most Commented User will be:
 *   - admin user
 *   - 4 comments
 *
 *------------------------------------------------------------------------------------
 * F. User with no posts or comments (condition to be deleted) will be:
 *
 *  - user-number3
 *  - o Posts
 *  - o Comments
 *
 *
 ******/

describe("US012 - Display information of member  -------------------  API Unit Tests", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    posts = new Posts();
    comments = new Comments();
  });

  /******
   * Data Loading - Pre-Functional Tests
   *
   * US012/A - Data Insertion for Admin User
   *
   ******/

  describe("US012/A ------------------- Data Insertion ------------------- Admin User", (): void => {
    it("US012/A - 1 -------------------------------------- Register Admin User", async (): Promise<void> => {
      const responseCreateAdminUser = await users.post(
        "adminuser",
        "adminuser@gmail.com",
        "adminuser"
      );
      expect(responseCreateAdminUser.status).toBe(200);
    });

    it("US012/A - 2 -------------------------------------- Login Admin User", async (): Promise<void> => {
      /**
       * Logs in with admin user credentials and retrieves the response.
       * @returns {Promise<Response>} The response from the login request.
       */
      const responseLoginAdminUser = await users.postLogin(
        "adminuser",
        "adminuser"
      );
      expect(responseLoginAdminUser.status).toBe(200);

      expect(responseLoginAdminUser.data.accessToken).toBeDefined();
      expect(responseLoginAdminUser.data.refreshToken).toBeDefined();

      accessTokenAdminUser = responseLoginAdminUser.data.accessToken;
      refreshTokenAdminUser = responseLoginAdminUser.data.refreshToken;

      const decodedToken = jwt.decode(accessTokenAdminUser) as JWTClaims;

      userId = decodedToken.userId;
      email = decodedToken.email;
      username = decodedToken.username;
    });

    /**
     * Post creation by Admin User:
     *
     * Admin User will create 3 posts
     *
     * */
    it("US012/A - 3 -------------------------------------- Creates 1st Post Admin User", async (): Promise<void> => {
      /**
       * Creates a new post for an admin user.
       * @param {string} accessToken - The access token for the admin user.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image associated with the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseAdminUserPost1 = await posts.postCreatePost(
        accessTokenAdminUser,
        "Admin User - Post 1",
        "text",
        "This concerns the 1st post from User1",
        ""
      );
      expect(responseAdminUserPost1.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/A - 4 -------------------------------------- Creates 2nd Post Admin User", async (): Promise<void> => {
      /**
       * Creates a new post for an admin user.
       * @param {string} accessToken - The access token for the admin user.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image to be included in the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseAdminUserPost2 = await posts.postCreatePost(
        accessTokenAdminUser,
        "Admin User - Post 2",
        "text",
        "This concerns the 2nd post from Admin User",
        ""
      );
      expect(responseAdminUserPost2.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/A - 5 -------------------------------------- Creates 3rd Post Admin User", async (): Promise<void> => {
      /**
       * Creates a new post for an admin user.
       * @param {string} accessToken - The access token for the admin user.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image to be included in the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseAdminUserPost3 = await posts.postCreatePost(
        accessTokenAdminUser,
        "Admin User - Post 3",
        "text",
        "This concerns the 3rd post from Admin User",
        ""
      );
      expect(responseAdminUserPost3.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/A - 6 -------------------------------------- Creates 4th Post Admin User", async (): Promise<void> => {
      /**
       * Creates a new post for an admin user.
       * @param {string} accessToken - The access token for the admin user.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image to be included in the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseAdminUserPost4 = await posts.postCreatePost(
        accessTokenAdminUser,
        "Admin User - Post 4",
        "text",
        "This concerns the 4th post from Admin User",
        ""
      );
      expect(responseAdminUserPost4.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/A - 7 -------------------------------------- Get popular posts", async (): Promise<void> => {
      /**
       * Retrieves popular posts using the posts.getPopularPosts() method.
       * @returns {Promise<Response>} A promise that resolves with the response object representing the popular posts.
       */
      const response = await posts.getPopularPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    it("US012/A - 8 -------------------------------------- Get recent posts", async (): Promise<void> => {
      /**
       * Retrieves the recent posts using the `getRecentPosts` function from the `posts` API.
       * @returns {Promise<Response>} A promise that resolves to the response object of the API call.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    it("US012/A - 9 -------------------------------------- Get Me", async (): Promise<void> => {
      /**
       * Calls the `getMe` function of the `users` API with the provided access token for an admin user.
       * @param accessTokenAdminUser The access token for an admin user.
       * @returns A Promise that resolves to the response of the `getMe` function.
       */
      const responseAdminUserGetMe = await users.getMe(accessTokenAdminUser);
      expect(responseAdminUserGetMe.status).toBe(200);

      expect(responseAdminUserGetMe.data.user).toBeDefined();
      expect(responseAdminUserGetMe.data.user.username).toBeDefined();
      expect(responseAdminUserGetMe.data.user.username).toContain("adminuser");
    });

    it("US012/A - 10 -------------------------------------- Logout Admin User", async (): Promise<void> => {
      /**
       * Logs out an admin user using the provided access token.
       * @param accessTokenAdminUser - The access token of the admin user.
       * @returns A promise that resolves with the response of the logout request.
       */
      const responseAdminUserLogout = await users.postLogout(
        accessTokenAdminUser
      );
      expect(responseAdminUserLogout.status).toBe(200);
    });
  });

  /******
   * Data Loading - Pre-Functional Tests
   *
   * US012/B - Data Insertion for User-Number1
   *
   ******/

  describe("US012/B ------------------- Data Insertion ------------------- User-Number1", (): void => {
    it("US012/B - 1 -------------------------------------- Register User-Number1", async (): Promise<void> => {
      /**
       * Creates a new user with the given name, email and password.
       * @param {string} name - The name of the user.
       * @param {string} email - The email of the user.
       * @param {string} password - The password of the user.
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseCreateUserNumber1 = await users.post(
        "user-number1",
        "user-number1@gmail.com",
        "user-number1"
      );
      expect(responseCreateUserNumber1.status).toBe(200);
    });

    it("US012/B - 2 -------------------------------------- Login User-Number1", async (): Promise<void> => {
      /**
       * Logs in user number 1 with the given credentials and returns the response.
       * @param {string} username - The username of the user to log in.
       * @param {string} password - The password of the user to log in.
       * @returns {Promise<any>} - The response from the login API call.
       */
      const responseLoginUserNumber1 = await users.postLogin(
        "user-number1",
        "user-number1"
      );
      expect(responseLoginUserNumber1.status).toBe(200);

      expect(responseLoginUserNumber1.data.accessToken).toBeDefined();
      expect(responseLoginUserNumber1.data.refreshToken).toBeDefined();

      accessTokenUserNumber1 = responseLoginUserNumber1.data.accessToken;
      refreshTokenUserNumber1 = responseLoginUserNumber1.data.refreshToken;

      const decodedToken = jwt.decode(accessTokenUserNumber1) as JWTClaims;

      userId = decodedToken.userId;
      email = decodedToken.email;
      username = decodedToken.username;
    });

    /**
     * Post creation by User Number 1
     *
     * User Number 1 will create 3 posts
     *
     * */
    it("US012/B - 3 -------------------------------------- Creates 1st Post User-Number1", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number1 with the given parameters.
       * @param {string} accessToken - The access token for User-Number1.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [image] - The image associated with the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseUserNumber1Post1 = await posts.postCreatePost(
        accessTokenUserNumber1,
        "User-Number1 - Post 1",
        "text",
        "This concerns the 1st post from User-Number1",
        ""
      );
      expect(responseUserNumber1Post1.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/B - 4 -------------------------------------- Get slug of User-Number1 Post 1", async (): Promise<void> => {
      /**
       * Retrieves User-Number1 Post 1 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post1 = response.data.posts[3].slug;
    });

    it("US012/B - 5 -------------------------------------- Creates 2nd Post User-Number1", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number1 using the provided access token.
       * @param {string} accessTokenUserNumber1 - The access token for User-Number1.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl=""] - The URL of the image associated with the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseUserNumber1Post2 = await posts.postCreatePost(
        accessTokenUserNumber1,
        "User-Number1 - Post 2",
        "text",
        "This concerns the 2nd post from User-Number1",
        ""
      );
      expect(responseUserNumber1Post2.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/B - 6 -------------------------------------- Get slug of User-Number1 Post 2", async (): Promise<void> => {
      /**
       * Retrieves User-Number1 Post 1 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post2 = response.data.posts[4].slug;
    });

    it("US012/B - 7 -------------------------------------- Creates 3rd Post User-Number1", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number1 with the given parameters.
       * @param {string} accessToken - The access token for User-Number1.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [image] - The image associated with the post (optional).
       * @returns {Promise<any>} - A Promise that resolves with the response from the API.
       */
      const responseUserNumber1Post3 = await posts.postCreatePost(
        accessTokenUserNumber1,
        "User-Number1 - Post 3",
        "text",
        "This concerns the 3rd post from User-Number1",
        ""
      );
      expect(responseUserNumber1Post3.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/B - 8 -------------------------------------- Get slug of User-Number1 Post 3", async (): Promise<void> => {
      /**
       * Retrieves User-Number1 Post 3 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response data.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post3 = response.data.posts[5].slug;
    });

    it("US012/B - 9 -------------------------------------- Get popular posts", async (): Promise<void> => {
      /**
       * Retrieves popular posts using the posts.getPopularPosts() method.
       * @returns {Promise<Response>} A promise that resolves with the response from the API.
       */
      const response = await posts.getPopularPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    it("US012/B - 10 -------------------------------------- Get recent posts", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` function from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    /**
     * Voting on posts by User Number 1:
     *
     * User Number 1 will Upvote on Admin User Post 1
     * User Number 1 will Upvote on Admin User Post 2
     * User Number 1 will Downvote on Admin User Post 3
     *
     */
    it("US012/B - 11 -------------------------------------- Get slug of Admin User Post 1", async (): Promise<void> => {
      /**
       * Retrieves Admin User Post 1 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost1 = response.data.posts[0].slug;
    });

    it("US012/B - 12 -------------------------------------- Get slug of Admin User Post 2", async (): Promise<void> => {
      /**
       *  Retrieves Admin User Post 2 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost2 = response.data.posts[1].slug;
    });

    it("US012/B - 13 -------------------------------------- Get slug of Admin User Post 3", async (): Promise<void> => {
      /**
       *  Retrieves Admin User Post 3 slug using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost3 = response.data.posts[2].slug;
    });

    it("US012/B - 14 -------------------------------------- User-Number1 Upvotes on Admin User Post 1", async (): Promise<void> => {
      /**
       * Sends a POST request to upvote a post with the given slug using the provided access token.
       * @param {string} accessToken - The access token for the user performing the upvote.
       * @param {string} slug - The slug of the post to upvote.
       * @returns {Promise<any>} - A Promise that resolves with the response data from the API.
       */
      const responseUserNumber1UpvoteAdminUserPost1 =
        await posts.postUpvotePosts(accessTokenUserNumber1, slugAdminUserPost1);
      expect(responseUserNumber1UpvoteAdminUserPost1.status).toBe(200);
    });

    it("US012/B - 15 -------------------------------------- User-Number1 Upvotes on Admin User Post 2", async (): Promise<void> => {
      /**
       * Sends a POST request to upvote a post with the given slug using the provided access token.
       * @param {string} accessToken - The access token to use for authentication.
       * @param {string} slug - The slug of the post to upvote.
       * @returns {Promise<any>} - A Promise that resolves with the response data.
       */
      const responseUserNumber1UpvoteAdminUserPost2 =
        await posts.postUpvotePosts(accessTokenUserNumber1, slugAdminUserPost2);
      expect(responseUserNumber1UpvoteAdminUserPost2.status).toBe(200);
    });

    it("US012/B - 16 -------------------------------------- User-Number1 Downvotes on Admin User Post 3", async (): Promise<void> => {
      /**
       * Sends a POST request to downvote a post using the provided access token and post slug.
       * @param {string} accessToken - The access token of the user performing the downvote.
       * @param {string} postSlug - The slug of the post to be downvoted.
       * @returns {Promise<any>} - A Promise that resolves with the response data.
       */
      const responseUserNumber1UpvoteAdminUserPost3 =
        await posts.postDownvotePosts(
          accessTokenUserNumber1,
          slugAdminUserPost3
        );
      expect(responseUserNumber1UpvoteAdminUserPost3.status).toBe(200);
    });

    /**
     * Reply to posts by User Number 1:
     *
     * User Number 1 will comment on Admin User Post 1
     * User Number 1 will comment on Admin User Post 2
     * User Number 1 will comment on Admin User Post 3
     *
     * */
    it("US012/B - 17 -------------------------------------- User-Number1 Comments on Admin User Post 1", async (): Promise<void> => {
      /**
       * Replies to a post with a comment from User-Number1 on Admin User Post 1
       * @param accessTokenUserNumber1 - Access token for User-Number1
       * @param slugAdminUserPost1 - Slug for Admin User Post 1
       * @param comment - The comment to be posted
       * @returns The response from the API call
       */
      const responseUserNumber1CommentAdminUserPost1 = await comments.replyPost(
        accessTokenUserNumber1,
        slugAdminUserPost1,
        "This is a comment from User-Number1 on Admin User Post 1"
      );
      expect(responseUserNumber1CommentAdminUserPost1.status).toBe(200);
    });

    it("US012/B - 18 -------------------------------------- User-Number1 Comments on Admin User Post 3", async (): Promise<void> => {
      /**
       * Replies to a post with a comment from User-Number1 on Admin User Post 2.
       * @param accessTokenUserNumber1 - The access token for User-Number1.
       * @param slugAdminUserPost3 - The slug for Admin User Post 3.
       * @param comment - The comment to be posted.
       * @returns The response from the API call.
       */
      const responseUserNumber1CommentAdminUserPost2 = await comments.replyPost(
        accessTokenUserNumber1,
        slugAdminUserPost3,
        "This is a comment from User-Number1 on Admin User Post 2"
      );
      expect(responseUserNumber1CommentAdminUserPost2.status).toBe(200);
    });

    it("US012/B - 19 -------------------------------------- Get Me", async (): Promise<void> => {
      /**
       * Calls the `getMe` function of the `users` API with the provided access token for user number 1.
       * @param accessTokenUserNumber1 The access token for user number 1.
       * @returns A Promise that resolves to the response of the `getMe` function.
       */
      const responseUserNumber1GetMe = await users.getMe(
        accessTokenUserNumber1
      );
      expect(responseUserNumber1GetMe.status).toBe(200);

      expect(responseUserNumber1GetMe.data.user).toBeDefined();
      expect(responseUserNumber1GetMe.data.user.username).toBeDefined();
      expect(responseUserNumber1GetMe.data.user.username).toContain(
        "user-number1"
      );
    });

    it("US012/B - 20 -------------------------------------- Logout User-Number1", async (): Promise<void> => {
      /**
       * Logs out the user with the given access token.
       * @param accessToken - The access token of the user to be logged out.
       * @returns A Promise that resolves with the response of the logout request.
       */
      const responseUserNumber1Logout = await users.postLogout(
        accessTokenUserNumber1
      );
      expect(responseUserNumber1Logout.status).toBe(200);
    });
  });

  /******
   * Data Loading - Pre-Functional Tests
   *
   * US012/C - Data Insertion for User-Number2
   *
   ******/

  describe("US012/C ------------------- Data Insertion ------------------- User-Number2", (): void => {
    it("US012/C - 1 -------------------------------------- Register User-Number2", async (): Promise<void> => {
      /**
       * Creates a new user with the given username, email and password.
       * @param {string} username - The username of the new user.
       * @param {string} email - The email of the new user.
       * @param {string} password - The password of the new user.
       * @returns {Promise<any>} - A Promise that resolves with the response data from the API.
       */
      const responseCreateUserNumber2 = await users.post(
        "user-number2",
        "user-number2@gmail.com",
        "user-number2"
      );
      expect(responseCreateUserNumber2.status).toBe(200);
    });

    it("US012/C - 2 -------------------------------------- Login User-Number2", async (): Promise<void> => {
      /**
       * Logs in user number 2 with the given credentials and returns the response.
       * @param {string} username - The username of the user to log in.
       * @param {string} password - The password of the user to log in.
       * @returns {Promise<any>} - The response of the login request.
       */
      const responseLoginUserNumber2 = await users.postLogin(
        "user-number2",
        "user-number2"
      );
      expect(responseLoginUserNumber2.status).toBe(200);

      expect(responseLoginUserNumber2.data.accessToken).toBeDefined();
      expect(responseLoginUserNumber2.data.refreshToken).toBeDefined();

      accessTokenUserNumber2 = responseLoginUserNumber2.data.accessToken;
      refreshTokenUserNumber2 = responseLoginUserNumber2.data.refreshToken;

      const decodedToken = jwt.decode(accessTokenUserNumber2) as JWTClaims;

      userId = decodedToken.userId;
      email = decodedToken.email;
      username = decodedToken.username;
    });

    /**
     * Post creation by User Number 2
     *
     * User Number 2 will create 3 posts
     *
     * */
    it("US012/C - 3 -------------------------------------- Creates 1st Post User-Number2", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number2 using the provided access token.
       * @param {string} accessTokenUserNumber2 - The access token for User-Number2.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image associated with the post (optional).
       * @returns {Promise<any>} - A Promise that resolves with the response from the API.
       */
      const responseUserNumber2Post1 = await posts.postCreatePost(
        accessTokenUserNumber2,
        "User-Number2 - Post 1",
        "text",
        "This concerns the 1st post from User-Number2",
        ""
      );
      expect(responseUserNumber2Post1.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/C - 4 -------------------------------------- Get slug of User-Number2 Post 1", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post1 = response.data.posts[6].slug;
    });

    it("US012/C - 5 -------------------------------------- Creates 2nd Post User-Number2", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number2 using the provided access token.
       * @param {string} accessTokenUserNumber2 - The access token for User-Number2.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [image] - The image associated with the post (optional).
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseUserNumber2Post2 = await posts.postCreatePost(
        accessTokenUserNumber2,
        "User-Number2 - Post 2",
        "text",
        "This concerns the 2nd post from User-Number2",
        ""
      );
      expect(responseUserNumber2Post2.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/C - 6 -------------------------------------- Get slug of User-Number2 Post 2", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber2Post2 = response.data.posts[7].slug;
    });

    it("US012/C - 7 -------------------------------------- Creates 3rd Post User-Number2", async (): Promise<void> => {
      /**
       * Creates a new post for User-Number2 and returns the response.
       * @param {string} accessTokenUserNumber2 - The access token for User-Number2.
       * @param {string} title - The title of the post.
       * @param {string} type - The type of the post.
       * @param {string} content - The content of the post.
       * @param {string} [imageUrl] - The URL of the image to be included in the post (optional).
       * @returns {Promise<any>} - The response from the API.
       */
      const responseUserNumber2Post3 = await posts.postCreatePost(
        accessTokenUserNumber2,
        "User-Number2 - Post 3",
        "text",
        "This concerns the 3rd post from User-Number2",
        ""
      );
      expect(responseUserNumber2Post3.status).toBe(200);
      setTimeout(() => {}, 1000);
    });

    it("US012/C - 8 -------------------------------------- Get popular posts", async (): Promise<void> => {
      /**
       * Retrieves popular posts from the API.
       * @returns {Promise<Response>} The response from the API.
       */
      const response = await posts.getPopularPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    it("US012/C - 9 -------------------------------------- Get recent posts", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();
    });

    /**
     * Voting on posts by User Number 2:
     *
     * User Number 2 will Upvote on Admin User Post 1
     * User Number 2 will Downvote on Admin User Post 2
     * User Number 2 will Upvote on Admin User Post 3
     * User Number 2 will Downvote on User-Number1 Post 1
     * User Number 2 will Downvote on User-Number1 Post 2
     * User Number 2 will Downvote on User-Number1 Post 3
     *
     * */
    it("US012/C - 10 -------------------------------------- Get slug of Admin User Post 1", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost1 = response.data.posts[0].slug;
    });

    it("US012/C - 11 -------------------------------------- Get slug of Admin User Post 2", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost2 = response.data.posts[1].slug;
    });

    it("US012/C - 12 -------------------------------------- Get slug of Admin User Post 3", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugAdminUserPost3 = response.data.posts[2].slug;
    });

    it("US012/C - 13 -------------------------------------- Get slug of User-Number1 Post 1", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` function from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);

      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post1 = response.data.posts[3].slug;
    });

    it("US012/C - 14 -------------------------------------- Get slug of User-Number1 Post 2", async (): Promise<void> => {
      /**
       * Retrieves recent posts using the `getRecentPosts` method from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);
      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post2 = response.data.posts[4].slug;
    });

    it("US012/C - 15 -------------------------------------- Get slug of User-Number1 Post 3", async (): Promise<void> => {
      /**
       * Retrieves the recent posts using the `getRecentPosts` function from the `posts` API.
       * @returns {Promise<any>} A promise that resolves with the response from the API.
       */
      const response = await posts.getRecentPosts();
      expect(response.status).toBe(200);
      expect(response.data.posts).toBeDefined();

      slugUserNumber1Post3 = response.data.posts[5].slug;
    });

    it("US012/C - 16 -------------------------------------- User-Number2 Upvotes on Admin User Post 1", async (): Promise<void> => {
      /**
       * Sends a POST request to upvote a post with the given slug using the access token of the specified user.
       * @param accessToken - The access token of the user performing the upvote.
       * @param postSlug - The slug of the post to upvote.
       * @returns A Promise that resolves to the response object.
       */
      const responseUserNumber2UpvoteAdminUserPost1 =
        await posts.postUpvotePosts(accessTokenUserNumber2, slugAdminUserPost1);
      expect(responseUserNumber2UpvoteAdminUserPost1.status).toBe(200);
    });

    it("US012/B - 17 -------------------------------------- User-Number2 Downvotes on Admin User Post 2", async (): Promise<void> => {
      /**
       * Sends a POST request to downvote a post using the provided access token and post slug.
       * @param {string} accessToken - The access token of the user performing the downvote action.
       * @param {string} postSlug - The slug of the post to be downvoted.
       * @returns {Promise<any>} - A promise that resolves with the response data from the API.
       */
      const responseUserNumber2UpvoteAdminUserPost2 =
        await posts.postDownvotePosts(
          accessTokenUserNumber2,
          slugAdminUserPost2
        );
      expect(responseUserNumber2UpvoteAdminUserPost2.status).toBe(200);
    });

    it("US012/B - 18 -------------------------------------- User-Number1 Upvotes on Admin User Post 3", async (): Promise<void> => {
      /**
       * Calls the postUpvotePosts function with the access token of user number 2 and the slug of admin user post 3.
       * @returns A promise that resolves to the response of the postUpvotePosts function.
       */
      const responseUserNumber2UpvoteAdminUserPost3 =
        await posts.postUpvotePosts(accessTokenUserNumber2, slugAdminUserPost3);
      expect(responseUserNumber2UpvoteAdminUserPost3.status).toBe(200);
    });

    it("US012/B - 19 -------------------------------------- User-Number2 Downvotes on User-Number1 Post 1", async (): Promise<void> => {
      /**
       * Sends a request to downvote a post using the provided access token and post slug.
       * @param {string} accessToken - The access token of the user performing the downvote.
       * @param {string} postSlug - The slug of the post to be downvoted.
       * @returns {Promise<any>} - A promise that resolves with the response data from the API.
       */
      const responseUserNumber2UpvoteUserNumber1Post1 =
        await posts.postDownvotePosts(
          accessTokenUserNumber2,
          slugUserNumber1Post1
        );
      expect(responseUserNumber2UpvoteUserNumber1Post1.status).toBe(200);
    });

    it("US012/B - 20 -------------------------------------- User-Number2 Downvotes on User-Number1 Post 2", async (): Promise<void> => {
      /**
       * Sends a request to downvote a post using the provided access token and post slug.
       * @param {string} accessToken - The access token of the user performing the downvote.
       * @param {string} postSlug - The slug of the post to be downvoted.
       * @returns {Promise<any>} - A promise that resolves with the response data from the API.
       */
      const responseUserNumber2UpvoteUserNumber1Post2 =
        await posts.postDownvotePosts(
          accessTokenUserNumber2,
          slugUserNumber1Post2
        );
      expect(responseUserNumber2UpvoteUserNumber1Post2.status).toBe(200);
    });

    it("US012/B - 21 -------------------------------------- User-Number2 Downvotes on User-Number1 Post 3", async (): Promise<void> => {
      /**
       * Sends a request to downvote a post with the given slug using the access token of a user.
       * @param {string} accessToken - The access token of the user performing the downvote.
       * @param {string} slug - The slug of the post to be downvoted.
       * @returns {Promise<any>} - A Promise that resolves with the response data from the API.
       */
      const responseUserNumber2UpvoteUserNumber1Post3 =
        await posts.postDownvotePosts(
          accessTokenUserNumber2,
          slugUserNumber1Post3
        );
      expect(responseUserNumber2UpvoteUserNumber1Post3.status).toBe(200);
    });

    /**
     * Reply to posts by User Number 2:
     *
     * User Number 2 will comment on Admin User Post 1
     * User Number 2 will comment on User Number 1 Post 1
     * User Number 2 will comment on User Number 1 Post 2
     * User Number 2 will comment on User Number 1 Post 3
     *
     * */
    it("US012/C - 22 -------------------------------------- User-Number2 Comments on Admin User Post 1", async (): Promise<void> => {
      /**
       * Replies to a post with a comment from User-Number2 on Admin User Post 1.
       * @param accessTokenUserNumber2 - The access token for User-Number2.
       * @param slugAdminUserPost1 - The slug for Admin User Post 1.
       * @param comment - The comment to be posted.
       * @returns A promise that resolves to the response from the API.
       */
      const responseUserNumber2CommentAdminUserPost1 = await comments.replyPost(
        accessTokenUserNumber2,
        slugAdminUserPost1,
        "This is a comment from User-Number2 on Admin User Post 1"
      );
      expect(responseUserNumber2CommentAdminUserPost1.status).toBe(200);
    });

    it("US012/C - 23 -------------------------------------- User-Number2 Comments on User-Number1 Post 1", async (): Promise<void> => {
      /**
       * Replies to a post with a comment from User-Number2 on User-Number1 Post 1.
       * @param accessTokenUserNumber2 - The access token of User-Number2.
       * @param slugUserNumber1Post1 - The slug of User-Number1 Post 1.
       * @param comment - The comment to be posted.
       * @returns The response of the API call.
       */
      const responseUserNumber2CommentUserNumber1Post1 =
        await comments.replyPost(
          accessTokenUserNumber2,
          slugUserNumber1Post1,
          "This is a comment from User-Number2 on User-Number1 Post 1"
        );
      expect(responseUserNumber2CommentUserNumber1Post1.status).toBe(200);
    });

    it("US012/C - 24 -------------------------------------- User-Number2 Commentss on User-Number1 Post 2", async (): Promise<void> => {
      /**
       * Sends a reply to a post with the given access token, post slug, and comment message.
       * @param {string} accessToken - The access token of the user sending the reply.
       * @param {string} postSlug - The slug of the post to reply to.
       * @param {string} commentMessage - The message to include in the comment.
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseUserNumber2CommentUserNumber1Post2 =
        await comments.replyPost(
          accessTokenUserNumber2,
          slugUserNumber1Post2,
          "This is a comment from User-Number2 on User-Number1 Post 2"
        );
      expect(responseUserNumber2CommentUserNumber1Post2.status).toBe(200);
    });

    it("US012/C - 25 -------------------------------------- User-Number2 Comments on User-Number1 Post 3", async (): Promise<void> => {
      /**
       * Replies to a post with a comment from User-Number2 on User-Number1 Post 3.
       * @param {string} accessTokenUserNumber2 - The access token for User-Number2.
       * @param {string} slugUserNumber1Post3 - The slug for User-Number1 Post 3.
       * @param {string} comment - The comment to be posted.
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const responseUserNumber2CommentUserNumber1Post3 =
        await comments.replyPost(
          accessTokenUserNumber2,
          slugUserNumber1Post3,
          "This is a comment from User-Number2 on User-Number1 Post 3"
        );
      expect(responseUserNumber2CommentUserNumber1Post3.status).toBe(200);
    });

    it("US012/C - 26 -------------------------------------- Get Me", async (): Promise<void> => {
      /**
       * Retrieves the user information for the user with the access token provided.
       * @param accessTokenUserNumber2 The access token for the user to retrieve information for.
       * @returns A Promise that resolves with the response from the API call.
       */
      const responseUserNumber2GetMe = await users.getMe(
        accessTokenUserNumber2
      );
      expect(responseUserNumber2GetMe.status).toBe(200);

      expect(responseUserNumber2GetMe.data.user).toBeDefined();
      expect(responseUserNumber2GetMe.data.user.username).toBeDefined();
      expect(responseUserNumber2GetMe.data.user.username).toContain(
        "user-number2"
      );
    });

    it("US012/C - 27 -------------------------------------- Get commentID of User-Number1 1st comment on Admin User 1st post", async (): Promise<void> => {
      const response = await comments.getPostComments(slugAdminUserPost1);
      expect(response.status).toBe(200);

      expect(response.data.comments).toBeDefined();
      expect(response.data.comments.length).toBeGreaterThan(0);

      /**
       * Gets the comment ID of the first comment made by user number 1 on admin post 1.
       * @param response - The response object returned by the API call.
       * @returns The comment ID of the first comment made by user number 1 on admin post 1.
       */
      const commentIdUserNumber1CommentToAdminPost1 =
        response.data.comments[0].commentId;
      expect(commentIdUserNumber1CommentToAdminPost1).toBeDefined();

      // commentIdUserNumber1CommentToAdminPost1 = response.data.comments[0].commentId;

      idCommentUserNumber1CommentToAdminPost1 =
        response.data.comments[0].commentId;
    });

    it("US012/C - 28 -------------------------------------- Upvote by User-Number 2 on User-Number1 1st comment on Admin User 1st post", async (): Promise<void> => {
      const response = await comments.upvoteComment(
        accessTokenUserNumber2,
        idCommentUserNumber1CommentToAdminPost1
      );
      expect(response.status).toBe(200);
    });

    it("US012/C - 29 -------------------------------------- User-Number2 Comments a comment of User-Number1 on a post", async (): Promise<void> => {
      /**
       * Replies to a comment made by User-Number1 on Admin User Post 1 with a comment made by User-Number2.
       * @param accessTokenUserNumber2 - The access token of User-Number2.
       * @param slugAdminUserPost1 - The slug of Admin User Post 1.
       * @param commentIdUserNumber1CommentToAdminPost1 - The comment ID of User-Number1's comment on Admin User Post 1.
       * @param comment - The comment made by User-Number2.
       * @returns The response of the API call.
       */
      const response = await comments.replyComment(
        accessTokenUserNumber2,
        slugAdminUserPost1,
        idCommentUserNumber1CommentToAdminPost1,
        "1st Comment of User-Number2 on a comment of User-Number1 to Admin User Post 1"
      );
      expect(response.status).toBe(200);
    });

    it("US012/C - 30 -------------------------------------- Get commentID of User-Number1 2nd comment on Admin User 3rd post", async (): Promise<void> => {
      const response = await comments.getPostComments(slugAdminUserPost3);
      expect(response.status).toBe(200);

      expect(response.data.comments).toBeDefined();
      expect(response.data.comments.length).toBeGreaterThan(0);

      /**
       * Gets the comment ID of the first comment made by user number 1 on admin post 3.
       * @param response - The response object returned by the API call.
       * @returns The comment ID of the first comment made by user number 1 on admin post 3.
       */

      const commentIdUserNumber1CommentToAdminPost3 =
        response.data.comments[0].commentId;
      expect(commentIdUserNumber1CommentToAdminPost3).toBeDefined();

      idCommentUserNumber1CommentToAdminPost3 =
        response.data.comments[0].commentId;

      // commentIdUserNumber1CommentToAdminPost1 = response.data.comments[0].commentId;
    });

    it("US012/C - 31 -------------------------------------- Downvote by User-Number 2 on User-Number1 2nd comment on Admin User 3rd post", async (): Promise<void> => {
      /**
       * Downvotes a comment using the provided access token and comment ID.
       * @param {string} accessToken - The access token of the user performing the downvote.
       * @param {string} commentId - The ID of the comment being downvoted.
       * @returns {Promise<any>} - A promise that resolves with the response from the API.
       */
      const response = await comments.downvoteComment(
        accessTokenUserNumber2,
        idCommentUserNumber1CommentToAdminPost3
      );
      expect(response.status).toBe(200);
    });

    it("US012/C - 32 -------------------------------------- Logout User-Number2", async (): Promise<void> => {
      /**
       * Sends a POST request to log out the user with the given access token.
       * @param accessToken - The access token of the user to be logged out.
       * @returns A Promise that resolves to the response of the logout request.
       */
      const responseUserNumber2Logout = await users.postLogout(
        accessTokenUserNumber2
      );
      expect(responseUserNumber2Logout.status).toBe(200);
    });
  });
  describe("US012/D ------------------- Data Insertion ------------------- User-Number3", (): void => {
    it("US012/D - 1 -------------------------------------- Register User-Number3", async (): Promise<void> => {
      /**
       * Creates a new user with the given username, email and password.
       * @param {string} username - The username of the new user.
       * @param {string} email - The email of the new user.
       * @param {string} password - The password of the new user.
       * @returns {Promise<any>} - A Promise that resolves with the response data from the API.
       */
      const responseCreateUserNumber3 = await users.post(
        "user-number3",
        "user-number3@gmail.com",
        "user-number3"
      );
      expect(responseCreateUserNumber3.status).toBe(200);
    });

    it("US012/D - 2 -------------------------------------- Login User-number3", async (): Promise<void> => {
      /**
       * Logs in user number 3 with the given credentials and returns the response.
       * @param {string} username - The username of the user to log in.
       * @param {string} password - The password of the user to log in.
       * @returns {Promise<any>} - The response from the login API call.
       */
      const responseLoginUserNumber3 = await users.postLogin(
        "user-number3",
        "user-number3"
      );
      expect(responseLoginUserNumber3.status).toBe(200);

      expect(responseLoginUserNumber3.data.accessToken).toBeDefined();
      expect(responseLoginUserNumber3.data.refreshToken).toBeDefined();

      accessTokenUserNumber3 = responseLoginUserNumber3.data.accessToken;
      refreshTokenAdminUser = responseLoginUserNumber3.data.refreshToken;

      const decodedToken = jwt.decode(accessTokenUserNumber3) as JWTClaims;

      userId = decodedToken.userId;
      email = decodedToken.email;
      username = decodedToken.username;
    });

    it("US012/D - 3 -------------------------------------- Logout User-Number3", async (): Promise<void> => {
      /**
       * Logs out the user with access token `accessTokenUserNumber3`.
       * @param accessTokenUserNumber3 - The access token of the user to be logged out.
       * @returns A promise that resolves to the response of the logout API call.
       */
      const responseUserNumber3Logout = await users.postLogout(
        accessTokenUserNumber3
      );
      expect(responseUserNumber3Logout.status).toBe(200);
    });
  });
});

export default {};
