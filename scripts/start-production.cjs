#!/usr/bin/env node
/**
 * Production start для Next.js без shell (${PORT:-3000} на части PaaS не раскрывается).
 * Читает process.env.PORT явно — как ожидает Amvera / Kubernetes.
 */
const { spawn } = require("child_process");
const path = require("path");

process.env.NODE_ENV = process.env.NODE_ENV || "production";
const port = String(process.env.PORT || "3000");

const projectRoot = path.join(__dirname, "..");

let nextBin;
try {
  nextBin = require.resolve("next/dist/bin/next", { paths: [projectRoot] });
} catch {
  console.error("[start-production] Next.js не найден. Выполните: npm install");
  process.exit(1);
}

const child = spawn(process.execPath, [nextBin, "start", "-H", "0.0.0.0", "-p", port], {
  stdio: "inherit",
  env: process.env,
  cwd: projectRoot,
});

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[start-production] Процесс завершён сигналом ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});
