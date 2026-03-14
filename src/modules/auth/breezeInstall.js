const { spawnAsync } = require("../utils/spawnAsync");

const frontendStackMap = {
  React: "react",
  Vue: "vue",
  Blade: "blade",
};

async function run(context) {
  const cwd = context.projectName;
  const stack = frontendStackMap[context.config.frontend] || "blade";

  await spawnAsync("composer", ["require", "laravel/breeze", "--dev"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("php", ["artisan", "breeze:install", stack, "--no-interaction"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("npm", ["install"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("npm", ["run", "build"], { cwd, spinner: context.spinner, shell: true });
}

module.exports = { run };
