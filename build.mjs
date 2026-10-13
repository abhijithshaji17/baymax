import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(projectRoot, "dist");

if (dirname(outputDir) !== projectRoot || outputDir === projectRoot) {
  throw new Error("Refusing to build outside the project dist directory.");
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await mkdir(resolve(outputDir, "assets"), { recursive: true });

for (const file of ["index.html", "dashboard.css", "section-one.css", "section-one.js", "section-three.css", "section-three.js"]) {
  await cp(resolve(projectRoot, file), resolve(outputDir, file));
}

await cp(resolve(projectRoot, "assets/baymax-mark.svg"), resolve(outputDir, "assets/baymax-mark.svg"));
await cp(resolve(projectRoot, "assets/FigmaHand-Regular.ttf"), resolve(outputDir, "assets/FigmaHand-Regular.ttf"));
await cp(resolve(projectRoot, "assets/section-01"), resolve(outputDir, "assets/section-01"), { recursive: true });

console.log("Static site built in baymax/dist");
