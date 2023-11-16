/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { AxiosResponse } from "axios";

import { AEndpoint } from "./abstracts/AEndpoint";

export default class Posts extends AEndpoint {
  constructor() {
    super("/posts", "posts");
  }

  public async postCreatePost(
    accessToken: string,
    title: string,
    postType: string,
    text: string,
    link: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/",

      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: { title: title, postType: postType, text: text, link: link }
    });
  }

  public async getPopularPosts(): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/popular" });
  }

  public async getRecentPosts(): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/recent" });
  }

  public async postUpvotePosts(
    accessToken: string,
    slug: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/upvote",
      data: { slug: slug },
      headers: { Authorization: accessToken }
    });
  }

  public async postDownvotePosts(
    accessToken: string,
    slug: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/downvote",
      data: { slug: slug },
      headers: { Authorization: accessToken }
    });
  }

  public async getPostBySlug(slug: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: `/?slug=${slug}`
    });
  }

  public async getAllPostsAscending(): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/allascending"
    });
  }

  public async getPercentageOfPostsWithoutComments(
    accessToken: string,
    date: string | Date
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/PercentageOfPostsWithoutComments?date=" + date,
      headers: {
        Authorization: accessToken
      }
    });
  }
  public async getHourWiththeMostPostsCreatedInaDay(
    accessToken: string,
    date: string | Date
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/gethourwiththemostpostscreatedinaday?date=" + date,
      headers: {
        Authorization: accessToken
      },
      data: { date: date }
    });
  }

  public async getPostsByDate(
    accessToken: string,
    date: string | Date
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "posts/specificDay?date=" + date,
      headers: {
        Authorization: accessToken
      },
      data: { date: date }
    });
  }

  public async getUsernamesWithoutPostsAndWithoutCommentsByDateController(
    accessToken: string,
    date: string | Date
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route:
        "/getListOfUsernamesWithoutPostsAndWithoutCommentsByDate?date=" + date,
      headers: {
        Authorization: accessToken
      },
      data: { date: date }
    });
  }
}
