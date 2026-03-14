const { spawnAsync } = require("../utils/spawnAsync");

const frontendStackMap = {
  React: "inertia",
  Vue: "inertia",
  Blade: "livewire",
};

async function run(context) {
  const cwd = context.projectName;
  const stack = frontendStackMap[context.config.frontend] || "livewire";

  await spawnAsync("composer", ["require", "laravel/jetstream"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("php", ["artisan", "jetstream:install", stack, "--no-interaction"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("npm", ["install"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("npm", ["run", "build"], { cwd, spinner: context.spinner, shell: true });
}

module.exports = { run };
