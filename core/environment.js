import { execSync } from "child_process";

function getVersion(command) {
  try {
    const output = execSync(command).toString().trim();
    return output.split("\n")[0];
  } catch {
    return null;
  }
}

export function checkEnvironment() {

  console.log("\nLarafast Environment Check\n");

  const checks = [
    { name: "PHP", command: "php -v" },
    { name: "Composer", command: "composer -V" },
    { name: "Node", command: "node -v" },
    { name: "Git", command: "git --version" },
  ];

  checks.forEach(item => {

    const version = getVersion(item.command);

    if (version) {
      console.log(`✔ ${item.name} detected → ${version}`);
    } else {
      console.log(`✖ ${item.name} not found`);
    }

  });

  console.log("");
}
