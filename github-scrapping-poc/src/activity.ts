import { CommitSearchItem, GitHubClient } from "./githubClient.js";

export type RepositorySummary = {
  fullName: string;
  commits: number;
};

export type ProjectSummary = {
  url: string;
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
  const defaultBranches = new Map<string, string>();

  for (const commit of commits) {
    const defaultBranch = await getDefaultBranch(client, commit, defaultBranches);
    const detail = await client.getCommit(
      commit.repository.owner.login,
      commit.repository.name,
      commit.sha
    );

    for (const file of detail.files ?? []) {
      const projectPath = getProjectPath(commit.repository.name, file.filename);
      const projectUrl = toGitHubFolderUrl(
        commit.repository.full_name,
        defaultBranch,
        projectPath
      );
      counts.set(projectUrl, (counts.get(projectUrl) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([url, files]) => ({
      url,
      files
    }))
    .sort((left, right) => right.files - left.files || left.url.localeCompare(right.url));
}

async function getDefaultBranch(
  client: GitHubClient,
  commit: CommitSearchItem,
  defaultBranches: Map<string, string>
): Promise<string> {
  const cached = defaultBranches.get(commit.repository.full_name);

  if (cached) {
    return cached;
  }

  const branch = commit.repository.default_branch ?? await fetchDefaultBranch(client, commit);
  defaultBranches.set(commit.repository.full_name, branch);
  return branch;
}

async function fetchDefaultBranch(client: GitHubClient, commit: CommitSearchItem): Promise<string> {
  const repository = await client.getRepository(
    commit.repository.owner.login,
    commit.repository.name
  );

  return repository.default_branch;
}

function getProjectPath(repositoryName: string, filename: string): string {
  const parts = filename.split("/");

  if (parts.length === 0 || parts[0] === "") {
    return "";
  }

  if (repositoryName.endsWith("-sandbox")) {
    return parts[0];
  }

  return parts.slice(0, 2).join("/");
}

function toGitHubFolderUrl(repositoryFullName: string, branch: string, projectPath: string): string {
  if (!projectPath) {
    return `https://github.com/${repositoryFullName}`;
  }

  const encodedBranch = encodeURIComponent(branch);
  const encodedProjectPath = projectPath
    .split("/")
    .map((pathPart) => encodeURIComponent(pathPart))
    .join("/");

  return `https://github.com/${repositoryFullName}/tree/${encodedBranch}/${encodedProjectPath}`;
}

function daysAgo(days: number): Date {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}
