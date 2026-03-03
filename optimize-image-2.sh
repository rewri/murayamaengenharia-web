#!/bin/bash

SOURCE_DIR="$1"
OUTPUT_DIR="optimized"

if [ -z "$SOURCE_DIR" ]; then
  echo "Uso: ./optimize-obras-3x2.sh caminho/das/fotos"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

process_image() {
  local input="$1"
  local relative_path="${input#$SOURCE_DIR/}"
  local filename=$(basename "$input")
  local name="${filename%.*}"
  local dir=$(dirname "$relative_path")

  mkdir -p "$OUTPUT_DIR/$dir"

  echo "Padronizando: $relative_path"

  # Função de resize + crop 3:2 central
  generate() {
    local width="$1"
    local height="$2"
    local suffix="$3"
    local quality="$4"

    magick "$input" \
      -resize "${width}x${height}^" \
      -gravity center \
      -extent "${width}x${height}" \
      -strip \
      -quality "$quality" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$dir/${name}-${suffix}.webp"
  }

  # Thumb
  generate 600 400 "thumb" 80

  # Hero
  generate 800 533 "hero-800" 80
  generate 1200 800 "hero-1200" 80
  generate 1600 1067 "hero-1600" 82

  # Gallery
  generate 800 533 "gallery" 75

  # Lightbox
  generate 1600 1067 "lightbox" 85
}

export -f process_image
export SOURCE_DIR
export OUTPUT_DIR

find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) \
  -exec bash -c 'process_image "$0"' {} \;

echo "✔ Todas as imagens foram padronizadas para 3:2."