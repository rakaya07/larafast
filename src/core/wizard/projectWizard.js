const { select, confirm } = require("@inquirer/prompts");

async function runProjectWizard(defaults = {}) {
  const auth = defaults.auth ?? await select({
    message: "Auth system:",
    choices: ["None", "Breeze", "Jetstream"],
  });

  const frontend = defaults.frontend ?? await select({
    message: "Frontend stack:",
    choices: ["Blade", "React", "Vue"],
  });

  const database = defaults.database ?? await select({
    message: "Database:",
    choices: ["MySQL", "PostgreSQL", "SQLite"],
  });

  const admin = defaults.admin ?? await select({
    message: "Admin panel:",
    choices: ["None", "Filament", "Voyager"],
  });

  const docker = defaults.docker ?? await confirm({ message: "Docker setup?" });

  const git = defaults.git ?? await confirm({ message: "Initialize Git?" });

  // Admin panels ship their own auth — override any auth selection.
  const resolvedAuth = admin !== "None" ? "None" : auth;

  return { auth: resolvedAuth, frontend, database, admin, docker, git };
}

module.exports = { runProjectWizard };
