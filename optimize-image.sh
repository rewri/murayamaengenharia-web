#!/bin/bash

SRC="./public/static/images/projects"
OUT="./public/static/images"

WEBP_FULL="$OUT/webp/full"
WEBP_THUMB="$OUT/webp/thumbs"
JPG_FULL="$OUT/fallback/full"
JPG_THUMB="$OUT/fallback/thumbs"

mkdir -p "$WEBP_FULL" "$WEBP_THUMB" "$JPG_FULL" "$JPG_THUMB"

find "$SRC" -type f \( \
  -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.tif" -o -iname "*.webp" \
\) | while read -r IMG; do

  REL="${IMG#$SRC/}"
  NAME="$(basename "$REL")"
  NAME_NO_EXT="${NAME%.*}"
  SUBDIR="$(dirname "$REL")"

  mkdir -p \
    "$WEBP_FULL/$SUBDIR" \
    "$WEBP_THUMB/$SUBDIR" \
    "$JPG_FULL/$SUBDIR" \
    "$JPG_THUMB/$SUBDIR"

  # =========================
  # WEBP - FULL
  # =========================
  convert "$IMG" \
    -resize "1920x1920>" \
    -strip \
    -quality 80 \
    "$WEBP_FULL/$SUBDIR/$NAME_NO_EXT.webp"

  # =========================
  # JPG - FULL (fallback)
  # =========================
  convert "$IMG" \
    -resize "1920x1920>" \
    -strip \
    -quality 85 \
    "$JPG_FULL/$SUBDIR/$NAME_NO_EXT.jpg"

  # =========================
  # WEBP - THUMB
  # =========================
  convert "$IMG" \
    -resize "400x400>" \
    -strip \
    -quality 75 \
    "$WEBP_THUMB/$SUBDIR/$NAME_NO_EXT.webp"

  # =========================
  # JPG - THUMB (fallback)
  # =========================
  convert "$IMG" \
    -resize "400x400>" \
    -strip \
    -quality 85 \
    "$JPG_THUMB/$SUBDIR/$NAME_NO_EXT.jpg"

done
