#!/usr/bin/env node

import { Command } from "commander";

import newCommand from "../commands/new.js";
import doctorCommand from "../commands/doctor.js";
import installCommand from "../commands/install.js";
import listCommand from "../commands/list.js";

const program = new Command();

program
  .name("larafast")
  .description("Laravel project installer CLI")
  .version("1.0.0");

newCommand(program);
doctorCommand(program);
installCommand(program);
listCommand(program);

program.parse();
