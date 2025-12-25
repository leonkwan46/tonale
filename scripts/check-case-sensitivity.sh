#!/bin/bash

# Script to detect case-sensitivity issues in Git
# This prevents issues where the same file is tracked with different casing
# (e.g., TabBars vs tabBars) which causes problems on case-sensitive filesystems

echo "🔍 Running case-sensitivity check..."

# Get all tracked files and check for duplicates that differ only in case
# We'll use git ls-files to get all tracked files, then check for case conflicts

# Create a temporary file to store normalized paths
TEMP_FILE=$(mktemp)

# Get all tracked files, convert to lowercase for comparison
git ls-files | while IFS= read -r file; do
  # Convert to lowercase and store with original path
  echo "$(echo "$file" | tr '[:upper:]' '[:lower:]')|$file" >> "$TEMP_FILE"
done

# Check for duplicates (same lowercase path but different original casing)
DUPLICATES=$(sort "$TEMP_FILE" | cut -d'|' -f1 | uniq -d)

if [ -n "$DUPLICATES" ]; then
  echo ""
  echo "❌ Case-sensitivity conflict detected!"
  echo ""
  echo "The following paths differ only in casing:"
  echo ""
  
  # Show the conflicting files
  for dup in $DUPLICATES; do
    echo "  Files with case variation: $(echo "$dup" | tr '[:lower:]' '[:upper:]')"
    grep "^$dup|" "$TEMP_FILE" | cut -d'|' -f2 | while IFS= read -r file; do
      echo "    - $file"
    done
    echo ""
  done
  
  echo "💡 To fix this:"
  echo "   1. Choose one casing (prefer the one used in imports)"
  echo "   2. Remove the duplicate from git: git rm --cached <path>"
  echo "   3. Ensure all imports use consistent casing"
  echo ""
  
  rm -f "$TEMP_FILE"
  exit 1
fi

rm -f "$TEMP_FILE"
exit 0
