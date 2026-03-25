const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const docxPath = path.join(__dirname, 'document', '08. Fintern Complaints Handling Policy and Procedure - v5.0 Draft.docx');
const outputPath = path.join(__dirname, 'document', 'orig-full.txt');

// TOC styles to skip
const TOC_STYLES = new Set([
  'TOC1','TOC2','TOC3','TOC4','TOC5','TOC6','TOC7','TOC8','TOC9','TOCHeading',
  'toc1','toc2','toc3','toc4','toc5','toc6','toc7','toc8','toc9',
  'TableofContents'
]);

// Strip field codes from XML chunk: remove instrText and fldChar blocks
function stripFieldCodes(xml) {
  // Remove instrText elements and content
  xml = xml.replace(/<w:instrText[^>]*>[\s\S]*?<\/w:instrText>/g, '');
  // Remove self-closing fldChar
  xml = xml.replace(/<w:fldChar[^/]*\/>/g, '');
  // Remove fldChar with children
  xml = xml.replace(/<w:fldChar[^>]*>[\s\S]*?<\/w:fldChar>/g, '');
  return xml;
}

// Extract text from <w:t> tags in an XML chunk
function extractWtText(xml) {
  const texts = [];
  // w:t can have xml:space="preserve" attribute
  const re = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    texts.push(m[1]);
  }
  return texts.join('');
}

// Remove deleted text runs (tracked changes deletions)
function removeDeletedRuns(xml) {
  return xml.replace(/<w:del\b[\s\S]*?<\/w:del>/g, '');
}

// Get paragraph style from pPr
function getParaStyle(paraXml) {
  const m = paraXml.match(/<w:pStyle\s+w:val="([^"]+)"/);
  return m ? m[1] : 'Normal';
}

// Check if paragraph has numPr (list paragraph)
function hasNumPr(paraXml) {
  return /<w:numPr\b/.test(paraXml);
}

// Extract text from a single paragraph XML chunk
function extractParaText(paraXml) {
  let xml = removeDeletedRuns(paraXml);
  xml = stripFieldCodes(xml);
  return extractWtText(xml);
}

// Extract text from a table cell (join all para texts with space)
function extractCellText(cellXml) {
  // Split cell into paragraphs
  const parts = [];
  const segments = cellXml.split('</w:p>');
  segments.forEach(seg => {
    const pIdx = seg.lastIndexOf('<w:p');
    if (pIdx === -1) return;
    const paraXml = seg.substring(pIdx);
    const t = extractParaText(paraXml).trim();
    if (t) parts.push(t);
  });
  return parts.join(' ');
}

// Process table XML: returns array of row strings "CELL1 | CELL2 | ..."
function processTable(tblXml) {
  const rows = [];
  // Split into rows by </w:tr>
  const rowSegments = tblXml.split('</w:tr>');
  rowSegments.forEach(seg => {
    const trIdx = seg.lastIndexOf('<w:tr');
    if (trIdx === -1) return;
    const rowXml = seg.substring(trIdx);

    // Split into cells by </w:tc>
    const cells = [];
    const cellSegments = rowXml.split('</w:tc>');
    cellSegments.forEach(cseg => {
      const tcIdx = cseg.lastIndexOf('<w:tc');
      if (tcIdx === -1) return;
      const cellXml = cseg.substring(tcIdx);
      cells.push(extractCellText(cellXml));
    });

    if (cells.some(c => c.trim())) {
      rows.push(cells.join(' | '));
    }
  });
  return rows;
}

