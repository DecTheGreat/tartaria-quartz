---
type: dashboard
dashboard: rules
publish: true
---

# 📚 Rules

> [!multi-column]
>
>> [!note]+ Create
>>
>> ```meta-bind-button
>> label: ➕ New Rule
>> icon: plus
>> style: primary
>> actions:
>>   - type: runTemplaterFile
>>     templateFile: "09 Templates/Actions/New_Rule.md"
>> ```
>>
>> ```meta-bind-button
>> label:  New Rule Category
>> icon: folder-plus
>> style: default
>> actions:
>>   - type: runTemplaterFile
>>     templateFile: "09 Templates/Actions/New_Rule_Category.md"
>> ```
>
>> [!info]+ Browse
>>
>> - [[World Rules]]
>> - [[House Rules]]
>> - [[Rule References]]
>> - [[Lore Articles]]

---

## 📁 Rule Categories

```dataview
TABLE WITHOUT ID
    file.link AS "Category",
    length(
        filter(
            this.file.inlinks,
            (link) => meta(link).type = "rule"
        )
    ) AS "Rules",
    file.mtime AS "Updated"
FROM "08 Rules"
WHERE type = "rule_category"
SORT file.name ASC
```

---

## 📜 All Rules

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    system AS "System",
    source AS "Source",
    status AS "Status",
    visibility AS "Visibility"
FROM "08 Rules"
WHERE type = "rule"
SORT category ASC, file.name ASC
```

---

## 🧪 Rules in Testing

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    status AS "Status"
FROM "08 Rules"
WHERE type = "rule"
AND status = "Testing"
SORT file.name ASC
```

---

## 📝 Draft Rules

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    source AS "Source"
FROM "08 Rules"
WHERE type = "rule"
AND status = "Draft"
SORT file.name ASC
```

---

## ✅ Active Rules

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    source AS "Source"
FROM "08 Rules"
WHERE type = "rule"
AND status = "Active"
SORT category ASC, file.name ASC
```

---

## 🔒 GM-Only Rules

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    status AS "Status"
FROM "08 Rules"
WHERE type = "rule"
AND visibility = "GM Only"
SORT category ASC, file.name ASC
```

---

## 🌐 Published Rules

```dataview
TABLE WITHOUT ID
    file.link AS "Rule",
    category AS "Category",
    status AS "Status"
FROM "08 Rules"
WHERE type = "rule"
AND publish = true
SORT category ASC, file.name ASC
```

## 📁 Rule Categories

```dataview
TABLE WITHOUT ID
    file.link AS "Category",
    length(
        filter(
            pages("08 Rules"),
            (rule) => rule.type = "rule" AND rule.category = file.name
        )
    ) AS "Rules",
    file.mtime AS "Updated"
FROM "08 Rules"
WHERE type = "rule_category"
SORT file.name ASC
```
