import YAML from "yaml";
import { toImage, toText } from "./utils.mjs";

export function parseMarkdown(markdown) {
  const source = markdown.replace(/^\uFEFF/, "");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { frontmatter: {}, body: source };
  return { frontmatter: YAML.parse(match[1]) ?? {}, body: source.slice(match[0].length) };
}

export function serializeMarkdown(frontmatter, body) {
  return `---\n${YAML.stringify(frontmatter).trim()}\n---\n\n${tidyMarkdown(body)}`;
}

export function replaceViews(body, fields) {
  return body.replace(/`?VIEW\[\{([^}]+)\}\](?:\[([^\]]+)\])?`?/g, (_match, fieldName, renderer = "") => {
    const value = fields[String(fieldName).trim()];
    return String(renderer).toLowerCase().includes("image") ? toImage(value) : toText(value);
  });
}

export function removeCallouts(body, calloutNames) {
  const names = calloutNames.map((name) => name.toLowerCase());
  const lines = body.split(/\r?\n/);
  const output = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s*>\s*\[!([^\]\s+-]+)[^\]]*\]/i);
    if (match && names.includes(match[1].toLowerCase())) {
      index += 1;
      while (index < lines.length && /^\s*>/.test(lines[index])) index += 1;
      index -= 1;
      continue;
    }
    output.push(lines[index]);
  }
  return output.join("\n");
}

export function removeCodeBlocks(body, languages) {
  if (!languages.length) return body;
  const escaped = languages.map((language) => language.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  return body.replace(new RegExp(`\n?\`\`\`(?:${escaped})\s*[\s\S]*?\`\`\`\n?`, "gi"), "\n");
}

export function tidyMarkdown(body) {
  return body.replace(/\n{4,}/g, "\n\n\n").replace(/[ \t]+\n/g, "\n").trim() + "\n";
}
