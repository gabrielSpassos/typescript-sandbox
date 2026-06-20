export type Repository = {
  full_name: string;
  owner: {
    login: string;
  };
  name: string;
  fork: boolean;
  archived: boolean;
  default_branch?: string;
};

export type CommitSearchItem = {
  sha: string;
  repository: Repository;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
};

export type CommitSearchResponse = {
  total_count: number;
  items: CommitSearchItem[];
};

export type CommitDetail = {
  sha: string;
  files?: Array<{
    filename: string;
  }>;
};

export type RepositoryDetail = Repository & {
  default_branch: string;
};

type GitHubClientOptions = {
  token: string;
};

export class GitHubClient {
  private readonly token: string;
  private readonly baseUrl = "https://api.github.com";

  constructor(options: GitHubClientOptions) {
    this.token = options.token;
  }

  async searchCommits(username: string, since: Date): Promise<CommitSearchItem[]> {
    const query = `author:${username} author-date:>=${toDateOnly(since)}`;
    const items: CommitSearchItem[] = [];

    for (let page = 1; page <= 10; page += 1) {
      const response = await this.get<CommitSearchResponse>("/search/commits", {
        q: query,
        sort: "author-date",
        order: "desc",
        per_page: "100",
        page: String(page)
      });

      items.push(...response.items);

      if (response.items.length < 100) {
        break;
      }
    }

    return items;
  }

  async getCommit(owner: string, repo: string, sha: string): Promise<CommitDetail> {
    return this.get<CommitDetail>(`/repos/${owner}/${repo}/commits/${sha}`);
  }

  async getRepository(owner: string, repo: string): Promise<RepositoryDetail> {
    return this.get<RepositoryDetail>(`/repos/${owner}/${repo}`);
  }

  private async get<T>(path: string, query?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    for (const [key, value] of Object.entries(query ?? {})) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "User-Agent": "github-scrapping-poc",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`GitHub API failed: ${response.status} ${response.statusText} ${body}`);
    }

    return response.json() as Promise<T>;
  }
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}
