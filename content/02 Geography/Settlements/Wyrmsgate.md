---
type: settlement
name: Wyrmsgate
aliases: null
settlement_type: city
status: active
publish: true
continent: "[[Eldoria]]"
country: "[[Galeria]]"
region: "[[Frostfjord]]"
population: null
government: null
ruler: Theren Wyrmsbane the fifth
faction: null
climate: null
terrain: null
languages: null
religions: null
dominant_species: null
wealth_level: null
law_level: null
threat_level: null
map: 10 Assets/Maps/placeholder-map.png
created: 2026-07-22
updated: 2026-07-22
title: Wyrmsgate
---

> [!infobox]
> ## Wyrmsgate
>
> ![[10 Assets/Maps/placeholder-map.png]]
>
> | Field | Value |
> | --- | --- |
> | Type | Settlement |
> | Type | city |
> | Region | [[Frostfjord]] |
> | Country | [[Galeria]] |
> | Continent | [[Eldoria]] |
> | Status | active |
> | Ruler | Theren Wyrmsbane the fifth |

# Wyrmsgate

## Overview

Give a concise description of the settlement, its role in the region, and what makes it distinctive.

## First Impressions

Describe what travellers first notice when approaching or entering the settlement.

- Sights:
- Sounds:
- Smells:
- Atmosphere:

## Geography

Describe the settlement’s location, surrounding landscape, nearby roads, rivers, coastlines, forests, mountains, or other notable features.

## Districts

Describe the major districts, quarters, neighbourhoods, wards, or sections of the settlement.

### District Name

- Purpose:
- Atmosphere:
- Important locations:
- Notable residents:

## Government

Describe how the settlement is governed and how much authority the regional or national government holds here.

## Ruler and Authorities

Describe the ruler, council, magistrates, guards, religious authorities, guild leaders, or other people with official power.

## Law and Order

Describe local laws, punishments, guards, courts, corruption, tolls, curfews, taxes, and unusual customs.

## Population

Describe the size and makeup of the population.

Include:

- ancestry and species
- social classes
- common professions
- visitors and travellers
- minorities and outsiders

## Culture

Describe local customs, food, clothing, festivals, attitudes, traditions, entertainment, and social expectations.

## Religion

Describe temples, shrines, clergy, burial customs, holy days, pilgrimages, local beliefs, and superstitions.

## Economy

Describe the settlement’s main industries, markets, trade routes, exports, imports, wealth, poverty, and illegal trade.

## Services

### Inns and Taverns

```dataview
TABLE
poi_type AS "Type",
owner AS "Owner",
district AS "District",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
AND settlement = this.file.link
AND contains(["inn", "tavern"], lower(string(poi_type)))
SORT file.name ASC
```

### Shops and Markets

```dataview
TABLE
poi_type AS "Type",
owner AS "Owner",
district AS "District",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
AND settlement = this.file.link
AND contains(
  [
    "shop",
    "market",
    "merchant",
    "smithy",
    "apothecary"
  ],
  lower(string(poi_type))
)
SORT file.name ASC
```

### Temples and Shrines

```dataview
TABLE
poi_type AS "Type",
religion AS "Religion",
owner AS "Clergy or Keeper",
district AS "District"
FROM "02 Geography/POI"
WHERE type = "poi"
AND settlement = this.file.link
AND contains(
  [
    "temple",
    "shrine",
    "chapel",
    "monastery"
  ],
  lower(string(poi_type))
)
SORT file.name ASC
```

## Points of Interest

```dataview
TABLE
poi_type AS "Type",
district AS "District",
owner AS "Owner",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
AND settlement = this.file.link
SORT district ASC, poi_type ASC, file.name ASC
```

## Factions

```dataview
TABLE
faction_type AS "Type",
leader AS "Leader",
headquarters AS "Headquarters",
status AS "Status"
FROM "04 Factions"
WHERE settlement = this.file.link
SORT file.name ASC
```

## Notable Characters

```dataview
TABLE
role AS "Role",
faction AS "Faction",
district AS "District",
status AS "Status"
FROM "03 Characters"
WHERE type = "character"
AND settlement = this.file.link
SORT file.name ASC
```

## Creatures and Threats

```dataview
TABLE
creature_type AS "Type",
cr AS "CR",
habitat AS "Habitat",
rarity AS "Rarity"
FROM "05 Creatures"
WHERE type = "creature"
AND settlement = this.file.link
SORT cr ASC, file.name ASC
```

## Active Quests

```dataview
TABLE
campaign AS "Campaign",
adventure AS "Adventure",
status AS "Status",
difficulty AS "Difficulty"
FROM "07 Campaigns"
WHERE type = "quest"
AND settlement = this.file.link
AND status != "completed"
SORT campaign ASC, file.name ASC
```

## Planned Encounters

```dataview
TABLE
campaign AS "Campaign",
quest AS "Quest",
encounter_type AS "Type",
difficulty AS "Difficulty",
status AS "Status"
FROM "07 Campaigns"
WHERE type = "encounter"
AND settlement = this.file.link
AND status != "completed"
SORT campaign ASC, file.name ASC
```

## History

Describe the settlement’s founding, major conflicts, disasters, rulers, migrations, expansions, and political changes.

## Current Events

Describe current political, military, economic, religious, social, criminal, or supernatural developments.

## Rumours

-
-
-

## Adventure Hooks

-
-
-

## GM Information
