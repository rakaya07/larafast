const fs = require("fs");
const path = require("path");

async function run(context) {
  const envPath = path.join(context.projectName, ".env");
  let env = fs.readFileSync(envPath, "utf8");

  env = env
    .replace(/^DB_CONNECTION=.*/m, "DB_CONNECTION=sqlite")
    .replace(/^DB_HOST=.*/m, "# DB_HOST=")
    .replace(/^DB_PORT=.*/m, "# DB_PORT=")
    .replace(/^DB_DATABASE=.*/m, "DB_DATABASE=database/database.sqlite")
    .replace(/^DB_USERNAME=.*/m, "# DB_USERNAME=")
    .replace(/^DB_PASSWORD=.*/m, "# DB_PASSWORD=");

  fs.writeFileSync(envPath, env);

  const sqlitePath = path.join(context.projectName, "database", "database.sqlite");
  if (!fs.existsSync(sqlitePath)) {
    fs.writeFileSync(sqlitePath, "");
  }

  console.log("  .env updated for SQLite");
}

module.exports = { run };
