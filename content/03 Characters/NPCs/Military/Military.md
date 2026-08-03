---
type: npc_category
name: Military
category: Military
publish: true
description: null
created: 2026-07-21
updated: 2026-07-21
title: Military
---

# Military

## Create

```meta-bind-button
label: New NPC
icon: user-plus
style: primary
tooltip: Create a new NPC
id: new-npc
hidden: false
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_NPC.md
```

---

## Overview

Describe the NPCs who belong to the **Military** category.

## NPCs

```dataview
TABLE
occupation AS "Occupation",
title AS "Title",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status",
importance AS "Importance"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
SORT file.name ASC
```

## Statistics

```dataview
TABLE WITHOUT ID
length(rows) AS "NPC Count"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
```

## Recently Modified

```dataview
TABLE
file.mtime AS "Modified",
occupation AS "Occupation",
settlement AS "Settlement"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
SORT file.mtime DESC
LIMIT 10
```

## Health Checks

### Missing Occupation

```dataview
TABLE
settlement AS "Settlement",
status AS "Status"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
AND (!occupation OR occupation = "")
SORT file.name ASC
```

### Missing Settlement

```dataview
TABLE
occupation AS "Occupation",
status AS "Status"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
AND (!settlement OR settlement = "")
SORT file.name ASC
```

### Missing Portrait

```dataview
TABLE
occupation AS "Occupation",
settlement AS "Settlement"
FROM "03 Characters/NPCs/Military"
WHERE type = "npc"
AND (!portrait OR portrait = "")
SORT file.name ASC
```

## Notes

-
