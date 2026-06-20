import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export type AppConfig = {
  token: string;
  username: string;
  days: number;
};

type CliOptions = {
  username?: string;
  days?: number;
};

export function loadConfig(argv: string[] = process.argv.slice(2)): AppConfig {
  loadDotEnv();

  const cliOptions = parseCliOptions(argv);
  const token = process.env.GITHUB_TOKEN;
  const username = cliOptions.username ?? process.env.GITHUB_USERNAME;
  const days = cliOptions.days ?? parsePositiveInteger(process.env.GITHUB_DAYS, 7);

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN. Create a .env file or export it in your shell.");
  }

  if (!username) {
    throw new Error("Missing GITHUB_USERNAME. Create a .env file, export it, or pass --username.");
  }

  return {
    token,
    username,
    days
  };
}

function loadDotEnv(): void {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = stripQuotes(rawValue);

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function parseCliOptions(argv: string[]): CliOptions {
  const options: CliOptions = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--username" || arg === "-u") {
      options.username = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--username=")) {
      options.username = arg.slice("--username=".length);
      continue;
    }

    if (arg === "--days" || arg === "-d") {
      options.days = parsePositiveInteger(argv[index + 1], 7);
      index += 1;
      continue;
    }

    if (arg.startsWith("--days=")) {
      options.days = parsePositiveInteger(arg.slice("--days=".length), 7);
    }
  }

  return options;
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}
