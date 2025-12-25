# CI/CD Documentation

This document provides detailed information about the CI/CD pipeline for the Nexus Command project.

## Overview

The project uses GitHub Actions for a comprehensive CI/CD pipeline that includes:

- **Continuous Integration**: Automated testing, linting, and security scanning
- **Continuous Deployment**: Docker image building and publishing to GHCR
- **Release Management**: Automated release creation and versioning
- **Issue Automation**: Bot-generated issues and automatic PR conversion

## Workflows

### 1. Playwright Tests (`playwright.yml`)

**Purpose**: Run end-to-end tests to ensure UI functionality

**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main`
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Install dependencies with `--legacy-peer-deps`
4. Install Playwright browsers
5. Build the project
6. Run Playwright test suite
7. Upload test reports and screenshots

**Artifacts**:
- `playwright-report/`: Full test report (30 days retention)
- `test-screenshots/`: Screenshots of failed tests (7 days retention)

**PR Integration**: Comments test results directly on pull requests

### 2. Build & Lint (`build.yml`)

**Purpose**: Verify code quality and buildability

**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main`
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Run ESLint
5. Build Next.js production bundle
6. Upload build artifacts

**Artifacts**:
- `build-output/`: Production build files (7 days retention)

### 3. CodeQL Security Analysis (`codeql.yml`)

**Purpose**: Static code analysis for security vulnerabilities

**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main`
- Weekly schedule (Mondays at midnight UTC)
- Manual workflow dispatch

**Languages**: JavaScript/TypeScript

**Queries**: Security-extended and security-and-quality suites

**Steps**:
1. Initialize CodeQL with security queries
2. Build the project
3. Analyze code for vulnerabilities
4. Upload results to GitHub Security tab

**Viewing Results**: Check the Security tab in your repository

### 4. Dependency Review (`dependency-review.yml`)

**Purpose**: Check for vulnerabilities in dependencies

**Triggers**:
- Pull requests to `main`

**Configuration**:
- Fail on: Moderate severity or higher
- Comments: Always post summary in PR

**Action**: Blocks PRs with vulnerable dependencies

### 5. Docker Build & Publish (`docker-publish.yml`)

**Purpose**: Build and publish Docker images to GHCR

**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main` (build only, no push)
- Tags matching `v*.*.*` pattern
- Manual workflow dispatch

**Image Registry**: `ghcr.io/johndoe6345789/nexus-command`

**Tagging Strategy**:
- Branch names: `main`, `dev`
- Pull requests: `pr-123`
- Semantic versions: `v1.0.0`, `v1.0`, `v1`
- Commit SHA: `main-abc1234`
- Latest: Applied to main branch only

**Platforms**: 
- linux/amd64
- linux/arm64

**Features**:
- Multi-stage Docker build for optimization
- Build cache using GitHub Actions cache
- Artifact attestation for supply chain security

**Permissions Required**:
- `contents: read`
- `packages: write`
- `id-token: write`

### 6. Release Workflow (`release.yml`)

**Purpose**: Create GitHub releases with artifacts

**Triggers**:
- Tags matching `v*.*.*` pattern
- Manual workflow dispatch with version input

**Steps**:
1. Extract version from tag or input
2. Generate changelog from git commits
3. Create GitHub release with notes
4. Build production artifacts
5. Create tarball of build output
6. Upload release asset
7. Build and push Docker images with version tags

**Outputs**:
- GitHub Release with changelog
- Build archive: `nexus-command-vX.Y.Z.tar.gz`
- Docker images: `ghcr.io/johndoe6345789/nexus-command:vX.Y.Z`

**Release Notes**: Automatically generated from commits since last tag

### 7. Deployment Workflow (`deploy.yml`)

**Purpose**: Deploy to staging or production environments

**Triggers**:
- Manual workflow dispatch only

**Inputs**:
- `environment`: staging or production
- `version`: Docker image tag to deploy

**Steps**:
1. Create GitHub deployment
2. Set status to in-progress
3. Pull and deploy Docker image
4. Run health checks
5. Update deployment status
6. Notify results

**Environments**: Configure in repository settings
- `staging`: For testing before production
- `production`: Live environment

**Note**: This workflow contains placeholder deployment logic. Customize the "Simulate deployment" step with your actual infrastructure (Kubernetes, ECS, VMs, etc.)

### 8. Auto-Create Issues (`auto-create-issues.yml`)

**Purpose**: Automatically create maintenance and improvement tasks

**Triggers**:
- Daily schedule at 9 AM UTC
- Manual workflow dispatch with task type selection

**Task Types**:
- `maintenance`: Dependency updates, code cleanup
- `documentation`: API docs, README updates
- `testing`: Test coverage improvements
- `refactoring`: Code quality improvements

**Limits**: 
- Maximum 5 open bot-created issues at a time
- Random task selection for variety

**Labels**: 
- `bot-created`: Identifies bot-generated issues
- `needs-review`: Requires maintainer approval
- Task-specific labels (e.g., `testing`, `documentation`)

### 9. Issue to PR Conversion (`issue-to-pr.yml`)

**Purpose**: Convert approved bot issues to pull requests

**Triggers**:
- Issue labeled with `approved`
- Only for issues with `bot-created` label

**Steps**:
1. Create branch: `bot/issue-{number}`
2. Create pull request linked to issue
3. Add labels: `bot-generated`, `needs-implementation`
4. Comment on original issue with PR link

**Branch Naming**: `bot/issue-{issue_number}`

**PR Body**: Includes original issue content and implementation instructions

### 10. Issue Lifecycle Management (`issue-lifecycle.yml`)

**Purpose**: Manage bot-created issue lifecycle

