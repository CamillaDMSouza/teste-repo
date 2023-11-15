/**
 * @author SFFDS
 * @UserStory US018 - Member view Members without any activity (Posts and Comments) for a Specific Day
 *
 *
 * @remarks API Unit Tests / Integration Tests
 */

// Run sql script in src/int_tests/US018_db_test_env_prep.sql to insert data in the database
// to be used in the tests below

import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";
import Users from "./endpoints/Users";
import { Sequelize } from "sequelize";

const configuration = ConfigHandler.getInstance();
const logger = new Logger({
  minLevel: configuration.environmnetConfig.log_level,
  dateTimeTimezone:
    configuration.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
});

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "development",
  username: "DDD_FORUM_DB_USER",
  password: "DDD_FORUM_DB_PASS",
  host: "DDD_FORUM_DB_HOST",
  port: 3306
});

import * as path from "path";

beforeAll(async () => {
  // Function to execute the SQL script
  async function executeSQLScript() {
    try {
      const scriptPath =
        "C:/00_PESSOAL/A02_MY_REPO/switch-qa-23-project-switch-qa-23-3/src/int_test/US018_db_test_env_prep.sql";

      if (require("fs").existsSync(scriptPath)) {
        // ... rest of the code
      } else {
        console.error("The SQL script file does not exist.");
      }
      const sqlScript = require("fs").readFileSync(scriptPath, "utf8");
      await sequelize.query(sqlScript, { raw: true });
      console.log("SQL script executed successfully");
    } catch (error) {
      console.error("Error executing SQL script:", error);
    }
  }

  executeSQLScript();

  // Log the Start of the Tests
  logger.info("Starting the Tests");
});