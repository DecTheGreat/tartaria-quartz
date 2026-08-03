---
type: index
index_type: poi
publish: true
---

# 🏛 Points of Interest

An index of Tartaria’s taverns, temples, shops, castles, ruins, dungeons, landmarks, and other notable locations.

## Create
```meta-bind-button
label: New POI
icon: map-pinned
style: primary

actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_POI.md
```

---

## Points of Interest

```dataview
TABLE
poi_type AS "Type",
settlement AS "Settlement",
region AS "Region",
country AS "Country",
owner AS "Owner",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
SORT settlement ASC, poi_type ASC, file.name ASC
```

---

## POIs by Settlement

```dataview
TABLE
poi_type AS "Type",
district AS "District",
owner AS "Owner",
status AS "Status"
FROM "02 Geography/POI"
WHERE type = "poi"
GROUP BY settlement
```

---

## Statistics

```dataview
TABLE WITHOUT ID
poi_type AS "Type",
length(rows) AS "Count"
FROM "02 Geography/POI"
WHERE type = "poi"
GROUP BY poi_type
SORT poi_type ASC
```

---

## Recently Modified

```dataview
TABLE
poi_type AS "Type",
settlement AS "Settlement",
region AS "Region",
file.mtime AS "Modified"
FROM
