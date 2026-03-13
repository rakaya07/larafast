import { exec } from "child_process";
import ModuleInterface from "../../core/moduleInterface.js";

export default class LaravelModule extends ModuleInterface {

  constructor(projectName) {
    super("laravel", "Install Laravel project");
    this.projectName = projectName;
  }

  async run() {

    console.log("Installing Laravel...");

    return new Promise((resolve, reject) => {

      const command = `composer create-project laravel/laravel ${this.projectName}`;

      const process = exec(command);

      process.stdout.on("data", (data) => {
        console.log(data);
      });

      process.stderr.on("data", (data) => {
        console.error(data);
      });

      process.on("close", (code) => {

        if (code === 0) {
          console.log("Laravel installation complete.");
          resolve();
        } else {
          reject(new Error("Laravel installation failed"));
        }

      });

    });

  }

}
