# GitHub Scrapping POC

Small TypeScript CLI that fetches your recent GitHub commit activity.

It answers:

- How many commits did I make in the last N days?
- Which repositories had commits from me in that period?
- Which project folders were touched by those commits?

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```env
GITHUB_TOKEN=github_pat_your_token_here
GITHUB_USERNAME=your_github_username
GITHUB_DAYS=7
```

Token access:

- Public repos only: a fine-grained token with public metadata access is enough.
- Private repos: include read access to the repositories you want to inspect.

## Run

```bash
npm start
```

You can also pass flags:

```bash
npm start -- --days 14 --username your_github_username
```

## Output

```txt
GitHub activity for gabrielSpassos since 2026-06-11T12:26:35.267Z

Commits found: 39

Repositories:
- gabrielSpassos/java-sandbox: 30 commits
- gabrielSpassos/ai-sandbox: 7 commits
- codegik/team-red: 2 commits

Touched projects:
- https://github.com/gabrielSpassos/java-sandbox/tree/master/spring-cassandra-poc: 38 files
- https://github.com/gabrielSpassos/java-sandbox/tree/master/yaml-code-generator-poc: 29 files
- https://github.com/gabrielSpassos/ai-sandbox/tree/main/clustering-objects-poc: 18 files
- https://github.com/gabrielSpassos/java-sandbox/tree/master/outbox-jdbc-connector-poc: 16 files
- https://github.com/gabrielSpassos/ai-sandbox/tree/main/clustering-visual-poc: 11 files
- https://github.com/gabrielSpassos/java-sandbox/tree/master/todo-list: 9 files
- https://github.com/codegik/team-red/tree/main/engineering/segment-tree: 2 files
```
