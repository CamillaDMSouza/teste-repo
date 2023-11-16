/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let users: Users;

let accessTokenForIndividualPostOwner: string;
let tc001IpSlug: string;
let tc002IpSlug: string;

function waitMilliseconds(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Individual post", (): void => {
  beforeAll(async () => {
    posts = new Posts();
    users = new Users();
    jest.setTimeout(60000);
  });

  afterEach(async () => {
    await waitMilliseconds(200);
  });

  // Test pre-requisites - Create user, login and get token

  it("Pre-requisites.01 - Create Post Owner User", async (): Promise<void> => {
    const responseCreatePostsOwner = await users.post(
      "ipuser",
      "ip@gmail.com",
      "complexPwd",
    );
    expect(responseCreatePostsOwner.status).toBe(200);
  });

  it("Pre-requisites.02 - Login Post Owner User", async (): Promise<void> => {
    const responseLoginPostsOwner = await users.postLogin(
      "ipuser",
      "complexPwd",
    );
    expect(responseLoginPostsOwner.status).toBe(200);
    expect(responseLoginPostsOwner.data.accessToken).toBeDefined();
    accessTokenForIndividualPostOwner =
      responseLoginPostsOwner.data.accessToken;
  });

  // End of test pre-requisites

  /******
   *
   * TC001 - After creating a post we should be able to get its details (link post)
   *
   ******/
  it("TC001.01 - After creating a post we should be able to get its details (link post) - Create a post", async (): Promise<void> => {
    // Arrange
    const createPostResponse = await posts.postCreatePost(
      accessTokenForIndividualPostOwner,
      "individualPost001",
      "link",
      "",
      "www.isep.ipp.pt",
    );
    expect(createPostResponse.status).toBe(200);
  });

  it("TC001.02 - Get recent post and search the created post by title to get the slug", async (): Promise<void> => {
    const recentPostsResponse = await posts.getRecentPosts();
    expect(recentPostsResponse.status).toBe(200);
    expect(recentPostsResponse.data.posts[0].title).toBe("individualPost001");

    tc001IpSlug = recentPostsResponse.data.posts[0].slug;
  });

  it("TC001.03 - Assert post details - Should be link, and have the link and no text", async (): Promise<void> => {
    // Act
    const postResponse = await posts.getPostBySlug(tc001IpSlug);

    // Assert
    expect(postResponse.status).toBe(200);
    expect(postResponse.data.post.title).toBe("individualPost001");
    expect(postResponse.data.post.type).toBe("link");
    expect(postResponse.data.post.link).toBe("www.isep.ipp.pt");
    expect(postResponse.data.post.text).toBe("");
  });

  /******
   *
   * TC002 - After creating a post we should be able to get its details (text post)
   *
   ******/
  it("TC002.01 - After creating a post we should be able to get its details (text post) - Create a post", async (): Promise<void> => {
    // Arrange
    const createPostResponse = await posts.postCreatePost(
      accessTokenForIndividualPostOwner,
      "individualPost002",
      "text",
      "<p>This is a text post for test purposes.</p>",
      "",
    );
    expect(createPostResponse.status).toBe(200);
  });

  it("TC002.02 - Get recent post and search the created post by title to get the slug", async (): Promise<void> => {
    const recentPostsResponse = await posts.getRecentPosts();
    expect(recentPostsResponse.status).toBe(200);
    // Search the recently added post by title to get its position and slug
    const tc002post = recentPostsResponse.data.posts.find(
      (p) => p.title == "individualPost002",
    );
    const tc002position = recentPostsResponse.data.posts.indexOf(tc002post);
    expect(recentPostsResponse.data.posts[tc002position].title).toBe(
      "individualPost002",
    );

    tc002IpSlug = recentPostsResponse.data.posts[tc002position].slug;
  });

  it("TC002.03 - Assert post details - Should be text, and have text and no link", async (): Promise<void> => {
    // Act
    const postResponse = await posts.getPostBySlug(tc002IpSlug);

    // Assert
    expect(postResponse.status).toBe(200);
    expect(postResponse.data.post.title).toBe("individualPost002");
    expect(postResponse.data.post.type).toBe("text");
    expect(postResponse.data.post.link).toBe("");
    expect(postResponse.data.post.text).toBe(
      "<p>This is a text post for test purposes.</p>",
    );
  });

  /******
   *
   * TC003 - Trying to get the details of a nonexistent post should return an error​
   *
   ******/
  it("TC003.01 - Trying to get the details of a nonexistent post should return an error - Get non existing post", async (): Promise<void> => {
    // Act
    const postResponse = await posts.getPostBySlug("nonExistingSlug");

    // Assert
    expect(postResponse.status).toBe(500);
    expect(postResponse.data.message).toBe(
      "Couldn't find a post by slug {nonExistingSlug}.",
    );
  });
});
