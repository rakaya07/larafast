export default function doctorCommand(program) {
  program
    .command("doctor")
    .description("check development environment")
    .action(() => {
      console.log("Checking environment...");
    });
}
