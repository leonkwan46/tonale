#!/bin/bash

# Setup Git hooks for the project
echo "🔧 Setting up Git hooks..."

# Make sure we're in the project root
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Create pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

# Pre-push hook to run linting before pushing
echo "🔍 Running linting checks before push..."

# Check if --no-verify flag is used to skip linting
if [ "$1" = "--no-verify" ]; then
    echo "⚠️  Skipping linting checks (--no-verify flag used)"
    exit 0
fi

# Run npm run lint
npm run lint

# Check if linting passed
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Linting failed! Please fix the issues before pushing."
    echo "💡 Run 'npm run lint' to see the specific errors."
    echo "💡 Run 'npm run lint -- --fix' to auto-fix some issues."
    echo "💡 Use 'git push --no-verify' to skip linting (not recommended)."
    echo ""
    exit 1
fi

echo "✅ Linting passed! Proceeding with push..."
exit 0
EOF

# Make the hook executable
chmod +x .git/hooks/pre-push

echo "✅ Pre-push hook installed successfully!"
echo ""
echo "📋 What this does:"
echo "   • Runs 'npm run lint' before every git push"
echo "   • Prevents push if linting fails"
echo "   • Can be bypassed with 'git push --no-verify' (not recommended)"
echo ""
echo "💡 To test: Try running 'git push' - it will run linting first"
echo "💡 To fix auto-fixable issues: Run 'npm run lint -- --fix'"
