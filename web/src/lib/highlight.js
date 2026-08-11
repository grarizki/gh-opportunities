const RULES = {
  bash: [
    [/#.*/, "c"],
    [/"(?:[^"\\]|\\.)*"/, "s"],
    [/'(?:[^'\\]|\\.)*'/, "s"],
    [/--?[a-z][\w-]*/, "f"],
    [/\$[A-Za-z_][A-Za-z0-9_]*/, "e"],
  ],
  json: [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/, "k"],
    [/"(?:[^"\\]|\\.)*"/, "s"],
    [/\b-?\d+(?:\.\d+)?\b/, "n"],
    [/\b(?:true|false|null)\b/, "b"],
  ],
  toml: [
    [/#.*/, "c"],
    [/^[\w.-]+(?=\s*=)/, "k"],
    [/"(?:[^"\\]|\\.)*"/, "s"],
    [/\b-?\d+(?:\.\d+)?\b/, "n"],
    [/\b(?:true|false)\b/, "b"],
  ],
};

export function tokenize(src, lang) {
  const rules = RULES[lang] || [];
  const out = [];
  let i = 0;
  while (i < src.length) {
    let matched = null;
    for (const [re, cls] of rules) {
      re.lastIndex = 0;
      const m = re.exec(src.slice(i));
      if (m && m.index === 0 && m[0].length > 0) {
        matched = { cls, text: m[0] };
        break;
      }
    }
    if (matched && matched.cls === "f" && i > 0 && !/\s/.test(src[i - 1])) {
      matched = null;
    }
    if (matched) {
      out.push(matched);
      i += matched.text.length;
    } else {
      out.push({ cls: null, text: src[i] });
      i += 1;
    }
  }
  return out;
}
