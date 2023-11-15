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
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let posts: Posts;
let users: Users;

let accessTokenForPostOwner: string;
let accessTokenForPostVoter: string;
let accessTokenForPostSecondVoter: string;
let tc004FirstPositionPostSlug: string;
let tc005FirstPositionPostSlug: string;
let tc006FirstPositionPostSlug: string;
let tc007FirstPositionPostSlug: string;

function waitMilliseconds(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Ascending posts", (): void => {
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

  it("Pre-requisites.05 - Create Post second Voter User", async (): Promise<void> => {
    const responseCreatePostsSecondVoter = await users.post(
      "mppsecvotuser",
      "mppsecvoter@gmail.com",
      "complexPwd"
    );
    expect(responseCreatePostsSecondVoter.status).toBe(200);
  });

  it("Pre-requisites.06 - Login Post second Voter User", async (): Promise<void> => {
    const responseLoginPostsSecondVoter = await users.postLogin(
      "mppsecvotuser",
      "complexPwd"
    );
    expect(responseLoginPostsSecondVoter.status).toBe(200);
    expect(responseLoginPostsSecondVoter.data.accessToken).toBeDefined();
    accessTokenForPostSecondVoter =
      responseLoginPostsSecondVoter.data.accessToken;
  });

  // End of test pre-requisites

  /******
   *
   * TC001 - Check that no ascending post exist for a clean database
   *
   ******/
  it("TC001.01 - Check that no ascending post exist for a clean database", async (): Promise<void> => {
    // Arrange
    // Was the database cleanup

    // Act
    const response = await posts.getAllPostsAscending();

    // Assert
    expect(response.status).toBe(200);
    const responsePosts = response.data.posts;
    expect(responsePosts).toHaveLength(0);
  });

  /******
   *
   * TC002 - After creating one post it should appear on the ascending posts
   *
   ******/

  it("TC002.01 - After creating one post it should appear on the ascending posts - Create ap001", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap001",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC002.02 - Assert ascending posts - Should have 1 ascending post", async (): Promise<void> => {
    // Act
    const ascendingResponse = await posts.getAllPostsAscending();

    // Assert
    expect(ascendingResponse.status).toBe(200);
    const responsePosts = ascendingResponse.data.posts;
    expect(responsePosts).toHaveLength(1);
  });

  /******
   *
   * TC003 - After creating 16 new posts, 17 (16 + 1 previous test) should appear on the ascending posts
   *
   ******/

  it("TC003.01 - After creating 16 new posts, 17 (16 + 1 previous test) should appear on the ascending posts - Create ap002", async (): Promise<void> => {
    // Arrange
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap002",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.02 - Create ap003", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap003",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.03 - Create ap004", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap004",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.04 - Create ap005", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap005",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.05 - Create ap006", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap006",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.06 - Create ap007", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap007",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.07 - Create ap008", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap008",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.08 - Create ap009", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap009",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.09 - Create ap010", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap010",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.10 - Create ap011", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap011",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.11 - Create ap012", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap012",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.12 - Create ap013", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap013",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.13 - Create ap014", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap014",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.14 - Create ap015", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap015",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.15 - Create ap016", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap016",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.16 - Create ap017", async (): Promise<void> => {
    const response = await posts.postCreatePost(
      accessTokenForPostOwner,
      "ap017",
      "link",
      "",
      "www.isep.ipp.pt"
    );
    expect(response.status).toBe(200);
  });

  it("TC003.17 - Assert ascending posts - Should have 17 posts", async (): Promise<void> => {
    // Act
    const ascendingResponse = await posts.getAllPostsAscending();

    // Assert
    expect(ascendingResponse.status).toBe(200);
    const responsePosts = ascendingResponse.data.posts;
    expect(responsePosts).toHaveLength(17);
  });

  /******
   *
   * TC004 - After voting on the first post it should appear on the last position
   *
   ******/

  it("TC004.01 - After voting on the first post it should appear on the last position - Get first ascending post", async (): Promise<void> => {
    // Arrange
    const ascendingResponse = await posts.getAllPostsAscending();
    expect(ascendingResponse.status).toBe(200);
    // Pick the first post from the ascending posts
    tc004FirstPositionPostSlug = ascendingResponse.data.posts[0].slug;
  });

  it("TC004.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc004FirstPositionPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC004.03 - Assert ascending posts order - The post that was first should now be on the last position", async (): Promise<void> => {
    // Act
    const ascendingPostsResponse = await posts.getAllPostsAscending();

    // Assert
    expect(ascendingPostsResponse.status).toBe(200);
    expect(ascendingPostsResponse.data.posts[16].slug).toBe(
      tc004FirstPositionPostSlug
    );
    expect(ascendingPostsResponse.data.posts[16].points).toBe(1);
  });

  /******
   *
   * TC005 - After voting on the first post twice it should appear on the last position
   *
   ******/

  it("TC005.01 - After voting on the first post twice it should appear on the last position - Get the last ascending post", async (): Promise<void> => {
    // Arrange
    const ascendingResponse = await posts.getAllPostsAscending();
    expect(ascendingResponse.status).toBe(200);
    // Pick the first post from the ascending posts
    tc005FirstPositionPostSlug = ascendingResponse.data.posts[0].slug;
  });

  it("TC005.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc005FirstPositionPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC005.03 - Vote2 (using mppuser)", async (): Promise<void> => {
    const vote2response = await posts.postUpvotePosts(
      accessTokenForPostOwner,
      tc005FirstPositionPostSlug
    );
    expect(vote2response.status).toBe(200);
  });

  it("TC005.04 - Assert ascending posts order - Should be last and have 2 points (votes)", async (): Promise<void> => {
    // Act
    const ascendingPostsResponse = await posts.getAllPostsAscending();
    // Assert
    expect(ascendingPostsResponse.status).toBe(200);
    expect(ascendingPostsResponse.data.posts[16].slug).toBe(
      tc005FirstPositionPostSlug
    );
    expect(ascendingPostsResponse.data.posts[16].points).toBe(2);
  });

  /******
   *
   * TC006 - Voting 3 times on the first post of list should make it go to last position
   *
   ******/

  it("TC006.01 - Voting 3 times on the first post of list should make it go to last position - Get first ascending post", async (): Promise<void> => {
    // Arrange
    const ascendingResponse = await posts.getAllPostsAscending();
    expect(ascendingResponse.status).toBe(200);

    // Pick the first post from the ascending posts
    tc006FirstPositionPostSlug = ascendingResponse.data.posts[0].slug;
  });

  it("TC006.02 - Vote1 (using mppsecvotuser)", async (): Promise<void> => {
    const vote1 = await posts.postUpvotePosts(
      accessTokenForPostSecondVoter,
      tc006FirstPositionPostSlug
    );
    expect(vote1.status).toBe(200);
  });

  it("TC006.03 - Vote2 (using mppvoteuser)", async (): Promise<void> => {
    const vote2 = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc006FirstPositionPostSlug
    );
    expect(vote2.status).toBe(200);
  });

  it("TC006.04 - Vote3 (using mppuser)", async (): Promise<void> => {
    const vote3 = await posts.postUpvotePosts(
      accessTokenForPostOwner,
      tc006FirstPositionPostSlug
    );
    expect(vote3.status).toBe(200);
  });

  it("TC006.05 - Assert ascending posts order - Should be on last position and have 3 votes (points)", async (): Promise<void> => {
    // Act

    const ascendingPostsResponse = await posts.getAllPostsAscending();

    // Assert
    expect(ascendingPostsResponse.status).toBe(200);
    expect(ascendingPostsResponse.data.posts[16].slug).toBe(
      tc006FirstPositionPostSlug
    );
    expect(ascendingPostsResponse.data.posts[16].points).toBe(3);
  });

  /******
   *
   * TC007 - After voting on the first post it should appear on the 15th position
   *
   ******/

  it("TC007.01 - After voting on the first post it should appear on the 15th position - Get first ascending post", async (): Promise<void> => {
    // Arrange
    const ascendingResponse = await posts.getAllPostsAscending();
    expect(ascendingResponse.status).toBe(200);
    // Pick the first post from the ascending posts
    tc007FirstPositionPostSlug = ascendingResponse.data.posts[0].slug;
  });

  it("TC007.02 - Vote1 (using mppvoteuser)", async (): Promise<void> => {
    const vote1response = await posts.postUpvotePosts(
      accessTokenForPostVoter,
      tc007FirstPositionPostSlug
    );
    expect(vote1response.status).toBe(200);
  });

  it("TC007.03 - Assert ascending posts order - The post that was first should now be on the 15th position", async (): Promise<void> => {
    // Act
    const ascendingPostsResponse = await posts.getAllPostsAscending();

    // Assert
    expect(ascendingPostsResponse.status).toBe(200);
    expect(ascendingPostsResponse.data.posts[14].slug).toBe(
      tc007FirstPositionPostSlug
    );
    expect(ascendingPostsResponse.data.posts[14].points).toBe(1);
  });
});
