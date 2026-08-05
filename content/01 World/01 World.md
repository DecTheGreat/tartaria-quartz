---
publish: true
title: World
icon: globe
---

# The World of Tartaria

> *A world forged by gods, scarred by ancient wars, and shaped by heroes.*

Welcome to **Tartaria**, a high fantasy setting where ancient dragons still shape kingdoms, forgotten empires sleep beneath the earth, and gods quietly influence the fate of mortals.

## Create World Lore

`BUTTON[new-pantheon]` `BUTTON[new-deity]` `BUTTON[new-historical-event]`
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

_No published entries._

```meta-bind-button
label: Create Pantheon
icon: plus
style: primary
id: new-pantheon
hidden: true
actions:
  - type: templaterCreateNote
    templateFile: "09 Templates/Actions/New_Pantheon.md"
    folderPath: "90 Publish"
    fileName: "Pantheon Wizard"
    openNote: false
```


```meta-bind-button
label: Create Deity
icon: plus
style: primary
id: new-deity
hidden: true
actions:
  - type: templaterCreateNote
    templateFile: "09 Templates/World/Deity Template.md"
    folderPath: "01 World/Religions/Deities"
    fileName: ""
    openNote: true
```

```meta-bind-button
label: Create Historical Event
icon: plus
style: primary
id: new-historical-event
hidden: true
actions:
  - type: templaterCreateNote
    templateFile: "09 Templates/World/Historical Event Template.md"
    folderPath: "01 World/History/Historical Events"
    fileName: ""
    openNote: true
```
