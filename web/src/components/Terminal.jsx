const SCAN_ROWS = [
  { repo: "serde-rs/serde", score: "0.78", n: "14", ok: true },
  { repo: "tokio-rs/tokio", score: "0.71", n: "38", ok: true },
  { repo: "denoland/deno", score: "0.66", n: "9", ok: false },
  { repo: "tauri-apps/tauri", score: "0.61", n: "21", ok: true },
];

export function Terminal({ children, title = "gh-opp" }) {
  return (
    <div className="term">
      <div className="term-head">
        <span className="term-dot r" />
        <span className="term-dot y" />
        <span className="term-dot g" />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">
        <pre>{children}</pre>
      </div>
    </div>
  );
}

export function ScanTerminal() {
  return (
    <Terminal title="gh-opp · scan serde-rs/serde">
      <span className="term-prompt">$ </span>
      gh-opp scan serde-rs/serde --json
      <div className="term-table">
        <div className="term-row head">
          <span>repo</span>
          <span>good-first-issue</span>
          <span>score</span>
        </div>
        {SCAN_ROWS.map((r) => (
          <div className="term-row" key={r.repo}>
            <span>{r.repo}</span>
            <span className={r.ok ? "term-ok" : "term-warn"}>{r.n}</span>
            <span>{r.score}</span>
          </div>
        ))}
      </div>
      <span className="term-dim">composite 0-1 · higher = more upside</span>
      <div>
        <span className="term-ok">done</span>
        <span className="term-dim"> in 2.4s, 47 issues scored, 12 unassigned</span>
        <span className="term-cursor" />
      </div>
    </Terminal>
  );
}

export function InstallTerminal() {
  return (
    <Terminal title="bash">
      <span className="term-prompt">$ </span>
      curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh
      {"\n"}
      <span className="term-dim">checking latest release ...</span>
      {"\n"}
      <span className="term-ok">verified</span>
      <span className="term-dim"> sha256 gh-opp-v0.2.0-x86_64-apple-darwin.tar.gz</span>
      {"\n"}
      <span className="term-ok">installed</span>
      <span className="term-dim"> to ~/.local/bin/gh-opp</span>
      {"\n"}
      <span className="term-prompt">$ </span>
      gh-opp scan serde-rs/serde
      <span className="term-cursor" />
    </Terminal>
  );
}
