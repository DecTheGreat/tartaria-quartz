---
type: index
index_type: settlements
publish: true
---

# 🏘 Settlements

An index of the cities, towns, villages, forts and other settlements of Tartaria.

## Create

```meta-bind-button
label: New Settlement
icon: building-2
style: primary

actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Settlement.md
```

---

## Settlements

```dataview
TABLE
settlement_type AS "Type",
region AS "Region",
country AS "Country",
population AS "Population",
government AS "Government",
status AS "Status"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
SORT region ASC, settlement_type ASC, file.name ASC
```

---

## Settlements by Region

```dataview
TABLE
settlement_type AS "Type",
population AS "Population",
government AS "Government",
status AS "Status"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
GROUP BY region
```

---

## Statistics

```dataview
TABLE WITHOUT ID
length(rows) AS "Count"
FROM "02 Geography/Settlements"
WHERE type = "settlement"
GROUP BY settlement_type
SORT settlement_type
```

---

## Recently Modified

```dataview
TABLE
region,
status,
file.mtime AS Modified
FROM "02 Geography/Settlements"
WHERE type = "settlement"
SORT file.mtime DESC
LIMIT 10
```

---

# Health Checks

## Missing Region

```dataview
TABLE
country,
status
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND !region
```

## Missing Country

```dataview
TABLE
region,
status
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND !country
```

## Missing Continent

```dataview
TABLE
country,
status
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND !continent
```

## Missing Population

```dataview
TABLE
region,
settlement_type
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND !population
```

## Missing Government

```dataview
TABLE
region,
population
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND !government
```

## Missing Maps

```dataview
TABLE
region
FROM "02 Geography/Settlements"
WHERE type="settlement"
AND (
!map OR
map = "10 Assets/Maps/placeholder-map.png"
)
```
