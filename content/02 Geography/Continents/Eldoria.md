---
type: continent
publish: true
name: Eldoria
aliases: null
status: active
population: null
climate: null
terrain: null
area: null
largest_country: null
largest_settlement: null
dominant_species: null
languages: null
religions: null
governments: null
major_resources: null
major_exports: null
major_imports: null
oceans: null
seas: null
islands: null
art: 10 Assets/Portraits/placeholder-character.png
map: 10 Assets/Maps/Eldoria.png
title: Eldoria
---

## created: 2026-07-19
updated: 2026-07-19

> [!infobox]
>
> ```dataviewjs
> const p = dv.current();
>
> const clean = value => {
>   if (value === null || value === undefined || value === "") return "";
>   if (Array.isArray(value)) return value.join(", ");
>   return String(value);
> };
>
> const map = p.map ?? "10 Assets/Maps/placeholder-map.png";
>
> const rows = [
>   ["Status", p.status],
>   ["Population", p.population],
>   ["Climate", p.climate],
>   ["Terrain", p.terrain],
>   ["Area", p.area],
>   ["Largest Country", p.largest_country],
>   ["Largest Settlement", p.largest_settlement],
>   ["Dominant Species", p.dominant_species],
>   ["Languages", p.languages],
>   ["Religions", p.religions],
>   ["Major Resources", p.major_resources],
>   ["Oceans", p.oceans],
>   ["Seas", p.seas],
> ];
>
> dv.container.innerHTML = `
>   <div class="tartaria-map">
>     <img src="${app.vault.adapter.getResourcePath(map)}">
>   </div>
>
>   <div class="tartaria-infobox-title">
>     ${clean(p.name) || p.file.name}
>   </div>
>
>   <div class="tartaria-infobox-section">
>     Continent
>   </div>
>
>   <table class="tartaria-infobox-table">
>     ${rows
>       .filter(([, value]) => clean(value) !== "")
>       .map(([field, value]) => `
>         <tr>
>           <td class="tartaria-field">${field}</td>
>           <td class="tartaria-value">${clean(value)}</td>
>         </tr>
>       `)
>       .join("")}
>   </table>
> `;
> ```

# Eldoria

## Overview

Provide a brief description of the continent, its defining features, and its place within Tartaria.

## Geography

Describe its shape, coastlines, mountain ranges, rivers, forests, deserts, plains, and other major features.

## Climate

Describe its climate zones, seasons, weather patterns, and supernatural environmental effects.

## Countries

```dataview
TABLE
government AS "Government",
capital AS "Capital",
population AS "Population",
status AS "Status"
FROM "02 Geography/Countries"
WHERE type = "country"
AND continent = this.file.link
SORT file.name ASC
```

## Regions

```dataview
TABLE
country AS "Country",
climate AS "Climate",
terrain AS "Terrain",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND continent = this.file.link
SORT country ASC, file.name ASC
```

## Major Settlements

```dataview
TABLE
settlement_type AS "Type",
country AS "Country",
region AS "Region",
population AS "Population"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
AND continent = this.file.link
SORT population DESC, file.name ASC
```

## Peoples & Cultures

Describe the dominant peoples, cultures, customs, languages, clothing, cuisine, and traditions.

## Government & Politics

Describe major powers, political relationships, alliances, rivalries, and conflicts.

## Religion

Describe important religions, deities, pilgrimage sites, temples, and regional beliefs.

## Economy & Trade

Describe natural resources, industries, trade routes, exports, imports, and major economic powers.

## History

Describe the continent’s major historical periods, migrations, wars, empires, disasters, and turning points.

## Current Events

Describe major political, military, religious, economic, or supernatural events currently affecting the continent.

## Factions

```dataview
TABLE
faction_type AS "Type",
leader AS "Leader",
headquarters AS "Headquarters",
status AS "Status"
FROM "04 Factions"
WHERE continent = this.file.link
SORT importance ASC, file.name ASC
```

## Notable Characters

```dataview
TABLE
entity_type AS "Type",
role AS "Role",
country AS "Country",
region AS "Region",
settlement AS "Settlement"
FROM "03 Characters"
WHERE type = "character"
AND continent = this.file.link
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
AND continent = this.file.link
SORT cr ASC, file.name ASC
```

## Rumours

## GM Information
