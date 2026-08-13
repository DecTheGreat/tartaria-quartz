---
type: party
publish: true
party_name: Varmints
campaign: null
current_adventure: null
current_quest: null
party_level: 5
current_region: null
current_settlement: null
status: Active
banner: 10 Assets/Banners/party-placeholder.png
art: 10 Assets/Portraits/varmints.png
shared_gold: 0
shared_silver: 0
shared_copper: 0
reputation: null
updated: 2026-07-12
---

> [!infobox]
> ## Infobox
>
> ![[10 Assets/Portraits/varmints.png]]

# Varmints

# Current Objective

the Varmints are currently engaged in an investigation in the surge of undead in the north over the recent season and the unusual mist descending on the city of Wyrmsgate.
---
# new player character
```meta-bind-button
label: Create Player Character
icon: user-plus
style: primary
id: new-player-character
hidden: false
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Player_Character.md
```

# Party Members

```dataviewjs
const p = dv.current();

const pb = Math.ceil(Number(p.party_level) / 4) + 1;

function bonus(training) {
    if (training == "expertise") return pb * 2;
    if (training == "proficient") return pb;
    return 0;
}

function passive(mod, training) {
    return 10 + Number(mod ?? 0) + bonus(training);
}

const characters = dv.pages('"03 Characters"')
    .where(c => c.type == "player_character")
    .where(c => {
        if (!c.party) return false;

        // Proper Obsidian/Dataview link
        if (c.party.path) {
            return c.party.path == p.file.path;
        }

        // Fallback for older plain-text party values
        return String(c.party).includes(p.file.name);
    })
    .sort(c => c.file.name);

dv.table(
    [
        "Character",
        "Player",
        "Class",
        "Level",
        "AC",
        "HP",
        "Init",
        "PP",
        "PI",
        "PINV",
        "PH"
    ],
    characters.map(c => [
        c.file.link,
        c.player ?? "",
        c.class ?? "",
        c.level ?? "",
        c.armor_class ?? "",
        c.max_hp ?? "",
        c.initiative_bonus ?? "",
        passive(c.wisdom_mod, c.perception_training),
        passive(c.wisdom_mod, c.insight_training),
        passive(c.intelligence_mod, c.investigation_training),
        passive(c.intelligence_mod, c.history_training)
    ])
);
```
---

---

# Shared Treasury

Gold: `INPUT[number:shared_gold]`

Silver: `INPUT[number:shared_silver]`

Copper: `INPUT[number:shared_copper]`

---

# Party Inventory

![[Party Loot]]

---

# Recent Sessions
```meta-bind-button
label: New Session
icon: notebook
style: primary
actions:
  - type: command
    command: quickadd:choice:new session
```

<br>

