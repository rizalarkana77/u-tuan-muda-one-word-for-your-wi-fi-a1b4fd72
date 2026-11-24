// One Word for Your Wi-Fi — entry program.
// Writes one word to /output/entry.txt. Deterministic: the same
// bytes on every run. Node 22, standard library only, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word: "Bandwidthit" — bandwidth + bandit. Every home Wi-Fi
// feels like it steals your bandwidth the moment you need it most,
// and the pun names the thief in a single word. It reads instantly
// as a network name, which is what the winning word becomes.
const WORD = "Bandwidthit";

// Self-check the gate before writing: the file must hold exactly one
// word — letters only, no spaces or other characters, 1 to 60
// characters, not only white space. Fail loudly instead of handing
// the grader a bad file. The 11-letter word clears it.
if (
  WORD.length < 1 ||
  WORD.length > 60 ||
  WORD.trim().length !== WORD.length ||
  !/^[A-Za-z]+$/.test(WORD)
) {
  throw new Error(`word fails the one-word gate: ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, WORD, "utf8");
// Read it back: the grader must receive exactly the word above, byte
// for byte. Fail loudly instead of silently handing over a bad file.
if (readFileSync(outFile, "utf8") !== WORD) {
  throw new Error("entry.txt does not match the word after writing");
}
console.log(WORD);
