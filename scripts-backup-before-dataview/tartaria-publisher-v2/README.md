# Tartaria Publisher v2

Copy the `scripts` folder into `C:\Users\decjo\tartaria-quartz`.

Back up the old entry file first:

```powershell
Rename-Item .\scripts\publish-tartaria.mjs publish-tartaria-v1-backup.mjs
```

Then test:

```powershell
node .\scripts\publish-tartaria.mjs
```

Expected output includes `Converted infoboxes`.

Inspect Galeria:

```powershell
Get-Content ".\content\02 Geography\Countries\Galeria.md" -TotalCount 80
```

The published note should contain a normal Markdown infobox and no `dataviewjs`.
