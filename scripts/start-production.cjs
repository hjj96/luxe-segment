#!/usr/bin/env node
/**
 * Production start для Next.js (Amvera / PaaS).
 * Запускайте напрямую: node scripts/start-production.cjs (не через npm run — меньше проблем с SIGTERM).
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const rawPort = String(process.env.PORT != null ? process.env.PORT : "3000").trim();
const port = /^\d+$/.test(rawPort) ? rawPort : "3000";
if (rawPort !== port && process.env.PORT != null) {
  console.warn(`[start-production] Некорректный PORT="${rawPort}", используем ${port}`);
}

const projectRoot = path.join(__dirname, "..");
const nextDir = path.join(projectRoot, ".next");

if (!fs.existsSync(nextDir)) {
  console.error(
    "[start-production] Нет папки .next — на сервере не выполнена сборка (npm run build) или артефакты не попали в контейнер."
  );
  process.exit(1);
}

let nextBin;
try {
  nextBin = require.resolve("next/dist/bin/next", { paths: [projectRoot] });
} catch {
  console.error("[start-production] Next.js не найден. Выполните: npm install");
  process.exit(1);
}

console.log(
  `[start-production] Старт Next.js: PORT=${port} NODE_ENV=${process.env.NODE_ENV} cwd=${projectRoot}`
);

const child = spawn(
  process.execPath,
  [nextBin, "start", "-H", "0.0.0.0", "-p", port],
  {
    stdio: "inherit",
    env: { ...process.env, PORT: port, NODE_ENV: "production" },
    cwd: projectRoot,
  }
);

const forward = (sig) => {
  try {
    if (child.pid) child.kill(sig);
  } catch (_) {}
};
process.on("SIGTERM", () => forward("SIGTERM"));
process.on("SIGINT", () => forward("SIGINT"));

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[start-production] next завершён сигналом ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});
