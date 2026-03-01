/**
 * Подготавливает data/products.xlsx для удобного редактирования:
 * - выпадающие списки для category / inStock / madeToOrder / currency
 * - закрепляет шапку
 *
 * Запуск: node scripts/prepare-products-xlsx.cjs
 */

const path = require("path");
const ExcelJS = require("exceljs");

const ROOT = path.join(__dirname, "..");
const XLSX_PATH = path.join(ROOT, "data", "products.xlsx");

async function main() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(XLSX_PATH);

  const ws = workbook.getWorksheet("products") || workbook.worksheets[0];
  if (!ws) {
    throw new Error("Не найден лист с товарами в data/products.xlsx");
  }

  ws.views = [{ state: "frozen", ySplit: 1 }];

  // id;name;brand;price;currency;description;category;images;specs;inStock;madeToOrder;colors;sizes;createdAt
  const validations = [
    { col: 5, list: ["₽"] }, // currency
    { col: 7, list: ["clothing", "shoes", "bags", "accessories"] }, // category
    { col: 10, list: ["true", "false"] }, // inStock
    { col: 11, list: ["true", "false"] }, // madeToOrder
  ];

  const maxRows = Math.max(ws.rowCount + 200, 1000);
  for (const { col, list } of validations) {
    const formula = `"${list.join(",")}"`;
    for (let row = 2; row <= maxRows; row++) {
      const cell = ws.getCell(row, col);
      cell.dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [formula],
        showErrorMessage: true,
        errorStyle: "warning",
        errorTitle: "Неверное значение",
        error: `Выберите значение из списка: ${list.join(", ")}`,
      };
    }
  }

  await workbook.xlsx.writeFile(XLSX_PATH);
  console.log("OK: подготовлен data/products.xlsx (выпадающие списки добавлены)");
}

main().catch((err) => {
  console.error("Ошибка:", err.message || err);
  process.exit(1);
});

