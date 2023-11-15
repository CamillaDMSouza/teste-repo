/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "../config/ConfigHandler";

import Users from "../endpoints/Users";
import Posts from "../endpoints/Posts";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let posts: Posts;
let users: Users;

let accessTokenForPostOwner: string;
let accessTokenForPostVoter: string;
let tc002FirstPostSlug: string;

function waitMilliseconds(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Popular posts", (): void => {
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
      "mppuser",
      "mpp@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsOwner.status).toBe(200);
  });

  it("Pre-requisites.02 - Login Post Owner User", async (): Promise<void> => {
    const responseLoginPostsOwner = await users.postLogin(
      "mppuser",
      "complexPwd"
    );
    expect(responseLoginPostsOwner.status).toBe(200);
    expect(responseLoginPostsOwner.data.accessToken).toBeDefined();
    accessTokenForPostOwner = responseLoginPostsOwner.data.accessToken;
  });

  it("Pre-requisites.03 - Create Post Voter User", async (): Promise<void> => {
    const responseCreatePostsVoter = await users.post(
      "mppvoteuser",
      "mppvoter@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsVoter.status).toBe(200);
  });

  it("Pre-requisites.04 - Login Post Voter User", async (): Promise<void> => {
    const responseLoginPostsVoter = await users.postLogin(
      "mppvoteuser",
      "complexPwd"
    );
    expect(responseLoginPostsVoter.status).toBe(200);
    expect(responseLoginPostsVoter.data.accessToken).toBeDefined();
    accessTokenForPostVoter = responseLoginPostsVoter.data.accessToken;
  });

  // End of test pre-requisites

  /******
   *
   * TC001 - Check that no popular post exist for a clean database
   *
   ******/
  it("TC001.01 - Check that no popular post exist for a clean database", async (): Promise<void> => {
    // Arrange
    // Was the database cleanup

    // Act
    const response = await posts.getPopularPosts();

    // Assert
    expect(response.status).toBe(200);
    const responsePosts = response.data.posts;
    expect(responsePosts).toHaveLength(0);
  });

  /******
   *
   * TC002 - After creating one post it should appear on the popular posts
   *
   ******/

  it("TC002.01 - After creating one post it should appear on the popular posts - Create mpp001", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "mpp001",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC002.02 - Assert new popular posts - Should have 1 popular post", async (): Promise<void> => {
    // Act
    const popularResponse = await posts.getPopularPosts();

    // Assert
    expect(popularResponse.status).toBe(200);
    const responsePosts = popularResponse.data.posts;
    expect(responsePosts).toHaveLength(1);
  });

  /******
   *
   * TC002 - After voting on one post it should have 1 point
   *
   ******/

  it("TC002.01 - After voting on one post it should have 1 point - Get first popular post and ensure it has 0 points", async (): Promise<void> => {
    // Arrange
    const popularResponse = await posts.getPopularPosts();
    expect(popularResponse.status).toBe(200);

    // Pick the only post from the most popular
    const firstPost = popularResponse.data.posts[0];
    tc002FirstPostSlug = firstPost.slug;
    expect(firstPost.points).toBe(0);
  });

  it("TC002.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc002FirstPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC002.03 - Assert that the voted popular posts has 1 points", async (): Promise<void> => {
    // Act
    const popularPostsResponse = await posts.getPopularPosts();

    // Assert
    expect(popularPostsResponse.status).toBe(200);
    const tc002post = popularPostsResponse.data.posts[0];
    expect(tc002post.points).toBe(1);
  });
});
