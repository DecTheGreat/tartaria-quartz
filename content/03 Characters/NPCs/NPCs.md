---
type: index
index_type: npc
publish: true
---

# 👤 NPCs

An index of Tartaria’s named non-player characters, organised by social role and function.

## Create

```meta-bind-button
label: New NPC Category
icon: folder-plus
style: primary

actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_NPC_Category.md
```

---

## NPC Categories

```dataview
TABLE WITHOUT ID
category AS "Category",
length(rows) AS "NPCs"
FROM "03 Characters/NPCs"
WHERE type = "npc"
GROUP BY category
SORT category ASC
```

---

## All NPCs

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
SORT category ASC, file.name ASC
```

---

## Nobility

```dataview
TABLE
title AS "Title",
settlement AS "Settlement",
country AS "Country",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Nobility"
SORT file.name ASC
```

---

## Military

```dataview
TABLE
rank AS "Rank",
occupation AS "Occupation",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Military"
SORT rank ASC, file.name ASC
```

---

## Merchants

```dataview
TABLE
occupation AS "Occupation",
business AS "Business",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Merchant"
SORT settlement ASC, file.name ASC
```

---

## Religious

```dataview
TABLE
religion AS "Religion",
title AS "Title",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Religious"
SORT religion ASC, file.name ASC
```

---

## Criminal

```dataview
TABLE
occupation AS "Role",
faction AS "Faction",
settlement AS "Settlement",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Criminal"
SORT faction ASC, file.name ASC
```

---

## Arcane

```dataview
TABLE
occupation AS "Occupation",
magic_type AS "Magic",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND category = "Arcane"
SORT settlement ASC, file.name ASC
```

---

## Recently Modified

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
settlement AS "Settlement",
file.mtime AS "Modified"
FROM "03 Characters/NPCs"
WHERE type = "npc"
SORT file.mtime DESC
LIMIT 10
```

---

# Health Checks

## Missing Category

```dataview
TABLE
occupation AS "Occupation",
settlement AS "Settlement",
status AS "Status"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND !category
SORT file.name ASC
```

## Missing Occupation

```dataview
TABLE
category AS "Category",
settlement AS "Settlement",
faction AS "Faction"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND !occupation
SORT file.name ASC
```

## Missing Location

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
faction AS "Faction"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND !settlement
AND !region
AND !current_location
SORT file.name ASC
```

## Missing Faction

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
settlement AS "Settlement"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND !faction
SORT file.name ASC
```

## Missing Portrait

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
settlement AS "Settlement"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND (
  !portrait
  OR portrait = "10 Assets/Portraits/placeholder-character.png"
)
SORT file.name ASC
```

## Missing Public Description

```dataview
TABLE
category AS "Category",
occupation AS "Occupation",
settlement AS "Settlement"
FROM "03 Characters/NPCs"
WHERE type = "npc"
AND !summary
SORT file.name ASC
```
