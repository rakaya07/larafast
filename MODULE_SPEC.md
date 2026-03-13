# Larafast Module Specification

This document defines the official specification for modules used inside Larafast.

All features in Larafast must be implemented as modules following this structure.

Modules allow Larafast to remain scalable, modular, and maintainable.

---

# What is a Module

A module represents a single installable feature.

Examples:

- Laravel installation
- Database configuration
- Breeze authentication
- Tailwind setup
- Docker environment
- Filament admin panel

Each module is responsible only for its own installation logic.

Modules must remain independent and reusable.

---

# Module Responsibilities

Each module must:

- Define its dependencies
- Validate its environment requirements
- Execute its installation steps
- Report installation success or failure

Modules must not perform tasks unrelated to their feature.

---

# Module Structure

Each module must follow this structure.

modules/

module-name/

index.js

config.js

validator.js

installer.js

The purpose of each file:

index.js → module entry point  
config.js → module metadata  
validator.js → environment validation  
installer.js → installation logic

---

# Module Metadata

Each module must declare metadata.

Example:

name  
version  
description  
dependencies  
conflicts

Dependencies define modules that must run before this module.

Conflicts define modules that cannot coexist.

---

# Dependency Declaration

Modules must declare dependencies clearly.

Example:

Breeze module depends on Laravel installation.

Database migration module depends on database configuration.

Larafast will automatically resolve dependency order.

---

# Conflict Declaration

Some modules cannot run together.

Examples:

Breeze + Jetstream  
Filament + Voyager

Modules must declare conflicts explicitly.

Larafast must stop installation when conflicts are detected.

---

# Validation Layer

Before installation begins, modules must validate their requirements.

Examples:

Node installed  
Composer installed  
Database reachable  
Docker available

Validation failures must stop the module execution.

---

# Installation Logic

Installation must follow safe execution rules.

- Each step must be validated
- Errors must stop the process
- No silent failures are allowed

Example installation steps:

composer install  
npm install  
artisan commands  
configuration updates

---

# Logging

Modules must report progress clearly.

Example messages:

Installing Breeze...

Validating database connection...

Running migrations...

Installation complete.

Logs must help developers understand what the tool is doing.

---

# Error Handling

If a module fails:

- The error must be reported clearly
- The installation process must stop
- No silent failures are allowed

Larafast must never leave the project in a broken state.

---

# Module Independence

Modules must not depend on internal logic of other modules.

Interaction must happen only through declared dependencies.

This ensures modules remain maintainable.

---

# Future Compatibility

Modules must be written with extensibility in mind.

Future versions of Larafast may support:

- external modules
- remote module registry
- plugin ecosystem

Module design must remain flexible.

---

# Goal

The goal of this specification is to guarantee that every Larafast module behaves consistently.

Following this specification ensures Larafast remains stable, predictable, and scalable.