/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;

let accessToken: string;
let refreshToken: string;

describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();

    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  // ** TC 1: Create user with valid paarameters (Email/ Username & Password)
  it("TC 1 - Post - Create User", async (): Promise<void> => {
    const response = await users.post(
      "Grupo-3-1",
      "Grupo3-1b@isep.ipp.pt",
      "Grupo-3-1",
    );

    expect(response.status).toBe(200);
  });

  // ** TC 2.1: Login with Parameters (Username & Password) of an Registered Account

  it("TC 2.1 - Post Login - Login with Parameters (Username & Password) of an Registered Account", async (): Promise<void> => {
    const response = await users.postLogin("Grupo-3-1", "Grupo-3-1");
    expect(response.status).toBe(200);

    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  // ** TC 2.2: Login with Invalid Parameters (Username)
  it("TC 2.2 - Post Login - Login with Invalid Parameters (Username)", async (): Promise<void> => {
    const response = await users.postLogin("Grupo-3-SwitchQA", "Grupo-3-1");
    expect(response.status).toBe(500);
  });

  // ** TC 2.3: Login with Invalid Parameters (Password)
  it("TC 1.3 - Post Login - Login with Invalid Parameters (Password)", async (): Promise<void> => {
    const response = await users.postLogin("Grupo-3-1", "Grupo-3-SwitchQA");
    expect(response.status).toBe(400);
  });

  // ** TC 3: Gets the User's information
  it("TC 3: Get Me - Gets the User's information", async (): Promise<void> => {
    log.debug("Access token: " + accessToken);

    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);

    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("Grupo-3-1");
  });

  // ** TC 4: Post Logout
  it("TC 4 - Post Logout - Logs out the User)", async (): Promise<void> => {
    const response = await users.postLogout(accessToken);
    expect(response.status).toBe(200);
  });
});
