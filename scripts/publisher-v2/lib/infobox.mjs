import { escapeTableCell, toImage, toText } from "./utils.mjs";

function readStringOption(script, optionName, fallback = "") {
  const escapedName = optionName.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const optionLine = script
    .split(/\r?\n/)
    .find((line) =>
      new RegExp(
        `^\\s*${escapedName}\\s*:`,
        "i",
      ).test(line),
    );

  if (!optionLine) {
    return fallback;
  }

  const valueMatch = optionLine.match(
    /:\s*["']([^"']+)["']/,
  );

  return valueMatch?.[1] ?? fallback;
}

function readRows(script) {
  const rows = [];
  const pattern = /\[\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*\]/g;
  for (const match of script.matchAll(pattern)) rows.push([match[1], match[2]]);
  return rows;
}

function buildInfobox({ frontmatter, typeLabel, imageField, fallbackImage, rows }) {
  const title = toText(frontmatter.name || frontmatter.title || "Infobox").trim();
  const imageValue =
  frontmatter[imageField] ||
  frontmatter.map ||
  frontmatter.portrait ||
  frontmatter.art ||
  fallbackImage;

const image = toImage(imageValue);
  const dataRows = [];
  if (typeLabel) dataRows.push(["Type", typeLabel]);
  for (const [label, field] of rows) {
    const value = toText(frontmatter[field]).trim();
    if (value) dataRows.push([label, value]);
  }
  const lines = ["> [!infobox]", `> ## ${title}`];
  if (image) lines.push(">", `> ${image}`);
  if (dataRows.length > 0) {
    lines.push(">", "> | Field | Value |", "> | --- | --- |", ...dataRows.map(([label, value]) => `> | ${escapeTableCell(label)} | ${escapeTableCell(value)} |`));
  }
  return lines.join("\n");
}

export function transformDataviewInfoboxes(body, frontmatter) {
  const lines = body.split(/\r?\n/);
  const output = [];
  for (let index = 0; index < lines.length; index += 1) {
    const current = lines[index];
    if (!/^\s*>\s*\[!infobox\]/i.test(current)) { output.push(current); continue; }
    const next = lines[index + 1] ?? "";
    if (!/^\s*>\s*```dataviewjs\s*$/i.test(next)) { output.push(current); continue; }
    const scriptLines = [];
    index += 2;
    while (index < lines.length) {
      const line = lines[index];
      if (/^\s*>\s*```\s*$/.test(line)) break;
      scriptLines.push(line.replace(/^\s*>\s?/, ""));
      index += 1;
    }
    const script = scriptLines.join("\n");
    output.push(buildInfobox({
      frontmatter,
      typeLabel: readStringOption(script, "typeLabel"),
      imageField: readStringOption(script, "imageField", "portrait"),
      fallbackImage: readStringOption(script, "fallbackImage"),
      rows: readRows(script),
    }));
  }
  return output.join("\n");
}
