---
type: index
index_type: factions
publish: true
description: An index of all factions in Tartaria.
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
---

# Factions

An index of Tartaria's factions, organisations, guilds, cults, governments and secret societies.

---

## Create

```meta-bind-button
label: New Faction Category
icon: folder-plus
style: primary
tooltip: Create a new faction category
id: new-faction-category
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Faction_Category.md
```

---

## Categories

```dataview
TABLE WITHOUT ID
file.link AS "Category",
length(filter(file.folder, (f) => contains(f, file.name))) AS "Factions"
FROM "04 Factions"
WHERE type = "faction_category"
SORT file.name ASC
```

---

## All Factions

```dataview
TABLE
category AS "Category",
faction_type AS "Type",
headquarters AS "Headquarters",
integrity AS "Integrity",
alignment AS "Alignment",
status AS "Status"
FROM "04 Factions"
WHERE type = "faction"
SORT file.name ASC
```

---
## Honourable Factions

```dataview
TABLE
category AS "Category",
faction_type AS "Type",
headquarters AS "Headquarters",
leader AS "Leader"
FROM "04 Factions"
WHERE type = "faction"
AND contains(
  list("Honourable", "Generally Honourable"),
  integrity
)
SORT file.name ASC
```

## Corrupt Factions

```dataview
TABLE
category AS "Category",
faction_type AS "Type",
headquarters AS "Headquarters",
leader AS "Leader",
integrity AS "Integrity"
FROM "04 Factions"
WHERE type = "faction"
AND contains(
  list("Compromised", "Corrupt", "Deeply Corrupt"),
  integrity
)
SORT integrity ASC, file.name ASC
```

## Statistics

```dataview
TABLE WITHOUT ID
length(rows) AS "Faction Count"
FROM "04 Factions"
WHERE type = "faction"
```

---

## Recently Modified

```dataview
TABLE
file.mtime AS "Modified",
category,
status
FROM "04 Factions"
WHERE type = "faction"
SORT file.mtime DESC
LIMIT 10
```

---

# Health Checks

## Missing Category

```dataview
TABLE
status,
headquarters
FROM "04 Factions"
WHERE type = "faction"
AND (!category OR category = "")
```

---

## Missing Headquarters

```dataview
TABLE
category,
status
FROM "04 Factions"
WHERE type = "faction"
AND (!headquarters OR headquarters = "")
```

---

## Missing Leader

```dataview
TABLE
category,
headquarters
FROM "04 Factions"
WHERE type = "faction"
AND (!leader OR leader = "")
```

---

## Missing Symbol

```dataview
TABLE
category,
leader
FROM "04 Factions"
WHERE type = "faction"
AND (!symbol OR symbol = "")
```

---

## Missing Public Description

```dataview
TABLE
category,
leader
FROM "04 Factions"
WHERE type = "faction"
AND (!public_description OR public_description = "")
```
