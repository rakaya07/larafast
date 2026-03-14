# Larafast

Larafast is a Node.js CLI for quickly bootstrapping Laravel projects with optional features such as auth systems, frontend stacks, databases, admin panels, and Docker support.

## Current Status

This repository currently contains the initial CLI skeleton only.

## Usage

Install dependencies:

```bash
npm install
```

Run locally:

```bash
node bin/larafast.js new blog
```

Run with a preset:

```bash
node bin/larafast.js new blog --preset saas --git=false
```

Expected output:

```bash
Creating Laravel project: blog
```

## Project Structure

```text
larafast/
├─ bin/
│  └─ larafast.js
├─ src/
│  ├─ commands/
│  │  └─ new.js
│  ├─ core/
│  │  ├─ engine/
│  │  ├─ pipeline/
│  │  └─ wizard/
│  └─ modules/
├─ package.json
└─ README.md
```