async function main() {
  const data = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(data);
  const xmlContent = await zip.file('word/document.xml').async('string');

  // Extract body
  const bodyMatch = xmlContent.match(/<w:body>([\s\S]*)<\/w:body>/);
  if (!bodyMatch) {
    console.error('Could not find w:body');
    process.exit(1);
  }
  const bodyXml = bodyMatch[1];

  const lines = [];

  // Strategy: tokenize by splitting on table boundaries
  // Find all <w:tbl>...</w:tbl> blocks and process them separately
  // Process everything else as paragraphs

  // We'll walk through the body using a custom tokenizer
  // Since w:tbl and w:p don't nest with each other at body level, we can do this:

  // Split the body into segments: either table or paragraph sequences
  // We'll use an index-based approach, tracking position carefully

  let pos = 0;

  // Helper: find matching closing tag, handling nesting
  function findClose(xml, startAfterOpenTag, tagName) {
    const openPattern = '<' + tagName;
    const closePattern = '</' + tagName + '>';
    let depth = 1; // we're already inside one opening tag
    let i = startAfterOpenTag;
    while (i < xml.length) {
      const nextClose = xml.indexOf(closePattern, i);
      const nextOpen = xml.indexOf(openPattern, i);

      // Check if nextOpen is actually this tag (not a prefixed tag like w:tblPr)
      let validOpen = -1;
      if (nextOpen !== -1) {
        const charAfter = xml[nextOpen + openPattern.length];
        if (charAfter === ' ' || charAfter === '>' || charAfter === '\n' || charAfter === '\r' || charAfter === '/') {
          validOpen = nextOpen;
        }
      }

      if (nextClose === -1) break;

      if (validOpen !== -1 && validOpen < nextClose) {
        depth++;
        i = validOpen + openPattern.length;
      } else {
        depth--;
        if (depth === 0) {
          return nextClose + closePattern.length;
        }
        i = nextClose + closePattern.length;
      }
    }
    return xml.length;
  }

  while (pos < bodyXml.length) {
    // Find next paragraph or table
    const nextP = bodyXml.indexOf('<w:p', pos);
    const nextTbl = bodyXml.indexOf('<w:tbl', pos);

    // Determine which comes first
    let useP = false, useTbl = false;
    if (nextP === -1 && nextTbl === -1) break;
    if (nextP === -1) useTbl = true;
    else if (nextTbl === -1) useP = true;
    else if (nextP < nextTbl) useP = true;
    else useTbl = true;

    if (useP) {
      // Verify it's actually a <w:p (not <w:pPr etc)
      const charAfterP = bodyXml[nextP + 4];
      if (charAfterP !== ' ' && charAfterP !== '>' && charAfterP !== '\n' && charAfterP !== '\r') {
        // Not a real paragraph tag - skip past it
        pos = nextP + 4;
        continue;
      }

      // Find end of paragraph
      // Since w:p doesn't nest in body, just find next </w:p>
      const closeP = bodyXml.indexOf('</w:p>', nextP);
      if (closeP === -1) { pos = bodyXml.length; break; }
      const pEnd = closeP + 6; // length of </w:p>
      const paraXml = bodyXml.substring(nextP, pEnd);

      let style = getParaStyle(paraXml);

      // Upgrade 'Normal' with numPr to 'ListParagraph'
      if ((style === 'Normal' || style === 'BodyText') && hasNumPr(paraXml)) {
        style = 'ListParagraph';
      }

      // Skip TOC styles
      if (TOC_STYLES.has(style)) {
        pos = pEnd;
        continue;
      }

      const text = extractParaText(paraXml).trim();
      if (text) {
        lines.push(`[${style}] ${text}`);
      }

      pos = pEnd;

    } else {
      // Table
      // Verify it's actually <w:tbl
      const charAfterTbl = bodyXml[nextTbl + 6];
      if (charAfterTbl !== ' ' && charAfterTbl !== '>' && charAfterTbl !== '\n' && charAfterTbl !== '\r') {
        pos = nextTbl + 6;
        continue;
      }

      // Find end of table using findClose
      const tblEnd = findClose(bodyXml, nextTbl + 5, 'w:tbl');
      const tblXml = bodyXml.substring(nextTbl, tblEnd);

      const tableRows = processTable(tblXml);
      tableRows.forEach(row => lines.push(`[TableRow] ${row}`));

      pos = tblEnd;
    }
  }

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`Written ${lines.length} lines to ${outputPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
