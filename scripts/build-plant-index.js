#!/usr/bin/env node
'use strict';

// Build a compact, letter-sharded browser index from Kew's WCVP Darwin Core Archive.
// Usage: node scripts/build-plant-index.js path/to/wcvp_taxon.csv
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { gzipSync } = require('node:zlib');
const { once } = require('node:events');
const { finished } = require('node:stream/promises');

const input = process.argv[2];
if (!input || !fs.existsSync(input)) {
  console.error('Pass the extracted WCVP v16 wcvp_taxon.csv file as the first argument.');
  process.exit(2);
}

const outputs = [path.resolve('plant-index'), path.resolve('dist/plant-index')];
const staging = path.resolve('.data/plant-index-staging');
const counts = Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map(letter => [letter, 0]));
const streams = new Map();
let recordCount = 0;

function streamFor(letter) {
  let state = streams.get(letter);
  if (!state) {
    fs.mkdirSync(staging, { recursive: true });
    const files = [fs.createWriteStream(path.join(staging, `${letter}.json`), { encoding: 'utf8' })];
    state = { files, first: true };
    streams.set(letter, state);
    for (const file of files) file.write('[');
  }
  return state;
}

async function writeRecord(letter, record) {
  const state = streamFor(letter);
  const serialized = `${state.first ? '' : ','}${JSON.stringify(record)}`;
  state.first = false;
  for (const file of state.files) if (!file.write(serialized)) await once(file, 'drain');
}

async function main() {
  let firstLine = true;
  const lines = readline.createInterface({
    input: fs.createReadStream(path.resolve(input), { encoding: 'utf8' }),
    crlfDelay: Infinity
  });

  for await (const line of lines) {
    if (firstLine) { firstLine = false; continue; }
    // The DwCA declares an unquoted pipe delimiter and the fields do not contain pipes.
    const row = line.split('|');
    if (row.length < 18 || row[7].trim() !== 'Species' || row[8].trim() !== 'Accepted') continue;
    const name = row[5].trim();
    const firstLetter = name.match(/[A-Za-z]/)?.[0]?.toLowerCase();
    if (!firstLetter || !counts.hasOwnProperty(firstLetter)) continue;
    const record = { n: name, f: row[1].trim(), a: row[6].trim() };
    await writeRecord(firstLetter, record);
    counts[firstLetter]++;
    recordCount++;
  }

  for (const { files } of streams.values()) for (const file of files) file.end(']');
  await Promise.all([...streams.values()].flatMap(({ files }) => files.map(file => finished(file))));

  for (const letter of Object.keys(counts)) {
    const raw = fs.readFileSync(path.join(staging, `${letter}.json`));
    const compressedBase64 = gzipSync(raw, { level: 9 }).toString('base64');
    for (const directory of outputs) {
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(path.join(directory, `${letter}.json.gz.b64`), `${compressedBase64}\n`);
      // Remove the former uncompressed filename from an earlier generator run.
      fs.rmSync(path.join(directory, `${letter}.json`), { force: true });
    }
  }

  const manifest = {
    schema: 1,
    dataset: 'World Checklist of Vascular Plants (WCVP)',
    version: '16',
    sourcePublished: '2026-06-04',
    recordType: 'accepted species names only',
    shardEncoding: 'base64-encoded gzip-compressed JSON; fetch one initial-letter shard per search',
    recordCount,
    shards: counts,
    license: 'CC BY 3.0',
    attribution: 'Govaerts R (ed.). 2026. The World Checklist of Vascular Plants (WCVP). Facilitated by the Royal Botanic Gardens, Kew. https://doi.org/10.34885/egs6-cp24. Retrieved 2026-11-16.',
    source: 'https://kew.iro.bl.uk/entities/product/998399a0-4b87-4a93-8303-6abc8a2de281',
    powo: 'https://powo.science.kew.org/',
    notice: 'WCVP covers vascular plants. The index includes flowering and non-flowering plants; it is a scientific name index, not a set of illustrated or Mongolian-translated species profiles. Kew does not endorse this website.'
  };
  for (const directory of outputs) {
    fs.writeFileSync(path.join(directory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    for (const letter of Object.keys(counts)) fs.rmSync(path.join(directory, `${letter}.json`), { force: true });
  }
  console.log(`Built ${recordCount.toLocaleString('en-US')} accepted species names in ${streams.size} letter shards.`);
  console.log(JSON.stringify(counts));
}

main().catch(error => { console.error(error); process.exitCode = 1; });

