# Abound Word Template — Style Guide for AI

This document specifies every design decision in `abound-template-v1.docx`. Use it as the authoritative reference when generating or updating any Abound-branded Microsoft Word document in a future session.

---

## 1. File Reference

| Asset | Path (relative to project root) |
|---|---|
| Template file | `design-system/abound-template-v1.docx` |
| Cover background | `brand-assest/abstract-2.jpg` |
| Logo (colour) | `brand-assest/wordmark.png` — 800 × 220 px |
| Logo (white) | `brand-assest/wordmark-white.png` |
| Saans Regular | `brand-assest/Saans font/Saans-Regular.ttf` |
| Saans Medium | `brand-assest/Saans font/Saans-Medium.ttf` |
| Saans SemiBold | `brand-assest/Saans font/Saans-SemiBold.ttf` |
| Design system | `design-system/abound-design-system.html` |

---

## 2. Page Setup

| Property | Value |
|---|---|
| Paper size | A4 (11906 × 16838 DXA) |
| All margins | 25 mm |
| Header distance from top | 12 mm |
| Footer distance from bottom | 12 mm |
| First-page header/footer | Blank (cover page has no header or footer) |

---

## 3. Brand Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Forest Green | `#0E4533` | Heading 1, logo, header rule, callout border, pull quote text, table header fill |
| Charcoal | `#201F1D` | All body text, Heading 2, Heading 3, cover title |
| Off-White | `#F4F8F3` | Callout background, alternating table row fill, page surface |
| Teal Sage | `#B8DCD2` | Heading 1 bottom rule, footer top rule, callout left border |
| Mid Grey | `#475467` | Header section-name placeholder, secondary labels |
| Light Grey | `#D0D5DD` | Table row dividers (insideH borders) |
| Caption Grey | `#667085` | Caption text, footer text, stat table labels |
| White | `#FFFFFF` | Table header text, cover title area when on dark backgrounds |

**Contrast rules for the cover page:**
The cover background (`abstract-2.jpg`) has a creamy-white upper zone fading to lime-green in the lower third.
- **Do not use Mid Grey** (`#475467`) for any text on the cover — it fails WCAG AA contrast on lime-green.
- Use **Charcoal** for the main title (~8:1 contrast on lime-green).
- Use **Forest Green** for subtitle and date text (~7:1 contrast on lime-green).

---

## 4. Typography

### Fonts

| Role | Font | Notes |
|---|---|---|
| Headings | **Saans** (SemiBold / Medium) | TTF available in `brand-assest/Saans font/`. Must be installed locally to render. Embedded in the docx via `embedTrueTypeFonts`. |
| Body / UI | **Calibri** | System font, present on all Windows and macOS machines. Use for body text, captions, table data, header/footer. |

**Font fallback:** If Saans is not installed, Word substitutes a system sans-serif. To guarantee fidelity, always export to PDF for external distribution.

### Type Scale

| Style name | Font | Size | Weight | Colour | Notes |
|---|---|---|---|---|---|
| Cover Title | Saans | 36 pt (72 half-pt) | Bold | Charcoal | Cover page only |
| Cover Subtitle | Saans | 16 pt (32 half-pt) | Regular | Forest Green | Cover page only |
| Cover Date | Calibri | 11 pt (22 half-pt) | Regular | Forest Green | Cover page only |
| Heading 1 | Saans | 24 pt (48 half-pt) | Bold | Forest Green | With teal bottom rule |
| Heading 2 | Saans | 18 pt (36 half-pt) | Bold | Charcoal | |
| Heading 3 | Saans | 14 pt (28 half-pt) | Regular | Charcoal | |
| Body Text | Calibri | 11 pt (22 half-pt) | Regular | Charcoal | 1.4× line spacing (331 / 240) |
| Caption Text | Calibri | 9 pt (18 half-pt) | Italic | Caption Grey | Below tables and images |
| Callout | Calibri | 11 pt (22 half-pt) | Regular | Charcoal | See callout section |
| Pull Quote | Calibri | 13 pt (26 half-pt) | Italic | Forest Green | See pull quote section |
| Header label | Calibri | 9 pt (18 half-pt) | Italic | Mid Grey | Right-aligned in header |
| Footer text | Calibri | 9 pt (18 half-pt) | Regular | Caption Grey | |

> **docx-js note:** All sizes in the `docx` npm library are specified in **half-points** (`size` property). Multiply the pt value by 2.

---

## 5. Cover Page

### Layout (top to bottom)

1. **Background image** — `abstract-2.jpg` stretched to fill A4 portrait (794 × 1123 px at 96 dpi). Set as a floating image: `behindDocument: true`, `TextWrappingType.NONE`, positioned at page origin (offset 0, 0) relative to `PAGE`.

2. **Logo** — `wordmark.png` at 170 × 47 px (maintain exact 800:220 source ratio). Left-aligned, 8 mm top margin. Place in a regular paragraph — **not floating**.

