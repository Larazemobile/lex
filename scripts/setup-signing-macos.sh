#!/bin/zsh
set -euo pipefail

SERVICE="com.orbitakidx.lex.upload"
KEY_ALIAS="lex-upload"
KEY_DIR="$HOME/Library/Application Support/Orbitakidx/Signing"
KEY_FILE="$KEY_DIR/lex-upload.jks"

mkdir -p "$KEY_DIR"

if [[ -f "$KEY_FILE" ]]; then
  if ! security find-generic-password -s "$SERVICE" >/dev/null 2>&1; then
    echo "La clave existe, pero falta su contraseña en el llavero de macOS." >&2
    exit 1
  fi
  echo "La clave de subida de Lex ya está configurada."
  exit 0
fi

UPLOAD_PASSWORD="$(openssl rand -base64 36)"
TEMP_KEY="$KEY_FILE.tmp"

trap 'rm -f "$TEMP_KEY"' EXIT

keytool -genkeypair \
  -keystore "$TEMP_KEY" \
  -storetype PKCS12 \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "$UPLOAD_PASSWORD" \
  -keypass "$UPLOAD_PASSWORD" \
  -dname "CN=Lara Lizundia, OU=Apps educativas, O=Lara Lizundia, L=Madrid, ST=Madrid, C=ES"

security add-generic-password \
  -U \
  -a "lara.lizundia" \
  -s "$SERVICE" \
  -w "$UPLOAD_PASSWORD" >/dev/null

mv "$TEMP_KEY" "$KEY_FILE"
trap - EXIT

echo "Clave de subida de Lex creada y protegida en el llavero de macOS."
