import fs from "fs";
import path from "path";

export default function loadModules(engine) {

  const modulesPath = path.resolve("modules");

  if (!fs.existsSync(modulesPath)) {
    console.log("No modules directory found.");
    return;
  }

  const modules = fs.readdirSync(modulesPath);

  for (const moduleName of modules) {

    const modulePath = path.join(modulesPath, moduleName, "index.js");

    if (fs.existsSync(modulePath)) {

      const module = require(modulePath);

      engine.register(module.default || module);

    }

  }

}
