export default function listCommand(program) {
  program
    .command("list")
    .description("list available modules")
    .action(() => {
      console.log("Available modules:");
      console.log("- breeze");
      console.log("- jetstream");
      console.log("- tailwind");
      console.log("- filament");
    });
}
