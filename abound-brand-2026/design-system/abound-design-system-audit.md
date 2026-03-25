# Abound Design System — Audit Report
**Reviewed:** March 2026
**File:** `design-system/abound-design-system.html`
**Skills used:** /design:design-system · /impeccable:frontend-design

---

## Summary

| Metric | Result |
|---|---|
| Sections reviewed | 9 (Principles, Colour, Typography, Spacing, Components ×10, Shadows, Motion, Accessibility, Rationale) |
| Critical bugs found | 4 |
| Moderate issues | 8 |
| Minor issues | 6 |
| Missing components | 8 |
| Overall score | **65 / 100** |

The system has a strong conceptual foundation — a well-structured 3-layer token architecture, a complete accessibility matrix, and a thoughtful design rationale section. The main problems are (a) several broken CSS class references that will cause sections to render unstyled, (b) a major missed opportunity with the Saans font that is already in the asset folder but not used, and (c) a surface/hero that doesn't reflect the brand's visual personality at all.

---

## 🔴 Critical Issues

### 1. Undefined CSS Classes — Sections Will Render Broken

The file mixes Tailwind utility classes with custom CSS class names that are **never defined anywhere** in the file:

- `card`, `card-default` — used in the entire Accessibility section (§8)
- `section`, `section-title`, `section-subtitle` — used in the Accessibility section header
- `token-table-wrap`, `mono`, `color-dot` — used in Border Tokens and Interactive Tokens tables (§2b)
- `focus-ring-demo` — referenced in the accessibility focus indicator card
- `divider` — used on every `<hr>` separator between sections

**Impact:** The Accessibility section renders as unstyled plain HTML. The Border/Interactive token tables have no visual formatting. The `<hr>` dividers appear as default browser horizontal rules.

**Fix:** Either define these custom classes in a `<style>` block, or replace them with equivalent Tailwind utility classes throughout. The rest of the system uses Tailwind successfully — the inconsistency suggests these sections were written separately and pasted in without updating the class names.

---

### 2. Shadow Token Value Mismatch

The Tailwind config (lines 79–84) defines shadows using **Charcoal** as the shadow color:
```
rgba(32,31,29, ...) ← correct, brand-aligned
```

But the Shadow token reference table in §6 documents different values:
```
rgba(16,24,40, ...) ← generic fintech/Figma export default
```

These are two different shadow systems. The table and the config are not in sync.

**Impact:** Developers reading the token table will implement the wrong shadow. Charcoal-tinted shadows look warmer and more brand-aligned; the 16,24,40 values are a default copied from another design system.

**Fix:** Update the shadow reference table to match the Tailwind config values, or vice versa — but unify them.

---

### 3. JavaScript Bug — Side Nav Selects Wrong Element

The JS at the bottom (lines 1352–1381) has two bugs:

```js
document.querySelector('.side-nav')  // Bug 1 — no element has this class
document.querySelectorAll('.side-nav a')  // Bug 2 — same problem
```

The actual side nav uses `id="sideNav"` with Tailwind utility classes only — `.side-nav` doesn't exist. The `closeMobileNav()` function silently fails, and the scroll-based active link highlight never works.

**Fix:** Replace `.side-nav` with `#sideNav` in both selectors.

---

### 4. Saans Font Is Available — But Not Used

The font strategy document says: *"If Saans font files become available, swap DM Sans → Saans."*

**Saans is already in the repo:**
```
brand-assest/Saans font/
  Saans-Regular.woff2 ✓
  Saans-Medium.woff2  ✓
  Saans-SemiBold.woff2 ✓
```

The design system is shipping with a fallback font when the real brand typeface is sitting right there. This means every component demo, every type scale example, and every heading in the system is displayed in the wrong font.

**Fix:** Add a `@font-face` block loading Saans from the relative path, update the Tailwind `fontFamily.sans` config, and remove the DM Sans Google Fonts link. The note about swapping should be removed — the swap should already be done.

---

## 🟡 Moderate Issues

### 5. Version Number Inconsistency

- Header badge: **v2.0.26**
- Footer: **Abound Design System v1.0**

Pick one and be consistent. Recommend following semantic versioning in the header badge only; remove the version from the footer or align them.

---

### 6. `bg-brand-subtle` and `bg-secondary` Are Identical

In the Semantic Token Map:

