# Design Spec: makeform Library Scaffolding

This document describes the tooling, configuration, and structural layout of the `makeform` npm package.

## 1. Project Scaffolding Structure

```text
makeform/
├── src/
│   ├── fields/          # Form fields definitions and components
│   │   └── index.ts
│   ├── schema/          # Schema definitions and builder utilities
│   │   └── index.ts
│   ├── validation/      # Form validation engine
│   │   └── index.ts
│   ├── state/           # State management
│   │   └── index.ts
│   ├── types/           # Type utilities
│   │   └── index.ts
│   └── index.ts         # Main entry point (exports everything)
├── test/
│   └── index.test.ts    # Placeholder test to verify Vitest works
├── .github/
│   └── workflows/
│       └── ci.yml       # GitHub Actions workflow
├── tsconfig.json        # TS Compiler configuration
├── tsup.config.ts       # Bundler configuration
├── vitest.config.ts     # Vitest configuration
├── eslint.config.js     # ESLint Flat configuration
├── .prettierrc          # Prettier configuration
├── README.md            # Library overview
└── package.json         # Dependencies and scripts
```

## 2. Tooling and Configurations

### A. TypeScript (`tsconfig.json`)

- Target: `ES2022`
- Module: `ESNext`
- Module Resolution: `Bundler`
- Output directory: `./dist`
- Code strictness:
  - `"strict": true`
  - `"noUncheckedIndexedAccess": true`
  - `"skipLibCheck": true`

### B. Bundler (`tsup.config.ts`)

- Uses `tsup` to compile `src/index.ts`.
- Generates both ESM (`.js`) and CJS (`.cjs`) builds.
- Generates `.d.ts` declaration files automatically (`dts: true`).
- Cleans the output directory before build (`clean: true`).
- Sourcemaps enabled for easier debugging (`sourcemap: true`).

### C. Linter & Formatter (`eslint.config.js` & `.prettierrc`)

- **ESLint**: Utilizes the modern Flat Config format (`eslint.config.js`). It integrates `@eslint/js` and `typescript-eslint` recommended config.
- **Prettier**: A basic, clean code style configuration.

### D. Testing (`vitest.config.ts`)

- Setup `vitest` for running test suites.
- Include a placeholder test in `test/index.test.ts`.

### E. GitHub Actions CI (`.github/workflows/ci.yml`)

- Automatically runs on pushes and pull requests to `main` branch.
- Runs on Node 20 and Node 22.
- Step sequence:
  1. Checkout repository.
  2. Setup Node.js.
  3. Install dependencies (`npm ci`).
  4. Run linter (`npm run lint`).
  5. Run typecheck (`npm run typecheck`).
  6. Run tests (`npm run test`).
  7. Run build (`npm run build`).

## 3. Package Scripts

```json
{
  "build": "tsup",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write ."
}
```
