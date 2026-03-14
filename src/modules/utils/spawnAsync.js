const { spawn } = require("child_process");

function spawnAsync(cmd, args, options = {}) {
  const { spinner, ...spawnOptions } = options;

  return new Promise((resolve, reject) => {
    if (spinner) spinner.stop();
    const child = spawn(cmd, args, { stdio: "inherit", ...spawnOptions });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`"${cmd} ${args.join(" ")}" exited with code ${code}`));
      }
    });

    child.on("error", (err) => {
      reject(new Error(`Failed to start "${cmd}": ${err.message}`));
    });
  });
}

module.exports = { spawnAsync };