| Name | date | status |
| --- | --- | --- |
| [[01 World/01 World\|01 World]] |  |  |
| [[02 Geography/02 Geography\|02 Geography]] |  |  |
| [[02 Geography/Continents/Continents\|Continents]] |  |  |
| [[02 Geography/Continents/Eldoria\|Eldoria]] |  | active |
| [[02 Geography/Countries/Countries\|Countries]] |  |  |
| [[02 Geography/Countries/Galeria\|Galeria]] |  | active |
| [[02 Geography/POI/Frostfangs Respite\|Frostfangs Respite]] |  | active |
| [[02 Geography/POI/POI\|POI]] |  |  |
| [[02 Geography/POI/The Bloodied Rat\|The Bloodied Rat]] |  | active |
| [[02 Geography/POI/The Vengeful Desert\|The Vengeful Desert]] |  | active |
| [[02 Geography/Regions/Frostfjord\|Frostfjord]] |  | active |
| [[02 Geography/Regions/Harvestlands\|Harvestlands]] |  | active |
| [[02 Geography/Regions/Hearthlands\|Hearthlands]] |  | active |
| [[02 Geography/Regions/Regions\|Regions]] |  |  |
| [[02 Geography/Settlements/Iosia\|Iosia]] |  | active |
| [[02 Geography/Settlements/Settlements\|Settlements]] |  |  |
| [[02 Geography/Settlements/Wrexfjord\|Wrexfjord]] |  | active |
| [[02 Geography/Settlements/Wyrmsgate\|Wyrmsgate]] |  | active |
| [[03 Characters/NPCs/Arcane/Arcane\|Arcane]] |  |  |
| [[03 Characters/NPCs/Arcane/Sierra Breedlove\|Sierra Breedlove]] |  | Alive |
| [[03 Characters/NPCs/Arcane/Telnor\|Telnor]] |  | Alive |
| [[03 Characters/NPCs/Arcane/Vorlag\|Vorlag]] |  | Alive |
| [[03 Characters/NPCs/Criminal/Criminal\|Criminal]] |  |  |
| [[03 Characters/NPCs/Criminal/Nessa Veyr\|Nessa Veyr]] |  | Alive |
| [[03 Characters/NPCs/Criminal/Rusk Varn\|Rusk Varn]] |  | Alive |
| [[03 Characters/NPCs/Criminal/Vaelis Crowmark\|Vaelis Crowmark]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Halda Tern\|Halda Tern]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Lysander Vance\|Lysander Vance]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Merchant\|Merchant]] |  |  |
| [[03 Characters/NPCs/Merchant/Merissa Korrin\|Merissa Korrin]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Sevrin Vaelor\|Sevrin Vaelor]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Thrasz\|Thrasz]] |  | Alive |
| [[03 Characters/NPCs/Merchant/Tom\|Tom]] |  | Alive |
| [[03 Characters/NPCs/Military/Anya Varkos\|Anya Varkos]] |  | Alive |
| [[03 Characters/NPCs/Military/Balen The Shepard\|Balen The Shepard]] |  | Alive |
| [[03 Characters/NPCs/Military/Captain Edrik Vale\|Captain Edrik Vale]] |  | Alive |
| [[03 Characters/NPCs/Military/Commander Garrick Stonevein\|Commander Garrick Stonevein]] |  | Alive |
| [[03 Characters/NPCs/Military/Kellen Marr\|Kellen Marr]] |  | Alive |
| [[03 Characters/NPCs/Military/Military\|Military]] |  |  |
| [[03 Characters/NPCs/Military/Mira Stonecloak\|Mira Stonecloak]] |  | Alive |
| [[03 Characters/NPCs/Military/Mirelle Wyrmsbane\|Mirelle Wyrmsbane]] |  | Alive |
| [[03 Characters/NPCs/Military/Selia Rook\|Selia Rook]] |  | Alive |
| [[03 Characters/NPCs/Military/Thalen Frostveil\|Thalen Frostveil]] |  | Alive |
| [[03 Characters/NPCs/Nobility/Francisco Valerius\|Francisco Valerius]] |  | Alive |
| [[03 Characters/NPCs/Nobility/Krucro Belnet\|Krucro Belnet]] |  | Alive |
| [[03 Characters/NPCs/Nobility/Nobility\|Nobility]] |  |  |
| [[03 Characters/NPCs/Nobility/Theren Wyrmsbane the fifth\|Theren Wyrmsbane the fifth]] |  | Alive |
| [[03 Characters/NPCs/NPCs\|NPCs]] |  |  |
| [[03 Characters/NPCs/Religious/Durnik Ironjudged\|Durnik Ironjudged]] |  | Alive |
| [[03 Characters/NPCs/Religious/Elowen Brightwater\|Elowen Brightwater]] |  | Alive |
| [[03 Characters/NPCs/Religious/Old Grimvald Gravekeeper\|Old Grimvald Gravekeeper]] |  | Alive |
| [[03 Characters/NPCs/Religious/Religious\|Religious]] |  |  |
| [[03 Characters/NPCs/Religious/Silas Rhel\|Silas Rhel]] |  | Alive |
| [[03 Characters/Parties/Varmints/Characters/Bob\|Bob]] |  | Active |
| [[03 Characters/Parties/Varmints/Characters/Doc Thumper\|Doc Thumper]] |  | Active |
| [[03 Characters/Parties/Varmints/Characters/Kyra\|Kyra]] |  | Active |
| [[03 Characters/Parties/Varmints/Characters/Oats\|Oats]] |  | Active |
| [[03 Characters/Parties/Varmints/Characters/Po\|Po]] |  | Active |
| [[03 Characters/Parties/Varmints/Characters/Rocko\|Rocko]] |  | Active |
| [[03 Characters/Parties/Varmints/Varmints\|Varmints]] |  | Active |
| [[04 Factions/04 Factions\|04 Factions]] |  |  |
| [[04 Factions/Clergy/Clergy\|Clergy]] |  |  |
| [[04 Factions/Criminal/Criminal\|Criminal]] |  |  |
| [[04 Factions/Military/Military\|Military]] |  |  |
| [[08 Rules/08 Rules\|08 Rules]] |  |  |
| [[08 Rules/House Rules/Ancestry\|Ancestry]] |  | Draft |
| [[08 Rules/House Rules/Bonds\|Bonds]] |  | Draft |
| [[08 Rules/House Rules/Complications\|Complications]] |  | Draft |
| [[08 Rules/House Rules/Echo points\|Echo points]] |  | Draft |
| [[08 Rules/House Rules/Success at a cost\|Success at a cost]] |  | Draft |
| [[index\|Tartaria]] |  |  |


# Bastion

![[Bastion]]

---

# Downtime Projects

- [ ]

- [ ]

- [ ]


---

# Reputation

|Faction|Reputation|
|---|---|
|||

---

# Quick Actions

```meta-bind-button
label: Create Player Character
icon: user-plus
style: primary
id: new-player-character
hidden: false
actions:
  - type: runTemplaterFile
    templateFile: 09 Templates/Actions/New_Player_Character.md
```

<br>


```meta-bind-button
label: New Quest
icon: scroll
style: default
actions:
  - type: command
    command: quickadd:choice:new quest
```

```meta-bind-button
label: New Encounter
icon: swords
style: default
actions:
  - type: command
    command: quickadd:choice:new encounter
```

```meta-bind-button
label: New Character
icon: user-plus
style: default
actions:
  - type: command
    command: quickadd:choice:new player character
```

---

## GM Information
