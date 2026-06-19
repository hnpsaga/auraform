# makeform Library Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure modern library tooling (TypeScript, tsup, ESLint, Prettier, Vitest, CI) and set up the directory structure for future development.

**Architecture:** Initialize configuration files, install minimal required dependencies, set up standard scripts, and run validation verification.

**Tech Stack:** Node 20+, TypeScript strict, tsup, ESLint (Flat Config), Prettier, Vitest, GitHub Actions CI.

---

### Task 1: TypeScript Setup

**Files:**

- Modify: `tsconfig.json`

- [ ] **Step 1: Write strict-mode Node 20+ config to tsconfig.json**

Overwrite `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- [ ] **Step 2: Commit TypeScript setup**

Run:

```bash
git add tsconfig.json
git commit -m "chore: configure tsconfig.json for strict library development"
```

---

### Task 2: Dependencies and Scripts Setup

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install dev dependencies**

Run the following command to install Prettier, ESLint flat config helpers, and Vitest:

```bash
npm install -D prettier eslint typescript-eslint @eslint/js vitest
```

- [ ] **Step 2: Update package.json scripts and module exports**

Modify `package.json` to ensure scripts, type, and exports match target requirements.
The `package.json` file should look like this:

```json
{
  "name": "@hnpsaga/makeform",
  "version": "0.0.1",
  "description": "Lightweight schema-driven form library for React with strong TypeScript type inference.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hnpsaga/makeform.git"
  },
  "homepage": "https://github.com/hnpsaga/makeform#readme",
  "bugs": {
    "url": "https://github.com/hnpsaga/makeform/issues"
  },
  "license": "MIT",
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/node": "^25.9.3",
    "eslint": "^9.21.0",
    "prettier": "^3.5.2",
    "tsup": "^8.5.1",
    "typescript": "5.9",
    "typescript-eslint": "^8.24.1",
    "vitest": "^3.0.7"
  },
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  },
  "files": ["dist"],
  "author": "Hari Naga Praveen Saga",
  "keywords": ["react", "forms", "typescript", "schema", "validation", "form-builder"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

- [ ] **Step 3: Commit package.json changes**

Run:

```bash
git add package.json package-lock.json
git commit -m "chore: add dev dependencies and package scripts"
```

---

### Task 3: Prettier Setup

**Files:**

- Create: `.prettierrc`
- Create: `.prettierignore`

- [ ] **Step 1: Create Prettier configuration**

Create `.prettierrc` with:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

- [ ] **Step 2: Create Prettier ignore configuration**

Create `.prettierignore` with:

```text
dist
node_modules
package-lock.json
```

- [ ] **Step 3: Commit Prettier setup**

Run:

```bash
git add .prettierrc .prettierignore
git commit -m "chore: configure prettier"
```

---

### Task 4: ESLint Setup

**Files:**

- Create: `eslint.config.js`

- [ ] **Step 1: Create modern Flat config for ESLint**

Create `eslint.config.js` with:

```javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
```

- [ ] **Step 2: Commit ESLint setup**

Run:

```bash
git add eslint.config.js
git commit -m "chore: configure eslint flat config"
```

---

### Task 5: Vitest Setup

**Files:**

- Create: `vitest.config.ts`
- Create: `test/index.test.ts`

- [ ] **Step 1: Create Vitest config file**

Create `vitest.config.ts` with:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: Create a placeholder test**

Create `test/index.test.ts` with:

```typescript
import { expect, test } from 'vitest';
import { version } from '../src/index.ts';

test('library version is defined', () => {
  expect(version).toBe('0.0.1');
});
```

- [ ] **Step 3: Commit Vitest setup**

Run:

```bash
git add vitest.config.ts test/index.test.ts
git commit -m "test: configure vitest and add placeholder test"
```

---

### Task 6: GitHub Actions CI Setup

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create workflow file**

Create `.github/workflows/ci.yml` with:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x, 22.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Format Check
        run: npx prettier --check .

      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      - name: Run Tests
        run: npm run test

      - name: Build
        run: npm run build
```

- [ ] **Step 2: Commit GitHub Actions workflow**

Run:

```bash
git add .github/workflows/ci.yml
git commit -m "chore: add github actions ci workflow"
```

---

### Task 7: Source Structure Setup

**Files:**

- Create: `src/fields/index.ts`
- Create: `src/schema/index.ts`
- Create: `src/validation/index.ts`
- Create: `src/state/index.ts`
- Create: `src/types/index.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Create subfolder index files**

Create `src/fields/index.ts` with:

```typescript
export interface Field {
  name: string;
  type: string;
}
```

Create `src/schema/index.ts` with:

```typescript
export interface FormSchema {
  fields: Record<string, unknown>;
}
```

Create `src/validation/index.ts` with:

```typescript
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
```

Create `src/state/index.ts` with:

```typescript
export interface FormState {
  values: Record<string, unknown>;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}
```

Create `src/types/index.ts` with:

```typescript
export type FormValues = Record<string, unknown>;
```

- [ ] **Step 2: Update main entry point exporting everything**

Modify `src/index.ts` to export these subsystems:

```typescript
export const version = '0.0.1';

export * from './fields/index.js';
export * from './schema/index.js';
export * from './validation/index.js';
export * from './state/index.js';
export * from './types/index.js';
```

- [ ] **Step 3: Commit source structure**

Run:

```bash
git add src/
git commit -m "feat: scaffold source directory structure and placeholder exports"
```

---

### Task 8: Verification

- [ ] **Step 1: Run format check**

Run: `npx prettier --check .`
Expected: Passes formatting check.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: Passes ESLint with no errors.

- [ ] **Step 3: Run type check**

Run: `npm run typecheck`
Expected: Passes with no type errors.

- [ ] **Step 4: Run unit tests**

Run: `npm run test`
Expected: Placeholder test passes.

- [ ] **Step 5: Run build**

Run: `npm run build`
Expected: Builds without errors, creating ESM (`.js`) and CommonJS (`.cjs`) builds along with type declaration files inside `dist/`.
