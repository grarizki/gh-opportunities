import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal.jsx";
import { Icon } from "../components/Icons.jsx";
import { ScanTerminal, InstallTerminal } from "../components/Terminal.jsx";
import { TuiScreens } from "../components/TuiScreens.jsx";

const INTEGRATIONS = [
  { name: "github", label: "GitHub" },
  { name: "openai", label: "OpenAI" },
  { name: "anthropic", label: "Anthropic" },
  { name: "sqlite", label: "SQLite" },
];

const BENTO = [
  {
    cls: "cell-a",
    head: "Scan and score any repo",
    body: "gh-opp scan owner/repo fetches good-first issues and grades them on four weighted signals, then returns a composite 0-1 score.",
    extra: (
      <div className="bento-cmd">
        <span className="p">$ </span>gh-opp scan serde-rs/serde --json
      </div>
    ),
  },
  {
    cls: "cell-b bento-dots",
    head: "Discover by language or topic",
    body: "gh-opp discover --lang rust finds high-opportunity repos ranked by upside. The stale detector surfaces issues and PRs idle for N configurable days.",
  },
  {
    cls: "cell-c bento-tinted",
    chip: "community",
    head: "README and code-quality audit",
    body: "Checks the 7 community-health files every project should have, plus TODO/FIXME density, CI, lint config, and test signals.",
  },
  {
    cls: "cell-d",
    chip: "AI",
    head: "AI analysis",
    body: "gh-opp ai analyze, ai recommend, and ai difficulty run on OpenAI or Anthropic. A token-cost estimate is shown before every LLM call.",
  },
  {
    cls: "cell-e",
    chip: "agents",
    head: "Agents and automation",
    body: "OpenAI function-calling tools, a bearer-authenticated HTTP server, JSON on every command, a SQLite cache, and a security gate with pre-push hooks.",
  },
];

const SCORING = [
  { w: "0.3", t: "Good-first-issue quality", d: "Labeled, well-described, unassigned. A higher score means a better starting point." },
  { w: "0.2", t: "Staleness", d: "Issues and PRs waiting too long for attention. Fresh targets beat abandoned ones." },
  { w: "0.2", t: "README and community health", d: "CONTRIBUTING.md, CoC, LICENSE, and templates. Healthy projects onboard you faster." },
  { w: "0.3", t: "Code quality", d: "TODO/FIXME density, CI, lint config, test coverage. Solid codebases teach more." },
];

const CMDS = [
  {
    title: "Scan and discover",
    rows: [
      { cmd: "gh-opp scan owner/repo", desc: "score good-first issues in a repo" },
      { cmd: "gh-opp discover --lang rust", desc: "find high-opportunity repos by language" },
      { cmd: "gh-opp stale tokio-rs/tokio", desc: "surface issues and PRs idle too long" },
      { cmd: "gh-opp readme facebook/react", desc: "audit the 7 community-health files" },
      { cmd: "gh-opp quality rust-lang/rust", desc: "measure TODO density, CI, lint, tests" },
      { cmd: "gh-opp tui rust-lang/rust", desc: "keyboard-driven dashboard" },
    ],
  },
  {
    title: "AI analysis",
    rows: [
      { cmd: "gh-opp ai analyze rust-lang/rust", desc: "summarize a repo contribution landscape" },
      { cmd: "gh-opp ai recommend tokio-rs/tokio", desc: "picks ranked against your skills and hours" },
      { cmd: "gh-opp ai difficulty denoland/deno", desc: "rate issue difficulty" },
    ],
  },
  {
    title: "Agents and security",
    rows: [
      { cmd: "gh-opp tools", desc: "dump OpenAI function-calling schemas" },
      { cmd: 'gh-opp call scan_issues --args \'{"repo":"..."}\'', desc: "execute a tool call directly" },
      { cmd: "gh-opp serve --port 3737", desc: "local HTTP API, bearer-authenticated" },
      { cmd: "gh-opp security", desc: "CVE, secret, license, quality checks" },
      { cmd: "gh-opp hooks install", desc: "block pushes on any failed check" },
    ],
  },
];

function CmdCode({ text }) {
  const flagAt = text.indexOf("--");
  if (flagAt < 0) return <code>{text}</code>;
  return (
    <code>
      {text.slice(0, flagAt)}
      <span className="cmd-flag">{text.slice(flagAt)}</span>
    </code>
  );
}

