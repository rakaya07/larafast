const path = require("path");
const fs = require("fs");

const META_DIR = path.join(__dirname, "../../modules/meta");

// Maps config values to module names that have metadata files.
const CONFIG_TO_MODULE = {
  auth:     { Breeze: "breeze", Jetstream: "jetstream" },
  admin:    { Filament: "filament", Voyager: "voyager" },
};

// Maps module names and categories to a human-readable label for errors.
const MODULE_LABELS = {
  breeze:    "Breeze",
  jetstream: "Jetstream",
  filament:  "Filament",
  voyager:   "Voyager",
  database:  "a database",
};

function loadMeta(moduleName) {
  const filePath = path.join(META_DIR, `${moduleName}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Returns the set of active module names and categories derived from config.
function resolveActiveModules(config) {
  const active = new Set();

  for (const [field, mapping] of Object.entries(CONFIG_TO_MODULE)) {
    const value = config[field];
    if (value && mapping[value]) {
      active.add(mapping[value]);
    }
  }

  if (config.database && config.database !== "None") active.add("database");
  if (config.docker)                                  active.add("docker");
  if (config.git)                                     active.add("git");

  return active;
}

function checkCompatibility(config) {
  const active = resolveActiveModules(config);

  for (const moduleName of active) {
    const meta = loadMeta(moduleName);
    if (!meta) continue;

    // Check conflicts.
    for (const conflicting of meta.conflicts) {
      if (active.has(conflicting)) {
        const a = MODULE_LABELS[moduleName]   || moduleName;
        const b = MODULE_LABELS[conflicting]  || conflicting;
        throw new Error(`${a} cannot be used with ${b}.`);
      }
    }

    // Check requirements.
    for (const required of meta.requires) {
      if (!active.has(required)) {
        const a = MODULE_LABELS[moduleName] || moduleName;
        const b = MODULE_LABELS[required]   || required;
        throw new Error(`${a} requires ${b} to be configured.`);
      }
    }
  }
}

module.exports = { checkCompatibility };
