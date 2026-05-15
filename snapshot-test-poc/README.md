# Snapshot Test POC

* Contract Tests for the Front-End
* Check if the components of the design system are correctly implemented
* Need to have access to the design system
* Should be fast
* Jest is the tool to use
* Coverage
    * what the component implements following the design system

## Architecture

```
frontend-snapshot-poc/
├── src/
│   ├── components/
│   │   └── Button.tsx
│   ├── design-system/
│   │   └── colors.ts
│   └── tests/
│       └── Button.snapshot.test.tsx
├── jest.config.ts
├── jest.setup.ts
├── tsconfig.json
├── package.json
└── babel.config.js
```

## Tests

```
npm test

> snapshot-test-poc@1.0.0 test
> jest

 PASS  src/tests/Button.snapshot.test.tsx
  Button snapshot contract
    ✓ should match component snapshot (38 ms)
    ✓ should respect design system blue color (62 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        2.262 s
Ran all test suites.
```