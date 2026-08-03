import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { exists, isIgnored, slash, walk } from "./utils.mjs";
import { parseMarkdown, removeCallouts, removeCodeBlocks, replaceViews, serializeMarkdown } from "./markdown.mjs";
import { transformDataviewInfoboxes } from "./infobox.mjs";
import { buildAssetIndex, copyAsset, findEmbeddedAssets, resolveAsset } from "./assets.mjs";

export async function runPublisher() {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, "publisher.config.json");
  if (!(await exists(configPath))) throw new Error("Missing publisher.config.json in the Quartz project root.");
  const config = JSON.parse(await fs.readFile(configPath, "utf8"));
  const vaultRoot = path.resolve(config.vaultPath);
  const outputRoot = path.resolve(projectRoot, config.outputPath ?? "content");
  const ignoredFolders = config.ignoreFolders ?? [];
  const hiddenCallouts = config.removeCallouts ?? ["GM", "Secret"];
  const removedCodeBlocks = config.removeCodeBlocks ?? ["dataview", "dataviewjs", "meta-bind-button", "button"];
  if (!(await exists(vaultRoot))) throw new Error(`Vault path does not exist: ${vaultRoot}`);
  const files = await walk(vaultRoot);
  const ignored = (relativePath) => isIgnored(relativePath, ignoredFolders);
  const assetIndex = buildAssetIndex(files, vaultRoot, ignored);
  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });
  let publishedNotes = 0, skippedNotes = 0, copiedAssets = 0, convertedInfoboxes = 0;
  const copiedAssetPaths = new Set();
  const missingAssets = [];
  for (const sourceFile of files.filter((file) => file.toLowerCase().endsWith(".md"))) {
    const relativePath = slash(path.relative(vaultRoot, sourceFile));
    if (ignored(relativePath)) { skippedNotes += 1; continue; }
    const source = await fs.readFile(sourceFile, "utf8");
    const { frontmatter, body: rawBody } = parseMarkdown(source);
    if (frontmatter.publish !== true) { skippedNotes += 1; continue; }
    if (frontmatter.name) {
      if (frontmatter.type === "npc" && frontmatter.title) frontmatter.character_title = frontmatter.title;
      frontmatter.title = frontmatter.name;
    }
    let body = removeCallouts(rawBody, hiddenCallouts);
    const beforeInfobox = body;
    body = transformDataviewInfoboxes(body, frontmatter);
    if (body !== beforeInfobox) convertedInfoboxes += 1;
    body = removeCodeBlocks(body, removedCodeBlocks);
    const viewFields = { ...frontmatter };
    if (frontmatter.type === "npc" && frontmatter.character_title) viewFields.title = frontmatter.character_title;
    body = replaceViews(body, viewFields);
    const result = serializeMarkdown(frontmatter, body);
    const destination = path.join(outputRoot, relativePath);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, result, "utf8");
    publishedNotes += 1;
    for (const reference of findEmbeddedAssets(result)) {
      const assetPath = resolveAsset({ reference, noteRelativePath: relativePath, assetIndex });
      if (!assetPath) { missingAssets.push({ note: relativePath, asset: reference }); continue; }
      const assetRelativePath = slash(path.relative(vaultRoot, assetPath));
      if (copiedAssetPaths.has(assetRelativePath)) continue;
      await copyAsset({ assetPath, vaultRoot, outputRoot });
      copiedAssetPaths.add(assetRelativePath);
      copiedAssets += 1;
    }
  }
  console.log("");
  console.log("Tartaria Publisher v2 complete");
  console.log(`Published notes:     ${publishedNotes}`);
  console.log(`Converted infoboxes: ${convertedInfoboxes}`);
  console.log(`Copied assets:       ${copiedAssets}`);
  console.log(`Skipped notes:       ${skippedNotes}`);
  if (missingAssets.length > 0) {
    console.log("");
    console.log(`Missing assets: ${missingAssets.length}`);
    for (const item of missingAssets.slice(0, 20)) console.log(`- ${item.note}: ${item.asset}`);
    if (missingAssets.length > 20) console.log(`...and ${missingAssets.length - 20} more`);
  }
}