| Token | Value | Use |
|---|---|---|
| `bg-secondary` | `#F4F8F3` | Alternate sections, card surfaces |
| `bg-brand-subtle` | `#F4F8F3` | Subtle brand tint |

Two tokens, identical hex value. This causes confusion — which do you reach for when building a card surface? The system doesn't answer this clearly. The defined `brand.subtle` in the Tailwind config is `#EBF2ED` (a slightly different green tint), which is a third value for essentially the same role.

**Fix:** Either give `bg-brand-subtle` a genuinely distinct value (e.g. `#EBF2ED` from the Tailwind config), or remove the duplicate and use `bg-secondary` for both cases.

---

### 7. "Surface Card" Code Doesn't Match Its Description

The Surface Card variant (§5e) is described as *"Off-White background"* but the code sets `bg-white`:
```html
<div class="p-6 rounded-xl bg-white border-transparent">
```

This means the card renders identically to the Default Card in most contexts. Use `bg-off-white` to match the spec.

---

### 8. Progress Indicator Has No Filled Progress Track

The step indicator shows a static `bg-neutral-100` connector line. There is no filled green segment indicating how far through the journey the user is. This is a standard and important affordance for a multi-step loan application — without it, users can't gauge their progress at a glance.

**Fix:** Use a two-layer approach — neutral-100 full track underneath, a brand-colored filled track above set to the correct percentage width.

---

### 9. Hover Colour Hardcoded in Components

Throughout the button section, hover states use hardcoded hex:
```html
hover:bg-[#0A3325]
```

The Tailwind config already defines `brand.hover: '#0A3325'`. Use `hover:bg-brand-hover` instead. Hardcoded arbitrary values undermine the whole purpose of a token system — if the hover colour ever needs to change, it has to be hunted down manually across the codebase.

---

### 10. `bg-brand/5` vs `brand.subtle` Token Fragmentation

There are at least three different ways a "subtle brand tint" is expressed across the file:
- `bg-brand/5` (opacity modifier, used in Principles cards)
- `bg-brand/10` (hover state, used in Principles cards)
- `brand.subtle: '#EBF2ED'` (defined in config, barely used)
- `bg-off-white` (`#F4F8F3`, also used as a subtle brand surface)

Standardise on one approach. Semantic tokens exist precisely to prevent this fragmentation.

---

### 11. Motion Section Is Underdeveloped

Only two tokens are defined (`ease-hover: 150ms` and `ease-enter: 200ms`). Missing:
- `ease-exit` (elements leaving the DOM should feel faster — ~120ms)
- `ease-page` (view transitions between steps)
- `motion-safe` wrapper guidance (important for financial apps with users who have vestibular conditions)

The two interactive demos (scale and pulse) demonstrate CSS properties rather than UI patterns. There are no entry/exit animation examples, no form feedback animations, no step transition demos.

---

### 12. Double `<hr class="divider">` Between Spacing and Components

Lines 699–701:
```html
<hr class="divider">

<hr class="divider">
```

Two consecutive separators. Remove one.

---

## 🟢 Minor Issues

### 13. Spacing Scale Skips Values and Has No Large Tokens

The defined scale goes: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24.

Missing:
- `space-14` / `space-32` / `space-40` — needed for page-level section padding and hero sections
- The hero itself uses `-mt-12 -mx-10` (negative arbitrary values outside the scale)

### 14. Hero Section Uses Negative Arbitrary Margins

`-mt-12 -mx-10` on the hero creates a bleed effect inside the content area, but on small viewports the `max-w-[calc(1280px-260px)]` container combined with `px-12` and `-mx-10` will cause a horizontal scroll. This should use a more robust approach.

### 15. Nav Active State Has No Visual Style

The JS adds `.active` to the nav link but no CSS styles it. An active nav item should visually indicate position — at minimum `text-brand` and `bg-neutral-50`.

### 16. Navigation Component Uses Text Wordmark Instead of Logo Image

The Navigation component in §5j renders the brand name as plain text (`<span class="text-2xl font-black...">abound</span>`) rather than the actual logo image. The wordmark PNG is in `brand-assest/wordmark.png`. Navigation examples should use the real asset.

### 17. Footer Credit Attribution

The footer reads *"Created with Perplexity Computer."* For a design system that will be shared internally, this should either be removed or changed to reflect the internal team. It's also a version inconsistency source.

