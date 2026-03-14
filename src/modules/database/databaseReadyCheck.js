const fs = require("fs");
const path = require("path");
const readline = require("readline");

function parseEnv(projectName) {
  const envPath = path.join(projectName, ".env");
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
  }
  return env;
}

function waitForEnter(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

async function tryConnect(driver, env) {
  if (driver === "sqlite") {
    const dbPath = path.resolve(env.DB_DATABASE || "database/database.sqlite");
    if (!fs.existsSync(dbPath)) {
      throw new Error(`SQLite file not found: ${dbPath}`);
    }
    return;
  }

  if (driver === "mysql") {
    const mysql = require("mysql2/promise");
    const conn = await mysql.createConnection({
      host:     env.DB_HOST     || "127.0.0.1",
      port:     parseInt(env.DB_PORT || "3306", 10),
      user:     env.DB_USERNAME || "root",
      password: env.DB_PASSWORD || "",
      database: env.DB_DATABASE,
    });
    await conn.end();
    return;
  }

  if (driver === "pgsql") {
    const { Client } = require("pg");
    const client = new Client({
      host:     env.DB_HOST     || "127.0.0.1",
      port:     parseInt(env.DB_PORT || "5432", 10),
      user:     env.DB_USERNAME || "postgres",
      password: env.DB_PASSWORD || "",
      database: env.DB_DATABASE,
    });
    await client.connect();
    await client.end();
    return;
  }

  throw new Error(`Unsupported database driver: ${driver}`);
}

async function run(context) {
  const { projectName } = context;

  if (context.spinner) context.spinner.stop();

  const env = parseEnv(projectName);
  const driver = env.DB_CONNECTION;
  const dbName = env.DB_DATABASE;

  while (true) {
    try {
      await tryConnect(driver, env);
      console.log("  ✔ Database connection successful");
      return;
    } catch {
      console.log("\n  Database setup required.");
      console.log(`  Database name: ${dbName}`);

      if (driver === "mysql") {
        console.log(`\n  Example for MySQL:\n    CREATE DATABASE \`${dbName}\`;`);
      } else if (driver === "pgsql") {
        console.log(`\n  Example for PostgreSQL:\n    CREATE DATABASE ${dbName};`);
      }

      await waitForEnter("\n  Press ENTER once the database exists...\n");
    }
  }
}

module.exports = { run };
