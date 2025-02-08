#!/bin/bash

set -e  # Stop on error

# Extract version from package.json
VERSION=$(node -p "require('./package.json').version")
RELEASE_NOTES="Automated release of version $VERSION"
ARTIFACT="dist/idleon-steam-data-extractor.exe"

# Ensure GitHub CLI is installed
if ! command -v gh &> /dev/null; then
  echo "GitHub CLI (gh) is not installed. Install it from https://cli.github.com/"
  exit 1
fi

# Ensure user is authenticated
if ! gh auth status &> /dev/null; then
  echo "You are not authenticated. Run: gh auth login"
  exit 1
fi

echo "🚀 Running build process..."
npm run dist  # Build artifact

# Check if artifact exists
if [ ! -f "$ARTIFACT" ]; then
  echo "❌ Error: Artifact $ARTIFACT not found. Make sure 'npm run dist' generates it."
  exit 1
fi

echo "🚀 Releasing version $VERSION..."

# Create and push Git tag
git tag -a "$VERSION" -m "$RELEASE_NOTES"
git push origin "$VERSION"

# Create GitHub release and attach artifact
gh release create "$VERSION" "$ARTIFACT" --title "Release $VERSION" --notes "$RELEASE_NOTES"

echo "✅ GitHub release $VERSION created successfully!"
