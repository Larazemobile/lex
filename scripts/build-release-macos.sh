#!/bin/zsh
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVICE="com.orbitakidx.lex.upload"
KEY_FILE="$HOME/Library/Application Support/Orbitakidx/Signing/lex-upload.jks"
JDK_HOME="$(find "$PROJECT_ROOT/../.toolchains" -maxdepth 1 -type d -name 'jdk-21*' -print -quit)/Contents/Home"

if [[ ! -f "$KEY_FILE" ]]; then
  echo "No se encuentra la clave de subida de Lex. Ejecuta scripts/setup-signing-macos.sh." >&2
  exit 1
fi

if [[ ! -x "$JDK_HOME/bin/java" ]]; then
  echo "No se encuentra Java 21 en $PROJECT_ROOT/../.toolchains." >&2
  exit 1
fi

LEX_UPLOAD_PASSWORD="$(security find-generic-password -s "$SERVICE" -w)"
export LEX_UPLOAD_PASSWORD
export LEX_UPLOAD_STORE_FILE="$KEY_FILE"

cd "$PROJECT_ROOT"
npm run android:sync

cd android
./gradlew clean bundleRelease -Dorg.gradle.java.home="$JDK_HOME"

unset LEX_UPLOAD_PASSWORD
echo "AAB firmado: $PROJECT_ROOT/android/app/build/outputs/bundle/release/app-release.aab"
