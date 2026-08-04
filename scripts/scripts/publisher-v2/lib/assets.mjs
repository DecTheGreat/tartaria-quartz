import fs from "node:fs/promises";
import path from "node:path";
import { slash } from "./utils.mjs";

export function findEmbeddedAssets(markdown) {
  const references = new Set();
  for (const match of markdown.matchAll(/!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) references.add(match[1].trim());
  for (const match of markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = decodeURIComponent(match[1].trim());
    if (!/^https?:\/\//i.test(target) && !target.startsWith("data:")) references.add(target);
  }
  return [...references];
}

export function buildAssetIndex(files, vaultRoot, ignored) {
  const byRelativePath = new Map();
  const byBasename = new Map();
  for (const file of files) {
    const relativePath = slash(path.relative(vaultRoot, file));
    if (ignored(relativePath)) continue;
    byRelativePath.set(relativePath.toLowerCase(), file);
    const basename = path.basename(file).toLowerCase();
    if (!byBasename.has(basename)) byBasename.set(basename, []);
    byBasename.get(basename).push(file);
  }
  return { byRelativePath, byBasename };
}

export function resolveAsset({ reference, noteRelativePath, assetIndex }) {
  const cleaned = slash(reference).replace(/^\/+/, "").replace(/^\.\/+/, "");
  let asset = assetIndex.byRelativePath.get(cleaned.toLowerCase());
  if (asset) return asset;
  const noteFolder = path.posix.dirname(noteRelativePath);
  const relativeToNote = path.posix.normalize(path.posix.join(noteFolder, cleaned));
  asset = assetIndex.byRelativePath.get(relativeToNote.toLowerCase());
  if (asset) return asset;
  const matches = assetIndex.byBasename.get(path.posix.basename(cleaned).toLowerCase()) ?? [];
  return matches.length === 1 ? matches[0] : null;
}

export async function copyAsset({ assetPath, vaultRoot, outputRoot }) {
  const relativePath = path.relative(vaultRoot, assetPath);
  const destination = path.join(outputRoot, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(assetPath, destination);
  return slash(relativePath);
}
