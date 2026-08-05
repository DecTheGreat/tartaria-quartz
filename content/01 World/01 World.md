---
publish: true
title: World
icon: globe
---

# The World of Tartaria

> *A world forged by gods, scarred by ancient wars, and shaped by heroes.*

Welcome to **Tartaria**, a high fantasy setting where ancient dragons still shape kingdoms, forgotten empires sleep beneath the earth, and gods quietly influence the fate of mortals.

---

## 🌍 Geography

- [[02 Geography/Continents]]
- [[02 Geography/Countries]]
- [[02 Geography/Regions]]
- [[02 Geography/Settlements]]
- [[02 Geography/POI]]

---

## 📜 History

- [[History]]
- [[Timeline]]

---

## ✨ Cosmology

- [[Cosmology]]
- [[Magic]]
- [[Calendar]]

---

## 🙏 Religion

- [[Religions/Pantheon]]

### The Pantheons

- [[Religions/Balance Pantheon]]
- [[Religions/Nature Pantheon]]
- [[Religions/Dark Pantheon]]
- [[Religions/Fae Courts]]

---

## 👑 Gods

```dataview
TABLE
portfolio AS "Domain",
alignment AS "Alignment"
FROM "01 World/Religions/Deities"
WHERE publish = true
SORT file.name
