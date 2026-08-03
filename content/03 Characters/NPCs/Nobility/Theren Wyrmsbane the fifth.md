---
type: npc
name: Theren Wyrmsbane the fifth
aliases: []
category: Nobility
occupation: Ruler
title: Theren Wyrmsbane the fifth
status: Alive
importance: Minor
disposition: Friendly
ancestry: Human
culture: null
gender: null
pronouns: null
age: null
alignment: null
continent: "[[Eldoria]]"
country: "[[Galeria]]"
region: "[[Frostfjord]]"
settlement: Wyrmsgate
district: Palace District
location: Wyrmsgate
poi: null
faction: ""
organizations: []
religion: ""
deity: null
portrait: null
token: null
map: null
public_description: null
publish: true
created: 2026-07-22
updated: 2026-07-22
character_title: Lord
---

# Theren Wyrmsbane the fifth
> [!infobox]
> # Theren Wyrmsbane the fifth
>
>
>
> ###### Identity
>
> | Field | Value |
> |---|---|
> | **Category** | Nobility |
> | **Occupation** | Ruler |
> | **Title** | Lord |
> | **Ancestry** | Human |
> | **Culture** |  |
> | **Pronouns** |  |
> | **Age** |  |
> | **Status** | Alive |
>
> ###### Connections
>
> | Field | Value |
> |---|---|
> | **Settlement** | Wyrmsgate |
> | **Location** | Wyrmsgate |
> | **Faction** |  |
> | **Religion** |  |
> | **Disposition** | Friendly |

## Overview


Write a brief public description of who this character is and why they matter.
## Portrait

```image-layout-a
![[PLACEHOLDER-NPC-PORTRAIT.png]]
```

^portrait

## Overview

`=this.public_description`

Write a brief public description of who this character is and why they matter.

## Appearance

Describe their:

- Build and height
- Face and distinguishing features
- Clothing and equipment
- Mannerisms and posture
- General first impression

## Personality

### Traits

-

### Ideals

-

### Bonds

-

### Flaws

-

## Voice and Mannerisms

**Voice:**
Describe their accent, tone, pace and vocabulary.

**Common expressions:**

-
-

**Mannerisms:**

-
-

## Role

### Occupation

Describe what the NPC does and how they fit into their community.

### Responsibilities

-
-

### Reputation

Describe how the public, authorities and local factions view them.

## Location

**Usual location:** `=this.location`

Describe where the NPC is normally found and what they are usually doing.

## Relationships

### Allies

```dataview
LIST
FROM "03 Characters"
WHERE contains(allies, this.file.link)
SORT file.name ASC
```

### Rivals and Enemies

```dataview
LIST
FROM "03 Characters"
WHERE contains(enemies, this.file.link)
SORT file.name ASC
```

### Family and Personal Connections

| Character | Relationship | Notes |
|---|---|---|
|  |  |  |

## Factions and Organisations

Describe the NPC's relationship with their faction, employer, faith or political group.

## History

Summarise the NPC's known history.

### Timeline

| Date | Event |
|---|---|
|  |  |

## Current Situation

Describe what the NPC is currently doing, what pressures they face and how they may become involved with the party.

## Goals

### Immediate Goal

-

### Long-Term Goal

-

### Motivation

-

## Resources

### Authority

Describe any legal, political, religious or social authority they possess.

### Wealth and Property

-

### Allies and Followers

-

### Equipment

-

## Knowledge

### Common Knowledge

Information most locals know about the NPC.

-
-

### Specialist Knowledge

Information the NPC knows because of their occupation, history or faction.

-
-

## Services

| Service | Cost | Availability |
|---|---:|---|
|  |  |  |

## Quests and Adventure Hooks

### Hooks

-
-
-

### Active Quests

```dataview
TABLE
status AS "Status",
quest_giver AS "Quest Giver",
settlement AS "Settlement"
FROM "06 Adventures/Quests"
WHERE contains(quest_giver, this.file.link)
SORT file.name ASC
```

## Encounters

Describe how the NPC behaves during social, exploration or combat encounters.

### Social Approach

-

### Negotiation

-

### Combat Behaviour

-

## Statistics

> [!note] Stat Block
> Add or embed the NPC's stat block here when one is required.
>
> ```statblock
> creature:
> ```

## Inventory and Treasure

-
-

## Notes

-
-

---
