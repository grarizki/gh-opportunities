import { useState } from "react";
import { tokenize } from "../lib/highlight.js";

function Tk({ lang, src }) {
  const toks = tokenize(src, lang);
  return (
    <>
      {toks.map((t, i) =>
        t.cls ? (
          <span key={i} className={`tk-${t.cls}`}>
            {t.text}
          </span>
        ) : (
          t.text
        )
      )}
    </>
  );
}

export function CodeBlock({ lang = "bash", label, children }) {
  const src = children.replace(/\n$/, "");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(src);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = src;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block">
      <div className="code-block-head">
        <span className="code-block-label">
          <span className="dot" />
          {label || lang}
        </span>
        <button className="copy-btn" type="button" onClick={copy} aria-label="Copy code">
          {copied ? (
            <span className="copy-ok">Copied</span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre>
        <code>
          <Tk lang={lang} src={src} />
        </code>
      </pre>
    </div>
  );
}

export function Inline({ children }) {
  return <code>{children}</code>;
}
