export default function newCommand(program) {
  program
    .command("new <project>")
    .description("create a new laravel project")
    .action((project) => {
      console.log(`Creating new project: ${project}`);
    });
}