3. **Spacer** — ~110 mm `spacing.before` on an empty paragraph to push the title block into the lower third.

4. **Title paragraph** — `font: Saans, size: 72, bold: true, color: Charcoal`. Left-aligned. 5 mm spacing after.

5. **Subtitle paragraph** — `font: Saans, size: 32, color: Forest Green`. Left-aligned. 3 mm spacing after.

6. **Date paragraph** — `font: Calibri, size: 22, color: Forest Green`. Left-aligned. 10 mm spacing after.

### What NOT to put on the cover
- No header or footer (use `titlePage: true` in section properties and assign blank `first` header/footer).
- No coloured bar or shape — the background image provides sufficient brand identity.
- No Mid Grey text — fails contrast against lime-green background zone.

---

## 6. Header (body pages only)

Structure: single paragraph with a Forest Green bottom border rule.

- **Left**: `wordmark.png` image — 113 × 31 px (maintain 800:220 ratio).
- **Right**: `[Section Name]` placeholder text — right-aligned via tab stop at `USABLE_W` (page width minus both margins). Calibri 9 pt italic, Mid Grey.
- **Bottom border**: `BorderStyle.SINGLE`, size 6 (0.75 pt), Forest Green, space 4.

The first-page header is blank — the cover page has no header.

---

## 7. Footer (body pages only)

Structure: single paragraph with a Teal Sage top border rule.

- **Left**: `[Document Name]` — Calibri 9 pt, Caption Grey.
- **Right**: `Page X of Y` — right-aligned via tab stop. Use `PageNumber.CURRENT` and `PageNumber.TOTAL_PAGES` from the `docx` library. Calibri 9 pt, Caption Grey.
- **Top border**: `BorderStyle.SINGLE`, size 4, Teal Sage, space 4.

The first-page footer is blank.

---

## 8. Paragraph Styles — Usage Rules

### Heading 1
- Use for **top-level sections** only (e.g. "1. Executive Summary", "2. Key Findings", "Appendix").
- Always preceded by a page break when starting a new major section.
- Rendered with a Teal Sage bottom rule (`BorderStyle.SINGLE`, size 4, space 4).
- Spacing: 480 before, 160 after.

### Heading 2
- Use for **subsections** within a Heading 1 section (e.g. "1.1 Background").
- Never use without a Heading 1 parent.
- Spacing: 320 before, 120 after.

### Heading 3
- Use for **sub-subsections** (e.g. "1.1.1 Market Opportunity").
- Use sparingly — prefer restructuring content over adding a fourth level.
- Spacing: 240 before, 80 after.

### Body Text
- Default style for all narrative paragraphs.
- Spacing: 0 before, 160 after. Line spacing: 1.4× (331 / 240 AUTO).
- Do **not** add extra blank paragraphs between body text — the `after` spacing handles separation.

### Caption Text
- Place **immediately below** a table or image.
- Format: `Table N:` or `Figure N:` prefix, then description.
- Do not use for any other purpose.

### Callout
- Use to **highlight a key insight, tip, warning, or contextual note** that sits outside the main flow.
- Has a 3 pt Teal Sage left border and Off-White background fill.
- Structure: bold label (e.g. "Key Insight:" or "Note:") followed by regular text.
- Use **at most once per section**. Do not stack multiple callouts.
- Spacing: 160 before, 200 after.

### Pull Quote
- Use for a **single powerful statement** — a striking data point or brand voice phrase.
- Wrap in curly quotes (`\u201C` / `\u201D`).
- Use **at most once per page**. Do not use consecutively.
- Indented 12 mm left and right.
- Spacing: 200 before and after.

---

## 9. Table Styles

Two table patterns are used in the template. Both share the same border and spacing conventions.

### Pattern A — Key Metrics (2-column stat table)
Use for at-a-glance summary data at the start of a section.

| Property | Value |
|---|---|
| Column split | 60 % label / 40 % value |
| Row shading | Alternating: White (`#FFFFFF`) / Off-White (`#F4F8F3`) |
| Label text | Calibri 10 pt, Caption Grey (`#667085`) |
| Value text | Calibri 10 pt **Bold**, Charcoal |
| All outer borders | None |
| Row divider (insideH) | `BorderStyle.SINGLE`, size 2, Light Grey |
| Column divider (insideV) | None |
| Cell margins | top/bottom 80 DXA, left/right 80–120 DXA |

### Pattern B — Data Grid (multi-column comparison table)
Use for structured comparison data (multiple columns, column headers).

| Property | Value |
|---|---|
| Column widths | Equal split across all columns |
| Header row fill | Forest Green (`#0E4533`) |
| Header text | Calibri 10 pt **Bold**, White |
| Data row shading | Alternating: White / Off-White |
| Data text | Calibri 10 pt, Charcoal |
| All outer borders | None |
| Row divider (insideH) | `BorderStyle.SINGLE`, size 2, Light Grey |
| Column divider (insideV) | None |
| Cell margins | top/bottom 80 DXA, left/right 120 DXA |

