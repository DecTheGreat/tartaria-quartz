---
type: index
index_type: continents
publish: true
---

```meta-bind-button
label: New Continent
icon: globe-2
style: primary

actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Continent.md
```

## Continents

```dataview
TABLE
status AS "Status",
population AS "Population",
climate AS "Climate",
terrain AS "Terrain",
largest_country AS "Largest Country"
FROM "02 Geography/Continents"
WHERE type = "continent"
SORT file.name ASC
```

---

## Continental Summary

```dataviewjs
const continents = dv.pages('"02 Geography/Continents"')
  .where(page => page.type === "continent")
  .sort(page => page.file.name);

const countries = dv.pages('"02 Geography/Countries"')
  .where(page => page.type === "country");

const regions = dv.pages('"02 Geography/Regions"')
  .where(page => page.type === "region");

const settlements = dv.pages('"02 Geography/Settlements"')
  .where(page => page.type === "settlement");

const linkedTo = (value, target) => {
  if (!value || !target) return false;

  const valuePath = value?.path ?? value?.file?.path;
  const targetPath = target?.file?.path;

  if (valuePath && targetPath) {
    return valuePath === targetPath;
  }

  return String(value) === String(target.file.link)
    || String(value) === target.file.name;
};

dv.table(
  ["Continent", "Countries", "Regions", "Settlements", "Status"],
  continents.map(continent => [
    continent.file.link,
    countries.where(country =>
      linkedTo(country.continent, continent)
    ).length,
    regions.where(region =>
      linkedTo(region.continent, continent)
    ).length,
    settlements.where(settlement =>
      linkedTo(settlement.continent, continent)
    ).length,
    continent.status ?? "—"
  ])
);
```

---

## Recently Modified

```dataview
TABLE
status AS "Status",
file.mtime AS "Modified"
FROM "02 Geography/Continents"
WHERE type = "continent"
SORT file.mtime DESC
LIMIT 10
```

---

## Continent Health

### Missing Maps

```dataview
TABLE
status AS "Status",
climate AS "Climate"
FROM "02 Geography/Continents"
WHERE type = "continent"
AND (
  !map
  OR map = "10 Assets/Maps/placeholder-map.png"
)
SORT file.name ASC
```

### Missing Climate

```dataview
TABLE
status AS "Status",
terrain AS "Terrain"
FROM "02 Geography/Continents"
WHERE type = "continent"
AND !climate
SORT file.name ASC
```

### Missing Population

```dataview
TABLE
status AS "Status",
climate AS "Climate"
FROM "02 Geography/Continents"
WHERE type = "continent"
AND !population
SORT file.name ASC
```
