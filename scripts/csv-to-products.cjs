/**
 * Читает data/products.xlsx (приоритет) или data/products.csv
 * и генерирует lib/products.generated.ts
 * Запуск: node scripts/csv-to-products.cjs   или   npm run products
 */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const ROOT = path.join(__dirname, "..");
const XLSX_PATH = path.join(ROOT, "data", "products.xlsx");
const CSV_PATH = path.join(ROOT, "data", "products.csv");
const OUT_PATH = path.join(ROOT, "lib", "products.generated.ts");

function escapeTs(s) {
  if (s == null) return '""';
  return '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"';
}

function parseCsv(content) {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const header = lines[0].split(";").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(";");
    const row = {};
    header.forEach((h, j) => {
      row[h] = (values[j] != null ? values[j].trim() : "") || "";
    });
    rows.push(row);
  }
  return rows;
}

function normalizeRow(row) {
  const out = {};
  Object.entries(row || {}).forEach(([key, value]) => {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey) return;
    out[normalizedKey] = String(value ?? "").trim();
  });
  return out;
}

function parseXlsx(filePath) {
  const workbook = XLSX.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) return [];
  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });
  return rows.map(normalizeRow);
}

function parseBoolean(value) {
  const s = String(value ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "да"].includes(s);
}

function parsePrice(value) {
  const normalized = String(value ?? "")
    .replace(/\s+/g, "")
    .replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function rowToProduct(row) {
  const category = row.category || "clothing";
  if (!["clothing", "shoes", "bags", "accessories"].includes(category)) throw new Error("Неверная категория: " + category);

  const specs = [];
  const specStr = row.specs || "";
  if (specStr) {
    specStr.split("|").forEach((pair) => {
      const idx = pair.indexOf(":");
      if (idx > 0) {
        specs.push({ label: pair.slice(0, idx).trim(), value: pair.slice(idx + 1).trim() });
      }
    });
  }

  const images = (row.images || "").split(",").map((s) => s.trim()).filter(Boolean);
  const colors = (row.colors || "").split(",").map((s) => s.trim()).filter(Boolean);
  const sizes = (row.sizes || "").split(",").map((s) => s.trim()).filter(Boolean);

  return {
    id: row.id || String(Date.now()),
    name: row.name || "Без названия",
    brand: row.brand || "",
    price: parsePrice(row.price),
    currency: row.currency || "₽",
    description: row.description || "",
    category,
    images: images.length ? images : ["/img/placeholder.jpg"],
    specs,
    inStock: parseBoolean(row.inStock),
    madeToOrder: parseBoolean(row.madeToOrder),
    colors,
    sizes,
    createdAt: row.createdAt || new Date().toISOString(),
  };
}

function productToTs(p) {
  const specStr =
    "[" +
    p.specs.map((s) => `{ label: ${escapeTs(s.label)}, value: ${escapeTs(s.value)} }`).join(", ") +
    "]";
  const imagesStr = "[" + p.images.map((img) => escapeTs(img)).join(", ") + "]";
  const colorsStr = "[" + p.colors.map((c) => escapeTs(c)).join(", ") + "]";
  const sizesStr = "[" + p.sizes.map((s) => escapeTs(s)).join(", ") + "]";

  return [
    "  {",
    `    id: ${escapeTs(p.id)},`,
    `    name: ${escapeTs(p.name)},`,
    `    brand: ${escapeTs(p.brand)},`,
    `    price: ${p.price},`,
    `    currency: ${escapeTs(p.currency)},`,
    `    description: ${escapeTs(p.description)},`,
    `    category: "${p.category}",`,
    `    images: ${imagesStr},`,
    `    specs: ${specStr},`,
    `    inStock: ${p.inStock},`,
    `    madeToOrder: ${p.madeToOrder},`,
    `    colors: ${colorsStr},`,
    `    sizes: ${sizesStr},`,
    `    createdAt: ${escapeTs(p.createdAt)},`,
    "  }",
  ].join("\n");
}

function main() {
  let rows = [];
  let sourceLabel = "";
  if (fs.existsSync(XLSX_PATH)) {
    rows = parseXlsx(XLSX_PATH);
    sourceLabel = "data/products.xlsx";
  } else if (fs.existsSync(CSV_PATH)) {
    const content = fs.readFileSync(CSV_PATH, "utf8");
    rows = parseCsv(content).map(normalizeRow);
    sourceLabel = "data/products.csv";
  } else {
    console.error("Файл не найден: data/products.xlsx или data/products.csv");
    process.exit(1);
  }

  const products = rows.map(rowToProduct);

  const tsContent =
    `// Автоматически сгенерировано из ${sourceLabel}. Не редактировать вручную.\n` +
    `// Запустите: npm run products\n\n` +
    `import type { Product } from "./types";\n\n` +
    `export const GENERATED_PRODUCTS: Product[] = [\n` +
    products.map(productToTs).join(",\n") +
    "\n];\n";

  fs.writeFileSync(OUT_PATH, tsContent, "utf8");
  console.log(
    "OK: обновлён lib/products.generated.ts (" +
      products.length +
      " товаров, источник: " +
      sourceLabel +
      ")"
  );
}

main();
