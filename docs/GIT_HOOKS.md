# Git Hooks Setup

This project uses Git hooks to ensure code quality before pushing to the repository.

## Pre-Push Hook

A pre-push hook is configured to run linting checks before every `git push` command.

### What it does:
- Runs `npm run lint` before pushing
- Prevents push if linting fails
- Shows helpful error messages and suggestions

### Setup:
```bash
# Run the setup script
./scripts/setup-git-hooks.sh
```

### Usage:
```bash
# Normal push (will run linting)
git push

# Skip linting (not recommended)
git push --no-verify
```

### Fixing Linting Issues:
```bash
# See all linting errors
npm run lint

# Auto-fix some issues
npm run lint -- --fix

# Fix remaining issues manually
```

## Benefits:
- ✅ Ensures code quality before pushing
- ✅ Prevents broken code from reaching the repository
- ✅ Consistent code style across the team
- ✅ Catches potential issues early

## Bypassing (Not Recommended):
If you absolutely need to bypass the hook:
```bash
git push --no-verify
```

**Note:** This should only be used in emergency situations. Always fix linting issues when possible.
