const { spawnAsync } = require("../utils/spawnAsync");

async function run(context) {
  const cwd = context.projectName;
  await spawnAsync("composer", ["require", "filament/filament"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("php", ["artisan", "filament:install", "--panels", "--no-interaction"], { cwd, spinner: context.spinner });
}

module.exports = { run };
