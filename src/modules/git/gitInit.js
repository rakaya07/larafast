const { spawnAsync } = require("../utils/spawnAsync");

async function run(context) {
  const cwd = context.projectName;
  await spawnAsync("git", ["init"], { cwd, spinner: context.spinner });
  await spawnAsync("git", ["add", "."], { cwd, spinner: context.spinner });
  await spawnAsync("git", ["commit", "-m", '"Initial commit (Larafast)"', "--no-edit"], { cwd, spinner: context.spinner, shell: true });
}

module.exports = { run };
