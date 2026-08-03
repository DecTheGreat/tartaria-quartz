---
type: index
index_type: countries
publish: true
---

# Countries

An index of Tartaria’s nations and political states.

## Create

---
```meta-bind-button
label: New Country
icon: crown
style: primary
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Country.md
```


## Countries

```dataview
TABLE
continent AS "Continent",
status AS "Status",
government AS "Government",
capital AS "Capital",
ruler AS "Ruler",
population AS "Population"
FROM "02 Geography/Countries"
WHERE type = "country"
SORT continent ASC, file.name ASC
```

---

## Countries by Continent

```dataviewjs
const continents = dv.pages('"02 Geography/Continents"')
  .where(page => page.type === "continent")
  .sort(page => page.file.name);

const countries = dv.pages('"02 Geography/Countries"')
  .where(page => page.type === "country");

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

for (const continent of continents) {
  dv.header(2, continent.file.link);

  const continentCountries = countries
    .where(country =>
      linkedTo(country.continent, continent)
    )
    .sort(country => country.file.name);

  if (continentCountries.length === 0) {
    dv.paragraph("*No countries linked to this continent.*");
    continue;
  }

  dv.table(
    [
      "Country",
      "Government",
      "Capital",
      "Population",
      "Status"
    ],
    continentCountries.map(country => [
      country.file.link,
      country.government ?? "—",
      country.capital ?? "—",
      country.population ?? "—",
      country.status ?? "—"
    ])
  );
}
```

---

## Country Summary

```dataviewjs
const countries = dv.pages('"02 Geography/Countries"')
  .where(page => page.type === "country")
  .sort(page => page.file.name);

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
  [
    "Country",
    "Continent",
    "Regions",
    "Settlements",
    "Capital",
    "Status"
  ],
  countries.map(country => [
    country.file.link,
    country.continent ?? "—",
    regions.where(region =>
      linkedTo(region.country, country)
    ).length,
    settlements.where(settlement =>
      linkedTo(settlement.country, country)
    ).length,
    country.capital ?? "—",
    country.status ?? "—"
  ])
);
```

---

## Recently Modified

```dataview
TABLE
continent AS "Continent",
status AS "Status",
file.mtime AS "Modified"
FROM "02 Geography/Countries"
WHERE type = "country"
SORT file.mtime DESC
LIMIT 10
```

---

## Country Health

### Missing Continents

```dataview
TABLE
status AS "Status",
government AS "Government"
FROM "02 Geography/Countries"
WHERE type = "country"
AND !continent
SORT file.name ASC
```

### Missing Capitals

```dataview
TABLE
continent AS "Continent",
government AS "Government",
status AS "Status"
FROM "02 Geography/Countries"
WHERE type = "country"
AND !capital
SORT file.name ASC
```

### Missing Governments

```dataview
TABLE
continent AS "Continent",
capital AS "Capital",
status AS "Status"
FROM "02 Geography/Countries"
WHERE type = "country"
AND !government
SORT file.name ASC
```

### Missing Maps

```dataview
TABLE
continent AS "Continent",
capital AS "Capital",
status AS "Status"
FROM "02 Geography/Countries"
WHERE type = "country"
AND (
  !map
  OR map = "10 Assets/Maps/placeholder-map.png"
)
SORT file.name ASC
```
