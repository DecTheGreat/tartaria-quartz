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

| Name | Government | Capital | Population | Status |
| --- | --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Plutocracy | Iosia |  | active |

## Regions

| Name | Country | Climate | Terrain | Status |
| --- | --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] |  |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] |  |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] |  |  | active |

## Major Settlements

| Name | Type | Country | Region | Population |
| --- | --- | --- | --- | --- |
| [[02 Geography/Settlements/Iosia\|Iosia]] | capital | [[Galeria]] | [[Hearthlands]] |  |
| [[02 Geography/Settlements/Wrexfjord\|Wrexfjord]] | city | [[Galeria]] | [[Frostfjord]] |  |
| [[02 Geography/Settlements/Wyrmsgate\|Wyrmsgate]] | city | [[Galeria]] | [[Frostfjord]] |  |

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

_No published entries._

## Notable Characters

_No published entries._

## Creatures

_No published entries._

## Rumours

## GM Information
