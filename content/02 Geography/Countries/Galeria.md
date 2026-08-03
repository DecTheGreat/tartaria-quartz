---
type: country
publish: true
name: Galeria
aliases:
  - the Galerian Republic
continent:
  - - Eldoria
status: active
capital:
  - - Iosia
government: Plutocracy
rule: "[[The Golden League]]"
population: null
area: null
climate: Coastal Temperate
terrain: null
languages: null
religions: null
dominant_species: null
currency: null
major_resources: null
major_exports: null
major_imports: null
military_strength: null
law_level: null
threat_level: null
art: 10 Assets/Portraits/placeholder-character.png
map: 10 Assets/Maps/Galeria.png
title: Galeria
---

## created: 2026-07-19
updated: 2026-07-19

> [!infobox]
> ## Galeria
>
> ![[10 Assets/Maps/Galeria.png]]
>
> | Field | Value |
> | --- | --- |
> | Type | Country |
> | Continent | Eldoria |
> | Status | active |
> | Capital | Iosia |
> | Government | Plutocracy |
> | Climate | Coastal Temperate |

# Galeria

## Overview

Provide a short summary of this country, its identity, and its place within Tartaria.

## Geography

dominated by forests, vast and dark, some hills and in the south in the Harvestlands farms.

## Government

Formerly a Monarchy lead by the descendants of a great hero who was part of a band of adventurers who took down the infamous necromancer Xerxes the legendary first necromancer.

After the assassination of the royal family the Golden League took up Stewardship of Galeria after defeating royalists in the Galerian civil war approximately 100 years ago.

## Capital

Iosia the seat of [[The Golden League]] ruling council of Galeria.

## Regions

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

## Settlements

```dataview
TABLE
settlement_type AS "Type",
region AS "Region",
population AS "Population",
status AS "Status"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
AND country = this.file.link
SORT region ASC, file.name ASC
```

## Points of Interest

```dataview
TABLE
poi_type AS "Type",
settlement AS "Settlement",
region AS "Region",
owner AS "Owner"
FROM "02 Geography/POI"
WHERE type = "poi"
AND country = this.file.link
SORT region ASC, settlement ASC, file.name ASC
```

## People & Culture

Describe the country’s peoples, traditions, clothing, cuisine, festivals, taboos, and social customs.

## Languages

Describe common languages, dialects, writing systems, and regional differences.

## Religion

Describe important faiths, temples, clergy, religious laws, pilgrimages, and local beliefs.

## Economy & Trade

Describe its resources, industries, trade routes, exports, imports, guilds, and currency.

## Military

Describe standing armies, levies, navies, fortifications, magical forces, and military traditions.

## Law & Justice

Describe laws, punishments, law enforcement, courts, corruption, and civil rights.

## Factions

```dataview
TABLE
faction_type AS "Type",
leader AS "Leader",
headquarters AS "Headquarters",
status AS "Status"
FROM "04 Factions"
WHERE country = this.file.link
SORT importance ASC, file.name ASC
```

## Notable Characters

```dataview
TABLE
role AS "Role",
region AS "Region",
settlement AS "Settlement",
faction AS "Faction",
status AS "Status"
FROM "03 Characters"
WHERE type = "character"
AND country = this.file.link
SORT importance ASC, file.name ASC
```

## Creatures

```dataview
TABLE
creature_type AS "Type",
cr AS "CR",
habitat AS "Habitat",
rarity AS "Rarity"
FROM "05 Creatures"
WHERE type = "creature"
AND country = this.file.link
SORT cr ASC, file.name ASC
```

## History

Describe its founding, dynasties, revolutions, wars, disasters, migrations, and major historical changes.

## Current Events

Describe major political, social, military, economic, or supernatural events currently affecting the country.

## Rumours

## GM Information
