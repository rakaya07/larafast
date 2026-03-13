# Larafast AI Agents Guide

This document defines the development rules for AI agents and contributors working on the Larafast project.

Larafast is a modular CLI tool designed to automate Laravel project setup.

AI agents must follow these rules to ensure code quality, stability, and consistency.

---

# Core Philosophy

Larafast must always prioritize:

- Stability
- Predictable installations
- Clear dependency management
- Modular architecture
- Safe execution

Agents must never implement shortcuts that bypass system validation.

---

# Architecture Awareness

Before generating code, agents must understand the project architecture defined in:

docs/ARCHITECTURE.md

All implementations must respect the system layers:

CLI Layer  
Command Layer  
Core Engine  
Module System  
Service Layer

Agents must never mix responsibilities between layers.

---

# Module-Based Development

Larafast is built around modules.

Each installable feature must be implemented as a module.

Examples:

- Laravel install
- Database setup
- Breeze install
- Tailwind setup
- Docker setup
- Filament install

Modules must remain isolated and reusable.

---

# Dependency Rules

Agents must respect module dependencies.

Example:

Breeze requires Laravel to be installed first.

Database migrations must never run before database connection validation.

Modules must declare dependencies clearly.

Agents must ensure dependencies are satisfied before execution.

---

# Conflict Detection

Some modules cannot coexist.

Examples:

Breeze + Jetstream  
Filament + Voyager  

Agents must implement conflict detection before module execution.

If a conflict exists, installation must stop with a clear message.

---

# Environment Validation

Before executing any installation step, agents must validate environment requirements.

Examples:

PHP version compatibility  
Composer availability  
Node and npm availability  
Docker availability (if Docker is selected)  
Database connection validity

Agents must never assume environment readiness.

---

# Safe Installation Flow

Installations must follow a predictable order.

Environment check

Laravel installation

Environment configuration

Database configuration

Module installation

Frontend build

Migration execution

Optimization

Agents must not break this flow.

---

# Error Handling

All operations must include proper error handling.

If an installation step fails:

- The error must be reported clearly
- The process must stop safely
- Partial installations must not leave the project in a broken state

Agents must never ignore installation failures.

---

# Code Quality Standards

Generated code must follow these standards:

- Clear structure
- Descriptive naming
- Small focused functions
- No unnecessary complexity
- No hidden side effects

Agents must prioritize maintainability.

---

# CLI Interaction

Larafast CLI must remain simple and predictable.

Example commands:

larafast new project
larafast doctor
larafast install filament

Agents must not introduce confusing command structures.

---

# Documentation Responsibility

Whenever a new module or system feature is introduced:

Agents must update the documentation inside the docs directory.

Modules must have clear documentation.

---

# Forbidden Practices

Agents must never:

- Hardcode environment assumptions
- Skip dependency checks
- Ignore installation errors
- Install unnecessary packages
- Break modular architecture

---

# Development Goal

Larafast aims to become a reliable Laravel installation tool that developers trust.

Agents must prioritize reliability over speed.

Stability is always more important than automation speed.