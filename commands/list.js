const availableModules = [
  "laravel",
  "breeze",
  "jetstream",
  "tailwind",
  "filament",
  "voyager",
  "docker"
];

export default function listCommand(program) {
  program
    .command("list")
    .description("list available modules")
    .action(() => {
      console.log("Available modules:");

      availableModules.forEach((moduleName) => {
        console.log(`- ${moduleName}`);
      });
    });
}
