import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts"
  ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],

  testMatch: [
    "**/*.test.tsx"
  ]
};

export default config;