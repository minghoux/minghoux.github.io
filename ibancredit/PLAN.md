# Goal
Rebrand the Ibancar user journey to align with the new Abound brand identity, utilizing the Abound design system and modular atomic architecture. The final deliverable is a functional, interactive, and scalable frontend prototype.

## Knowledge Sources
- **Reference Journey**: `ibancredit/current-journey` contains the original Ibancar logical flow, screenshots, and content used as the basis for this rebranding.
- **Brand Identity**: Abound 2026 guidelines (Saans Typography, Forest/Lime/Teal palette).

## Technical Stack
- **Framework**: Vue 3 (Composition API) via CDN ESM
- **Styling**: Tailwind CSS (CDN) + Abound Design System 2026 Core CSS (`assets/styles/main.css`)
- **Architecture**: Modular "No-Build" SPA with **Atomic UI Components**
- **Assets**: Local brand assets from `/brand-assest` (wordmark, Saans font)
- **Icons**: FontAwesome 6 (CDN)

## Design Standard: Refined Fintech
The journey targets a "Refined Fintech" aesthetic — premium and trustworthy without being cold. Key principles:

- **Shadowless UI**: No drop shadows. Hierarchy is driven by borders, background tints, and spacing.
- **Two Selection Vocabularies**:
  - **Grid pattern** (Motivo, Bancos): 2-column tile grid with `rounded-[12px]` square icon containers. Idle: `#EEF1EE` bg. Active: brand green fill.
  - **List pattern** (Employment, Housing): Flat rows with a `3px left-border` inset accent that animates in on selection. No icon circles — flat icon only.
- **Pill CTAs**: Primary buttons use `border-radius: 9999px` — a strong, deliberate brand identity choice.
- **Brand Lime as Accent**: `#D4F19B` (lime) is the primary accent color — used in the progress bar fill, the calculator result box, and the outcome screen. Not to be confused with the semantic `success` green.
- **Immersive Header**: Persistent Forest Green header with centered Abound wordmark and a lime progress bar (no glow).
- **Label Hierarchy**: `.abound-label` class — `11px / font-semibold / tracking-[0.1em] / uppercase`. Lighter than before, reserves `font-black` for h1 headings only.

## CSS Design Tokens (main.css)
| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#0E4533` | Primary actions, borders, text |
| `--color-lime` | `#D4F19B` | Progress bar, result boxes, outcome |
| `--color-teal-sage` | `#B8DCD2` | Background gradient hint (bottom-left) |
| `--color-charcoal` | `#1A1917` | All body headings |
| `--color-bg` | `#F4F8F1` | Page background base |
| `--color-success-text` | `#065F46` | High-contrast text on lime surfaces |

## Page Background
A fixed dual-corner radial gradient sits behind all content:
- Top-right: faint lime blush `rgba(212, 241, 155, 0.35)`
- Bottom-left: faint teal hint `rgba(184, 220, 210, 0.25)`

This is barely perceptible but gives the white cards depth and warmth.

## Animations
- **Entry**: `fadeSlideIn` — `opacity: 0 + translateY(10px)` → `opacity: 1 + translateY(0)`. Simple vertical fade, no horizontal drift.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (expo ease-out) at `280ms`.
- **Progress bar**: `width` transition at `700ms cubic-bezier(0.65, 0, 0.35, 1)`.

## Accessibility (WCAG 2.1 AA)
- **Primary Text**: Charcoal `#1A1917` on light backgrounds.
- **Labels**: `.abound-label` at `#64748B` — checked for 4.5:1 against white.
- **Lime surfaces**: Use `--color-success-text` (`#065F46`) for text on lime backgrounds.
- **Placeholder**: `#94A3B8` — distinguishable from input values.
- **accent-color**: `#0E4533` applied globally for native form controls (range slider, checkbox).

## Architecture: Modular Atomic UI
- **`/components/shared/`**: Atomic elements (`AppHeader`, `AboundInput`, `AboundButton`, `StepLayout`).
- **`index.html`**: State machine router with browser History API (back/forward support). Title updated to "Abound — Solicitud de préstamo".
- **`/content/journey-content.js`**: Externalized data layer — all copy lives here, zero strings in components.
- **`assets/styles/main.css`**: Single source of truth for all design tokens, component classes, and animations.

## Known Open Issues / Future Work
- **Form validation**: `isFormValid` in `StepInitial` returns `true` unconditionally. Real field validation with inline error states is not yet implemented.
- **Dynamic loan data**: `StepBancos` summary strip and `StepOutcome` summary use hardcoded values (`3.000€`, `136,63€`). Should bind to state passed through the step machine.
- **Step counter in header**: Progress bar shows percentage but no "Paso X de Y" label. Consider adding to `AppHeader` via new prop.
- **Bank logos**: All banks show a generic `fa-building-columns` icon. Real bank logomarks would significantly improve the Bancos step.
- **Empty search state**: `StepBancos` has no empty state when the search query returns zero banks.

## Completed Roadmap
1. [x] **Phase 1: Project Setup** — ESM structure, Import Maps, Tailwind config
2. [x] **Phase 2: Lead Capture** — StepInitial personal details form
3. [x] **Phase 3: Core Journey Logic** — Calculator, Purpose Grid, Situation Lists, Bank Selector, Outcome
4. [x] **Phase 4: Design Refinement** — Immersive green header, FA Icons, centered branding
5. [x] **Phase 5: UX Enhancements** — Progress bar, browser Back/Forward support
6. [x] **Phase 6: Architectural Refactor** — Modular shared UI library, externalized CSS
7. [x] **Phase 7: Accessibility & Contrast Audit** — WCAG 2.1 AA across all 7 steps
8. [x] **Phase 8: Visual Refinement** — Differentiated selection patterns, pill CTAs, lime accent system, label hierarchy, background gradient, animation polish

## Component Checklist
- [x] **AppHeader.js**: Forest green header, centered wordmark, lime progress bar (no glow)
- [x] **StepInitial.js**: Lead capture form — refined label hierarchy, clean privacy checkbox
- [x] **StepCalculator.js**: Interactive slider + term selector + lime result box
- [x] **StepMotivo.js**: 2-col grid with rounded-square icon containers
- [x] **StepEmployment.js**: Flat list rows with left-border accent on selection
- [x] **StepHousing.js**: Flat list rows with left-border accent on selection (consistent with Employment)
- [x] **StepBancos.js**: Loan summary strip + searchable bank grid (rounded-square icons)
- [x] **StepOutcome.js**: Lime check icon, lime description panel, refined summary rows
