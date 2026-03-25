'use strict';
const JSZip = require('jszip');
const fs = require('fs');

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x[\dA-Fa-f]+;/g, m => String.fromCodePoint(parseInt(m.slice(3,-1),16))).replace(/&#\d+;/g, m => String.fromCodePoint(parseInt(m.slice(2,-1))));
}

function extractText(xml) {
  // Strip field codes
  let clean = xml
    .replace(/<w:fldChar[\s\S]*?<\/w:fldChar>/g, '')
    .replace(/<w:instrText[\s\S]*?<\/w:instrText>/g, '');
  const reg = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  let t = '', m;
  while ((m = reg.exec(clean)) !== null) t += m[1];
  return decodeEntities(t.replace(/\s+/g, ' ').trim())
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")   // normalize smart single quotes
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')   // normalize smart double quotes
    .replace(/\u200D/g, '');                        // strip zero-width joiners
}

async function extractDoc(filePath) {
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const xml = await zip.file('word/document.xml').async('string');
  const body = xml.match(/<w:body>([\s\S]*)<\/w:body>/)[1];

  const result = [];
  const blockReg = /(<w:tbl[\s\S]*?<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>)/g;
  let bm;

  while ((bm = blockReg.exec(body)) !== null) {
    const block = bm[1];
    if (block.startsWith('<w:tbl')) {
      result.push('[TABLE]');
      const rowReg = /<w:tr[\s\S]*?<\/w:tr>/g;
      let rm;
      while ((rm = rowReg.exec(block)) !== null) {
        const cells = [];
        const cellReg = /<w:tc>([\s\S]*?)<\/w:tc>/g;
        let cm;
        while ((cm = cellReg.exec(rm[0])) !== null) {
          cells.push(extractText(cm[1]));
        }
        result.push('  ' + cells.join(' | '));
      }
      result.push('[/TABLE]');
    } else {
      const styleM = block.match(/<w:pStyle w:val="([^"]+)"/);
      const style = styleM ? styleM[1] : 'Normal';
      if (style.startsWith('TOC') || style === 'TOCHeading') continue;
      const numM = block.match(/<w:ilvl w:val="([^"]+)"/);
      const level = numM ? parseInt(numM[1]) : -1;
      const text = extractText(block);
      if (!text && (style === 'Normal' || style === 'BodyText')) continue;
      const indent = level >= 0 ? '  '.repeat(level + 1) : '';
      result.push(indent + '[' + style + (level >= 0 ? ':L' + level : '') + '] ' + text);
    }
  }
  return result;
}

async function run() {
  const orig = await extractDoc(
    'document/08. Fintern Complaints Handling Policy and Procedure - v5.0 Draft.docx'
  );
  const newDoc = await extractDoc(
    'document/08. Abound Complaints Handling Policy and Procedure - v5.0.docx'
  );

  fs.writeFileSync('document/orig_outline.txt', orig.join('\n'));
  fs.writeFileSync('document/new_outline.txt',  newDoc.join('\n'));

  // --- compare headings order ---
  const origH = orig.filter(l => l.match(/^\[(Heading[123]|Normal)\]/)).map(l => l.replace(/^\[[^\]]+\] /, ''));
  const newH  = newDoc.filter(l => l.match(/^\[(Heading[123]|Normal)\]/)).map(l => l.replace(/^\[[^\]]+\] /, ''));

  console.log('=== ORIGINAL HEADINGS ===');
  orig.filter(l => /^\[Heading/.test(l)).forEach(l => console.log(l));

  console.log('\n=== NEW DOC HEADINGS ===');
  newDoc.filter(l => /^\[Heading/.test(l)).forEach(l => console.log(l));

  // --- find lines in orig that are NOT in new (by text) ---
  const newTexts = new Set(newDoc.map(l => l.replace(/^\s*\[[^\]]+\] /, '').toLowerCase().trim()));
  const missing = orig.filter(l => {
    const text = l.replace(/^\s*\[[^\]]+\] /, '').toLowerCase().trim();
    return text.length > 10 && !newTexts.has(text);
  });

  console.log('\n=== CONTENT IN ORIGINAL MISSING FROM NEW (' + missing.length + ' items) ===');
  missing.forEach(l => console.log(l));

  console.log('\nDone. orig:', orig.length, 'lines | new:', newDoc.length, 'lines');
}

run().catch(e => console.error(e));
