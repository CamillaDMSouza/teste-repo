/**
 * @author JATR
 * @UserStory US014 - View top 3 Members that published more Comments for a Specific Day
 *
 *
 * @remarks
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Comments from "./endpoints/Comments";
import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let comments: Comments;
let users: Users;
let accessToken: string;
let refreshToken: string;

describe("View Top 3 Members with Most Comments for a Specific Day", () => {
  beforeAll(async (): Promise<void> => {
    comments = new Comments();
    accessToken = "user";
  });

  it("should return the top 3 members with the most comments for a specific day", async () => {
    // Act:
    const specificDay = "2023-11-01";
    // Arrange:
    const response = await comments.getCommentsByDate(accessToken, specificDay);
    // Assert:
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data).toBe(0);

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("FURPS - Verify the system displays the top 3 members with the most comments for a specific day as expected.", async () => {
    const specificDay = "2023-11-01";
    const response = await comments.getCommentsByDate(accessToken, specificDay);

    expect(response.status).toBe(200);
  });
});
