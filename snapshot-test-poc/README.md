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