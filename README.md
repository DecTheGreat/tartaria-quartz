# Tartaria Publisher v1

Copy `scripts/publish-tartaria.mjs` and `publisher.config.example.json` into the root of `C:\Users\decjo\tartaria-quartz`.

Then run:

```powershell
Copy-Item .\publisher.config.example.json .\publisher.config.json
notepad .\publisher.config.json
Add-Content .gitignore "publisher.config.json"
node .\scripts\publish-tartaria.mjs
npx quartz build --serve
```

Set `vaultPath` in `publisher.config.json` to the exact path of the new Obsidian vault.

The publisher:
- copies only notes with `publish: true`
- replaces common `VIEW[{field}]` expressions with frontmatter values
- converts image views into Obsidian image embeds
- removes configured GM/Secret callouts
- removes Dataview and Meta Bind button blocks
- copies assets embedded by published notes
- never edits the source vault

The Quartz `content` folder is deleted and rebuilt each time.
