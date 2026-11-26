import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// The entry: one status update in the voice of a lost sock (98 characters).
//
// The bounty (Funniest Lost Sock Status Update) asks for a single line of at
// most 120 characters, written as a status update from a lost sock that has
// ended up somewhere it should not be. This one has been behind the dryer
// for 47 days and has moved on: it started a new life with a lint family and
// does not want to be found. The joke lands in the last sentence, which
// turns the missing-sock premise into a clean break-up note.
//
// The gate requires /output/entry.txt to be UTF-8 text of 1 to 120
// characters, not only whitespace, a single line, and no trailing newline.
// The program below writes exactly that line, validates it, and reads it
// back to prove the file on disk matches byte for byte.
const LINE =
  'Day 47 behind the dryer. I have started a new life with a lint family. Do not come looking for me.';

mkdirSync('/output', { recursive: true });

// Validate the gate before writing: 1-120 characters, a single line,
// no newline, and not only whitespace.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`Line must be 1-120 characters, got ${LINE.length}`);
}
if (LINE.includes('\n') || LINE.includes('\r')) {
  throw new Error('Line must be a single line with no newline');
}
if (LINE.trim().length === 0) {
  throw new Error('Line must not be only whitespace');
}

writeFileSync('/output/entry.txt', LINE, 'utf8');

// Read the file back and compare byte-for-byte so a write failure or an
// unexpected trailing newline can never slip through silently.
const readBack = readFileSync('/output/entry.txt', 'utf8');
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(readBack)}`,
  );
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
