/**
 * @author SFFDS
 * @UserStory US018 - Member view Members without any activity (Posts and Comments) for a Specific Day
 *
 *
 * @remarks
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";
import Users from "./endpoints/Users";
import Member from "./endpoints/member";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

/******
 * @UserStory US018
 * @TestType Regression Testing
 * @Test
 * @UsDependency NA
 * @acceptanceCriteria AC.1
 ******/

import "./US001.api.test.ts";
import "./US005.api.test.ts";
import "./bug_test/us005.bug.test.ts";
import "./US007.api.test.ts";
import "./bug_test/us007.bug.test.ts";
import "./US009.api.test.ts";
import "./US010.api.test.ts";

let users: Users;
let member: Member;
let accessToken: string;
let refreshToken: string;

/******
 * @UserStory US018
 * @TestType Integration Testing
 * @Test
 * @UsDependency US001, US005, US007, US009, US010
 * @acceptanceCriteria
 ******/

describe("TC-US018 - Integration Tests - Member view Members without any activity (Posts and Comments) for a Specific Day", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();

    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  describe("TC-US018 - Register of a New Account", (): void => {
    it("TC-US001/1 - Register of a New Account with Unique Parameters Email & Username", async (): Promise<void> => {
      // Arrange:
      let username: string = "adminuser2";
      let email: string = "adminuser2@gmail.com";
      let password: string = "adminuser2";

      // Act:
      const response = await users.post(username, email, password);

      // Assert:
      expect(response.status).toBe(200);
    });
  });
  /******
   * @Furps FURPS
   * @TestType FURPS - Auxiliar Tests - Login
   * @Test FURPS - Auxiliar Tests - Login
   * @UsDepndency NA
   * @acceptanceCriteria AC.2
   ******/

  describe("FURPS - Auxiliar Tests - Login", (): void => {
    it("FURPS - Login with Parameters of a Registered Account (Valid Username & Password)", async (): Promise<void> => {
      // Arrange:
      let username: string = "adminuser2";
      let password: string = "adminuser2";

      // Act:
      const response = await users.postLogin(username, password);

      // Assert:
      expect(response.status).toBe(200);

      expect(response.data.accessToken).toBeDefined();
      expect(response.data.refreshToken).toBeDefined();

      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
    });

    it("FURPS - Fail to Login with Invalid Parameter (Username)", async (): Promise<void> => {
      // Arrange:
      let username: string = "Grupo-3-SwitchQA";
      let password: string = "Grupo-3";

      // Act:
      const response = await users.postLogin(username, password);

      // Assert:
      expect(response.status).toBe(500);
    });

    it("FURPS - Fail to Login with Invalid Parameter (Password)", async (): Promise<void> => {
      // Arrange:
      let username: string = "Grupo-3";
      let password: string = "Grupo-3-SwitchQA";

      // Act:
      const response = await users.postLogin(username, password);

      // Assert:
      expect(response.status).toBe(500);
    });

    it("FURPS - Fail to Login with Missing Parameter (Username)", async (): Promise<void> => {
      // Arrange:
      let username: string = "";
      let password: string = "Grupo-3";

      // Act:
      const response = await users.postLogin(username, password);

      // Assert:
      expect(response.status).toBe(500);
    });

    it("FURPS - Fail to Login with Missing Parameter (Password)", async (): Promise<void> => {
      // Arrange:
      let username: string = "Grupo-3";
      let password: string = "";

      // Act:
      const response = await users.postLogin(username, password);

      // Assert:
      expect(response.status).toBe(500);
    });
  });

  /******
   * @UserStory US018
   * @TestType Integrations Tests
   * @Test TC-US018 - Integration Tests
   * @UsDepndency NA
   * @acceptanceCriteria AC.1 / AC.2 / AC.8 / AC.9 / AC.11
   ******/
  /*
  describe("TC-US018 - Integration Tests", (): void => {});
 it("TC-US018-1 - Member view Members without any activity (Posts and Comments) for a Specific Day", async (): Promise<void> => {

    // Act:
    const response = await users.getUsernamesOfAllMembersWithNoPostAndNoCommentsByDate("2021-04-15");

    // Assert:
    expect(response.status).toBe(200);
  }
});
*/

  /******
   * @Furps FURPS
   * @TestType FURPS - Auxiliar Tests - Logout
   * @Test FURPS - Auxiliar Tests - Logout
   * @UsDepndency NA
   * @acceptanceCriteria NA
   ******/
  /*
  describe("FURPS - Auxiliar Tests - Logout", (): void => {
    it("FURPS - Logout - Logs out the User)", async (): Promise<void> => {
      // Act:
      const response = await members.

      // Assert:
      expect(response.status).toBe(200);
    });
  });
  */
});

