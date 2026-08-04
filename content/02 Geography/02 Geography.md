---
type: index
index_type: geography
publish: true
---

# 🌍 Geography

This dashboard provides an overview of Tartaria’s physical world and automatically updates as geography notes are added or changed.

---

## 🌎 Continents

| Name | Status | Climate | Population |
| --- | --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |  |

---

## 👑 Countries

| Name | Continent | Government | Capital | Status |
| --- | --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | Plutocracy | Iosia | active |

---

## 🗺 Regions

| Name | Country | Continent | Climate | Terrain | Status |
| --- | --- | --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] | [[Eldoria]] |  |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] | [[Eldoria]] |  |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] | [[Eldoria]] |  |  | active |

---

## 🏘 Settlements

| Name | Type | Region | Country | Population | Status |
| --- | --- | --- | --- | --- | --- |
| [[02 Geography/Settlements/Wrexfjord\|Wrexfjord]] | city | [[Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Settlements/Wyrmsgate\|Wyrmsgate]] | city | [[Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Settlements/Iosia\|Iosia]] | capital | [[Hearthlands]] | [[Galeria]] |  | active |

---

## 📍 Points of Interest

| Name | Type | Settlement | Region | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] | Inn | [[Wrexfjord]] | [[Frostfjord]] |  | active |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] | Tavern | [[Wrexfjord]] | [[Frostfjord]] | Old Tom One-Eye | active |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] | Inn | [[Wyrmsgate]] | [[Frostfjord]] | [[Halda Tern]] | active |

---

## 🧭 Geographic Hierarchy

```dataviewjs
const continents = dv.pages('"02 Geography/Continents"')
  .where(p => p.type === "continent")
  .sort(p => p.file.name);

const countries = dv.pages('"02 Geography/Countries"')
  .where(p => p.type === "country");

const regions = dv.pages('"02 Geography/Regions"')
  .where(p => p.type === "region");

const settlements = dv.pages('"02 Geography/Settlements"')
  .where(p => p.type === "settlement");

const pois = dv.pages('"02 Geography/POI"')
  .where(p => p.type === "poi");

const sameLink = (value, target) => {
  if (!value || !target) return false;

  const valuePath = value?.path ?? value?.file?.path;
  const targetPath = target?.file?.path;

  if (valuePath && targetPath) return valuePath === targetPath;

  return String(value) === String(target.file.link)
    || String(value) === target.file.name;
};

for (const continent of continents) {
  dv.header(2, continent.file.link);

  const continentCountries = countries
    .where(c => sameLink(c.continent, continent))
    .sort(c => c.file.name);

  if (continentCountries.length === 0) {
    dv.paragraph("*No countries linked to this continent.*");
    continue;
  }

  for (const country of continentCountries) {
    dv.header(3, country.file.link);

    const countryRegions = regions
      .where(r => sameLink(r.country, country))
      .sort(r => r.file.name);

    if (countryRegions.length === 0) {
      dv.paragraph("*No regions linked to this country.*");
      continue;
    }

    for (const region of countryRegions) {
      dv.header(4, region.file.link);

      const regionSettlements = settlements
        .where(s => sameLink(s.region, region))
        .sort(s => s.file.name);

      if (regionSettlements.length === 0) {
        dv.paragraph("*No settlements linked to this region.*");
        continue;
      }

      dv.table(
        ["Settlement", "Type", "Population", "Points of Interest"],
        regionSettlements.map(settlement => {
          const settlementPois = pois
            .where(p => sameLink(p.settlement, settlement))
            .sort(p => p.file.name);

          return [
            settlement.file.link,
            settlement.settlement_type ?? "—",
            settlement.population ?? "—",
            settlementPois.length
              ? settlementPois.map(p => p.file.link)
              : "—"
          ];
        })
      );
    }
  }
}
```

---

## 📝 Recently Modified Geography

| Name | Type | Modified |
| --- | --- | --- |
| [[02 Geography/02 Geography\|02 Geography]] | index |  |
| [[02 Geography/Continents/Continents\|Continents]] | index |  |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | continent |  |
| [[02 Geography/Countries/Countries\|Countries]] | index |  |
| [[02 Geography/Countries/Galeria\|Galeria]] | country |  |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] | poi |  |
| [[02 Geography/POI/POI\|POI]] | index |  |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] | poi |  |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] | poi |  |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | region |  |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | region |  |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | region |  |
| [[02 Geography/Regions/Regions\|Regions]] |  |  |
| [[02 Geography/Settlements/Iosia\|Iosia]] | settlement |  |
| [[02 Geography/Settlements/Settlements\|Settlements]] | index |  |
| [[02 Geography/Settlements/Wrexfjord\|Wrexfjord]] | settlement |  |
| [[02 Geography/Settlements/Wyrmsgate\|Wyrmsgate]] | settlement |  |

---

## ⚠ Geography Health

### Countries Missing a Continent

| Name | Government | Capital |
| --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Plutocracy | Iosia |

### Regions Missing a Country

| Name | Continent | Climate |
| --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Eldoria]] |  |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Eldoria]] |  |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Eldoria]] |  |

### Settlements Missing a Region

| Name | Type | Country |
| --- | --- | --- |
| [[02 Geography/Settlements/Iosia\|Iosia]] | capital | [[Galeria]] |
| [[02 Geography/Settlements/Wrexfjord\|Wrexfjord]] | city | [[Galeria]] |
| [[02 Geography/Settlements/Wyrmsgate\|Wyrmsgate]] | city | [[Galeria]] |

### Points of Interest Missing a Parent Location

| Name | Type | Region |
| --- | --- | --- |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] | Inn | [[Frostfjord]] |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] | Tavern | [[Frostfjord]] |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] | Inn | [[Frostfjord]] |