### 18. Spacing Table Only Documents 3 of 12 Tokens

The spacing section has a visual bar chart of all 12 tokens, but the written reference table below it only documents 3 (`space-1`, `space-4`, `space-8`). Document all of them.

---

## 🧩 Missing Components

These are commonly needed in a lending product and should be added:

| Component | Priority | Reason |
|---|---|---|
| Range / Slider input | **P0** | Loan amount selection is almost always a slider in UK lending apps |
| Loading skeleton | **P0** | Credit check, open banking, and identity verification all have wait states |
| Toast / Snackbar | **P1** | Non-blocking feedback (e.g. "Document saved") distinct from persistent alerts |
| Tooltip | **P1** | APR, eligibility criteria, and financial jargon always need explanation |
| File upload | **P1** | Document upload is a core step in loan applications |
| Modal / Dialog | **P1** | Confirmation dialogs (cancel application, delete account) need a component |
| Empty state | **P2** | No payment history, no saved quotes — these need a designed state |
| Date input | **P2** | Date of birth, employment start date — custom date pickers for mobile UX |

---

## 🎨 Brand & Visual Alignment Observations

These are not bugs but design quality observations.

**What's working well:**
- The Forest Green + Charcoal + Off-White palette is genuinely distinctive for a UK fintech. Warm, trustworthy, not corporate.
- The design rationale section is excellent — rare for a design system document to explain *why* decisions were made.
- Financial typography rules (tabular-nums, right-alignment, £ prefix input) are thoughtful and product-specific.
- The accessibility matrix is thorough and proactively called out the Neutral 400 failure case.
- The 60/30/10 principle is a smart guardrail for preventing brand overuse.

**What could be stronger:**

1. **The brand's abstract visual identity isn't present.** The lime/sage abstract imagery (background.jpg, abstract-1.jpg, abstract-2.jpg) is one of Abound's most distinctive brand elements — it's referenced in the word template guide but completely absent from the HTML design system. The system documents tokens and components, but gives no guidance on how and when to use these textures.

2. **Lime (#D4F19B) and Khaki (#EDEABE) appear almost nowhere.** They're in the color swatch section, and the version badge uses Lime — that's it. If these are "from the agency brand," they need at least one usage example that shows how they integrate with components. Otherwise teams will never use them.

3. **The hero panel undersells the brand.** A plain Forest Green rectangle with a "March 2026" label and light body text is functionally fine but doesn't demonstrate the warmth and character of the brand. The abstract background imagery would transform this into something that actually communicates what Abound *feels* like.

4. **DM Sans ≠ Saans.** Even though they're both geometric grotesques, Saans has more distinctive letter-forms (notably the 'a' and 'b' which visually echo the logo icon). The type scale examples shown in the system don't reflect what production will actually look like when Saans is loaded. Fix this now that the font files are available.

---

## Priority Action List

| Priority | Action |
|---|---|
| **P0** | Fix undefined CSS classes (card, divider, token-table-wrap, etc.) so all sections render correctly |
| **P0** | Fix JS bug: `.side-nav` → `#sideNav` |
| **P0** | Load Saans from `brand-assest/Saans font/` — the files are already there |
| **P0** | Unify shadow token values between Tailwind config and reference table |
| **P1** | Add Range/Slider component |
| **P1** | Add Loading Skeleton component |
| **P1** | Remove `hover:bg-[#0A3325]` hardcodes — use `hover:bg-brand-hover` |
| **P1** | Resolve `bg-brand-subtle` / `bg-secondary` duplicate |
| **P1** | Add a filled progress track to the Progress Indicator |
| **P1** | Add abstract background usage guidance |
| **P2** | Align version number (v2.0.26 vs v1.0) |
| **P2** | Add Tooltip and Toast components |
| **P2** | Style the `.active` nav link state in CSS |
| **P2** | Add `ease-exit` and `motion-safe` guidance to Motion section |
| **P2** | Complete the spacing reference table (currently only 3 of 12 tokens) |
| **P3** | Replace text wordmark in Navigation component with actual logo image |
| **P3** | Fix Surface Card to use `bg-off-white` as described |
| **P3** | Remove duplicate `<hr>` tag between Spacing and Components sections |
| **P3** | Remove or update footer attribution |

---

*Abound Design System Audit — March 2026*
