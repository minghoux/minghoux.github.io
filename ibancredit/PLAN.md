# Goal
Rebrand the Ibancar user journey to align with the new Abound brand identity, utilizing the Abound design system and modular atomic architecture. The final deliverable is a functional, interactive, and scalable frontend prototype.

## Technical Stack
- **Framework**: Vue 3 (Composition API) via CDN ESM
- **Styling**: Tailwind CSS (CDN) + Abound Design System 2026 Core CSS
- **Architecture**: Modular "No-Build" SPA with **Atomic UI Components**
- **Assets**: Local brand assets from `/brand-assest` (wordmark, font saans)
- **Icons**: FontAwesome 6 (CDN)

## Architecture: Modular Atomic UI
The project utilizes a scalable, reusable architecture:
- **`/components/shared/`**: Houses "Atoms" like `AboundInput`, `AboundButton`, `AppHeader`, and `StepLayout`.
- **`/assets/styles/main.css`**: Central source of truth for branding, typography, and global animations.
- **`index.html`**: Acts strictly as a state machine router and entry point with History API support.

## Completed Roadmap
1. [x] **Phase 1: Project Setup** (Define ESM structure, Import Maps, Tailwind config)
2. [x] **Phase 2: Lead Capture** (Implement Step 1 - Personal Details)
3. [x] **Phase 3: Core Journey Logic** (Loan Calculator, Purpose Grid, Situation Lists)
4. [x] **Phase 4: Design Refinement** (Immersive green header, FA Icons, Page "pop" aesthetics)
5. [x] **Phase 5: UX Enhancements** (Standardized progress bar, Browser Back button support)
6. [x] **Phase 6: Architectural Refactor** (Modularized Shared UI Library & Externalized CSS)

## Component Checklist
- [x] **AppHeader.js**: Branded header + reactive progress bar
- [x] **StepLayout.js**: Standardized page animation and header structure
- [x] **AboundInput.js / AboundButton.js**: Atomic UI elements
- [x] **StepInitial.js**: Lead Capture
- [x] **StepCalculator.js**: Interactive Math Engine
- [x] **StepMotivo.js**: Purpose Grid (FA Icons)
- [x] **StepEmployment.js / StepHousing.js**: Situation Lists (FA Icons)
- [x] **StepBancos.js**: Searchable Bank Grid + Persistent Loan Summary
- [x] **StepOutcome.js**: Final Status & CTAs (WhatsApp/Call)