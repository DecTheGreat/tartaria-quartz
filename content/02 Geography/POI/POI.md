---
type: index
index_type: poi
publish: true
---

# 🏛 Points of Interest

An index of Tartaria’s taverns, temples, shops, castles, ruins, dungeons, landmarks, and other notable locations.

## Create

---

## Points of Interest

| Name | Type | Settlement | Region | Country | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] | Inn | [[Wrexfjord]] | [[Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] | Tavern | [[Wrexfjord]] | [[Frostfjord]] | [[Galeria]] | Old Tom One-Eye | active |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] | Inn | [[Wyrmsgate]] | [[Frostfjord]] | [[Galeria]] | [[Halda Tern]] | active |

---

## POIs by Settlement

| Name | Type | District | Owner | Status |
| --- | --- | --- | --- | --- |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] | Inn | Merchants Quarter | [[Halda Tern]] | active |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] | Tavern | Slums | Old Tom One-Eye | active |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] | Inn | Merchant Quarter |  | active |

---

## Statistics

| Name | WITHOUT ID poi_type AS "Type" | length(rows) AS "Count" |
| --- | --- | --- |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] |  |  |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] |  |  |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] |  |  |

---

## Recently Modified

```dataview
TABLE
poi_type AS "Type",
settlement AS "Settlement",
region AS "Region",
file.mtime AS "Modified"
FROM
