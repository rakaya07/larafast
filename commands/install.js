export default function installCommand(program) {
  program
    .command("install <module>")
    .description("install module into laravel project")
    .action((module) => {
      console.log(`Installing module: ${module}`);
    });
}
