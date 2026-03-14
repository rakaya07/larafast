const ora = require("ora");

const moduleHandlers = {
  "laravel-install": require("../../modules/core/laravelInstall"),
  "database-mysql":       require("../../modules/database/mysqlConfig"),
  "database-ready-check": require("../../modules/database/databaseReadyCheck"),
  "database-postgres": require("../../modules/database/postgresConfig"),
  "database-sqlite": require("../../modules/database/sqliteConfig"),
  "auth-breeze":     require("../../modules/auth/breezeInstall"),
  "auth-jetstream":  require("../../modules/auth/jetstreamInstall"),
  "frontend-blade":  require("../../modules/frontend/bladeSetup"),
  "frontend-react":  require("../../modules/frontend/reactSetup"),
  "frontend-vue":    require("../../modules/frontend/vueSetup"),
  "admin-filament":  require("../../modules/admin/filamentInstall"),
  "admin-voyager":   require("../../modules/admin/voyagerInstall"),
  "docker-setup":    require("../../modules/docker/dockerSetup"),
  "git-init":        require("../../modules/git/gitInit"),
};

async function runPipeline(pipeline, context) {
  const spinner = ora();

  for (const step of pipeline) {
    const label = step.description || step.id;

    spinner.start(label);
    context.spinner = spinner;

    if (moduleHandlers[step.id]) {
      try {
        await moduleHandlers[step.id].run(context);
        spinner.succeed(label);
      } catch (err) {
        spinner.fail(label);
        console.error(err.message);
        process.exit(1);
      }
    } else {
      spinner.succeed(label);
    }
  }
}

module.exports = { runPipeline };
