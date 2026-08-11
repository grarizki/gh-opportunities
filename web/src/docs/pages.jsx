import { CodeBlock, Inline } from "../components/Code.jsx";

export const PAGES = {
  overview: (
    <>
      <h1>Overview</h1>
      <p>
        gh-opp is a Rust CLI that finds open-source contribution opportunities on GitHub. It scans repos for
        beginner-friendly issues, stale PRs, README gaps, and code-quality signals, then ranks them by how much you will
        learn and how big an impact you can make.
      </p>

      <h2>What it does</h2>
      <p>
        One command takes an <Inline>owner/repo</Inline> and returns a ranked, scored list you can act on. Run it from the
        terminal, from a script, or through an AI agent.
      </p>

      <h2>How it scores</h2>
      <p>
        gh-opp goes beyond "find issues labeled beginner." It scores repos on four signals: good-first-issue quality,
        staleness, README and community health, and code quality. The composite score tells you where you will make the
        most difference, not just where something is labeled easy.
      </p>

      <h2>Command overview</h2>
      <p className="muted label">Scanning and discovery</p>
      <CodeBlock lang="bash">
        {`gh-opp scan owner/repo
gh-opp discover --lang rust
gh-opp stale tokio-rs/tokio
gh-opp readme facebook/react
gh-opp quality rust-lang/rust`}
      </CodeBlock>
      <p className="muted label">AI analysis</p>
      <CodeBlock lang="bash">
        {`gh-opp ai analyze rust-lang/rust
gh-opp ai recommend tokio-rs/tokio --skills "rust,async" --hours 10
gh-opp ai difficulty denoland/deno`}
      </CodeBlock>
      <p className="muted label">Agents and security</p>
      <CodeBlock lang="bash">
        {`gh-opp tools
gh-opp call scan_issues --args '{"repo":"rust-lang/rust","limit":10}'
gh-opp serve --port 3737
gh-opp security
gh-opp hooks install
gh-opp init`}
      </CodeBlock>
      <p>Every command supports <Inline>--json</Inline>.</p>

      <h2>Tech stack</h2>
      <p>
        Rust 2021 edition, MSRV 1.88. Async via tokio, TUI via ratatui, HTTP server via axum, SQLite cache via rusqlite.
        AI providers: OpenAI or Anthropic. License: MIT.
      </p>
    </>
  ),

  install: (
    <>
      <h1>Install</h1>
      <p>Install from source or from a prebuilt release binary. Requires Rust 1.88+ only for the source path.</p>

      <h2>Quick install (curl)</h2>
      <p>Downloads a prebuilt binary for your OS and architecture, verifies its checksum, and installs it to ~/.local/bin.</p>
      <CodeBlock lang="bash">curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh</CodeBlock>
      <p>Override the install directory or version with GH_OPP_INSTALL_DIR and GH_OPP_VERSION.</p>
      <CodeBlock lang="bash">
        {`GH_OPP_INSTALL_DIR=$HOME/bin curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh
GH_OPP_VERSION=v0.2.0 curl -fsSL https://raw.githubusercontent.com/grarizki/gh-opportunities/main/install.sh | sh`}
      </CodeBlock>

      <h2>Install from source</h2>
      <CodeBlock lang="bash">
        {`git clone https://github.com/grarizki/gh-opportunities.git
cd gh-opportunities
cargo install --path .`}
      </CodeBlock>
      <p>Or build a locally optimized release binary with <Inline>cargo build --release</Inline>.</p>

      <h2>Set a GitHub token</h2>
      <p>
        Without a token the API is tight: 60 req/h. A token gets you 5,000 req/h.
      </p>
      <CodeBlock lang="bash">export GITHUB_TOKEN="ghp_your_token_here"</CodeBlock>

      <h2>Create the default config</h2>
      <CodeBlock lang="bash">gh-opp init</CodeBlock>
      <p>
        Writes <Inline>~/.config/gh-opp/config.toml</Inline> with sensible defaults for scoring weights, the AI provider,
        your profile, and security options. Tune it to your workflow.
      </p>

      <h2>Optional: re-run CI locally</h2>
      <CodeBlock lang="bash">
        {`cargo fmt --check   # formatting
cargo clippy        # lints
cargo test          # 109 unit tests
cargo audit         # dependency CVEs
cargo tarpaulin     # coverage report`}
      </CodeBlock>
      <p>CI runs all of these on every pull request across Ubuntu, macOS, and Windows.</p>
    </>
  ),

  quickstart: (
    <>
      <h1>Quick start</h1>
      <p>Five commands cover the full workflow: scan, discover, stale, readme, quality. All support --json.</p>

      <h2>Score a repo</h2>
      <CodeBlock lang="bash">gh-opp scan serde-rs/serde</CodeBlock>

      <h2>Discover high-opportunity repos</h2>
      <CodeBlock lang="bash">
        {`gh-opp discover --lang rust --min-stars 100
gh-opp discover --lang python --json`}
      </CodeBlock>

      <h2>Find stale issues</h2>
      <CodeBlock lang="bash">gh-opp stale tokio-rs/tokio</CodeBlock>

      <h2>Audit community health and code quality</h2>
      <CodeBlock lang="bash">
        {`gh-opp readme facebook/react
gh-opp quality rust-lang/rust`}
      </CodeBlock>

      <h2>Open the TUI</h2>
      <CodeBlock lang="bash">gh-opp tui rust-lang/rust tokio-rs/tokio denoland/deno</CodeBlock>

      <h2>Script it</h2>
      <p>Append <Inline>--json</Inline> to any scan for machine-readable output.</p>
    </>
  ),

  config: (
    <>
      <h1>Config</h1>
      <p>gh-opp config lives at ~/.config/gh-opp/config.toml. Create it once, edit rarely.</p>

      <h2>Create it</h2>
      <CodeBlock lang="bash">gh-opp init</CodeBlock>

      <h2>What it controls</h2>
      <ul>
        <li>Scoring weights for the four repo signals</li>
        <li>The AI provider (OpenAI or Anthropic) and key</li>
        <li>Your skill profile for recommendations</li>
        <li>Security options</li>
      </ul>
      <p>Defaults are sensible; tune what matters to you.</p>

      <h2>Token-cost confirmation</h2>
      <p>
        Before every AI call, gh-opp prints a token-cost estimate and asks for confirmation. Pass <Inline>--yes</Inline> to
        skip the prompt.
      </p>
    </>
  ),

  ai: (
    <>
      <h1>AI analysis</h1>
      <p>Turn repo research into written analysis. Uses OpenAI or Anthropic through one provider abstraction.</p>

      <h2>Set your provider key</h2>
      <CodeBlock lang="bash">
        {`export OPENAI_API_KEY="sk-..."
# or
export ANTHROPIC_API_KEY="sk-ant-..."`}
      </CodeBlock>

      <h2>Analyze a repo</h2>
      <CodeBlock lang="bash">gh-opp ai analyze rust-lang/rust</CodeBlock>
      <p>Summarizes the repo's contribution landscape: where the openings are and what they look like.</p>

      <h2>Get personalized recommendations</h2>
      <CodeBlock lang="bash">gh-opp ai recommend tokio-rs/tokio --skills "rust,async,cli" --hours 10</CodeBlock>
      <p>Ranks opportunities against your stated skills and available time.</p>

      <h2>Rate difficulty</h2>
      <CodeBlock lang="bash">gh-opp ai difficulty denoland/deno</CodeBlock>
      <p>Estimates how hard each issue is to pick up.</p>

      <h2>Cost control</h2>
      <p>A token-cost estimate is shown before each call. Confirm, or pass <Inline>--yes</Inline> to proceed directly.</p>
    </>
  ),

  agent: (
    <>
      <h1>Agent integration</h1>
      <p>Expose gh-opp to AI agents as OpenAI function-calling tools or as a local HTTP service.</p>

      <h2>Dump tool definitions</h2>
      <CodeBlock lang="bash">gh-opp tools</CodeBlock>
      <p>Outputs OpenAI function-calling schemas for gh-opp's capabilities.</p>

      <h2>Call a tool directly</h2>
      <CodeBlock lang="bash">{`gh-opp call scan_issues --args '{"repo":"rust-lang/rust","limit":10}'`}</CodeBlock>

      <h2>Run the HTTP server</h2>
      <CodeBlock lang="bash">
        {`export GH_OPP_TOKEN="your-secret-token"
gh-opp serve --port 3737`}
      </CodeBlock>
      <p>Binds 127.0.0.1 and requires a bearer token on every request.</p>

      <h2>Endpoints</h2>
      <CodeBlock lang="bash">
        {`GET  /health
GET  /tools
POST /call
POST /ai/analyze
POST /ai/recommend
POST /ai/difficulty
POST /security
GET  /profile`}
      </CodeBlock>
    </>
  ),

  security: (
    <>
      <h1>Security gate</h1>
      <p>Four checks run before you ship: audit, secrets, license, quality. Install them as a pre-push hook and never push a known CVE again.</p>

      <h2>Run all checks</h2>
      <CodeBlock lang="bash">gh-opp security</CodeBlock>

      <h2>One check at a time</h2>
      <CodeBlock lang="bash">
        {`gh-opp security --check audit
gh-opp security --check secrets
gh-opp security --check quality
gh-opp security --check license`}
      </CodeBlock>

      <h2>The four checks</h2>
      <ul>
        <li><b>audit:</b> <Inline>cargo-audit</Inline> CVE scan</li>
        <li><b>secrets:</b> regex scanner for API keys, tokens, passwords</li>
        <li><b>license:</b> <Inline>cargo-deny</Inline> with fallback metadata</li>
        <li><b>quality:</b> fmt + clippy + test</li>
      </ul>

      <h2>Output and fixes</h2>
      <CodeBlock lang="bash">
        {`gh-opp security --json
gh-opp security --fix`}
      </CodeBlock>
      <p>
        <Inline>--fix</Inline> auto-fixes what is fixable, such as <Inline>cargo fmt</Inline>.
      </p>

      <h2>Pre-push hook</h2>
      <CodeBlock lang="bash">gh-opp hooks install</CodeBlock>
      <p>Installs a pre-push hook that blocks the push if any check fails.</p>
    </>
  ),

  scoring: (
    <>
      <h1>Scoring</h1>
      <p>Two levels of scoring: each issue gets a 0-1 score, and each repo gets a weighted composite. Both are transparent.</p>

      <h2>Issue score (0-1)</h2>
      <ul>
        <li>0.5 label match (<Inline>good first issue</Inline> and similar)</li>
        <li>0.3 description longer than 50 characters</li>
        <li>0.2 unassigned</li>
      </ul>

      <h2>Repo composite (0-1)</h2>
      <ul>
        <li>0.3 average issue score</li>
        <li>0.2 stale ratio</li>
        <li>0.2 README/community gaps</li>
        <li>0.3 code-quality deficit</li>
      </ul>

      <h2>Reading a score</h2>
      <p>
        A higher score means more high-upside openings. Low labels but healthy code scores differently than
        labeled-but-messy. The composite ranks where you will learn the most and matter the most.
      </p>
    </>
  ),

  architecture: (
    <>
      <h1>Architecture</h1>
      <p>Small, single-purpose modules. The ai/ and security/ layers are clean seams.</p>

      <CodeBlock lang="bash" label="src">
        {`src/
├── main.rs            # CLI dispatch, table rendering
├── cli.rs             # clap derive definitions
├── config.rs          # XDG config, TOML parsing
├── db.rs              # SQLite cache (rusqlite)
├── github/            # octocrab client, issue fetch, discovery
├── analysis/          # stale / readme / code_quality / scoring
├── ai/                # provider trait, openai, anthropic, prompts, estimate, tools
├── security/          # audit, secrets, license, quality
├── serve/             # axum HTTP server + routes (bearer auth)
├── hooks/             # pre-push hook installer
└── tui/               # ratatui screens: dashboard, issues, repos, detail`}
      </CodeBlock>

      <h2>Seams</h2>
      <p>
        The <Inline>ai/</Inline> layer exposes a provider trait, so OpenAI and Anthropic swap without touching callers. The{" "}
        <Inline>security/</Inline> layer is the same: add a check without changing the gate. Tests live beside their module.
      </p>
    </>
  ),

  contributing: (
    <>
      <h1>Contributing</h1>
      <p>This project exists to help people land their first real open-source PR. Yours included.</p>

      <h2>Good starting points</h2>
      <p>
        Look for <Inline>good first issue</Inline> and <Inline>help wanted</Inline> labels in this repo. The tool that finds
        contributions elsewhere finds them here too.
      </p>

      <h2>Set up</h2>
      <CodeBlock lang="bash">
        {`git clone https://github.com/grarizki/gh-opportunities.git
cd gh-opportunities
cargo install --path .
cargo test`}
      </CodeBlock>

      <h2>Keep it green</h2>
      <p>Commit through <Inline>prek</Inline> (fmt + clippy + test) and open a PR.</p>

      <h2>Conventions</h2>
      <ul>
        <li>Format: <Inline>cargo fmt</Inline> (pre-commit enforced)</li>
        <li>Lint: <Inline>cargo clippy</Inline> (pre-commit enforced)</li>
        <li>Tests: <Inline>cargo test</Inline>; <Inline>cargo tarpaulin</Inline> for coverage</li>
        <li>Hooks: <Inline>prek</Inline> manages fmt/clippy/test; pre-push security gate optional</li>
        <li>Each module owns its tests; add one alongside any non-trivial logic</li>
      </ul>

      <h2>Ideas that help most</h2>
      <ul>
        <li>More scoring heuristics and priority labels</li>
        <li>Webhook or scheduled-run support</li>
        <li>A CI-dashboard view</li>
        <li>Alternate LLM providers</li>
        <li>Parser for more license sources</li>
      </ul>
      <p>Start small, ask questions, open your first PR. The contribution loop here is the one this tool searches for.</p>
    </>
  ),
};