**Always** follow a data grid with a Caption Text paragraph (`Table N: description`).

---

## 10. Spacing & Rhythm

Use the `gap(mm)` helper (an empty paragraph with `spacing.before`) to add visual breathing room between structural blocks that are not covered by the style's built-in spacing. Use it sparingly — between a table and the next heading, or between distinct content blocks.

| Situation | Gap |
|---|---|
| After a stat table, before the next element | 6 mm |
| After a data table (before caption is handled by caption style) | 4 mm |
| Between the appendix style demo rows | 4–6 mm |
| Between a callout/pull quote and the next paragraph | Handled by style spacing — no extra gap needed |

Never use blank paragraphs (pressing Enter) to create spacing — always use `spacing.before` / `spacing.after` on the relevant paragraph.

---

## 11. Section & Page Structure

```
Page 1   — Cover (no header/footer)
Page 2+  — Body pages (header + footer)
           ├─ Heading 1: Section
           │   ├─ Body Text paragraphs
           │   ├─ Stat table (if summarising data)
           │   ├─ Pull Quote (optional, once per section)
           │   ├─ Heading 2: Subsection
           │   │   ├─ Body Text
           │   │   ├─ Callout (optional)
           │   │   └─ Heading 3: Sub-subsection (if needed)
           │   └─ Data table + Caption (if presenting comparison data)
           └─ [Page Break before next Heading 1]
Last page — Appendix (style reference or supplementary data)
```

---

## 12. Logo Usage Rules

- **Always preserve the 800:220 aspect ratio.** Derive height as `Math.round(width * (220 / 800))`.
- Cover logo: 170 × 47 px.
- Header logo: 113 × 31 px.
- Use `wordmark.png` (Forest Green) on light backgrounds.
- Use `wordmark-white.png` on dark backgrounds. (Note: this PNG has a transparent/white foreground — preview against a dark fill to verify.)
- Never scale the logo below 80 px wide or stretch it independently in either axis.

---

## 13. Implementation Notes for AI (docx npm library)

The template is built programmatically using Node.js with the `docx` npm package (v9.x) and `jszip`.

### Critical rules

- All sizes (`size` property on `TextRun`) are in **half-points**. `11pt = 22`, `9pt = 18`, `24pt = 48`.
- All widths/margins use **DXA (twips)**. Use `convertMillimetersToTwip(mm)` for human-readable values.
- Table `columnWidths` array must sum exactly to the table's total `width.size`.
- Use `WidthType.DXA` for all table and cell widths — never percentages (they break in some Word versions).
- Use `ShadingType.CLEAR` with `color: 'auto'` and `fill: 'XXXXXX'` for background fills. Never use `ShadingType.SOLID`.
- `PageNumber.CURRENT` and `PageNumber.TOTAL_PAGES` must be placed inside a `TextRun.children` array, not as standalone values.
- `PageBreak` must be a child of a `Paragraph`, not inserted directly into `children` of a section.
- Floating images (cover background) must set `behindDocument: true` and `wrap: { type: TextWrappingType.NONE }`.
- Override built-in heading styles using the exact IDs: `Heading1`, `Heading2`, `Heading3`.

### Font embedding

After `Packer.toBuffer()`, open the buffer with `jszip`, locate `word/settings.xml`, and inject before `</w:settings>`:

```xml
<w:embedTrueTypeFonts/><w:embedSystemFonts/>
```

This instructs Word to embed Saans when the document is next saved. Without this step, Saans will only render on machines where the font is installed locally.

### Bullet lists

Use `bullet: { level: 0 }` on a `Paragraph` combined with `style: 'BodyText'` so bullets inherit the correct font, size, and spacing. Do not manually set unicode bullet characters.

### Tab stops for header/footer alignment

Right-align the section name (header) and page number (footer) using a right tab stop at `USABLE_W` (`PAGE_W - MARGIN * 2`). Insert a `\t` text run before the right-aligned content.

---

## 14. What to Avoid

| Don't | Why |
|---|---|
| Use Mid Grey (`#475467`) for cover page text | Fails contrast on lime-green background zone |
| Add a bottom colour bar to the cover | Removed by design — the background image alone carries brand identity |
| Use the Callout style more than once per section | Creates visual noise; reserve for genuinely critical information |
| Stack two Pull Quotes on the same page | Dilutes impact |
| Use blank paragraphs for spacing | Breaks style consistency; use `spacing.before/after` |
| Stretch or crop the logo | Always maintain the 800:220 aspect ratio |
| Apply Mid Grey or Caption Grey to headings | Headings must be Forest Green (H1) or Charcoal (H2/H3) |
| Use percentage-based table widths | Break layout in certain Word and Google Docs versions |
