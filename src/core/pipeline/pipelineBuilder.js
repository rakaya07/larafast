function buildPipeline(config, projectName) {
  const steps = [];

  steps.push({
    id: "laravel-install",
    description: "Install Laravel project using composer",
  });

  const dbMap = {
    MySQL: { id: "database-mysql", description: "Configure MySQL database" },
    PostgreSQL: { id: "database-postgres", description: "Configure PostgreSQL database" },
    SQLite: { id: "database-sqlite", description: "Configure SQLite database" },
  };
  if (dbMap[config.database]) steps.push(dbMap[config.database]);

  const authMap = {
    Breeze: { id: "auth-breeze", description: "Install Laravel Breeze" },
    Jetstream: { id: "auth-jetstream", description: "Install Laravel Jetstream" },
  };
  if (config.admin === "None" || !config.admin) {
    if (authMap[config.auth]) steps.push(authMap[config.auth]);
  }

  const frontendMap = {
    Blade: { id: "frontend-blade", description: "Set up Blade templating" },
    React: { id: "frontend-react", description: "Set up React with Vite" },
    Vue: { id: "frontend-vue", description: "Set up Vue with Vite" },
  };
  if (frontendMap[config.frontend]) steps.push(frontendMap[config.frontend]);

  const adminMap = {
    Filament: { id: "admin-filament", description: "Install Filament admin panel" },
    Voyager: { id: "admin-voyager", description: "Install Voyager admin panel" },
  };
  if (adminMap[config.admin]) {
    steps.push({ id: "database-ready-check", description: "Verify database connection" });
    steps.push(adminMap[config.admin]);
  }

  if (config.docker) steps.push({ id: "docker-setup", description: "Generate Docker and docker-compose files" });
  if (config.git) steps.push({ id: "git-init", description: "Initialize Git repository" });

  return steps;
}

module.exports = { buildPipeline };