**Triggers**:
- Issue opened, labeled, unlabeled, or closed
- Comments on issues

**Features**:

1. **Auto-labeling**: New bot issues get `bot-created` and `needs-review` labels

2. **Approval Instructions**: Comments with approval steps on new bot issues

3. **Approval Notification**: Confirms when issue is approved for implementation

4. **Stale Detection**: 
   - After 7 days: Adds `stale` label and warning comment
   - After 14 days: Automatically closes with explanation

5. **Cleanup**: Keeps issue queue manageable

## Docker Image Usage

### Pulling Images

```bash
# Latest version from main branch
docker pull ghcr.io/johndoe6345789/nexus-command:latest

# Specific version
docker pull ghcr.io/johndoe6345789/nexus-command:v1.0.0

# Development branch
docker pull ghcr.io/johndoe6345789/nexus-command:dev
```

### Running Containers

```bash
# Run on port 8080
docker run -d -p 8080:80 ghcr.io/johndoe6345789/nexus-command:latest

# Run with custom name
docker run -d -p 8080:80 --name nexus-command ghcr.io/johndoe6345789/nexus-command:latest

# Run with health check
docker run -d -p 8080:80 \
  --health-cmd "curl -f http://localhost/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  ghcr.io/johndoe6345789/nexus-command:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  nexus-command:
    image: ghcr.io/johndoe6345789/nexus-command:latest
    ports:
      - "8080:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Release Process

### Creating a New Release

1. **Prepare Changes**:
   ```bash
   git checkout dev
   git pull origin dev
   # Make and commit your changes
   ```

2. **Merge to Main**:
   ```bash
   git checkout main
   git pull origin main
   git merge dev
   git push origin main
   ```

3. **Create Version Tag**:
   ```bash
   # Follow semantic versioning: major.minor.patch
   git tag v1.0.0
   git push origin v1.0.0
   ```

4. **Automatic Release**: The release workflow will:
   - Generate changelog
   - Create GitHub release
   - Build and upload artifacts
   - Push Docker images with version tags

5. **Verify Release**:
   - Check the Releases page
   - Pull and test Docker image
   - Review changelog

### Semantic Versioning

- **Major** (v2.0.0): Breaking changes
- **Minor** (v1.1.0): New features, backward compatible
- **Patch** (v1.0.1): Bug fixes, backward compatible

## Bot Issue Management

### How It Works

1. **Creation Phase**:
   - Bot creates issue with `[BOT]` prefix
   - Auto-labeled: `bot-created`, `needs-review`
   - Comment with approval instructions

2. **Review Phase**:
   - Maintainer reviews issue
   - Edit issue if needed
   - Add `approved` label when ready

3. **Conversion Phase**:
   - Automatic branch creation
   - PR created and linked to issue
   - Labels: `bot-generated`, `needs-implementation`

4. **Implementation Phase**:
   - Developer checks out PR branch
   - Implements required changes
   - Commits to PR branch

5. **Completion Phase**:
   - PR reviewed and approved
   - Merged to main
   - Original issue auto-closed

### Managing Bot Issues

**Approve an issue**:
```bash
# Via GitHub UI: Add "approved" label to the issue
# Or via gh CLI:
gh issue edit 123 --add-label "approved"
```

**Close unwanted issues**:
```bash
gh issue close 123 --reason "not planned"
```

**Create bot issue manually**:
```bash
# Go to: Actions > Auto-Create Issues > Run workflow
# Select task type and click "Run workflow"
```

### Stale Issue Policy

- **After 7 days**: Issue marked as `stale` with warning
- **After 14 days**: Issue automatically closed
- **Reopen**: Remove `stale` label or reopen if closed

## Security

### CodeQL Analysis

CodeQL runs automatically and reports findings in the Security tab.

**Viewing Alerts**:
1. Go to repository Security tab
2. Click "Code scanning alerts"
3. Review and dismiss or fix findings

### Dependency Scanning

Dependabot and dependency review catch vulnerable dependencies.

**Automatic**: Dependabot PRs for updates
**Manual**: Dependency review on all PRs

### Image Security

Docker images include security headers in nginx configuration:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy

## Monitoring

### Workflow Status

Check workflow status:
```bash
# Via gh CLI
gh run list --limit 10

# View specific run
gh run view 12345

# View logs
gh run view 12345 --log
```

### Deployment Status

Check deployment status:
```bash
gh api repos/:owner/:repo/deployments
```

## Troubleshooting

### Build Failures

1. Check workflow logs in Actions tab
2. Run locally: `npm ci --legacy-peer-deps && npm run build`
3. Check for dependency conflicts

### Test Failures

1. Download test artifacts from workflow run
2. Run locally: `npm test`
3. Use debug mode: `npm run test:debug`

### Docker Build Issues

1. Build locally: `docker build -t nexus-command .`
2. Check Dockerfile syntax
3. Verify nginx.conf is present

### Permission Issues

Ensure repository secrets and permissions are set:
- `GITHUB_TOKEN`: Automatically provided
- `packages: write`: Required for GHCR
- `contents: write`: Required for releases

## Best Practices

1. **Always create PRs**: Don't push directly to main
2. **Wait for CI**: Ensure all checks pass before merging
3. **Review bot issues**: Approve or close within 7 days
4. **Use semantic versioning**: Follow SemVer for releases
5. **Test Docker images**: Pull and test before deploying
6. **Monitor security alerts**: Review CodeQL findings promptly
7. **Keep dependencies updated**: Review Dependabot PRs

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [GHCR Documentation](https://docs.github.com/en/packages)
- [Semantic Versioning](https://semver.org/)
- [CodeQL](https://codeql.github.com/)
