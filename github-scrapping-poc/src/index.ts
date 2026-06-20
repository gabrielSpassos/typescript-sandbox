import { getActivitySummary } from "./activity.js";
import { loadConfig } from "./config.js";
import { GitHubClient } from "./githubClient.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const client = new GitHubClient({
    token: config.token
  });
  const summary = await getActivitySummary(client, config.username, config.days);

  printSummary(summary);
}

function printSummary(summary: Awaited<ReturnType<typeof getActivitySummary>>): void {
  console.log(`GitHub activity for ${summary.username} since ${summary.since.toISOString()}`);
  console.log("");
  console.log(`Commits found: ${summary.totalCommits}`);
  console.log("");

  console.log("Repositories:");
  if (summary.repositories.length === 0) {
    console.log("- No repositories with commits in this period.");
  } else {
    for (const repo of summary.repositories) {
      console.log(`- ${repo.fullName}: ${repo.commits} ${pluralize(repo.commits, "commit")}`);
    }
  }

  console.log("");
  console.log("Touched projects:");
  if (summary.projects.length === 0) {
    console.log("- No touched projects found.");
  } else {
    for (const project of summary.projects) {
      console.log(`- ${project.path}: ${project.files} ${pluralize(project.files, "file")}`);
    }
  }
}

function pluralize(count: number, singular: string): string {
  return count === 1 ? singular : `${singular}s`;
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
