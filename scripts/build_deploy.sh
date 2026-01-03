#!/usr/bin/env bash
set -euo pipefail

rm -rf deploy
mkdir -p deploy

# Copy ONLY what should be public
cp -R assets data pages partials deploy/
cp index.html 404.html robots.txt sitemap.xml deploy/
cp favicon.svg deploy/ 2>/dev/null || true

echo "✅ Built deploy/ with public site files only."
