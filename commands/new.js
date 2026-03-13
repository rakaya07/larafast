import CoreEngine from "../core/engine.js";
import LaravelModule from "../modules/laravel/index.js";

export default function newCommand(program) {

  program
    .command("new <project>")
    .description("create a new laravel project")
    .action(async (project) => {

      console.log(`Creating new project: ${project}`);

      const engine = new CoreEngine();

      const laravelModule = new LaravelModule(project);

      engine.register(laravelModule);

      await engine.run();

    });

}
