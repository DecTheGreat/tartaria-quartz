import path from "node:path";
import { escapeTableCell, slash, toText } from "./utils.mjs";

function stripWikiLink(value) {
  const text = toText(value).trim();
  const match = text.match(/^\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]$/);
  return match ? match[1].trim() : text;
}

function normaliseComparable(value) {
  return stripWikiLink(value)
    .replace(/^["']|["']$/g, "")
    .trim()
    .toLowerCase();
}

function noteIdentity(record) {
  return [
    record.frontmatter.name,
    record.frontmatter.title,
    record.fileName,
    record.relativePath.replace(/\.md$/i, ""),
  ]
    .filter(Boolean)
    .map(normaliseComparable);
}

function valuesEqual(left, right) {
  if (Array.isArray(left)) {
    return left.some((item) => valuesEqual(item, right));
  }

  if (Array.isArray(right)) {
    return right.some((item) => valuesEqual(left, item));
  }

  return normaliseComparable(left) === normaliseComparable(right);
}

function parseTableColumns(text) {
  const columns = [];
  const pieces = text
    .split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
    .map((item) => item.trim())
    .filter(Boolean);

  for (const piece of pieces) {
    const aliasMatch = piece.match(
      /^([A-Za-z0-9_.-]+)\s+AS\s+["']([^"']+)["']$/i,
    );

    if (aliasMatch) {
      columns.push({
        field: aliasMatch[1],
        label: aliasMatch[2],
      });
    } else {
      columns.push({
        field: piece,
        label: piece,
      });
    }
  }

  return columns;
}

function parseWhereConditions(whereLines) {
  const conditions = [];

  for (const rawLine of whereLines) {
    const line = rawLine
      .replace(/^\s*(WHERE|AND)\s+/i, "")
      .trim();

    const comparison = line.match(
      /^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/i,
    );

    if (!comparison) continue;

    conditions.push({
      field: comparison[1],
      rawValue: comparison[2].trim(),
    });
  }

  return conditions;
}

function parseSort(sortLine) {
  if (!sortLine) return [];

  return sortLine
    .replace(/^\s*SORT\s+/i, "")
    .split(",")
    .map((part) => {
      const match = part.trim().match(
        /^([A-Za-z0-9_.-]+)(?:\s+(ASC|DESC))?$/i,
      );

      return match
        ? {
            field: match[1],
            direction: (match[2] ?? "ASC").toUpperCase(),
          }
        : null;
    })
    .filter(Boolean);
}

function parseQuery(queryText) {
  const lines = queryText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!/^TABLE\b/i.test(lines[0] ?? "")) {
    return null;
  }

  let index = 0;
  const tableParts = [
    lines[index].replace(/^TABLE\s*/i, ""),
  ];

  index += 1;

  while (
    index < lines.length &&
    !/^(FROM|WHERE|AND|SORT|LIMIT)\b/i.test(lines[index])
  ) {
    tableParts.push(lines[index]);
    index += 1;
  }

  let fromFolder = "";
  const whereLines = [];
  let sortLine = "";

  for (; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^FROM\b/i.test(line)) {
      fromFolder =
        line.match(/^FROM\s+["']([^"']+)["']/i)?.[1] ?? "";
    } else if (/^(WHERE|AND)\b/i.test(line)) {
      whereLines.push(line);
    } else if (/^SORT\b/i.test(line)) {
      sortLine = line;
    }
  }

  return {
    columns: parseTableColumns(tableParts.join(" ")),
    fromFolder: slash(fromFolder).replace(/\/+$/, ""),
    conditions: parseWhereConditions(whereLines),
    sort: parseSort(sortLine),
  };
}

function getField(record, field) {
  if (field === "file.name") return record.fileName;
  if (field === "file.link") return `[[${record.fileName}]]`;
  if (field === "file.path") return record.relativePath;

  return record.frontmatter[field];
}

function conditionMatches(record, condition, currentRecord) {
  const recordValue = getField(record, condition.field);
  const raw = condition.rawValue;

  if (/^this\.file\.link$/i.test(raw)) {
    const targetIdentities = noteIdentity(currentRecord);

    if (Array.isArray(recordValue)) {
      return recordValue.some((value) =>
        targetIdentities.includes(normaliseComparable(value)),
      );
    }

    return targetIdentities.includes(
      normaliseComparable(recordValue),
    );
  }

  if (/^this\.file\.name$/i.test(raw)) {
    return valuesEqual(recordValue, currentRecord.fileName);
  }

  const literal =
    raw.match(/^["']([\s\S]*)["']$/)?.[1] ?? raw;

  return valuesEqual(recordValue, literal);
}

function makeFileLink(record) {
  const target = record.relativePath.replace(/\.md$/i, "");
  const label =
    record.frontmatter.name ||
    record.frontmatter.title ||
    record.fileName;

  return `[[${target}|${label}]]`;
}

function renderTable(records, columns) {
  if (records.length === 0) {
    return "_No published entries._";
  }

  const headers = ["Name", ...columns.map((column) => column.label)];
  const divider = headers.map(() => "---");
  const rows = records.map((record) => [
    makeFileLink(record),
    ...columns.map((column) =>
      escapeTableCell(toText(getField(record, column.field))),
    ),
  ]);

  return [
    `| ${headers.map(escapeTableCell).join(" | ")} |`,
    `| ${divider.join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function applySort(records, sortRules) {
  if (sortRules.length === 0) return records;

  return [...records].sort((left, right) => {
    for (const rule of sortRules) {
      const leftValue = normaliseComparable(
        getField(left, rule.field),
      );
      const rightValue = normaliseComparable(
        getField(right, rule.field),
      );

      const comparison = leftValue.localeCompare(rightValue);

      if (comparison !== 0) {
        return rule.direction === "DESC"
          ? -comparison
          : comparison;
      }
    }

    return 0;
  });
}

function executeQuery(query, database, currentRecord) {
  let records = database;

  if (query.fromFolder) {
    const prefix = `${query.fromFolder}/`.toLowerCase();

    records = records.filter((record) => {
      const relative = slash(record.relativePath).toLowerCase();
      return (
        relative.startsWith(prefix) ||
        relative === `${query.fromFolder.toLowerCase()}.md`
      );
    });
  }

  records = records.filter((record) =>
    query.conditions.every((condition) =>
      conditionMatches(record, condition, currentRecord),
    ),
  );

  records = applySort(records, query.sort);

  return renderTable(records, query.columns);
}

export function transformDataviewTables(
  body,
  database,
  currentRecord,
) {
  let converted = 0;

  const transformed = body.replace(
    /```dataview\s*\r?\n([\s\S]*?)```/gi,
    (_fullMatch, queryText) => {
      const query = parseQuery(queryText);

      if (!query) {
        return _fullMatch;
      }

      converted += 1;

      return executeQuery(
        query,
        database,
        currentRecord,
      );
    },
  );

  return {
    body: transformed,
    converted,
  };
}
