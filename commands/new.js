import CoreEngine from "../core/engine.js";
import LaravelModule from "../modules/laravel/index.js";
import { runWizard } from "../core/wizard.js";

export default function newCommand(program) {

  program
    .command("new <project>")
    .description("create a new laravel project")
    .action(async (project) => {

      const config = await runWizard(project);

      const engine = new CoreEngine();

      const laravelModule = new LaravelModule(config.projectName);

      engine.register(laravelModule);

      await engine.run();

    });

}
