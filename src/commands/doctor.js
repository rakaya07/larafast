const { spawnSync } = require("child_process");

const tools = [
  { name: "Node.js",  cmd: "node",     args: ["-v"] },
  { name: "npm",      cmd: "npm",      args: ["-v"] },
  { name: "Composer", cmd: "composer", args: ["--version"] },
  { name: "Git",      cmd: "git",      args: ["--version"] },
  { name: "Docker",         cmd: "docker", args: ["-v"] },
  { name: "Docker Compose", cmd: "docker", args: ["compose", "version"] },
];

// Tools to verify are executable via Node spawn (shell: true).
const spawnTests = [
  { name: "npm",      cmd: "npm",      args: ["-v"] },
  { name: "composer", cmd: "composer", args: ["--version"] },
];

function checkTool(name, command, args) {
  const result = spawnSync(command, args, { shell: true, stdio: "ignore" });

  if (result.error) {
    console.log(`✖ ${name} not found`);
  } else {
    console.log(`✔ ${name}`);
  }
}

function checkGitIdentity() {
  const name  = spawnSync("git", ["config", "--global", "user.name"],  { shell: true, stdio: "pipe", encoding: "utf-8" });
  const email = spawnSync("git", ["config", "--global", "user.email"], { shell: true, stdio: "pipe", encoding: "utf-8" });

  const hasName  = !name.error  && name.stdout.trim().length  > 0;
  const hasEmail = !email.error && email.stdout.trim().length > 0;

  if (hasName && hasEmail) {
    console.log("✔ Git identity");
  } else {
    console.log("✖ Git identity not configured");
    console.log('  Run:');
    console.log('    git config --global user.name "Your Name"');
    console.log('    git config --global user.email "you@example.com"');
  }
}

function checkSpawn(name, command, args) {
  const result = spawnSync(command, args, { shell: true, stdio: "ignore" });

  if (result.error || result.status !== 0) {
    console.log(`✖ ${name} cannot be executed by Node spawn`);
  } else {
    console.log(`✔ ${name} spawn test`);
  }
}

function registerDoctorCommand(program) {
  program
    .command("doctor")
    .description("Check if required system tools are installed.")
    .action(() => {
      console.log("Checking environment...\n");

      for (const tool of tools) {
        checkTool(tool.name, tool.cmd, tool.args);
      }

      checkGitIdentity();

      console.log("");

      for (const test of spawnTests) {
        checkSpawn(test.name, test.cmd, test.args);
      }
    });
}

module.exports = registerDoctorCommand;
