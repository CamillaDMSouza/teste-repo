/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { AxiosResponse } from "axios";

import { AEndpoint } from "./abstracts/AEndpoint";

export default class Comments extends AEndpoint {
  constructor() {
    super("/comments", "comments");
  }

  public async replyPost(
    accessToken: string,
    slug: string,
    comment: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: `/?slug=${slug}`,
      data: { comment: comment },
      headers: { Authorization: accessToken }
    });
  }

  public async getPostComments(slug: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: `/?slug=${slug}`,
      data: { slug: slug }
    });
  }

  public async replyComment(
    accessToken: string,
    slug: string,
    commentId: string,
    comment: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: `/${commentId}/reply?slug=${slug}`,
      data: { comment: comment },
      headers: { Authorization: accessToken }
    });
  }

  public async upvoteComment(
    accessToken: string,
    commentId: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: `/${commentId}/upvote`,
      headers: { Authorization: accessToken }
    });
  }

  public async downvoteComment(
    accessToken: string,
    commentId: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: `/${commentId}/downvote`,
      headers: { Authorization: accessToken }
    });
  }
  //routa comment (comente + slug + points)
  public async getComment2(
    slug: string,
    comment: string,
    points: number
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: `/?slug=${slug}&comment=${comment}&points=${points}`,
      data: { slug: slug, comment: comment, points: points }
    });
  }

  public async getCommentsForDate(
    accessToken: string,
    specificDate: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: `/comments?specificDate=${specificDate}`,
      headers: { Authorization: accessToken }
    });
  }

  public async getCommentsByDate(
    accessToken: string,
    specificDate: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: `/comments?specificDay=${specificDate}`,
      headers: { Authorization: accessToken }
    });
  }
}
