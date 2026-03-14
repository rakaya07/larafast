#!/usr/bin/env node

const { Command } = require("commander");
const registerNewCommand = require("../src/commands/new");
const registerDoctorCommand = require("../src/commands/doctor");

const program = new Command();

program
  .name("larafast")
  .description("Bootstrap Laravel projects with optional features.")
  .version("0.1.0");

registerNewCommand(program);
registerDoctorCommand(program);

program.parse(process.argv);
