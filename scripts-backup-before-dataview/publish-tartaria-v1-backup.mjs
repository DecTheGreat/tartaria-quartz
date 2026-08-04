import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, "publisher.config.json");

const slash = (v) => v.replaceAll("\\", "/");

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(root) {
  const out = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

function ignored(rel, folders) {
  const n = slash(rel);
  return folders.some((f) => {
    const x = slash(f).replace(/\/+$/, "");
    return n === x || n.startsWith(`${x}/`);
  });
}

function parseMarkdown(markdown) {
  const source = markdown.replace(/^\uFEFF/, "");
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!m) return { fm: {}, body: source };
  return { fm: YAML.parse(m[1]) ?? {}, body: source.slice(m[0].length) };
}

function toText(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return v.map(toText).filter(Boolean).join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function toImage(v) {
  const t = toText(v).trim();
  if (!t) return "";
  if (t.startsWith("![[")) return t;
  if (t.startsWith("[[") && t.endsWith("]]")) return `!${t}`;
  return `![[${t}]]`;
}

function replaceViews(body, fm) {
  return body.replace(/`?VIEW\[\{([^}]+)\}\](?:\[([^\]]+)\])?`?/g,
    (_m, field, renderer = "") => {
      const value = fm[String(field).trim()];
      return String(renderer).toLowerCase().includes("image")
        ? toImage(value)
        : toText(value);
    });
}

function removeCallouts(body, names) {
  const protectedNames = names.map((n) => n.toLowerCase());
  const lines = body.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*>\s*\[!([^\]\s+-]+)[^\]]*\]/i);
    if (m && protectedNames.includes(m[1].toLowerCase())) {
      i++;
      while (i < lines.length && /^\s*>/.test(lines[i])) i++;
      i--;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

function removeBlocks(body, langs) {
  if (!langs.length) return body;
  const p = langs.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  return body.replace(new RegExp(`\\n?\`\`\`(?:${p})\\s*[\\s\\S]*?\`\`\`\\n?`, "gi"), "\n");
}

function embeddedAssets(markdown) {
  const refs = new Set();
  for (const m of markdown.matchAll(/!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) refs.add(m[1].trim());
  return [...refs];
}

async function main() {
  if (!(await exists(configPath))) throw new Error("Missing publisher.config.json");
  const cfg = JSON.parse(await fs.readFile(configPath, "utf8"));
  const vault = path.resolve(cfg.vaultPath);
  const output = path.resolve(projectRoot, cfg.outputPath ?? "content");
  const ignoreFolders = cfg.ignoreFolders ?? [];
  const removeCalloutNames = cfg.removeCallouts ?? ["GM"];
  const removeCodeBlocks = cfg.removeCodeBlocks ?? ["dataview", "dataviewjs", "meta-bind-button"];

  if (!(await exists(vault))) throw new Error(`Vault path does not exist: ${vault}`);

  const files = await walk(vault);
  const allByRel = new Map();
  const allByBase = new Map();
  for (const file of files) {
    const rel = slash(path.relative(vault, file));
    if (ignored(rel, ignoreFolders)) continue;
    allByRel.set(rel.toLowerCase(), file);
    const base = path.basename(file).toLowerCase();
    if (!allByBase.has(base)) allByBase.set(base, []);
    allByBase.get(base).push(file);
  }

  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });

  let published = 0, copied = 0, skipped = 0;
  const copiedAssets = new Set(), missing = [];

  for (const file of files.filter((f) => f.toLowerCase().endsWith(".md"))) {
    const rel = slash(path.relative(vault, file));
    if (ignored(rel, ignoreFolders)) { skipped++; continue; }

    const { fm, body: rawBody } = parseMarkdown(await fs.readFile(file, "utf8"));
    if (fm.publish !== true) { skipped++; continue; }

// Quartz uses `title` for page headings and Explorer labels.
// Preserve NPC ranks/offices, then use `name` as the public page title.
if (fm.name) {
  if (fm.type === "npc" && fm.title) {
    fm.character_title = fm.title;
  }

  fm.title = fm.name;
}

    let body = removeCallouts(rawBody, removeCalloutNames);
    body = removeBlocks(body, removeCodeBlocks);
    const viewFields = { ...fm };

if (fm.type === "npc" && fm.character_title) {
  viewFields.title = fm.character_title;
}

body = replaceViews(body, viewFields)
  .replace(/\n{4,}/g, "\n\n\n")
  .trim() + "\n";

    const result = `---\n${YAML.stringify(fm).trim()}\n---\n\n${body}`;
    const dest = path.join(output, rel);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, result, "utf8");
    published++;

    for (const ref of embeddedAssets(result)) {
      const cleaned = slash(ref).replace(/^\/+/, "");
      let asset = allByRel.get(cleaned.toLowerCase());
      if (!asset) {
        const matches = allByBase.get(path.basename(cleaned).toLowerCase()) ?? [];
        if (matches.length === 1) asset = matches[0];
      }
      if (!asset) { missing.push(`${rel}: ${ref}`); continue; }

      const assetRel = slash(path.relative(vault, asset));
      if (copiedAssets.has(assetRel)) continue;
      const assetDest = path.join(output, assetRel);
      await fs.mkdir(path.dirname(assetDest), { recursive: true });
      await fs.copyFile(asset, assetDest);
      copiedAssets.add(assetRel);
      copied++;
    }
  }

  console.log(`Published notes: ${published}`);
  console.log(`Copied assets: ${copied}`);
  console.log(`Skipped notes: ${skipped}`);
  if (missing.length) {
    console.log(`Missing assets: ${missing.length}`);
    for (const item of missing.slice(0, 20)) console.log(`- ${item}`);
  }
}

main().catch((err) => {
  console.error(`Tartaria Publisher failed: ${err.message}`);
  process.exitCode = 1;
});
