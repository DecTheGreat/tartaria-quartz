---
type: poi
name: The Bloodied Rat
aliases: null
poi_type: Tavern
status: active
publish: true
continent: "[[Eldoria]]"
country: "[[Galeria]]"
region: "[[Frostfjord]]"
settlement: "[[Wrexfjord]]"
district: Slums
owner: Old Tom One-Eye
faction: the Spectres Thieves Guild
purpose: null
condition: null
access: null
religion: null
wealth_level: null
law_level: null
threat_level: null
map: 10 Assets/Maps/placeholder-map.png
art: 10 Assets/Portraits/placeholder-character.png
created: 2026-07-22
updated: 2026-07-22
title: The Bloodied Rat
---

> [!infobox]
> ## The Bloodied Rat
>
> ![[10 Assets/Maps/placeholder-map.png]]
>
> | Field | Value |
> | --- | --- |
> | Type | Point of Interest |
> | Type | Tavern |
> | Settlement | [[Wrexfjord]] |
> | District | Slums |
> | Region | [[Frostfjord]] |
> | Country | [[Galeria]] |
> | Continent | [[Eldoria]] |
> | Status | active |
> | Owner | Old Tom One-Eye |
> | Faction | the Spectres Thieves Guild |

# The Bloodied Rat

## Overview

Give a concise description of the location, what it is used for, and why it matters.

## First Impressions

Describe what visitors immediately notice.

- Sights:
- Sounds:
- Smells:
- Atmosphere:

## Exterior

Describe the building, landmark, structure, ruins, terrain, entrances, defences, signs, and surrounding area.

## Interior

Describe the main rooms, layout, furnishings, lighting, smells, sounds, and general condition.

## Purpose

Describe the location’s normal function and how people use it.

## Owner or Custodian

Describe who owns, controls, maintains, occupies, or claims the location.

## Staff and Residents

```dataview
TABLE
role AS "Role",
faction AS "Faction",
status AS "Status"
FROM "03 Characters"
WHERE type = "character"
AND poi = this.file.link
SORT role ASC, file.name ASC
```

## Services

Describe goods, services, lodging, food, worship, training, transport, information, healing, or other benefits available here.

## Prices and Stock

| Item or Service | Cost | Availability | Notes |
|---|---:|---|---|
|  |  |  |  |

## Important Areas

### Area Name

- Purpose:
- Appearance:
- Occupants:
- Features:
- Secrets:

## Security

Describe locks, guards, traps, wards, patrols, restricted areas, passwords, and emergency procedures.

## Factions

```dataview
TABLE
faction_type AS "Type",
leader AS "Leader",
status AS "Status"
FROM "04 Factions"
WHERE headquarters = this.file.link
OR poi = this.file.link
SORT file.name ASC
```

## Notable Characters

```dataview
TABLE
role AS "Role",
faction AS "Faction",
status AS "Status"
FROM "03 Characters"
WHERE type = "character"
AND poi = this.file.link
SORT file.name ASC
```

## Creatures and Threats

```dataview
TABLE
creature_type AS "Type",
cr AS "CR",
temperament AS "Temperament",
status AS "Status"
FROM "05 Creatures"
WHERE type = "creature"
AND poi = this.file.link
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
AND poi = this.file.link
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
AND poi = this.file.link
AND status != "completed"
SORT campaign ASC, file.name ASC
```

## History

Describe who built or founded the location, how it has changed, and any major events connected to it.

## Current Situation

Describe what is happening here right now.

## Rumours

-
-
-

## Adventure Hooks

-
-
-

## Treasure and Rewards

Describe valuables, documents, magic items, salvage, secrets, or useful resources found here.

## GM Information
