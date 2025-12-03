#!/bin/bash
# Initialize a git repo, create initial commit and push to a new remote
# Usage: ./scripts/init-repo.sh <your-remote-url>
set -e
if [ -z "$1" ]; then
  echo "Usage: $0 <git-remote-url>"
  exit 1
fi
git init
git add .
git commit -m "Initial commit - zwanski-store"
git branch -M main
git remote add origin "$1"
echo "Repository initialized. Now run: git push -u origin main"
