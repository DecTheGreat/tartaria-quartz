---
type: player_character
entity_type: pc
publish: true
name: Rocko
aliases: null
campaign: "[[the Varmints]]"
party: Varmints
player: Shan
species: Raccoon
ancestry: null
heritage: null
complications: null
heroic_destiny: null
class: Bard
subclass: ""
level_override: null
ac: null
max_hp: ""
initiative_bonus: 0
wisdom_mod: 0
intelligence_mod: 0
perception_training: none
insight_training: none
investigation_training: none
history_training: none
alignment: Chaotic Good
pronouns: HeHim
homeland: null
location: ""
faith: null
portrait: null
created: 2026-08-11
status: Active
level: 5
background: ""
party_role: Striker
armor_class: ""
passive_perception: ""
proficiency_bonus: 3
continent: ""
country: ""
region: ""
settlement: ""
wealth_type: pooled
gold: 0
gold_pool: ""
bonds: []
faction: ""
religion: ""
patron_deity: ""
heroic_inspiration: 0
echo_points: 0
art: 10 Assets/Portraits/Player Portraits/rocko.png
importance: Major
updated: 2026-08-11
title: Rocko
---

> [!infobox]
> # Rocko
>
> ![[10 Assets/Portraits/Player Portraits/rocko.png]]
>
> ###### Player Character
>
> ```dataviewjs
> const p = dv.current();
>
> const party = p.party
>   ? dv.page(p.party.path ?? p.party)
>   : null;
>
> const partyLevel = Number(party?.party_level ?? 0);
>
> const hasOverride =
>   p.level_override !== undefined &&
>   p.level_override !== null &&
>   p.level_override !== "";
>
> const level = hasOverride
>   ? Number(p.level_override)
>   : partyLevel;
>
> const proficiency = level
>   ? Math.ceil(level / 4) + 1
>   : "";
>
> function display(value) {
>   if (value === undefined || value === null || value === "") {
>     return "";
>   }
>
>   if (Array.isArray(value)) {
>     return value.join(", ");
>   }
>
>   if (typeof value === "object") {
>     if (value.display) return value.display;
>
>     if (value.path) {
>       return value.path
>         .split("/")
>         .pop()
>         .replace(/\.md$/i, "");
>     }
>
>     return "";
>   }
>
>   return String(value);
> }
>
> const rows = [
>   ["Player", p.player],
>   ["Party", p.party],
>   ["Species", p.species],
>   ["Ancestry", p.ancestry],
>   ["Class", p.class],
>   ["Subclass", p.subclass],
>   ["Background", p.background],
>   ["Level", level],
>   ["Proficiency Bonus", proficiency ? `+${proficiency}` : ""],
>   ["AC", p.armor_class ?? p.ac],
>   ["Max HP", p.max_hp],
>   ["Initiative", p.initiative_bonus],
>   ["Alignment", p.alignment],
>   ["Pronouns", p.pronouns],
>   ["Homeland", p.homeland],
>   ["Location", p.location],
>   ["Faction", p.faction],
>   ["Religion", p.religion],
>   ["Patron Deity", p.patron_deity],
>   ["Status", p.status]
> ];
>
> dv.table(
>   ["Field", "Value"],
>   rows
>     .filter(([_, value]) => display(value) !== "")
>     .map(([field, value]) => [
>       field,
>       display(value)
>     ])
> );
> ```

# Rocko

## Character Controls

Player: `INPUT[text:player]`

Party: `INPUT[text:party]`

Species: `INPUT[text:species]`

Class: `INPUT[text:class]`

Subclass: `INPUT[text:subclass]`

AC: `INPUT[number:ac]`

Max HP: `INPUT[number:max_hp]`

Initiative Bonus: `INPUT[number:initiative_bonus]`

Wisdom Modifier: `INPUT[number:wisdom_mod]`

Intelligence Modifier: `INPUT[number:intelligence_mod]`

## Skill Training

Perception: `INPUT[inlineSelect(option(none), option(proficient), option(expertise)):perception_training]`

Insight: `INPUT[inlineSelect(option(none), option(proficient), option(expertise)):insight_training]`

Investigation: `INPUT[inlineSelect(option(none), option(proficient), option(expertise)):investigation_training]`

History: `INPUT[inlineSelect(option(none), option(proficient), option(expertise)):history_training]`

## Overview

## Appearance

## Personality

- **Traits:**
- **Ideals:**
- **Bonds:**
- **Flaws:**
- **Fears:**
- **Desires:**

## Relationships

## Backstory

## Campaign Notes
