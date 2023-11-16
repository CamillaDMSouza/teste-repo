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

describe("US009 - Upvote and Downvote a post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();
    comments = new Comments();
  });

  // testing on create user, log in, and get me access token//

  it("US009 Post - Create User", async (): Promise<void> => {
    const response = await users.post("US009", "US009@gmail.com", "123456");

    expect(response.status).toBe(200);
  });

  it("US009 Post Login", async (): Promise<void> => {
    const response = await users.postLogin("US009", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("US009 Get Me", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("US009");
  });

  //testing creating posts, get popular posts, get recent posts, get slug of a post, upvote a post, downvote a post

  it("US009 Creates a post", async (): Promise<void> => {
    //parameters of create a post  - accessToken,title, postType, text, link
    const response = await posts.postCreatePost(
      accessToken,
      "US009 New post",
      "text",
      "US009 Post text",
      "",
    );
    expect(response.status).toBe(200);
  });

  it("US009 Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US009 Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US009 Get slug of a post", async (): Promise<void> => {
    const response = await posts.getRecentPosts();

    expect(response.status).toBe(200);

    const postData = response.data.posts[0];

    expect(postData.slug).toBeDefined();

    slug = postData.slug;
  });

  it("US009 Upvote a post", async (): Promise<void> => {
    const response = await posts.postUpvotePosts(accessToken, slug);
    expect(response.status).toBe(200);
  });

  it("US009 Downvote a post", async (): Promise<void> => {
    const response = await posts.postDownvotePosts(accessToken, slug);

    expect(response.status).toBe(200);
  });

  it("US009 Upvote a post while not corretly authenticated", async (): Promise<void> => {
    const response = await posts.postUpvotePosts((accessToken = ""), slug);
    expect(response.status).toBe(403);
  });

  it("US009 Downvote a post while not corretly authenticated", async (): Promise<void> => {
    const response = await posts.postUpvotePosts((accessToken = ""), slug);
    expect(response.status).toBe(403);
  });
});

export default {};
