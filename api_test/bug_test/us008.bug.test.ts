/* When creating a comnentto the comment, 1 positive vote is automatically assigned.
the bug has already been fixed.
These are the guarantee tests that the comment is created with zero votes
create a user (bug US008)
login (bug US008)
getMe (bug US008)
create a post (bug US008)
get popular posts (bug US008)
get recent posts (bug US008)
receive a post (bug US008)
reply to a post (bug US008)
get commentID from a comment on a post (bug US008)
comment on a comment on a post (bug US008)
get comments with zero votes (bug US008)
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
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let posts: Posts;
let users: Users;
let comments: Comments;

let accessToken: string;
let refreshToken: string;
let slug: string;
let commentId: string;

describe("US008-bug - reply to a comment of a post", (): void => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    users = new Users();
    comments = new Comments();
  });

  // testing on create user, log in, and get me access token//

  it("US008-bug Post - Create User", async (): Promise<void> => {
    const response = await users.post(
      "US008-bug",
      "US008-bug@gmail.com",
      "123456",
    );

    expect(response.status).toBe(200);
  });

  it("US008-bug Post Login", async (): Promise<void> => {
    const response = await users.postLogin("US008-bug", "123456");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("US008-bug Get Me", async (): Promise<void> => {
    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("US008-bug");
  });

  //testing creating posts, get popular posts, get recent posts, get slug of a post, upvote a post, downvote a post

  it("US008-bug Creates a post", async (): Promise<void> => {
    //parameters of create a post  - accessToken,title, postType, text, link
    const response = await posts.postCreatePost(
      accessToken,
      "US008-bug New post",
      "text",
      "US008-bug Post text",
      "",
    );
    expect(response.status).toBe(200);
  });

  it("US008-bug Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US008-bug Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("US008-bug Get slug of a post", async (): Promise<void> => {
    const response = await posts.getRecentPosts();

    expect(response.status).toBe(200);

    const postData = response.data.posts[0];

    expect(postData.slug).toBeDefined();

    slug = postData.slug;
  });

  // testing on comments and upvote and downvote comments

  it("US008-bug Reply to a post", async (): Promise<void> => {
    const response = await comments.replyPost(
      accessToken,
      slug,
      "US008-bug Comment text to a post",
    );

    expect(response.status).toBe(200);
  });

  it("US008-bug Get commentID of a comment of a post", async (): Promise<void> => {
    const response = await comments.getPostComments(slug);
    expect(response.status).toBe(200);

    expect(response.data.comments).toBeDefined();
    expect(response.data.comments.length).toBeGreaterThan(0);

    const commentI = response.data.comments[0].commentId;
    expect(commentI).toBeDefined();

    commentId = response.data.comments[0].commentId;
  });

  it("US008-bug Comment a comment of a post", async (): Promise<void> => {
    const response = await comments.replyComment(
      accessToken,
      slug,
      commentId,
      "US008-bug Comment text to a comment of a post",
    );
    expect(response.status).toBe(200);
  });
  //zero votes verification test when creating a comment
  it("US008-bug get comment2 points(ok 0 vote)", async (): Promise<void> => {
    const response = await comments.getComment2(
      slug,
      "US008-bug Comment text to a comment of a post",
      0,
    );
    expect(response.status).toBe(200);
  });
});
export {};
