import { AxiosResponse } from "axios";

/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { AEndpoint } from "./abstracts/AEndpoint";
import { RefreshToken } from "../../modules/users/domain/jwt";
import { UserName } from "../../modules/users/domain/userName";

export default class Users extends AEndpoint {
  constructor() {
    super("/users", "users");
  }

  /**
   * This method is used to login, using the REST API.
   * For the moment, the username and password are hardcoded.
   *
   * @returns the result of the post request. If sucessful, the response will contain an access token and refresh token.
   */
  public async postLogin(
    username: string,
    password: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/login",
      data: { username: username, password: password }
    });
  }

  public async postLogout(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/logout",
      headers: { Authorization: accessToken }
    });
  }

  public async getMe(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/me",
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  public async post(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendPost({
      route: "/",
      data: { username: username, email: email, password: password }
    });
  }

  public async deleteUser(
    accessToken: string,
    username: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendDelete({
      route: "/" + username,
      data: { username: username },
      headers: { Authorization: accessToken }
    });
  }
  public async getUserByUsername(
    username: string,
    accessToken: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/" + username,
      data: { username: username },
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
  //
  /**
   * Retrieves the usernames of all members who have not made any posts or comments on a given date.
   * @param date The date to check for members with no posts or comments.
   * @returns A Promise that resolves with an AxiosResponse containing the usernames of all members with no posts or comments on the given date.
   */
  public async getUsernamesOfAllMembersWithNoPostAndNoCommentsByDate(
    accessToken: string,
    date: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/getusernamesofallmemberswithnopostandnocommentsbydate",
      headers: { Authorization: accessToken },
      data: { date: date }
    });
  }
}
