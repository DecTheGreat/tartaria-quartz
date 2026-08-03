---
type: region
region_type: null
publish: true
name: Harvestlands
aliases: null
status: active
continent: "[[Eldoria]]"
country: "[[Galeria]]"
parent_region: null
climate: null
terrain: null
government: null
ruler: null
capital: null
population: null
dominant_species: null
languages: null
religions: null
factions: null
threat_level: null
art: 10 Assets/Portraits/placeholder.png
map: 10 Assets/Maps/placeholder-map.png
created: 2026-07-22
updated: 2026-07-22
title: Harvestlands
---

> [!infobox]
> ## Harvestlands
>
> ![[10 Assets/Maps/placeholder-map.png]]
>
> | Field | Value |
> | --- | --- |
> | Type | Region |
> | Continent | [[Eldoria]] |
> | Country | [[Galeria]] |
> | Status | active |

# Harvestlands

## Overview

A short summary of what this region is, where it is, and why it matters.

## Geography

Describe the land, terrain, weather, borders, natural barriers, rivers, mountains, forests, roads, and travel conditions.

## Climate

Describe the general climate, seasons, storms, supernatural weather, or environmental hazards.

## Settlements

```dataview
TABLE location_type, population, ruler, status
FROM "02 Locations"
WHERE parent_region = this.file.link OR region = this.file.link OR parent_region = this.name OR region = this.name
SORT file.name ASC
```

## Important Locations

-

## People & Culture

Describe common peoples, customs, festivals, clothing, food, taboos, languages, and daily life.

## Government & Law

Describe who rules the region, how law is enforced, taxes, justice, corruption, and local power structures.

## Factions

```dataview
TABLE faction_type, leader, headquarters, status
FROM "04 Factions"
WHERE region = this.file.link OR region = this.name
SORT importance ASC, file.name ASC
```

## Notable Characters

```dataview
TABLE role, faction, status
FROM "03 Characters"
WHERE location = this.file.link OR homeland = this.file.link OR region = this.file.link OR location = this.name OR homeland = this.name OR region = this.name
SORT importance ASC, file.name ASC
```

## Economy

Describe exports, imports, trade routes, industries, resources, guilds, agriculture, mining, shipping, and illegal markets.

## Religion & Belief

Describe major temples, local gods, saints, spirits, taboos, cult activity, and burial customs.

## History

## Current Events

## Rumours

-

## Adventure Hooks

-

## GM Information
