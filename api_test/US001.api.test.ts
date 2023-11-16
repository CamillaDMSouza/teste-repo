/**
 * @author SFFDS
 * @UserStory US001 - Register of a New Account
 *
 *
 * @remarks API Unit Tests batch for the US001 - Register of a New Account
 */
import { Logger } from "tslog";
import ConfigHandler from "./config/ConfigHandler";
import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

/**
 * Global Variables Declaration
 */
let users: Users;
let accessToken: string;
let refreshToken: string;

/******
 * @UserStory US001
 * @TestType API Unit Test
 * @Test TC-US001 - Register of a New Account
 * @UsDependency NA
 * @acceptanceCriteria AC1 / AC2 / AC3 / AC4 / AC5
 ******/

describe("TC-US001 - Register of a New Account", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("TC-US001/1 - Register of a New Account with Unique Parameters Email & Username", async (): Promise<void> => {
    // Arrange:
    let username: string = "adminuser";
    let email: string = "adminuser@gmail.com";
    let password: string = "adminuser";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(200);
  });

  it("TC-US001/2 - Fail to Register New Account with a Email already existing in the system", async (): Promise<void> => {
    // Arrange:
    let username: string = "Grupo-3";
    let email: string = "adminuser@gmail.com";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(409);
  });

  it("TC-US001/3 - Fail to Register New Account with the Username already existing in the system", async (): Promise<void> => {
    // Arrange:
    let username: string = "adminuser";
    let email: string = "grupo3@isep.ipp.pt";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(409);
  });

  it("TC-US001/4 - Fail to Register New Account with Invalid - Email", async (): Promise<void> => {
    // Arrange:
    let username: string = "Grupo-SwitchQA";
    let email: string = "grupo-SwitchQA_isep.ipp.pt";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TC-US001/5 - Fail to Register New Account with Invalid Username (less than 2 characters)", async (): Promise<void> => {
    // Arrange:
    let username: string = "A";
    let email: string = "";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TC-US001/6 - Fail to Register New Account with Invalid Username (bigger than 15 characters)", async (): Promise<void> => {
    // Arrange:
    let username: string = "123456789_ABCDEFGH";
    let email: string = "grupo-SwitchQA@isep.ipp.pt";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TC-US001/7 - Fail to Register New Account with Invalid Password (less than 6 characters)", async (): Promise<void> => {
    // Arrange:
    let username: string = "Grupo-SwitchQA";
    let email: string = "grupo@isep.ipp.pt";
    let password: string = "Grupo";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TTC-US001/8 - Fail to Register New Account with Missing - Email", async (): Promise<void> => {
    // Arrange:
    let username: string = "Grupo-SwitchQA";
    let email: string = "";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TC-US001/9 - Fail to Register New Account with Missing - Username", async (): Promise<void> => {
    // Arrange:
    let username: string = "";
    let email: string = "grupo-SwitchQA@isep.ipp.pt";
    let password: string = "Grupo-3";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
  });

  it("TC-US001/10 - Fail to Register New Account with Missing - Password", async (): Promise<void> => {
    // Arrange:
    let username: string = "Grupo-SwitchQA";
    let email: string = "grupo-SwitchQA@isep.ipp.pt";
    let password: string = "";

    // Act:
    const response = await users.post(username, email, password);

    // Assert:
    expect(response.status).toBe(500);
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
    let username: string = "adminuser";
    let password: string = "adminuser";

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
 * @Furps FURPS
 * @TestType FURPS - Auxiliar Tests - Logout
 * @Test FURPS - Auxiliar Tests - Logout
 * @UsDepndency NA
 * @acceptanceCriteria NA
 ******/
describe("FURPS - Auxiliar Tests - Logout", (): void => {
  it("FURPS - Logout - Logs out the User)", async (): Promise<void> => {
    // Act:
    const response = await users.postLogout(accessToken);
    // Assert:
    expect(response.status).toBe(200);
  });
});

export default {};
