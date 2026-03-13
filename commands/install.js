import CoreEngine from "../core/engine.js";
import { getModule } from "../core/moduleRegistry.js";

export default function installCommand(program) {
  program
    .command("install <module>")
    .description("install module into laravel project")
    .action(async (moduleName) => {
      console.log(`Installing module: ${moduleName}`);

      const moduleInstance = getModule(moduleName);

      if (!moduleInstance) {
        console.log(`Module not found: ${moduleName}`);
        return;
      }

      const engine = new CoreEngine();
      engine.register(moduleInstance);

      await engine.run();
    });
}
