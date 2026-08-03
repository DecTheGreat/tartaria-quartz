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

```dataview
TABLE
country AS "Country",
continent AS "Continent",
regional_seat AS "Regional Seat",
climate AS "Climate",
terrain AS "Terrain",
population AS "Population",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
SORT country ASC, file.name ASC
```

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

```dataview
TABLE
country AS "Country",
continent AS "Continent",
status AS "Status",
file.mtime AS "Modified"
FROM "02 Geography/Regions"
WHERE type = "region"
SORT file.mtime DESC
LIMIT 10
```

---

## Region Health

### Missing Country

```dataview
TABLE
continent AS "Continent",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !country
SORT file.name ASC
```

### Missing Continent

```dataview
TABLE
country AS "Country",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !continent
SORT file.name ASC
```

### Missing Regional Seat

```dataview
TABLE
country AS "Country",
population AS "Population",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !regional_seat
SORT file.name ASC
```

### Missing Climate

```dataview
TABLE
country AS "Country",
terrain AS "Terrain",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !climate
SORT file.name ASC
```

### Missing Terrain

```dataview
TABLE
country AS "Country",
climate AS "Climate",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !terrain
SORT file.name ASC
```

### Missing Maps

```dataview
TABLE
country AS "Country",
regional_seat AS "Regional Seat",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
AND (
  !map
  OR map = "10 Assets/Maps/placeholder-map.png"
)
SORT file.name ASC
```
