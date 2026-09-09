import { mkdir, copyFile, rm, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'public');
const output = path.join(root, 'dist');

// The published site is public/ copied verbatim. Add names here only to keep
// something out of dist/ (e.g. a draft page or a large source asset).
const EXCLUDE = new Set([]);

async function walk(dir, base = '') {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (EXCLUDE.has(rel) || EXCLUDE.has(entry.name)) continue;
    if (entry.isDirectory()) out.push(...await walk(path.join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out;
}

await rm(output, { recursive: true, force: true });
const files = await walk(source);
for (const file of files) {
  const target = path.join(output, file);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(source, file), target);
}
console.log(`Built ${files.length} OXMF files in dist/`);
