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

| Name | Status | Population | Climate | Terrain | Largest Country |
| --- | --- | --- | --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |  |  |  |

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

| Name | Status | Modified |
| --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |

---

## Continent Health

### Missing Maps

| Name | Status | Climate |
| --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |

### Missing Climate

| Name | Status | Terrain |
| --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |

### Missing Population

| Name | Status | Climate |
| --- | --- | --- |
| [[02 Geography/Continents/Eldoria\|Eldoria]] | active |  |
