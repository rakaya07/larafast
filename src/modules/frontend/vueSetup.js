const { spawnAsync } = require("../utils/spawnAsync");

async function run(context) {
  const cwd = context.projectName;
  await spawnAsync("npm", ["install", "@vitejs/plugin-vue", "--save-dev"], { cwd, spinner: context.spinner, shell: true });
  await spawnAsync("npm", ["run", "build"], { cwd, spinner: context.spinner, shell: true });
}

module.exports = { run };