export function Landing() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="hero-eyebrow">Rust CLI for open-source contributors</span>
              <h1>
                Find your next open-source <em>contribution.</em>
              </h1>
              <p className="hero-sub">
                Scan any repo for beginner-friendly issues, stale PRs, and README gaps. Get a ranked scored list in minutes.
              </p>
              <div className="hero-ctas">
                <Link to="/docs/install" className="btn btn-primary">
                  Install <Icon name="arrow" />
                </Link>
                <Link to="/docs" className="btn btn-ghost">
                  Read the docs
                </Link>
              </div>
              <div className="hero-foot">
                <span>
                  <b>4</b> scoring signals
                </span>
                <span>
                  <b>5,000</b> req/h with a token
                </span>
                <span>
                  <b>--json</b> everywhere
                </span>
              </div>
            </div>
            <Reveal style={{ "--rd": "120ms" }}>
              <ScanTerminal />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="integrations">
        <div className="integrations-inner">
          <span className="integrations-label">Works with</span>
          <div className="integrations-items">
            {INTEGRATIONS.map((b) => (
              <span className="mono" key={b.name}>
                <Icon name={b.name} />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <div className="wrap">
          <div className="why-grid">
            <div className="why-copy">
              <Reveal>
                <span className="section-eyebrow">The problem</span>
                <h2>Finding a good first issue should not be the hard part.</h2>
                <p style={{ marginTop: 18, color: "var(--text-dim)", fontSize: "1.05rem", maxWidth: "56ch" }}>
                  Hunting for good first issues is manual: scan labels, guess what is stale, ignore the rest. gh-opp turns
                  that research into a ranked scored list.
                </p>
              </Reveal>
            </div>
            <Reveal as="div" style={{ "--rd": "100ms" }}>
              <div className="stats">
                <div className="stat">
                  <div className="stat-num">4</div>
                  <div className="stat-label">scoring signals per repo</div>
                </div>
                <div className="stat">
                  <div className="stat-num">5,000</div>
                  <div className="stat-label">req/h with a GitHub token</div>
                </div>
                <div className="stat">
                  <div className="stat-num">109</div>
                  <div className="stat-label">passing tests</div>
                </div>
                <div className="stat">
                  <div className="stat-num">MIT</div>
                  <div className="stat-label">licensed, open source</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section alt" id="features">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow">Features</span>
            <h2>Research in minutes, not weekends.</h2>
          </Reveal>
          <div className="bento">
            {BENTO.map((c, i) => (
              <Reveal key={c.head} className={`bento-cell ${c.cls}`} style={{ "--rd": `${i * 60}ms` }}>
                {c.chip && <span className="bento-chip">{c.chip}</span>}
                <h3>{c.head}</h3>
                <p>{c.body}</p>
                {c.extra}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tui">
        <div className="wrap">
          <div className="tui-lead">
            <Reveal>
              <span className="section-eyebrow">Terminal UI</span>
              <h2>One keyboard-driven workspace for the whole workflow.</h2>
            </Reveal>
            <span className="tui-hint">drag or scroll sideways</span>
          </div>
          <Reveal>
            <TuiScreens />
          </Reveal>
        </div>
      </section>

      <section className="section alt" id="scoring">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="section-eyebrow">Transparent scoring</span>
            <h2>Four signals, one weighted rank.</h2>
          </Reveal>
          <div className="score-grid">
            {SCORING.map((s, i) => (
              <Reveal key={s.t} className="score-card" style={{ "--rd": `${i * 50}ms` }}>
                <span className="score-weight">weight {s.w}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="score-note">A higher score means more high-upside openings, not just easy labels.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="commands">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Every command returns JSON.</h2>
          </Reveal>
          <div className="cmd-grid">
            {CMDS.map((g, i) => (
              <Reveal key={g.title} className="cmd-cluster" style={{ "--rd": `${i * 60}ms` }}>
                <div className="cmd-cluster-head">{g.title}</div>
                {g.rows.map((r) => (
                  <div className="cmd-row" key={r.cmd}>
                    <CmdCode text={r.cmd} />
                    <p>{r.desc}</p>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="install" id="install">
        <div className="wrap">
          <Reveal>
            <h2>Get your first contribution list in minutes.</h2>
            <p className="install-copy">Requires Rust 1.88+. A GitHub token takes you from 60 to 5,000 requests per hour.</p>
          </Reveal>
          <Reveal className="install-block" style={{ "--rd": "100ms" }}>
            <InstallTerminal />
          </Reveal>
          <Reveal className="install-cta" style={{ "--rd": "180ms" }}>
            <Link to="/docs/install" className="btn btn-primary">
              Install gh-opp <Icon name="arrow" />
            </Link>
            <Link to="/docs/quickstart" className="btn btn-ghost">
              Quick start
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
