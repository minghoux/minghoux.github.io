# Abound Design System

**Version:** 2.0.26 (March 2026)  
**Status:** Baseline Guidance  
**Figma Sources:** [Abound Rebrand 2026](https://www.figma.com/design/0MBYD7gWC20Nfa7zT2V7HI/Abound-Rebrand-2026?node-id=1135-3019&t=IuGsARTyAvxvEfjO-1)

---

## 1. Design Principles

Four principles that guide every design and engineering decision at Abound. This system bridges the agency's brand identity with day-to-day product implementation.

1. **Clarity over decoration**
   Clean UI that builds trust in a lending product. Every element earns its place. If it doesn't aid comprehension or action, remove it.
2. **Accessible by default**
   WCAG 2.1 AA minimum. Accessibility is built into tokens and components — not bolted on after the fact.
3. **Progressive disclosure**
   Reduce cognitive load. Reveal complexity step by step. A loan application should feel guided, never overwhelming.
4. **Brand-consistent, not brand-heavy**
   Forest Green is the accent, not the wallpaper. Follow the 60/30/10 rule: 60% neutral, 30% brand, 10% semantic colour.

---

## 2. Colour System

Organised in three layers: primitives (from the agency), semantic tokens, and feedback colours.

### Primitive Palette

| Brand (Agency) | Background Surfaces | Accents | Feedback (UI-derived) |  
| :--- | :--- | :--- | :--- |
| **Forest Green:** `#0E4533` | **Off-White:** `#F4F8F3` | **Khaki:** `#EDEABE` | **Success:** `#0A5C3A` |
| **Charcoal:** `#201F1D` | **Pale Yellow-Green:** `#F7F7E9` | **Lime:** `#D4F19B` | **Danger:** `#C4320A` |
| **White:** `#FFFFFF` | **Teal/Sage:** `#B8DCD2` | | **Warning:** `#B54708` |

**Extended Neutrals**  
Neutral 50 (`#F4F7F4`), Neutral 100 (`#E8EDEA`), Neutral 200 (`#D3DCCF`), Neutral 300 (`#B4C2B0`), Neutral 400 (`#829080`), Neutral 500 (`#586858`), Neutral 600 (`#3F4F3F`), Neutral 700 (`#2C3A2C`), Neutral 800 (`#1C271C`), Neutral 900 (`#111A11`). 
*Note: Neutral 400 fails WCAG AA contrast for text and must not be used for meaningful content.*

### Semantic Tokens

| Role | Token & Value | Usage |
| :--- | :--- | :--- |
| **Primary Base** | `bg-primary` (`#FFFFFF`) | Default page background |
| **Secondary Base** | `bg-secondary` (`#F4F8F3`) | Alternate sections, card surfaces (Resolves subtle duplication) |
| **Brand Surface** | `bg-brand` (`#0E4533`) | Brand panels, CTA areas |
| **Text Primary** | `text-primary` (`#201F1D`) | Body copy, headings |
| **Text Secondary** | `text-secondary` (`#475467`) | Supporting text, descriptions |
| **Border Normal**| `border-primary` (`#D0D5DD`) | Input borders, dividers |
| **Border Focus** | `border-focus` (`#0E4533`) | Focus rings (2px + 4px offset) |
| **Interactive**  | `interactive-primary` (`#0E4533`) | Primary buttons |
| **Interactive Hover** | `hover:bg-brand-hover` (`#0A3325`) | Universal brand hover color (avoid hardcoding) |

### Gradients

The following are the official brand gradients defined in the "Colour Gradients" guidelines, used to enrich backgrounds and transition spaces:

| Role | Gradient Definition | General Colors | Usage |
| :--- | :--- | :--- | :--- |
| **Gradient 1** | `linear-gradient(to bottom, #EAF1EA, #CBE4C8)` | Pale Green to Green Tint | Primary textured background element |
| **Gradient 2** | `linear-gradient(to top, #F0EDC3, #CBDAD9)` | Pale Yellow to Greyish Teal | Secondary background element |
| **Gradient 3** | `linear-gradient(to bottom, #EAF1EA, #B8DCD2)` | Pale Green to Sage/Teal | Brand transition elements |
| **Gradient 4** | `linear-gradient(to bottom, #FFF9F4, #D4F19B)` | Warm Off-White to Lime | Soft but distinct warm texture over hero sections |

*(Note: Additional functional gradients exist such as the shimmering `linear-gradient(90deg, #E8EDEA 25%, #F4F7F4 50%, #E8EDEA 75%)` uniquely used for `Loading Skeletons` background animation).*

---

## 3. Typography

**Saans** is the primary brand typeface for Abound (geometric grotesque). DM Sans is strictly a fallback. Saans `.woff2` files are loaded locally directly from `brand-assest/Saans font/`.

### Font Stack

1. **Saans:** Variable fonts loaded via `@font-face`. Weights: 400, 500, 600/700. `fontFamily.sans: ['Saans', 'DM Sans', 'sans-serif']`
2. **Inter:** Secondary font used exclusively for data-dense and tabular UI components.
3. *System/Docs:* Calibri, Arial (used only in Word/Office formats).

### Typography Scale Best Practices

- Use tabular numbers (`tabular-nums`) and right alignment for all monetary values.
- Default to `£` prefixes in number input fields.
- Respect the semantic scale: Use `display-lg` (`60px`, `-0.02em` tracking) for big marketing hooks. Use `text-md` (`16px`, `1.5` line height) for core readable body sections.

---

## 4. Spacing & Layout

The spacing scale is an extensive 12-token system based on a multiples-of-4 mathematical baseline.

**Tokens:**  
`space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-5` (20px), `space-6` (24px), `space-8` (32px), `space-10` (40px), `space-12` (48px), `space-14` (56px), `space-16` (64px), `space-20` (80px), `space-24` (96px), `space-32` (128px), `space-40` (160px).

> [!TIP]
> For hero sections and page-level padding, use macro spacing `space-14` to `space-40`. Avoid arbitrary negative margins (e.g., `-mt-12`) for hero panels, use robust container bounds to control bleed on different viewports.

---

## 5. Elevation & Motion (Flat UI Standard)

### Shadowless Layouts

Abound 2026 has transitioned to a **"Flat & High-Contrast"** hierarchy. Traditional drop shadows are deprecated for UI components. Instead, elevation and state are communicated through:
- **Borders:** 1.5px `neutral-200` or `#E2E8E2` for idle states, transitioning to `brand` or `brand/40` for active states.
- **Background Tints:** Subtle brand tints (`rgba(14,69,51,0.03)`) for selected surfaces.
- **Spacing & Scale:** Using robust gaps (`space-base`) rather than visual floating.

*(Note: Legacy charcoal shadows `0 4px 8px rgba(32,31,29,0.10)` are reserved strictly for floating modals and sticky bottom-bars, not content cards).*

### Motion

Motion should feel snappy, intentional, and provide immediate responsive feedback.
- **Tokens:** `ease-enter: 200ms`, `ease-exit: 120ms` (exits should feel faster), `ease-hover: 150ms`.
- **Accessibility:** All animations must respect OS `prefers-reduced-motion` settings using the `motion-safe` CSS wrapper, a vital component for financial apps prioritizing users with vestibular conditions.

---

## 6. Component Guidelines

Essential UI components and standard patterns tailored for lending apps.

### Core Components
- **Buttons (Rounded CTA):** Primary buttons use a professional rounded-rectangle shape (`border-radius: 14px`). Implement the `interactive-primary` token. Hover states exclusively use the `bg-brand-hover` variable.
- **Selection Vocabularies:**
  - **Grid Pattern:** Used for visual, icon-heavy choices (e.g., Loan Purpose). Uses square tiles with `rounded-[12px]` icon containers inside.
  - **List Pattern:** Used for status selections (e.g., Employment). Features flat rows with a 3px left-border inset accent that animates in `scaleY(1)` upon selection.
- **Form Controls:** Use the global `accent-color: #0E4533` in CSS to instantly brand native browser inputs (range sliders, checkboxes, radios) without complex custom overrides.
- **Cards (Surface Cards):** Use `bg-off-white` consistently down to the HTML tags (don't mix with `bg-white`). Used interchangeably to break up visual space without overwhelming standard background colors.
- **Navigation:** Side navigation active states must be styled (`.active` link state configured with `text-brand` and `bg-neutral-50`). Branding must use the literal Abound wordmark image asset instead of standard system text.
- **Progress Indicators:** Crucial for multi-stage lending forms. The neutral track must be underlying a **Lime** (`#D4F19B`) active filled layer. Never use a "glow" effect—the high-contrast lime on dark green is sufficient.

### Feedback States & Helpers
- **Loading Skeletons:** Animated shimmer loops built with `linear-gradient`, using `E8EDEA` and `#F4F7F4`, giving UI placeholders until queries complete (essential for Open Banking identity checks).
- **Toasts & Alerts:** Non-blocking context changes. Styled according to specific status semantics (Success vs Warning vs Danger).
- **Tooltips:** Explanatory helpers wrapping Charcoal backgrounds designed uniquely for jargon explanation (APR and Eligibility Rules).
- **File Upload & Modals:** Crucial for documentation verification steps and account controls. Ensure these share the established Charcoal shadow layering and standard border radii.

---

## 7. AI Patterns & Brand Integration

### The Abound Visual Identity (Abstract Elements)
Incorporate the abstract layout assets intentionally to create a premium feel rather than relying strictly on solid Forest Green blocks. The system provides Lime (`#D4F19B`) gradients and sage-abstract imagery designed for organic blending inside Hero sections, wide transition banners, and key conversational UI interactions.