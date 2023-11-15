import { AxiosResponse } from "axios";
import { AEndpoint } from "./abstracts/AEndpoint";

export default class Members extends AEndpoint {
  constructor() {
    super("/members", "members");
  }

  public async getAllMembers(
    accessToken: string,
    username: string,
    isdeleted: boolean
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/" + username,
      data: { username: username, isdeleted: isdeleted },
      headers: { Authorization: accessToken }
    });
  }

  public async getMemberByUserName(
    username: string,
    accessToken: string
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/" + username,
      headers: { Authorization: accessToken }
    });
  }

  public async getCurrentMember(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/me",
      headers: { Authorization: accessToken }
    });
  }

  public async getMemberPostCount(username: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/postcount/" + username,
      data: { username: username }
    });
  }

  public async getMemberCommentCount(username: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/commentcount/" + username,
      data: { username: username }
    });
  }
  /**
   * Retrieves a member's information without posts or comments for a given date.
   * @param accessToken The access token for authentication.
   * @param date The date to retrieve the information for.
   * @returns A Promise that resolves to an AxiosResponse object containing the member's information.
   */
  public async getMemberNoPostNoCommentsByDate(
    accessToken: string,
    date: string | Date
  ): Promise<AxiosResponse> {
    return this.restClient.sendGet({
      route: "/getMemberNoPostNoCommentsByDate?date=" + date,
      data: { date: date },
      headers: { Authorization: accessToken }
    });
  }
}
