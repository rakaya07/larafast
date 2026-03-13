import LaravelModule from "../modules/laravel/index.js";

export function getModule(moduleName, options = {}) {
  switch (moduleName) {
    case "laravel":
      return new LaravelModule(options.projectName || "laravel-app");

    default:
      return null;
  }
}
