/**
 *
 * @remarks
 * This test is based on the US011 - getallpostsascending
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";
import { AxiosResponse } from "axios";
import { getAllPostsAscending } from "../modules/forum/useCases/post/getAllPostsAscending";

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

describe("US011 - Get all posts in ascending order", (): void => {
    beforeAll(async (): Promise<void> => {
        posts = new Posts();
        users = new Users();
        comments = new Comments();
    });

    // testing on create user, log in, and get me access token//

    it("US011 Post - Create User", async (): Promise<void> => {
        const response = await users.post("US011", "US011@gmail.com", "123456");

        expect(response.status).toBe(200);
    });

    it("US011 Post Login", async (): Promise<void> => {
        const response = await users.postLogin("US011", "123456");
        expect(response.status).toBe(200);

        expect(response.data.accessToken).toBeDefined();
        expect(response.data.refreshToken).toBeDefined();

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
    });

    it("US011 Get Me", async (): Promise<void> => {
        const response = await users.getMe(accessToken);
        expect(response.status).toBe(200);

        expect(response.data.user).toBeDefined();
        expect(response.data.user.username).toBeDefined();
        expect(response.data.user.username).toContain("US011");
    });

    //testing creating posts, get popular posts, get recent posts, get slug of a post, upvote a post, downvote a post

    it("US011 Creates a post", async (): Promise<void> => {
        //parameters of create a post  - accessToken,title, postType, text, link
        const response = await posts.postCreatePost(
            accessToken,
            "US011 New post",
            "text",
            "US011 Post text",
            "",
        );
        expect(response.status).toBe(200);
    });

    it("US011 Gets all posts in ascending order", async (): Promise<void> => {
        const response = await posts.getAllPostsAscending();
        expect(response.status).toBe(200);
    });
});

