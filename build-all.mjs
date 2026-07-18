import { execSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const versions = ['version1', 'version2', 'version3'];
const outDir = 'public';

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir);

for (const v of versions) {
  console.log(`\n=== Building ${v} ===`);
  try {
    execSync('npm install', { cwd: v, stdio: 'inherit' });
    execSync('npm run build', { cwd: v, stdio: 'inherit' });
    cpSync(`${v}/dist`, `${outDir}/${v}`, { recursive: true });

    // Vite emits root-absolute asset paths ("/assets/..."); rewrite to
    // relative so each build works when served under a subpath like /version1/.
    const indexPath = `${outDir}/${v}/index.html`;
    const html = readFileSync(indexPath, 'utf8').replace(/="\/assets\//g, '="assets/');
    writeFileSync(indexPath, html);

    console.log(`--- ${v} copied to ${outDir}/${v} ---`);
  } catch (err) {
    console.error(`FAILED at ${v}:`, err.message);
    process.exitCode = 1;
    throw err;
  }
}

cpSync('index.html', `${outDir}/index.html`);
console.log('\nAll builds copied into ./public');
