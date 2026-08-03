---
type: index
index_type: geography
publish: true
---

# 🌍 Geography

This dashboard provides an overview of Tartaria’s physical world and automatically updates as geography notes are added or changed.

---

## 🌎 Continents

```dataview
TABLE
status AS "Status",
climate AS "Climate",
population AS "Population"
FROM "02 Geography/Continents"
WHERE type = "continent"
SORT file.name ASC
```

---

## 👑 Countries

```dataview
TABLE
continent AS "Continent",
government AS "Government",
capital AS "Capital",
status AS "Status"
FROM "02 Geography/Countries"
WHERE type = "country"
SORT continent ASC, file.name ASC
```

---

## 🗺 Regions

```dataview
TABLE
country AS "Country",
continent AS "Continent",
climate AS "Climate",
terrain AS "Terrain",
status AS "Status"
FROM "02 Geography/Regions"
WHERE type = "region"
SORT country ASC, file.name ASC
```

---

## 🏘 Settlements

```dataview
TABLE
settlement_type AS "Type",
region AS "Region",
country AS "Country",
population AS "Population",
status AS "Status"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
SORT region ASC, settlement_type ASC, file.name ASC
```

---

## 📍 Points of Interest

```dataview
TABLE
poi_type AS "Type",
settlement AS "Settlement",
region AS "Region",
owner AS "Owner",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
SORT settlement ASC, poi_type ASC, file.name ASC
```

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

```dataview
TABLE
type AS "Type",
file.mtime AS "Modified"
FROM "02 Geography"
WHERE file.name != "Geography"
SORT file.mtime DESC
LIMIT 12
```

---

## ⚠ Geography Health

### Countries Missing a Continent

```dataview
TABLE
government AS "Government",
capital AS "Capital"
FROM "02 Geography/Countries"
WHERE type = "country"
AND !continent
SORT file.name ASC
```

### Regions Missing a Country

```dataview
TABLE
continent AS "Continent",
climate AS "Climate"
FROM "02 Geography/Regions"
WHERE type = "region"
AND !country
SORT file.name ASC
```

### Settlements Missing a Region

```dataview
TABLE
settlement_type AS "Type",
country AS "Country"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
AND !region
SORT file.name ASC
```

### Points of Interest Missing a Parent Location

```dataview
TABLE
poi_type AS "Type",
region AS "Region"
FROM "02 Geography/POI"
WHERE type = "poi"
AND !settlement
AND !region
SORT file.name ASC
```
