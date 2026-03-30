# Goal
Rebrand the Ibancar user journey to align with the new Abound brand identity, utilizing the Abound design system and modular atomic architecture. The final deliverable is a functional, interactive, and scalable frontend prototype.

## Knowledge Sources
- **Reference Journey**: `ibancredit/current-journey` contains the original Ibancar logical flow, screenshots, and content used as the basis for this rebranding.
- **Brand Identity**: Abound 2026 guidelines (Saans Typography, Forest/Mint Green palette).

## Technical Stack
- **Framework**: Vue 3 (Composition API) via CDN ESM
- **Styling**: Tailwind CSS (CDN) + Abound Design System 2026 Core CSS
- **Architecture**: Modular "No-Build" SPA with **Atomic UI Components**
- **Assets**: Local brand assets from `/brand-assest` (wordmark, font saans)
- **Icons**: FontAwesome 6 (CDN)

## Design Standard: Flat & High-Contrast
The journey follows a strict "Flat & Clinical" fintech aesthetic designed for clarity and speed:
- **Shadowless UI**: Zero drop shadows (`no shadow-*`) or blur-depth used. Contrast is driven entirely by borders and background tints.
- **Border-Based Hierarchy**: 
  - **Idle**: 1px or 2px `neutral-200` border on `white` or `mint-50/bg` backgrounds.
  - **Active/Selection**: 3px `brand-forest-green` border with `brand-forest-green/5` (mint) background tint.
- **Immersive Branding**: A persistent Forest Green header with centered wordmark and a luminous, reactive progress bar.

## Accessibility Hub (WCAG 2.1 AA)
A high-contrast audit ensures legibility for all users:
- **Primary Text**: Deep Charcoal (`#1A1917`) for maximum legibility on light backgrounds.
- **Secondary Text/Labels**: Bumped to `neutral-600` or `neutral-700` to meet 4.5:1 contrast ratios.
- **Success States**: Created a dedicated `var(--color-success-text)` (`#065F46`) for loan results and successful confirmations on mint backgrounds.
- **Placeholder Standard**: Standardized on `#667085` for help text to maintain distinguishability.

## Architecture: Modular Atomic UI
- **`/components/shared/`**: Houses "Atoms" (e.g., `AboundInput`, `AppHeader`, `StepLayout`).
- **`index.html`**: A clean state machine/router with browser History API support.
- **`/content/journey-content.js`**: Externalized data layer for multi-language support and rapid content changes.

## Completed Roadmap
1. [x] **Phase 1: Project Setup** (Define ESM structure, Import Maps, Tailwind config)
2. [x] **Phase 2: Lead Capture** (Implement Step 1 - Personal Details)
3. [x] **Phase 3: Core Journey Logic** (Loan Calculator, Purpose Grid, Situation Lists)
4. [x] **Phase 4: Design Refinement** (Immersive green header, FA Icons, Centered Branding)
5. [x] **Phase 5: UX Enhancements** (Standardized progress bar, Browser Back button support)
6. [x] **Phase 6: Architectural Refactor** (Modularized Shared UI Library & Externalized CSS)
7. [x] **Phase 7: Accessibility & Contrast Audit** (Contrast-driven polish across all 7 steps)

## Component Checklist
- [x] **AppHeader.js**: Branded header + reactive progress bar (centered branding)
- [x] **StepLayout.js**: Standardized page animation and header structure
- [x] **AboundInput.js / AboundButton.js**: Atomic UI elements (high-contrast labels)
- [x] **StepInitial.js**: Lead Capture
- [x] **StepCalculator.js**: Interactive Math Engine (high-contrast results)
- [x] **StepMotivo.js / StepEmployment.js / StepHousing.js**: Purpose & Situation selection (No-shadow cards)
- [x] **StepBancos.js**: Searchable Bank Grid + Persistent Loan Summary
- [x] **StepOutcome.js**: Final Status & CTAs (WhatsApp/Call + FA Icons)