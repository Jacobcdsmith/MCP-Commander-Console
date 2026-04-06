#!/bin/bash
set -e

# Post-merge setup script
# Install dependencies if package.json changed
if [ -f package.json ]; then
  npm install --legacy-peer-deps
fi

echo "Post-merge setup complete."
