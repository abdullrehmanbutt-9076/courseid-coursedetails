import fs from 'fs';
import path from 'path';

// Read the KOTLIN_PROJECT_FILES from src/data/kotlinFiles.ts
const content = fs.readFileSync('src/data/kotlinFiles.ts', 'utf-8');

// Simple regex extraction or direct write
const fileRegex = /path:\s*"([^"]+)",[\s\S]*?code:\s*`([\s\S]*?)`\s*}/g;
let match;
let count = 0;

while ((match = fileRegex.exec(content)) !== null) {
  const relPath = match[1];
  const code = match[2];
  const fullPath = path.join(process.cwd(), 'android-project', relPath);
  
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, code);
  count++;
  console.log(`Generated: ${relPath}`);
}

console.log(`Total ${count} Kotlin Android project files generated!`);
