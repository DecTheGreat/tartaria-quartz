---
index_type: regions
publish: true
---

# 🗺 Regions

An index of Tartaria’s provinces, territories, wilderness areas, and other major regions.

## Create

```meta-bind-button
label: New Region
icon: map
style: primary
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Region.md
```


## Regions

| Name | Country | Continent | Regional Seat | Climate | Terrain | Population | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] | [[Eldoria]] |  |  |  |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] | [[Eldoria]] |  |  |  |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] | [[Eldoria]] |  |  |  |  | active |

---

## Regions by Country

```dataviewjs
const countries = dv.pages('"02 Geography/Countries"')
  .where(page => page.type === "country")
  .sort(page => page.file.name);

const regions = dv.pages('"02 Geography/Regions"')
  .where(page => page.type === "region");

function linkedTo(value, target) {
  if (!value || !target) return false;

  const valuePath = value?.path ?? value?.file?.path;
  const targetPath = target?.file?.path;

  if (valuePath && targetPath) {
    return valuePath === targetPath;
  }

  return (
    String(value) === String(target.file.link) ||
    String(value) === target.file.name
  );
}

for (const country of countries) {
  dv.header(2, country.file.link);

  const countryRegions = regions
    .where(region => linkedTo(region.country, country))
    .sort(region => region.file.name);

  if (countryRegions.length === 0) {
    dv.paragraph("*No regions linked to this country.*");
    continue;
  }

  dv.table(
    [
      "Region",
      "Regional Seat",
      "Climate",
      "Terrain",
      "Population",
      "Status"
    ],
    countryRegions.map(region => [
      region.file.link,
      region.regional_seat ?? "—",
      region.climate ?? "—",
      region.terrain ?? "—",
      region.population ?? "—",
      region.status ?? "—"
    ])
  );
}
```

---

## Region Summary

```dataviewjs
const regions = dv.pages('"02 Geography/Regions"')
  .where(page => page.type === "region")
  .sort(page => page.file.name);

const settlements = dv.pages('"02 Geography/Settlements"')
  .where(page => page.type === "settlement");

const pois = dv.pages('"02 Geography/POI"')
  .where(page => page.type === "poi");

const characters = dv.pages('"03 Characters"')
  .where(page => page.type === "character");

const factions = dv.pages('"04 Factions"')
  .where(page => page.type === "faction");

function linkedTo(value, target) {
  if (!value || !target) return false;

  const valuePath = value?.path ?? value?.file?.path;
  const targetPath = target?.file?.path;

  if (valuePath && targetPath) {
    return valuePath === targetPath;
  }

  return (
    String(value) === String(target.file.link) ||
    String(value) === target.file.name
  );
}

dv.table(
  [
    "Region",
    "Country",
    "Settlements",
    "POIs",
    "Characters",
    "Factions",
    "Status"
  ],
  regions.map(region => [
    region.file.link,
    region.country ?? "—",
    settlements.where(settlement =>
      linkedTo(settlement.region, region)
    ).length,
    pois.where(poi =>
      linkedTo(poi.region, region)
    ).length,
    characters.where(character =>
      linkedTo(character.region, region)
    ).length,
    factions.where(faction =>
      linkedTo(faction.region, region)
    ).length,
    region.status ?? "—"
  ])
);
```

---

## Recently Modified

| Name | Country | Continent | Status | Modified |
| --- | --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] | [[Eldoria]] | active |  |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] | [[Eldoria]] | active |  |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] | [[Eldoria]] | active |  |

---

## Region Health

### Missing Country

| Name | Continent | Status |
| --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Eldoria]] | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Eldoria]] | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Eldoria]] | active |

### Missing Continent

| Name | Country | Status |
| --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] | active |

### Missing Regional Seat

| Name | Country | Population | Status |
| --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] |  | active |

### Missing Climate

| Name | Country | Terrain | Status |
| --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] |  | active |

### Missing Terrain

| Name | Country | Climate | Status |
| --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] |  | active |

### Missing Maps

| Name | Country | Regional Seat | Status |
| --- | --- | --- | --- |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] | [[Galeria]] |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] | [[Galeria]] |  | active |
