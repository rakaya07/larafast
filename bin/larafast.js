#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("larafast")
  .description("Laravel project installer CLI")
  .version("1.0.0");

program
  .command("new <project>")
  .description("create a new laravel project")
  .action((project) => {
    console.log(`Creating new project: ${project}`);
  });

program
  .command("doctor")
  .description("check development environment")
  .action(() => {
    console.log("Checking environment...");
  });

program
  .command("install <module>")
  .description("install module into laravel project")
  .action((module) => {
    console.log(`Installing module: ${module}`);
  });

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

program.parse();
