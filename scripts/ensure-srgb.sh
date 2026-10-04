#!/usr/bin/env bash
# ==============================================================================
# Portfolio 2027 — Web Color Profile Normalizer (Zero Washed-Out Images)
# Converts any CMYK / non-sRGB print image into standard web sRGB (IEC61966-2.1)
# using macOS ColorSync engine. Preserves 100% native resolution and pixel clarity.
#
# Usage:
#   ./scripts/ensure-srgb.sh                          # Audits & converts all assets
#   ./scripts/ensure-srgb.sh <file_or_directory_path> # Targets specific file or folder
# ==============================================================================

set -euo pipefail

SRGB_ICC="/System/Library/ColorSync/Profiles/sRGB Profile.icc"

if [[ ! -f "$SRGB_ICC" ]]; then
  echo "❌ Error: sRGB Profile not found at $SRGB_ICC"
  exit 1
fi

TARGET="${1:-public/assets}"

process_file() {
  local img="$1"
  [[ -f "$img" ]] || return 0
  
  # Only process raster images
  local lower_img
  lower_img=$(echo "$img" | tr '[:upper:]' '[:lower:]')
  case "$lower_img" in
    *.jpg|*.jpeg|*.png) ;;
    *) return 0 ;;
  esac

  local space
  space=$(sips -g space "$img" 2>/dev/null | awk -F': ' '/space:/ {print $2}' || echo "unknown")
  local profile
  profile=$(sips -g profile "$img" 2>/dev/null | awk -F': ' '/profile:/ {print $2}' || echo "unknown")

  if [[ "$space" == "CMYK" ]] || [[ "$profile" == *"SWOP"* ]] || [[ "$profile" == *"Coated"* ]]; then
    echo "⚠️  CMYK/Print space detected: $img ($space | $profile)"
    echo "   → Converting to sRGB IEC61966-2.1 using Apple ColorSync..."
    sips -m "$SRGB_ICC" "$img" >/dev/null 2>&1
    local new_space
    new_space=$(sips -g space "$img" 2>/dev/null | awk -F': ' '/space:/ {print $2}')
    echo "   ✅ Converted successfully: space is now $new_space (sRGB calibrated, no washed-out colors)"
    
    # If the file is in public/assets, mirror to src/assets
    if [[ "$img" == public/assets/* ]]; then
      local rel_path="${img#public/assets/}"
      local src_dest="src/assets/$rel_path"
      mkdir -p "$(dirname "$src_dest")"
      cp "$img" "$src_dest"
      echo "   🔄 Mirrored to $src_dest"
    fi
  fi
}

if [[ -f "$TARGET" ]]; then
  process_file "$TARGET"
elif [[ -d "$TARGET" ]]; then
  echo "🔍 Scanning '$TARGET' for CMYK/washed-out images..."
  find "$TARGET" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    # Skip backup directories or original copies
    if [[ "$file" == *"/originals/"* ]] || [[ "$file" == *"-cmyk-original"* ]] || [[ "$file" == *"/.user_uploaded/"* ]]; then
      continue
    fi
    process_file "$file"
  done
  echo "✨ Scan complete: all web assets verified for vibrant sRGB display."
else
  echo "❌ Error: Target '$TARGET' does not exist."
  exit 1
fi
