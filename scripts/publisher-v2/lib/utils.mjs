import fs from "node:fs/promises";
import path from "node:path";

export const slash = (value) => value.replaceAll("\\", "/");

export async function exists(filePath) {
  try { await fs.access(filePath); return true; } catch { return false; }
}

export async function walk(root) {
  const output = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) output.push(...await walk(fullPath));
    else output.push(fullPath);
  }
  return output;
}

export function isIgnored(relativePath, ignoredFolders) {
  const normalised = slash(relativePath);
  return ignoredFolders.some((folder) => {
    const ignored = slash(folder).replace(/\/+$/, "");
    return normalised === ignored || normalised.startsWith(`${ignored}/`);
  });
}

export function toText(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(toText).filter(Boolean).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function toImage(value) {
  const text = toText(value).trim();
  if (!text) return "";
  if (text.startsWith("![[")) return text;
  if (text.startsWith("[[") && text.endsWith("]]")) return `!${text}`;
  if (/^!\[[^\]]*\]\([^)]+\)$/.test(text)) return text;
  return `![[${text}]]`;
}

export function escapeTableCell(value) {
  return String(value).replaceAll("|", "\\|").replace(/\r?\n/g, "<br>");
}
