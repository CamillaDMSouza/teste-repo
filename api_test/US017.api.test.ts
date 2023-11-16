/**
 * @author JATR
 * @UserStory US017 - View top 3 Members that published more Comments for a Specific Day
 *
 *
 * @remarks
 */

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import * as jwt from "jsonwebtoken";
import { JWTClaims } from "../modules/users/domain/jwt";
import Users from "./endpoints/Users";
import Posts from "./endpoints/Posts";
import Comments from "./endpoints/Comments";
import Members from "./endpoints/member";
import { is } from "sequelize/types/lib/operators";
import e from "express";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

let users: Users;
let member: Members;
let accessToken: string;
let refreshToken: string;

describe("View Top 3 Members with Most Comments for a Specific Day", () => {
  it("should return the top 3 members with the most comments for a specific day", async () => {
    // Act:
    const specificDay = "2023-11-01";
    // Arrange:
    const response = await users.getTop3MembersWithMostCommentsByDate(
      accessToken,
      specificDay
    );
    // Assert:
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(3);

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("FURPS - Verify the system displays the top 3 members with the most comments for a specific day as expected.", async () => {
    const specificDay = "2023-11-01";
    const response = await users.getTop3MembersWithMostCommentsByDate(
      accessToken,
      specificDay
    );

    expect(response.status).toBe(200);
  });
});
