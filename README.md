<div align="center">

<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">

# Larafast

CLI tool to scaffold Laravel projects instantly with a guided setup wizard.

[![npm version](https://img.shields.io/npm/v/larafast?style=flat-square)](https://npmjs.com/package/larafast)
[![Downloads](https://img.shields.io/npm/dm/larafast?style=flat-square)](https://npmjs.com/package/larafast)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=flat-square)]()
[![GitHub stars](https://img.shields.io/github/stars/rakaya07/larafast?style=flat-square)](https://github.com/rakaya07/larafast)

</div>

---

## Installation

Install globally:

```bash
npm install -g larafast
```

Or run directly with npx:

```bash
npx larafast new my-project
```

---

## Usage

Create a new Laravel project:

```bash
larafast new blog
```

Run environment diagnostics:

```bash
larafast doctor
```

---

## Features

- Interactive project wizard
- Laravel installer automation
- Database configuration (MySQL, PostgreSQL, SQLite)
- Auth system setup (Breeze / Jetstream)
- Admin panels (Filament / Voyager)
- Docker setup
- Git initialization
- Cross-platform (Windows, macOS, Linux)

---

## Example

```bash
larafast new saas-app
```

```
Creating Laravel project: saas-app

? Auth system:        › Breeze
? Frontend stack:     › React
? Database:           › MySQL
? Admin panel:        › None
? Docker setup?       › No
? Initialize Git?     › Yes

Pipeline steps:
  1. laravel-install   — Install Laravel project using composer
  2. database-mysql    — Configure MySQL database
  3. auth-breeze       — Install Laravel Breeze
  4. frontend-react    — Set up React with Vite
  5. git-init          — Initialize Git repository

✔ Install Laravel project using composer
✔ Configure MySQL database
✔ Install Laravel Breeze
✔ Set up React with Vite
✔ Initialize Git repository
```

---

## Demo

> Add a terminal demo GIF here later.

![Larafast demo](assets/demo.gif)

---

## Prerequisites

Check your environment before running:

```bash
larafast doctor
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

## Commands

### `larafast new <project-name>`

Creates a new Laravel project with the selected configuration.

```bash
# Interactive wizard
larafast new blog

# With flags — skips matching prompts
larafast new blog --breeze --react --mysql --git

# Using a preset
larafast new blog --preset saas
```

### `larafast doctor`

Checks your environment for all required tools.

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

---

## CLI Flags

Skip the wizard by passing flags directly. Mix and match — only unanswered questions will be prompted.

### Auth

| Flag | Description |
|------|-------------|
| `--breeze` | Install Laravel Breeze (lightweight auth scaffold) |
| `--jetstream` | Install Laravel Jetstream (full-featured auth + teams) |

> Breeze and Jetstream are mutually exclusive.

### Frontend

| Flag | Description |
|------|-------------|
| `--blade` | Blade templating (Laravel default) |
| `--react` | React with Vite |
| `--vue` | Vue 3 with Vite |

### Database

| Flag | Description |
|------|-------------|
| `--mysql` | MySQL (localhost:3306) |
| `--postgres` | PostgreSQL (localhost:5432) |
| `--sqlite` | SQLite (file-based, zero config) |

### Admin Panel

| Flag | Description | Laravel Version |
|------|-------------|-----------------|
| `--filament` | Filament v3 admin panel | 10, 11, 12 |
| `--voyager` | Voyager admin panel | 10 only |

### Extras

| Flag | Description |
|------|-------------|
| `--docker` | Generate `docker-compose.yml`, `Dockerfile`, Nginx config |
| `--git` | Initialize Git repo with initial commit |
| `--preset <name>` | Load a pre-defined configuration (`basic`, `saas`, `api`) |

---

## Presets

```bash
larafast new blog --preset basic    # Prompts: auth, frontend, database, admin
larafast new blog --preset saas    # No prompts — fully configured
larafast new blog --preset api     # Prompts: frontend, admin
```

**saas preset:**
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

---

## Architecture

```
bin/larafast.js
    │
    ├── src/commands/new.js
    │       ├── Wizard (projectWizard.js)
    │       ├── Compatibility checker
    │       ├── Config resolver (Laravel version)
    │       └── Pipeline builder
    │               │
    │               └── Pipeline engine (ora spinner)
    │                       │
    │                       └── Modules
    │                           laravel │ database │ auth │ frontend │ admin │ docker │ git
    │
    └── src/commands/doctor.js
```

---

## Project Structure

```
larafast/
├── bin/
│   └── larafast.js
├── src/
│   ├── commands/
│   │   ├── new.js
│   │   └── doctor.js
│   ├── core/
│   │   ├── engine/pipelineEngine.js
│   │   ├── pipeline/
│   │   │   ├── pipelineBuilder.js
│   │   │   ├── compatibilityChecker.js
│   │   │   └── configResolver.js
│   │   └── wizard/projectWizard.js
│   ├── modules/
│   │   ├── core/laravelInstall.js
│   │   ├── auth/
│   │   ├── database/
│   │   ├── frontend/
│   │   ├── admin/
│   │   ├── docker/
│   │   ├── git/
│   │   └── utils/spawnAsync.js
│   └── presets/
│       ├── basic.json
│       ├── saas.json
│       └── api.json
└── package.json
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `commander` | ^14.0.0 | CLI argument parsing |
| `@inquirer/prompts` | ^7.5.1 | Interactive wizard prompts |
| `ora` | ^5.4.1 | Terminal spinner |
| `mysql2` | ^3.19.1 | MySQL connection testing |
| `pg` | ^8.20.0 | PostgreSQL connection testing |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a Pull Request

---

## Repository

[https://github.com/rakaya07/larafast](https://github.com/rakaya07/larafast)

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for the Laravel community

**[Back to top](#larafast)**

</div>
