#!/bin/sh
# gh-opp installer
# Install a prebuilt gh-opp binary from GitHub Releases.
#
#   curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh
#
# Env overrides:
#   GH_OPP_VERSION      release tag to install (default: latest)
#   GH_OPP_INSTALL_DIR  install directory (default: $HOME/.local/bin)
#   GH_OPP_REPO         owner/repo (default: grarizki/gh-opportunities)

set -eu

REPO="${GH_OPP_REPO:-grarizki/gh-opportunities}"
VERSION="${GH_OPP_VERSION:-latest}"
INSTALL_DIR="${GH_OPP_INSTALL_DIR:-$HOME/.local/bin}"

say() { printf '\033[1;32mgh-opp\033[0m %s\n' "$*"; }
die() { printf '\033[1;31merror:\033[0m %s\n' "$*" >&2; exit 1; }

# --- detect os/arch -> target triple -------------------------------------
os="$(uname -s)"
arch="$(uname -m)"

case "$os" in
  Linux) target_os="unknown-linux-gnu" ;;
  Darwin) target_os="apple-darwin" ;;
  MINGW*|MSYS*|CYGWIN*) target_os="pc-windows-msvc" ;;
  *) die "unsupported OS: $os (only Linux, macOS, Windows)" ;;
esac

case "$arch" in
  x86_64|amd64) target_arch="x86_64" ;;
  aarch64|arm64) target_arch="aarch64" ;;
  *) die "unsupported architecture: $arch" ;;
esac

TARGET="$target_arch-$target_os"
EXT="tar.gz"
[ "$target_os" = "pc-windows-msvc" ] && EXT="zip"

# --- resolve version -------------------------------------------------------
if [ "$VERSION" = "latest" ]; then
  VERSION="$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" |
    sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p' | head -1)"
  [ -n "$VERSION" ] || die "could not resolve latest release for $REPO"
fi

BASE="https://github.com/$REPO/releases/download/$VERSION"
ASSET="gh-opp-$VERSION-$TARGET.$EXT"
ASSET_URL="$BASE/$ASSET"
SUM_URL="$BASE/$ASSET.sha256"

say "installing gh-opp $VERSION ($TARGET) into $INSTALL_DIR"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT INT TERM

curl -fsSL "$ASSET_URL" -o "$tmp/$ASSET"
curl -fsSL "$SUM_URL" -o "$tmp/$ASSET.sha256"

# --- verify checksum -------------------------------------------------------
(
  cd "$tmp"
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum -c "$ASSET.sha256" >/dev/null
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 -c "$ASSET.sha256" >/dev/null
  else
    die "no sha256 tool found (install coreutils)"
  fi
) || die "checksum mismatch for $ASSET"

# --- extract ----------------------------------------------------------------
mkdir -p "$tmp/x"
if [ "$EXT" = "zip" ]; then
  unzip -q "$tmp/$ASSET" -d "$tmp/x"
else
  tar -xzf "$tmp/$ASSET" -C "$tmp/x"
fi

BIN="$(find "$tmp/x" -type f -name 'gh-opp*' ! -name '*.sha256' | head -1)"
[ -n "$BIN" ] || die "binary not found in $ASSET"
chmod +x "$BIN"

mkdir -p "$INSTALL_DIR"
cp "$BIN" "$INSTALL_DIR/gh-opp"
say "installed to $INSTALL_DIR/gh-opp"

case ":$PATH:" in
  *":$INSTALL_DIR:"*) : ;;
  *) say "add $INSTALL_DIR to your PATH, then run: gh-opp --help" ;;
esac
say "next: gh-opp init && export GITHUB_TOKEN=ghp_your_token_here"
say "share: curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh"
