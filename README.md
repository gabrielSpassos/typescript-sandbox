# Typescript Sandbox

> Repo with POC's and tests with typescript

### Usage

1. Inside project folder. Create project
```shell
npm init --yes
```

2. Install typescript
```shell
npm i -D typescript ts-node
```

3. Create `tsconfig.json`
```shell
./node_modules/.bin/tsc --init
```

4. Add script to start project under `package.json``
```json
"scripts": {
    "start": "node --loader ts-node/esm index.ts"
},
```

5. Execute project
```shell
npm start
```