#!/usr/bin/env bash
set -euo pipefail
STATE_FILE="${ECHO_STATE_FILE:-/opt/echo-city/data/world.json}"
BACKUP_DIR="${ECHO_BACKUP_DIR:-/var/backups/echo-city}"
if [[ ! -s "$STATE_FILE" ]]; then
  echo "State file missing or empty: $STATE_FILE" >&2
  exit 1
fi
mkdir -p "$BACKUP_DIR"
DATE="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
TMP="$BACKUP_DIR/.echo-city-$DATE.json.gz.tmp"
OUT="$BACKUP_DIR/echo-city-$DATE.json.gz"
gzip -c "$STATE_FILE" > "$TMP"
mv "$TMP" "$OUT"
find "$BACKUP_DIR" -type f -name 'echo-city-*.json.gz' -mtime +400 -delete
printf 'Backup created: %s\n' "$OUT"
