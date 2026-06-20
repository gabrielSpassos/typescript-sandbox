import { CommitSearchItem, GitHubClient } from "./githubClient.js";

export type RepositorySummary = {
  fullName: string;
  commits: number;
};

export type ProjectSummary = {
  path: string;
  files: number;
};

export type ActivitySummary = {
  username: string;
  since: Date;
  totalCommits: number;
  repositories: RepositorySummary[];
  projects: ProjectSummary[];
};

export async function getActivitySummary(
  client: GitHubClient,
  username: string,
  days: number
): Promise<ActivitySummary> {
  const since = daysAgo(days);
  const commits = (await client.searchCommits(username, since)).filter((commit) => {
    return new Date(commit.commit.author.date) >= since;
  });
  const repositories = summarizeRepositories(commits);
  const projects = await summarizeTouchedProjects(client, commits);

  return {
    username,
    since,
    totalCommits: commits.length,
    repositories,
    projects
  };
}

function summarizeRepositories(commits: CommitSearchItem[]): RepositorySummary[] {
  const counts = new Map<string, number>();

  for (const commit of commits) {
    const repo = commit.repository.full_name;
    counts.set(repo, (counts.get(repo) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([fullName, commitCount]) => ({
      fullName,
      commits: commitCount
    }))
    .sort((left, right) => right.commits - left.commits || left.fullName.localeCompare(right.fullName));
}

async function summarizeTouchedProjects(
  client: GitHubClient,
  commits: CommitSearchItem[]
): Promise<ProjectSummary[]> {
  const counts = new Map<string, number>();

  for (const commit of commits) {
    const detail = await client.getCommit(
      commit.repository.owner.login,
      commit.repository.name,
      commit.sha
    );

    for (const file of detail.files ?? []) {
      const projectPath = getProjectPath(commit.repository.full_name, file.filename);
      counts.set(projectPath, (counts.get(projectPath) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([path, files]) => ({
      path,
      files
    }))
    .sort((left, right) => right.files - left.files || left.path.localeCompare(right.path));
}

function getProjectPath(repositoryFullName: string, filename: string): string {
  const repositoryName = repositoryFullName.split("/").at(-1) ?? repositoryFullName;
  const parts = filename.split("/");

  if (parts.length === 0 || parts[0] === "") {
    return repositoryFullName;
  }

  if (repositoryName.endsWith("-sandbox")) {
    return `${repositoryFullName}/${parts[0]}`;
  }

  return `${repositoryFullName}/${parts.slice(0, 2).join("/")}`;
}

function daysAgo(days: number): Date {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}
