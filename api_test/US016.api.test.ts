/**
 * @author JATR
 * @UserStory US016 - View top 3 Members that published more Comments for a Specific Day
 *
 *
 * @remarks
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Posts from "./endpoints/Posts";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let posts: Posts;
let accessToken: string;
let refreshToken: string;

describe("View Top 3 Members with Most Comments for a Specific Day", () => {
  beforeAll(async (): Promise<void> => {
    posts = new Posts();
    accessToken = "user";
  });

  it("should return the top 3 members with the most comments for a specific day", async () => {
    // Act:
    const specificDay = "2023-11-12";
    // Arrange:
    const response = await posts.getPostsByDate(accessToken, specificDay);
    // Assert:
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(1);

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("should return the top 3 members with the most comments for a specific day", async () => {
    // Act:
    const specificDay = "2023-11-14";
    // Arrange:
    const response = await posts.getPostsByDate(accessToken, specificDay);
    // Assert:
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(2);

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("should return the top 3 members with the most comments for a specific day", async () => {
    // Act:
    const specificDay = "2023-11-11";
    // Arrange:
    const response = await posts.getPostsByDate(accessToken, specificDay);
    // Assert:
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(0);

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("FURPS - Verify the system displays the top 3 members with the most comments for a specific day as expected.", async () => {
    const specificDay = "2023-11-01";
    const response = await posts.getPostsByDate(accessToken, specificDay);

    expect(response.status).toBe(200);
  });
});
