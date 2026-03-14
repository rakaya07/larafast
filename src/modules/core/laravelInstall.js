const { spawn } = require("child_process");

async function run(context) {
  const { projectName } = context;

  return new Promise((resolve, reject) => {
    if (context.spinner) context.spinner.stop();
    const args = ["create-project", "laravel/laravel", projectName];
    if (context.config.laravelConstraint) {
      args.push(context.config.laravelConstraint);
    }
    const child = spawn("composer", args, { stdio: "inherit", shell: true });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`composer create-project failed with exit code ${code}`));
      }
    });

    child.on("error", (err) => {
      reject(new Error(`Failed to start composer: ${err.message}`));
    });
  });
}

module.exports = { run };
