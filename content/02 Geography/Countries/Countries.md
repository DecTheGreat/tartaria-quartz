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

| Name | Continent | Status | Government | Capital | Ruler | Population |
| --- | --- | --- | --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | active | Plutocracy | Iosia |  |  |

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

| Name | Continent | Status | Modified |
| --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | active |  |

---

## Country Health

### Missing Continents

| Name | Status | Government |
| --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | active | Plutocracy |

### Missing Capitals

| Name | Continent | Government | Status |
| --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | Plutocracy | active |

### Missing Governments

| Name | Continent | Capital | Status |
| --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | Iosia | active |

### Missing Maps

| Name | Continent | Capital | Status |
| --- | --- | --- | --- |
| [[02 Geography/Countries/Galeria\|Galeria]] | Eldoria | Iosia | active |
