const fs = require("fs");
const path = require("path");

async function run(context) {
  const envPath = path.join(context.projectName, ".env");
  let env = fs.readFileSync(envPath, "utf8");

  env = env
    .replace(/^DB_CONNECTION=.*/m, "DB_CONNECTION=pgsql")
    .replace(/^DB_HOST=.*/m, "DB_HOST=127.0.0.1")
    .replace(/^DB_PORT=.*/m, "DB_PORT=5432")
    .replace(/^DB_DATABASE=.*/m, `DB_DATABASE=${context.projectName}`)
    .replace(/^DB_USERNAME=.*/m, "DB_USERNAME=postgres")
    .replace(/^DB_PASSWORD=.*/m, "DB_PASSWORD=");

  fs.writeFileSync(envPath, env);
  console.log("  .env updated for PostgreSQL");
}

module.exports = { run };
