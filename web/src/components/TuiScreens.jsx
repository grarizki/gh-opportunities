function Screen({ label, children }) {
  return (
    <div className="tui-screen">
      <div className="tui-screen-head">
        <span>{label}</span>
        <span>gh-opp tui</span>
      </div>
      <div className="tui-screen-body">{children}</div>
    </div>
  );
}

export function TuiScreens() {
  return (
    <div className="tui-track">
      <Screen label="dashboard">
        <span className="term-dim">scanning 3 repos · 2 workers</span>
        {"\n\n"}
        <div className="bar">
          <span>tokio-rs/tokio</span>
          <i style={{ "--w": "0.71" }} />
          <span className="term-ok">0.71</span>
        </div>
        {"\n"}
        <div className="bar">
          <span>serde-rs/serde</span>
          <i style={{ "--w": "0.78" }} />
          <span className="term-ok">0.78</span>
        </div>
        {"\n"}
        <div className="bar">
          <span>denoland/deno</span>
          <i style={{ "--w": "0.66" }} />
          <span className="term-warn">0.66</span>
        </div>
        {"\n\n"}
        <span className="term-dim">issues fetched 142 · cached 89</span>
        {"\n"}
        <span className="term-dim">rate limit 4,987 / 5,000</span>
      </Screen>

      <Screen label="issues">
        <div className="term-row">
          <span>#3041</span>
          <span className="term-dim">0.92</span>
        </div>
        <div className="term-row">
          <span className="term-ok">unassigned</span>
        </div>
        <div className="term-row">
          <span className="term-dim">good first issue · well described</span>
        </div>
        {"\n"}
        <div className="term-row">
          <span>#2988</span>
          <span className="term-dim">0.81</span>
        </div>
        <div className="term-row">
          <span className="term-ok">unassigned</span>
        </div>
        <div className="term-row">
          <span className="term-dim">stale 34d · needs maintainer</span>
        </div>
        {"\n"}
        <div className="term-row">
          <span>#2950</span>
          <span className="term-dim">0.74</span>
        </div>
        <div className="term-row">
          <span className="term-warn">assigned</span>
        </div>
      </Screen>

      <Screen label="repos">
        <span className="term-dim">discover --lang rust --min-stars 100</span>
        {"\n\n"}
        <div className="term-row">
          <span>bevyengine/bevy</span>
          <span className="term-ok">0.83</span>
        </div>
        <div className="term-row">
          <span>rust-lang/rust</span>
          <span className="term-ok">0.79</span>
        </div>
        <div className="term-row">
          <span>nushell/nushell</span>
          <span className="term-warn">0.68</span>
        </div>
        <div className="term-row">
          <span>lapce/lapce</span>
          <span className="term-ok">0.74</span>
        </div>
        <div className="term-row">
          <span>helix-editor/helix</span>
          <span className="term-dim">0.61</span>
        </div>
      </Screen>

      <Screen label="detail">
        <span className="term-dim">serde-rs/serde · #3041</span>
        {"\n\n"}
        <span>score </span>
        <span className="term-ok">0.92</span>
        {"\n"}
        <span className="term-dim">label 0.50 · desc 0.30 · open 0.12</span>
        {"\n\n"}
        <span className="term-dim">Add serde_json::Value::path accessor</span>
        {"\n"}
        <span className="term-dim">for nested get with error reporting.</span>
        {"\n\n"}
        <span className="term-prompt">[a]</span>
        <span className="term-dim"> accept </span>
        <span className="term-prompt">[r]</span>
        <span className="term-dim"> reject </span>
        <span className="term-prompt">[d]</span>
        <span className="term-dim"> details </span>
      </Screen>
    </div>
  );
}
