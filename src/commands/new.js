const fs = require("fs");
const path = require("path");
const { runProjectWizard } = require("../core/wizard/projectWizard");
const { checkCompatibility } = require("../core/pipeline/compatibilityChecker");
const { resolveLaravelVersion, ADMIN_LARAVEL_CONSTRAINTS } = require("../core/pipeline/configResolver");
const { buildPipeline } = require("../core/pipeline/pipelineBuilder");
const { runPipeline } = require("../core/engine/pipelineEngine");

const PRESETS_DIR = path.join(__dirname, "..", "presets");

function parseOptionalBoolean(value) {
  if (value === undefined || value === true) {
    return true;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value).trim().toLowerCase();

  if (["true", "1", "yes"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no"].includes(normalized)) {
    return false;
  }

  throw new Error(`Invalid boolean value: ${value}`);
}

function loadPresetConfig(presetName) {
  const presetPath = path.join(PRESETS_DIR, `${presetName}.json`);

  if (!fs.existsSync(presetPath)) {
    console.error(`Preset "${presetName}" not found.`);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(presetPath, "utf8"));
}

function resolveConfigFromFlags(opts) {
  const config = {};

  if (opts.breeze)    config.auth = "Breeze";
  if (opts.jetstream) config.auth = "Jetstream";

  if (opts.blade)  config.frontend = "Blade";
  if (opts.react)  config.frontend = "React";
  if (opts.vue)    config.frontend = "Vue";

  if (opts.mysql)    config.database = "MySQL";
  if (opts.postgres) config.database = "PostgreSQL";
  if (opts.sqlite)   config.database = "SQLite";

  if (opts.filament) config.admin = "Filament";
  if (opts.voyager)  config.admin = "Voyager";

  if (opts.docker !== undefined) config.docker = opts.docker;
  if (opts.git !== undefined)    config.git = opts.git;

  return config;
}

function registerNewCommand(program) {
  program
    .command("new <project-name>")
    .description("Create a new Laravel project.")
    // auth
    .option("--breeze",    "Use Laravel Breeze for authentication")
    .option("--jetstream", "Use Laravel Jetstream for authentication")
    // frontend
    .option("--blade", "Use Blade as the frontend stack")
    .option("--react", "Use React as the frontend stack")
    .option("--vue",   "Use Vue as the frontend stack")
    // database
    .option("--mysql",    "Use MySQL as the database")
    .option("--postgres", "Use PostgreSQL as the database")
    .option("--sqlite",   "Use SQLite as the database")
    // admin
    .option("--filament", "Install Filament admin panel")
    .option("--voyager",  "Install Voyager admin panel")
    // extras
    .option("--preset <name>", "Load a preset configuration from src/presets")
    .option("--docker [value]", "Generate Docker setup files", parseOptionalBoolean)
    .option("--git [value]",    "Initialize a Git repository", parseOptionalBoolean)
    .action(async (projectName, opts) => {
      console.log(`Creating Laravel project: ${projectName}\n`);

      const presetConfig = opts.preset ? loadPresetConfig(opts.preset) : {};
      const fromFlags = resolveConfigFromFlags(opts);
      const resolvedDefaults = {
        ...presetConfig,
        ...fromFlags,
      };
      const config = await runProjectWizard(resolvedDefaults);

      if (config.admin !== "None" && config.admin) {
        console.log(`\nAdmin panel selected: ${config.admin}`);
        console.log("Authentication scaffolding will be skipped because the admin panel includes its own auth system.");
      }

      resolveLaravelVersion(config);

      const adminRule = ADMIN_LARAVEL_CONSTRAINTS[config.admin];
      if (adminRule) {
        console.log(`\n${config.admin} requires Laravel ${adminRule.version}.`);
        console.log(`Automatically setting Laravel version to ${adminRule.version}.`);
      }

      console.log("\nSelected configuration:");
      console.log(JSON.stringify(config, null, 2));

      try {
        checkCompatibility(config);
      } catch (err) {
        console.error(`\nCompatibility error: ${err.message}`);
        process.exit(1);
      }

      const pipeline = buildPipeline(config, projectName);

      console.log("\nPipeline steps:");
      pipeline.forEach((step, i) => {
        const label = step.description
          ? `${step.id} — ${step.description}`
          : step.id;
        console.log(`  ${i + 1}. ${label}`);
      });

      const context = { projectName, config };
      console.log("");
      await runPipeline(pipeline, context);
    });
}

module.exports = registerNewCommand;
