const { spawnAsync } = require("../utils/spawnAsync");

async function run(context) {
  const cwd = context.projectName;
  await spawnAsync("composer", ["require", "tcg/voyager"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("php", ["artisan", "voyager:install"], { cwd, spinner: context.spinner });
}

module.exports = { run };
