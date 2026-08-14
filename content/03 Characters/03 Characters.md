---
type: index
index_type: characters
publish: true
---

# Characters

## All Characters by Region & Settlement

```dataviewjs
const characters = dv.pages('"03 Characters"')
  .where(p => p.type === "character")
  .sort(p => p.region ?? "No Region")
  .sort(p => p.location ?? "No Settlement")
  .sort(p => p.file.name);

const clean = v => {
  if (!v) return "—";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
};

const groups = {};

for (const c of characters) {
  const region = clean(c.region);
  const settlement = clean(c.location);
  const key = `${region}|||${settlement}`;

  if (!groups[key]) groups[key] = [];
  groups[key].push(c);
}

for (const key of Object.keys(groups).sort()) {
  const [region, settlement] = key.split("|||");

  dv.header(2, region);
  dv.header(3, settlement);

  dv.table(
    ["Character", "Type", "Role", "Faction", "Status"],
    groups[key].map(c => [
      c.file.link,
      clean(c.entity_type),
      clean(c.role),
      clean(c.faction),
      clean(c.status)
    ])
  );
}
```

---

## NPCs

_No published entries._

---

## Major Characters

_No published entries._

---

## Characters Missing Region or Settlement

_No published entries._
