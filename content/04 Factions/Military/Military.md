---
type: faction_category
description: null
publish: true
created: 2026-07-22
updated: 2026-07-22
---

# Military

> [!summary]
> Add a short description of the factions grouped under **Military**.

---

## Create

```meta-bind-button
label: New Faction
icon: users-round
style: primary
tooltip: Create a new faction in this category
id: new-faction
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Faction.md
```

---

## Factions

```dataview
TABLE
faction_type AS "Type",
public_reputation AS "Reputation",
integrity AS "Integrity",
headquarters AS "Headquarters",
leader AS "Leader",
status AS "Status"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
SORT file.name ASC
```

---

## Major Factions

```dataview
TABLE
faction_type AS "Type",
integrity AS "Integrity",
headquarters AS "Headquarters",
leader AS "Leader"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
AND importance = "Major"
SORT file.name ASC
```

---

## Recently Modified

```dataview
TABLE
file.mtime AS "Modified",
faction_type AS "Type",
integrity AS "Integrity",
status AS "Status"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
SORT file.mtime DESC
LIMIT 10
```

---

## Statistics

```dataview
TABLE WITHOUT ID
length(rows) AS "Faction Count"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
```

---

# Health Checks

## Missing Faction Type

```dataview
TABLE
integrity AS "Integrity",
leader AS "Leader",
headquarters AS "Headquarters"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
AND (!faction_type OR faction_type = "")
SORT file.name ASC
```

## Missing Integrity

```dataview
TABLE
faction_type AS "Type",
leader AS "Leader",
headquarters AS "Headquarters"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
AND (!integrity OR integrity = "")
SORT file.name ASC
```

## Missing Leader

```dataview
TABLE
faction_type AS "Type",
integrity AS "Integrity",
headquarters AS "Headquarters"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
AND (!leader OR leader = "")
SORT file.name ASC
```

## Missing Headquarters

```dataview
TABLE
faction_type AS "Type",
integrity AS "Integrity",
leader AS "Leader"
FROM "04 Factions"
WHERE type = "faction"
AND file.folder = this.file.folder
AND (!headquarters OR headquarters = "")
SORT file.name ASC
```
