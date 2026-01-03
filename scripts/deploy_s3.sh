#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${1:-}" ]]; then
  echo "Usage: ./scripts/deploy_s3.sh <bucket-name>"
  exit 1
fi

BUCKET="$1"

./scripts/build_deploy.sh
aws s3 sync deploy/ "s3://$BUCKET" --delete

echo "✅ Deployed: http://$BUCKET.s3-website-us-east-1.amazonaws.com"
