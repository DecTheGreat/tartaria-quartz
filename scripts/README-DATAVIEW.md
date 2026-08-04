# Tartaria Publisher v2 — Dataview TABLE support

This build adds static conversion for the Dataview TABLE pattern used by the Tartaria Geography notes.

Supported features include:

```dataview
TABLE
climate AS "Climate",
terrain AS "Terrain",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND country = this.file.link
SORT file.name ASC
```

The publisher:

- queries only notes with `publish: true`
- creates normal Markdown tables for Quartz
- supports `FROM "folder"`
- supports equality conditions with `WHERE` and `AND`
- supports quoted literals such as `type = "region"`
- supports `field = this.file.link`
- supports `file.name`, `file.link`, and frontmatter fields
- supports ascending and descending `SORT`
- removes unsupported Dataview blocks after conversion

## Install

1. Back up the current scripts folder.
2. Merge the ZIP's `scripts` folder into `C:\Users\decjo\tartaria-quartz`.
3. Run:

```powershell
node .\scripts\publish-tartaria.mjs
```

The report should include:

```text
Converted tables: ...
```

Then inspect Galeria:

```powershell
Get-Content ".\content\02 Geography\Countries\Galeria.md"
```

The Regions, Settlements, and POI sections should contain ordinary Markdown tables rather than Dataview code.

Preview:

```powershell
npx quartz build --serve
```
