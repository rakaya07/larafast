import { checkEnvironment } from "../core/environment.js";

export default function doctorCommand(program) {

  program
    .command("doctor")
    .description("check development environment")
    .action(() => {

      checkEnvironment();

    });

}