export default {};
/*********************************************************************************************************************
 *
 *
 * Automated Generated Tests - TESTS ENDPOINT getMemberNoPostNoCommentsByDate
 */

/*
import { AxiosResponse } from "axios";
import { RestClient } from "../../shared/core/RestClient";
import { Result } from "../../shared/core/Result";
import { Guard } from "../../shared/core/Guard";
import { MemberEndpoint } from "./member";

describe("MemberEndpoint", () => {
  let endpoint: MemberEndpoint;
  let restClient: RestClient;

  beforeEach(() => {
    restClient = {
      sendGet: jest.fn(),
      sendPost: jest.fn(),
      sendPut: jest.fn(),
      sendDelete: jest.fn()
    } as any;
    endpoint = new MemberEndpoint(restClient);
  });

  describe("getMemberNoPostNoCommentsByDate", () => {
    it("should return a successful response when given valid arguments", async () => {
      // Arrange
      const accessToken = "validAccessToken";
      const date = "2022-01-01";
      const expectedResponse = { data: "validData" };
      (restClient.sendGet as jest.Mock).mockResolvedValueOnce(expectedResponse);

      // Act
      const result = await endpoint.getMemberNoPostNoCommentsByDate(
        accessToken,
        date
      );

      // Assert
      expect(restClient.sendGet).toHaveBeenCalledWith({
        route: "/getMemberNoPostNoCommentsByDate",
        data: { date },
        headers: { Authorization: accessToken }
      });
      expect(result).toEqual(Result.ok<AxiosResponse>(expectedResponse));
    });

    it("should return a failure response when given an invalid access token", async () => {
      // Arrange
      const accessToken = "";
      const date = "2022-01-01";

      // Act
      const result = await endpoint.getMemberNoPostNoCommentsByDate(
        accessToken,
        date
      );

      // Assert
      expect(restClient.sendGet).not.toHaveBeenCalled();
      expect(result.isFailure).toBeTruthy();
      expect(result.getErrorValue()).toEqual(
        "accessToken is null or undefined"
      );
    });

    it("should return a failure response when given an invalid date", async () => {
      // Arrange
      const accessToken = "validAccessToken";
      const date = "";

      // Act
      const result = await endpoint.getMemberNoPostNoCommentsByDate(
        accessToken,
        date
      );

      // Assert
      expect(restClient.sendGet).not.toHaveBeenCalled();
      expect(result.isFailure).toBeTruthy();
      expect(result.getErrorValue()).toEqual("date is null or undefined");
    });
  });
});


// Automated Generated Tests - TESTS - ROUTE: getMemberNoPostNoCommentsByDate

import request from "supertest";
import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { memberRouter } from "./member";
import {
  getMemberByUserNameController,
  getCurrentMemberController,
  getMemberPostCountController,
  getMemberCommentCountController,
  getMemberNoPostNoCommentsByDateController,
} from "../../../useCases/members";

jest.mock("../../../useCases/members");

describe("memberRouter", () => {
  const app = express();
  app.use(middleware);
  app.use("/members", memberRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /members/me", () => {
    it("should call getCurrentMemberController.execute", async () => {
      const req = request(app).get("/members/me");
      await req;
      expect(getCurrentMemberController.execute).toHaveBeenCalled();
    });
  });

  describe("GET /members/:username", () => {
    it("should call getMemberByUserNameController.execute", async () => {
      const username = "testuser";
      const req = request(app).get(`/members/${username}`);
      await req;
      expect(getMemberByUserNameController.execute).toHaveBeenCalledWith(
        expect.objectContaining({ params: { username } }),
        expect.anything()
      );
    });
  });

  describe("GET /members/postcount/:username", () => {
    it("should call getMemberPostCountController.execute", async () => {
      const username = "testuser";
      const req = request(app).get(`/members/postcount/${username}`);
      await req;
      expect(getMemberPostCountController.execute).toHaveBeenCalledWith(
        expect.objectContaining({ params: { username } }),
        expect.anything()
      );
    });
  });

  describe("GET /members/commentcount/:username", () => {
    it("should call getMemberCommentCountController.execute", async () => {
      const username = "testuser";
      const req = request(app).get(`/members/commentcount/${username}`);
      await req;
      expect(getMemberCommentCountController.execute).toHaveBeenCalledWith(
        expect.objectContaining({ params: { username } }),
        expect.anything()
      );
    });
  });

  describe("GET /members/getMemberNoPostNoCommentsByDate", () => {
    it("should call getMemberNoPostNoCommentsByDateController.execute", async () => {
      const req = request(app).get("/members/getMemberNoPostNoCommentsByDate");
      await req;
      expect(getMemberNoPostNoCommentsByDateController.execute).toHaveBeenCalled();
    });
  });
});

// Automated Generated Tests - TESTS - sequelize: getMemberNoPostNoCommentsByDate

import { SequelizeMemberRepo } from "./sequelizeMemberRepo";
import { Member } from "../../domain/member";
import { MemberDetails } from "../../domain/memberDetails";
import { MemberDetailsMap } from "../../mappers/memberDetailsMap";
import { Result } from "../../../../shared/core/Result";
import { Guard } from "../../../../shared/core/Guard";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { MemberUsername } from "../../domain/memberUsername";
import { MemberEmail } from "../../domain/memberEmail";
import { MemberPassword } from "../../domain/memberPassword";
import { Post } from "../../domain/post";
import { Comment } from "../../domain/comment";

describe("SequelizeMemberRepo", () => {
  let sequelizeMemberRepo: SequelizeMemberRepo;

  beforeEach(() => {
    sequelizeMemberRepo = new SequelizeMemberRepo();
  });

  describe("getMemberNoPostNoCommentsByDate", () => {
    it("returns member details with no posts or comments for a given date", async () => {
      // Arrange
      const member = Member.create({
        username: MemberUsername.create("testuser").getValue(),
        email: MemberEmail.create("testuser@test.com").getValue(),
        password: MemberPassword.create("testpassword").getValue(),
      }).getValue();

      const post = Post.create({
        memberId: member.memberId,
        title: "Test Post",
        text: "Test Post Text",
      }).getValue();

      const comment = Comment.create({
        memberId: member.memberId,
        postId: post.postId,
        text: "Test Comment Text",
      }).getValue();

      await sequelizeMemberRepo.save(member);
      await sequelizeMemberRepo.save(post);
      await sequelizeMemberRepo.save(comment);

      // Act
      const result = await sequelizeMemberRepo.getMemberNoPostNoCommentsByDate(
        new Date()
      );

      // Assert
      expect(result.isSuccess).toBeTruthy();
      expect(result.getValue().length).toEqual(1);
      expect(result.getValue()[0]).toBeInstanceOf(MemberDetails);
      expect(result.getValue()[0].memberId.equals(member.memberId)).toBeTruthy();
      expect(result.getValue()[0].username).toEqual(member.username.value);
      expect(result.getValue()[0].email).toEqual(member.email.value);
      expect(result.getValue()[0].postCount).toEqual(0);
      expect(result.getValue()[0].commentCount).toEqual(0);
    });

    it("throws an error if member is not found", async () => {
      // Arrange
      const date = new Date();

      // Act
      const result = await sequelizeMemberRepo.getMemberNoPostNoCommentsByDate(
        date
      );

      // Assert
      expect(result.isFailure).toBeTruthy();
      expect(result.getErrorValue()).toEqual("Member not found");
    });
  });
});


*/
