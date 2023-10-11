# TypeScript with Unit Test (Jest)

> This is a small poc on how to create a TypeScript project with unit test using Jest

## Steps:

1. Create project folder structure.
```shell
mkdir ts-jest-poc
cd ts-jest-poc
mkdir src
mkdir test
```

2. Start node project (creates the package.json)
```shell
npm init -y
```

3. Install jest
```shell
npm i -D typescript jest ts-jest @types/jest
```

4. Configure typescrypt (creates the tsconfig.json)
```shell
npx tsc --init
```

5. Add configs to the `tsconfig.json`
```json
"rootDir": "./src",
"outDir": "./dist",
"sourceMap": true
```

6. Set how to run project on `package.json`
```json
"scripts": {
    "start": "node --loader ts-node/esm src/index.ts",
},
```

7. Configure jest (Creates the jest.config.js)
```shell
npx ts-jest config:init
```

8. Set how to run tests on project on `package.json`
```json
"scripts": {
    "test": "jest"
},
```
