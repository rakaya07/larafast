// Version constraints keyed by the admin panel that requires them.
const ADMIN_LARAVEL_CONSTRAINTS = {
  Voyager: { version: "10", constraint: "^10.0" },
};

function resolveLaravelVersion(config) {
  const rule = ADMIN_LARAVEL_CONSTRAINTS[config.admin];

  if (rule) {
    config.laravel = rule.version;
    config.laravelConstraint = rule.constraint;
  }

  if (!config.laravel) {
    config.laravel = "12";
    config.laravelConstraint = null; // use Composer default (latest stable)
  }

  return config;
}

module.exports = { resolveLaravelVersion, ADMIN_LARAVEL_CONSTRAINTS };
