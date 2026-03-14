<div align="center">

<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">

# ⚡ Larafast

**Bootstrap production-ready Laravel projects in seconds — not hours.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![npm version](https://img.shields.io/badge/npm-0.1.0-CB3837?style=flat-square&logo=npm)](https://npmjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=flat-square)]()
[![GitHub stars](https://img.shields.io/github/stars/rakaya07/larafast?style=flat-square)](https://github.com/rakaya07/larafast)
[![npm version](https://img.shields.io/npm/v/larafast?style=flat-square)](https://npmjs.com/package/larafast)
[![Downloads](https://img.shields.io/npm/dm/larafast?style=flat-square)](https://npmjs.com/package/larafast)

<br/>

> A Node.js CLI that installs Laravel and wires up auth, frontend, database, admin panel, Docker, and Git — all from a single command.

<br/>

[Getting Started](#-getting-started) •
[Commands](#-commands) •
[Flags](#-cli-flags) •
[Presets](#-presets) •
[Architecture](#-architecture) •
[Modules](#-modules)

</div>

---

## ⚡ Quick Start

Create a Laravel project instantly:

```bash
npx larafast new blog
```

Create a project with modules:

```bash
npx larafast new blog --breeze --react --mysql --git
```

---

## 🎬 Demo

![Larafast demo](assets/demo.gif)

---

## ✨ What is Larafast?

Larafast is a **zero-boilerplate Laravel project generator**. Instead of spending hours installing packages and configuring `.env` files, you answer a few questions (or pass flags) and Larafast runs every installation step for you — in order, with visual feedback, and with smart conflict detection.

```
larafast new myblog
```

```
Creating Laravel project: myblog

? Auth system:        › Breeze
? Frontend stack:     › React
? Database:           › MySQL
? Admin panel:        › None
? Docker setup?       › No
? Initialize Git?     › Yes

Selected configuration:
{
  "laravel": "12",
  "auth": "Breeze",
  "frontend": "React",
  "database": "MySQL",
  "admin": "None",
  "docker": false,
  "git": true
}

Pipeline steps:
  1. laravel-install   — Install Laravel project using composer
  2. database-mysql    — Configure MySQL database
  3. auth-breeze       — Install Laravel Breeze
  4. frontend-react    — Set up React with Vite
  5. git-init          — Initialize Git repository

⠋ Install Laravel project using composer
✔ Install Laravel project using composer

⠋ Configure MySQL database
✔ Configure MySQL database

...
```

---

## 📋 Prerequisites

Before using Larafast, verify your environment:

```bash
larafast doctor
```

```
Checking environment...

✔ Node.js
✔ npm
✔ Composer
✔ Git
✔ Git identity
✔ Docker
✔ Docker Compose

✔ npm spawn test
✔ composer spawn test
```

| Tool | Required | Notes |
|------|----------|-------|
| **Node.js** | ✅ v18+ | Runtime for the CLI |
| **npm** | ✅ | Package management |
| **Composer** | ✅ | Laravel installation |
| **PHP** | ✅ 8.2+ | Laravel runtime |
| **Git** | ✅ | Version control |
| **Docker** | Optional | Only if using `--docker` |
| **MySQL / PostgreSQL** | Optional | Depends on DB choice |

---

## 🚀 Getting Started

### Install globally (recommended)

```bash
npm install -g larafast
```

### Or run locally

```bash
git clone https://github.com/rakaya07/larafast
cd larafast
npm install
node bin/larafast.js new myproject
```

### Create your first project

```bash
# Interactive wizard
larafast new myblog

# Fully via flags (no prompts)
larafast new myblog --breeze --react --mysql --git

# Use a preset
larafast new myblog --preset saas
```

---

## 🖥 Commands

### `larafast new <project-name>`

Creates a new Laravel project with the selected configuration.

```bash
larafast new blog
larafast new blog --breeze --react --mysql --git
larafast new blog --preset saas --docker
```

**Behavior:**
1. Runs interactive wizard (skips questions answered by flags)
2. Validates module compatibility
3. Resolves Laravel version automatically
4. Builds ordered pipeline of steps
5. Executes each step with live output and spinner feedback

---

### `larafast doctor`

Checks your environment for required tools.

```bash
larafast doctor
```

**Checks:**
- Node.js, npm, Composer, Git, Docker, Docker Compose — PATH availability
- Git user identity (name + email configured)
- npm and Composer spawn execution test (Node `child_process` compatibility)

---

## 🎛 CLI Flags

Skip the wizard by passing flags directly. Mix and match — only unanswered questions will be prompted.

### Auth

| Flag | Description |
|------|-------------|
| `--breeze` | Install Laravel Breeze (lightweight auth scaffold) |
| `--jetstream` | Install Laravel Jetstream (full-featured auth + teams) |

> ⚠️ Breeze and Jetstream are mutually exclusive.

---

### Frontend Stack

| Flag | Description |
|------|-------------|
| `--blade` | Blade templating (Laravel default) |
| `--react` | React with Vite (`@vitejs/plugin-react`) |
| `--vue` | Vue 3 with Vite (`@vitejs/plugin-vue`) |

> 💡 When Breeze is selected, the frontend stack is passed directly to `php artisan breeze:install <stack>`.

---

### Database

| Flag | Description |
|------|-------------|
| `--mysql` | MySQL (localhost:3306) |
| `--postgres` | PostgreSQL (localhost:5432) |
| `--sqlite` | SQLite (file-based, zero config) |

---

### Admin Panel

| Flag | Description | Laravel Version |
|------|-------------|-----------------|
| `--filament` | Filament v3 admin panel | 10, 11, 12 |
| `--voyager` | Voyager admin panel | **10 only** ⚠️ |

> ⚠️ Admin panels include built-in authentication. Selecting one automatically disables Breeze/Jetstream.

---

### Extras

| Flag | Values | Description |
|------|--------|-------------|
| `--docker` | `true` / `false` | Generate `docker-compose.yml`, `Dockerfile`, Nginx config |
| `--git` | `true` / `false` | Initialize Git repo with initial commit |
| `--preset <name>` | `basic`, `saas`, `api` | Load pre-defined configuration |

---

## 📦 Presets

Presets are stored in `src/presets/` as JSON files. They pre-fill configuration values so only missing options are prompted.

### Built-in Presets

#### `basic`
```json
{
  "docker": false,
  "git": true
}
```
```bash
larafast new blog --preset basic
# Prompts: auth, frontend, database, admin
```

---

#### `saas`
```json
{
  "auth": "Breeze",
  "frontend": "React",
  "database": "MySQL",
  "admin": "Filament",
  "docker": false,
  "git": true
}
```
```bash
larafast new mysaas --preset saas
# No prompts — fully configured
```

---

#### `api`
```json
{
  "auth": "Breeze",
  "database": "MySQL",
  "docker": true,
  "git": true
}
```
```bash
larafast new myapi --preset api
# Prompts: frontend, admin
```

---

### Custom Presets

Create any JSON file in `src/presets/`:

```json
// src/presets/mystack.json
{
  "auth": "Jetstream",
  "frontend": "Vue",
  "database": "PostgreSQL",
  "docker": true,
  "git": true
}
```

```bash
larafast new myproject --preset mystack
```

---

## 🏗 Architecture

Larafast follows a clean **Pipeline Architecture** with five distinct layers:

```
┌─────────────────────────────────────────────────────────┐
│                      CLI Entry Point                     │
│                    bin/larafast.js                       │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    Commands Layer                         │
│          src/commands/new.js  |  doctor.js               │
└──────┬──────────────┬─────────────────┬─────────────────┘
       │              │                 │
┌──────▼──────┐ ┌─────▼──────┐ ┌───────▼───────┐
│   Wizard    │ │Compatibility│ │Config Resolver│
│ projectWiz  │ │  Checker   │ │ (Laravel ver) │
└──────┬──────┘ └─────┬──────┘ └───────┬───────┘
       │              │                 │
┌──────▼──────────────▼─────────────────▼───────────────┐
│                  Pipeline Builder                        │
│            src/core/pipeline/pipelineBuilder.js          │
└─────────────────────────┬──────────────────────────────┘
                          │
┌─────────────────────────▼──────────────────────────────┐
│                  Pipeline Engine                         │
│             src/core/engine/pipelineEngine.js            │
│                  (ora spinner + error handling)          │
└─────────────────────────┬──────────────────────────────┘
                          │
┌─────────────────────────▼──────────────────────────────┐
│                    Module Handlers                       │
│   laravel │ database │ auth │ frontend │ admin │ docker  │
│                  src/modules/...                         │
└────────────────────────────────────────────────────────┘
```

---

### How the pipeline works

```
Config (from wizard + flags + preset)
    │
    ▼
checkCompatibility()   ← detects conflicts (breeze vs jetstream, filament vs voyager)
    │
    ▼
resolveLaravelVersion() ← Voyager → forces Laravel 10
    │
    ▼
buildPipeline()         ← ordered array of step objects
    │
    ▼
runPipeline()           ← sequential execution with ora spinner
    │
    ├─ laravel-install
    ├─ database-{mysql|postgres|sqlite}
    ├─ auth-{breeze|jetstream}          (skipped if admin panel selected)
    ├─ frontend-{blade|react|vue}
    ├─ database-ready-check             (only with admin panel)
    ├─ admin-{filament|voyager}
    ├─ docker-setup
    └─ git-init
```

---

## 🧩 Modules

Every installation step is an independent module at `src/modules/`. Each exports a single `async run(context)` function.

### `context` object

```js
{
  projectName: "blog",       // project directory name
  config: {
    laravel: "12",
    auth: "Breeze",
    frontend: "React",
    database: "MySQL",
    admin: "None",
    docker: false,
    git: true,
    laravelConstraint: null  // e.g. "^10.0" for Voyager
  },
  spinner: <ora instance>    // stop before subprocess I/O
}
```

---

### Module Reference

| Step ID | File | What it does |
|---------|------|--------------|
| `laravel-install` | `core/laravelInstall.js` | `composer create-project laravel/laravel` with optional version constraint |
| `database-mysql` | `database/mysqlConfig.js` | Patches `.env` for MySQL (host, port, credentials) |
| `database-postgres` | `database/postgresConfig.js` | Patches `.env` for PostgreSQL |
| `database-sqlite` | `database/sqliteConfig.js` | Patches `.env` for SQLite, creates `database.sqlite` |
| `database-ready-check` | `database/databaseReadyCheck.js` | Tests real DB connection, prompts to retry on failure |
| `auth-breeze` | `auth/breezeInstall.js` | `composer require laravel/breeze` + artisan install + npm build |
| `auth-jetstream` | `auth/jetstreamInstall.js` | `composer require laravel/jetstream` + artisan install + npm build |
| `frontend-blade` | `frontend/bladeSetup.js` | `npm install && npm run build` |
| `frontend-react` | `frontend/reactSetup.js` | Installs `@vitejs/plugin-react` + build |
| `frontend-vue` | `frontend/vueSetup.js` | Installs `@vitejs/plugin-vue` + build |
| `admin-filament` | `admin/filamentInstall.js` | `composer require filament/filament` + artisan install |
| `admin-voyager` | `admin/voyagerInstall.js` | `composer require tcg/voyager` + artisan install |
| `docker-setup` | `docker/dockerSetup.js` | Generates `Dockerfile`, `docker-compose.yml`, `nginx.conf` |
| `git-init` | `git/gitInit.js` | `git init` + `git add .` + initial commit |

---

## 🛡 Compatibility System

Larafast uses a **metadata-driven compatibility engine** at `src/modules/meta/`.

Each module declares:

```json
// voyager.json
{
  "name": "voyager",
  "category": "admin",
  "supportsLaravel": ["10"],
  "requires": ["database"],
  "conflicts": ["filament"]
}
```

| Module | Requires | Conflicts With |
|--------|----------|---------------|
| `breeze` | — | `jetstream` |
| `jetstream` | — | `breeze` |
| `filament` | `database` | `voyager` |
| `voyager` | `database` | `filament` |

**Error examples:**
```
Compatibility error: Filament cannot be used with Voyager.
Compatibility error: Breeze cannot be used with Jetstream.
Compatibility error: Filament requires a database to be configured.
```

---

## 🐳 Docker Setup

When `--docker` is used, Larafast generates a full container stack inside your project:

```
your-project/
├── docker-compose.yml
├── Dockerfile
└── docker/
    └── nginx/
        └── default.conf
```

**Services:**

| Service | Image | Port |
|---------|-------|------|
| `app` | PHP 8.2-FPM (custom) | — |
| `nginx` | nginx:alpine | `8080:80` |
| `db` | mysql:8.0 | `3306:3306` |

```bash
# Start your project
cd your-project
docker compose up -d
```

---

## 🔢 Laravel Version Resolution

Larafast automatically selects the correct Laravel version:

| Admin Panel | Laravel Version | Constraint |
|-------------|-----------------|------------|
| None / Filament | **12** (latest) | none |
| **Voyager** | **10** | `^10.0` |

When Voyager is selected, you'll see:

```
Voyager requires Laravel 10.
Automatically setting Laravel version to 10.
```

The `composer create-project` command becomes:
```bash
composer create-project laravel/laravel myblog "^10.0"
```

---

## 🔒 Admin Panel Auth Override

Admin panels (Filament, Voyager) ship with their own authentication system. Larafast **automatically disables** Breeze/Jetstream when an admin panel is selected:

```
Admin panel selected: Filament
Authentication scaffolding will be skipped because the admin panel includes its own auth system.
```

The `auth` field in the final config will be `"None"`.

---

## 🗂 Project Structure

```
larafast/
├── bin/
│   └── larafast.js              # CLI entry point (Commander.js)
├── src/
│   ├── commands/
│   │   ├── new.js               # `larafast new` command
│   │   └── doctor.js            # `larafast doctor` command
│   ├── core/
│   │   ├── engine/
│   │   │   └── pipelineEngine.js        # Sequential step runner (ora)
│   │   ├── pipeline/
│   │   │   ├── pipelineBuilder.js       # Builds step array from config
│   │   │   ├── compatibilityChecker.js  # Module conflict detection
│   │   │   └── configResolver.js        # Laravel version resolution
│   │   └── wizard/
│   │       └── projectWizard.js         # @inquirer/prompts wizard
│   ├── modules/
│   │   ├── core/
│   │   │   └── laravelInstall.js
│   │   ├── auth/
│   │   │   ├── breezeInstall.js
│   │   │   └── jetstreamInstall.js
│   │   ├── database/
│   │   │   ├── mysqlConfig.js
│   │   │   ├── postgresConfig.js
│   │   │   ├── sqliteConfig.js
│   │   │   └── databaseReadyCheck.js
│   │   ├── frontend/
│   │   │   ├── bladeSetup.js
│   │   │   ├── reactSetup.js
│   │   │   └── vueSetup.js
│   │   ├── admin/
│   │   │   ├── filamentInstall.js
│   │   │   └── voyagerInstall.js
│   │   ├── docker/
│   │   │   └── dockerSetup.js
│   │   ├── git/
│   │   │   └── gitInit.js
│   │   ├── meta/
│   │   │   ├── breeze.json
│   │   │   ├── jetstream.json
│   │   │   ├── filament.json
│   │   │   └── voyager.json
│   │   └── utils/
│   │       └── spawnAsync.js            # Cross-platform spawn helper
│   └── presets/
│       ├── basic.json
│       ├── saas.json
│       └── api.json
├── package.json
└── github_read.md
```

---

## 🧰 Adding a New Module

1. Create `src/modules/<category>/<name>.js`:

```js
const { spawnAsync } = require("../utils/spawnAsync");

async function run(context) {
  const cwd = context.projectName;
  await spawnAsync("composer", ["require", "vendor/package"], {
    cwd,
    spinner: context.spinner,
    shell: true,
  });
}

module.exports = { run };
```

2. Add a metadata file `src/modules/meta/<name>.json`:

```json
{
  "name": "mymodule",
  "category": "admin",
  "supportsLaravel": ["11", "12"],
  "requires": ["database"],
  "conflicts": []
}
```

3. Register in `src/core/engine/pipelineEngine.js`:

```js
const moduleHandlers = {
  // ...existing
  "my-step-id": require("../../modules/category/myModule"),
};
```

4. Add to `src/core/pipeline/pipelineBuilder.js`:

```js
if (config.myOption === "MyValue") {
  steps.push({ id: "my-step-id", description: "Install my module" });
}
```

---

## 🔧 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `commander` | ^14.0.0 | CLI argument parsing |
| `@inquirer/prompts` | ^7.5.1 | Interactive wizard prompts |
| `ora` | ^5.4.1 | Terminal spinner (CommonJS compatible) |
| `mysql2` | ^3.19.1 | MySQL connection testing |
| `pg` | ^8.20.0 | PostgreSQL connection testing |

---

## 🌍 Cross-Platform Support

Larafast runs on **Windows**, **macOS**, and **Linux**.

All subprocess calls use `shell: true` to ensure `.cmd` and `.bat` shims are resolved correctly on Windows:

```js
// ✅ Works on all platforms
spawnAsync("composer", ["require", "..."], { shell: true, cwd });
spawnAsync("npm", ["install"], { shell: true, cwd });
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a Pull Request

---

## ⭐ Support

If you find Larafast useful, please consider giving the repository a star on GitHub.
It helps the project grow and reach more Laravel developers.

[![GitHub stars](https://img.shields.io/github/stars/rakaya07/larafast?style=social)](https://github.com/rakaya07/larafast)

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for the Laravel community

**[⬆ Back to top](#-larafast)**

</div>
