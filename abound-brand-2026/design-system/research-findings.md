# Fintech Design System Research Findings

**Compiled:** March 11, 2026  
**Scope:** Modern fintech design systems, brand-to-design methodology, font alternatives to Saans, fintech lending UI patterns.

---

## Table of Contents

1. [Modern Fintech Design Systems](#1-modern-fintech-design-systems)
   - 1.1 Colour Palettes
   - 1.2 Typography
   - 1.3 Component Patterns
   - 1.4 Trust & Security Signals
   - 1.5 Accessibility Standards
2. [Brand-to-Design-System Methodology](#2-brand-to-design-system-methodology)
   - 2.1 Deriving Semantic Colours from Brand Palette
   - 2.2 Building a Typography Scale
   - 2.3 Design Tokens: The Bridge Between Brand and Product
   - 2.4 Best Practices from Leading Design Systems
   - 2.5 Fintech-Specific Brand Adaptation
3. [Font Alternatives to Saans](#3-font-alternatives-to-saans)
   - 3.1 Saans Characteristics
   - 3.2 Candidate Alternatives Compared
   - 3.3 Recommendation Matrix
4. [Fintech-Specific UI Patterns: Lending Products](#4-fintech-specific-ui-patterns-lending-products)
   - 4.1 Loan Calculator Interfaces
   - 4.2 Multi-Step Application Flows
   - 4.3 Dashboard / Account Overview
   - 4.4 Eligibility Check Patterns
   - 4.5 Document Upload Patterns
   - 4.6 Repayment Schedule Tables

---

## 1. Modern Fintech Design Systems

### 1.1 Colour Palettes

#### Brand Colour Overview

Fintech colour strategy falls into three broad camps: trust blue (institutional), differentiated signal (disruptive neobanks), and monochrome-first (developer/enterprise fintech). The table below maps the leading players.

| Brand | Primary Colour | Philosophy | Key Hex Values |
|---|---|---|---|
| **Monzo** | Hot Coral | Warmth, empathy, human optimism; deliberately anti-bank | `#FF4F40` (coral), `#112231` (deep navy), `#F2F8F3` (soft white) |
| **Revolut** | Deep Blue + White | Trust + neutral modernity; "Style your way" | `#1326FD` (deep blue), `#00000` (black), `#FFFFFF` (white) |
| **Wise** | Citrus Green | Growth, progress, money; anti-"safe blue" differentiation | Neon/citrus green (electric); moved away from safe blue in 2023 rebrand |
| **Stripe** | Purple/Indigo family | Developer-sophistication, vibrant but controlled | Lab-space colour system; purple/indigo anchor with vibrant multi-hue palette |
| **Brex** | Orange | "Seriously optimistic"; energy meets credibility | Refined single definitive orange; balanced against black/white via ratio rules |
| **Klarna** | Pink | "Proudly pink"; boldly distinctive in financial services | Pink primary, brand guideline: "Refreshingly different" |
| **Mercury** | Neutral / Professional | Clean financial tool; functionality-forward | Minimal neutral palette; clean dashboard aesthetic |

**Sources:**
- [Monzo Brand Archive](https://brandarchive.xyz/identity/monzo)
- [Monzo Brand Makeover Blog](https://monzo.com/blog/weve-had-a-little-makeover)
- [Revolut Open Banking PDF Guidelines](https://developer.revolut.com/assets/oba/Revolut-Open-Banking-guidelines.pdf)
- [Wise Rebrand — Tearsheet](https://tearsheet.co/marketing/from-safe-blue-to-citrus-green-how-wise-rebranded-to-an-identity-that-is-exciting-and-good-for-its-bottom-line/)
- [Stripe Accessible Color Systems](https://stripe.com/blog/accessible-color-systems)
- [Brex Rebrand — The Brand Identity](https://the-brandidentity.com/project/studio-freights-intimate-knowledge-of-brex-drives-its-smart-rebrand)
- [Klarna Brand Guidelines](https://brand.klarna.com)

#### Semantic Colour Structure in Fintech

Fintech design systems consistently distinguish between **raw palette values** and **semantic roles**. The industry-standard approach:

**Tier 1 — Primitive/Global tokens**  
Raw colour values mapped to a scale (e.g., `brand-500`, `neutral-100` through `neutral-900`, `green-400`). These are the foundational palette; not used directly in components.

**Tier 2 — Semantic/Alias tokens**  
Role-based tokens that reference primitives. Named by their purpose, not their colour value. Common semantic categories:

| Category | Typical Tokens | Purpose |
|---|---|---|
| **Brand** | `bg/brand/default`, `text/brand/default` | Primary call-to-actions, highlights |
| **Surface** | `bg/surface/primary`, `bg/surface/secondary`, `bg/surface/tertiary` | Page backgrounds, card backgrounds, layering |
| **Text** | `text/primary`, `text/secondary`, `text/placeholder`, `text/disabled` | Hierarchy and state |
| **Border** | `border/default`, `border/subtle`, `border/focus` | Inputs, dividers, focus rings |
| **Feedback** | `bg/positive`, `bg/danger`, `bg/warning`, `bg/info` | Status states, alerts |
| **Interactive** | `bg/interactive/default`, `bg/interactive/hover`, `bg/interactive/pressed` | Buttons, links, interactive states |

**Tier 3 — Component tokens** (used in some systems)  
Component-specific overrides that reference semantic tokens (e.g., `button/primary/background` → `bg/brand/default`). Useful for per-brand theming.

**Sources:**
- [3-tier design token system — Reddit r/DesignSystems](https://www.reddit.com/r/DesignSystems/comments/1it1erb/3tier_design_token_system/)
- [Semantic Colour Tokens in Action — FourZeroThree](https://www.fourzerothree.in/p/semantic-colour-tokens-in-action)
- [Designing a Scalable Accessible Color System — UX Collective](https://uxdesign.cc/designing-a-scalable-and-accessible-color-system-for-your-design-system-f98207eda166)

#### Stripe's Colour System (Detailed)

Stripe's approach is one of the most technically sophisticated in fintech:

- **Perceptually uniform colour modelling**: Colour scales built in **Lab (CIELAB) colour space** rather than RGB/HSL, producing visually equal steps across hues.
- **Structured palette levels**: Colours numbered by perceptual lightness. Text/icon colours 5+ levels apart from background guarantee **4.5:1 contrast** for small text; 4+ levels guarantee **3:1** for icons and large text.
- **Hue-invariant contrast**: Yellow, green, and blue at the same level have the same visual weight — no hue dominates the interface.
- **Built-in badge rules**: Badge components shift background/text +1 level for automatic distinction.
- **Target**: WCAG 2.0 AA minimum throughout; text and icons pass thresholds on white and on lightest-hue backgrounds.

**Source:** [Designing Accessible Color Systems — Stripe](https://stripe.com/blog/accessible-color-systems)

#### Revolut Colour System (Documented)

From the official open banking guidelines PDF:

| Role | Hex | Notes |
|---|---|---|
| White | `#FFFFFF` | Primary background |
| Black | `#000000` | Text, wordmark |
| Background Black | `#161618` | UI dark mode only |
| Deep Blue | `#1326FD` | Core brand; Pantone 2935 C |
| Mid Blue | `#6FA0FF` | Secondary |
| Purple | `#9539F2` | Accent |
| Lime | `#BFFF37` | Accent |

Logo usage: Black or white only; never on accent colours or low-contrast backgrounds.

**Source:** [Revolut Open Banking Guidelines PDF](https://developer.revolut.com/assets/oba/Revolut-Open-Banking-guidelines.pdf)

#### Monzo Colour System (Documented)

| Role | Hex |
|---|---|
| Hot Coral (primary) | `#FF4F40` |
| Deep Navy | `#112231` |
| Soft White | `#F2F8F3` |
| Teal | `#016B83` |
| Pink | `#FFD7F0` |
| Lime Green | `#C3FF34` |
| Orange | `#FE6B1B` |
| Forest | `#3A4920` |
| Mint | `#BBF6E2` |

Designed by Ragged Edge (2022); hot coral deliberately dominant to signal warmth and differentiation.

**Source:** [Monzo Brand Archive](https://brandarchive.xyz/identity/monzo)

---

### 1.2 Typography

#### Fintech Typography Choices by Brand

| Brand | Hero/Display Typeface | Functional/UI Typeface | Strategy |
|---|---|---|---|
| **Monzo** | Oldschool Grotesk | Monzo Sans (custom cut of Universal Sans) | Warm, analog friendliness in marketing; maximum readability in product |
| **Revolut** | Custom bold, capitalized (proprietary) | Proprietary/system | "Bold, big, capitalized text as graphical element" for impact |
| **Brex** | — | Inter (with rounded alternates) | Inter as system font; stylistic alternates for shape language continuity |
| **Wise** | Bold proprietary typography | — | Bold typography as core brand element in 2023 rebrand |
| **Stripe** | — | Custom/system + design tokens | Perceptual consistency via tokens; typography paired with accessible colour system |
| **Mercury** | — | — | Clean, minimal; tool-first, not brand-expressive |

**Monzo's custom Monzo Sans** (Universal Sans cut): Chosen for maximum readability at all sizes; "generous dots and curled ends" for friendliness. Used exclusively in product UI, separate from the marketing hero font.

**Brex's Inter with rounded alternates**: Maintains consistency while reinforcing shape language. The curves in the Brex logo wordmark echo through the rounded alternates in 't' and 'l' letterforms — creating typographic continuity without heavy-handedness.

**Sources:**
- [Monzo Brand Makeover](https://monzo.com/blog/weve-had-a-little-makeover)
- [Brex Rebrand — The Brand Identity](https://the-brandidentity.com/project/studio-freights-intimate-knowledge-of-brex-drives-its-smart-rebrand)

---

### 1.3 Component Patterns

#### Buttons

Best practices from fintech design systems:

- **Primary buttons**: Brand colour background; high contrast text (WCAG AA); clear hover/pressed states using semantic interactive tokens. Rounded corners vary from 4px (corporate, e.g. IBM Carbon) to full pill (consumer fintech, e.g. Monzo).
- **Secondary buttons**: Outlined or ghost; lower visual weight than primary.
- **Destructive actions**: Danger semantic colour; require confirmation dialogs for irreversible actions.
- **State coverage required**: Default, hover, focused (visible focus ring for keyboard nav), active/pressed, loading, disabled.
- **Accessibility**: Minimum 44×44px touch target; focus rings visible; never colour-only state differentiation.

#### Form Inputs

- **Label above field** (not floating): Reduces cognitive load, better for screen readers, standard in regulated fintech.
- **Inline validation**: Real-time error feedback as user types; success state (green checkmark) on completion.
- **Error states**: Red border + error icon + error message below field; never only colour.
- **Helper text**: Below label or below field; used for format guidance (e.g., "DD/MM/YYYY").
- **Input grouping**: Logical sections with clear headings; not one long wall of fields.
- **Password fields**: Toggle show/hide; strength indicator for creation.
- **Numeric inputs**: Right-aligned values for financial figures; currency prefix/suffix.
- **Focus ring**: High-contrast focus indicator (WCAG 2.2 minimum 3:1 on adjacent colours).

#### Tables (Data / Repayment / Transaction)

- **Column headers**: Sticky for long tables; sorted column indicated by icon + accessible label.
- **Row striping or subtle dividers**: Neutral `border/subtle` token; avoid dense horizontal rules.
- **Numeric alignment**: Right-align all financial figures; consistent decimal places.
- **Status columns**: Use semantic colour + icon + text label (never colour alone).
- **Responsive behaviour**: Priority columns preserved on mobile; less critical columns hidden or stacked.
- **Empty states**: Illustrated or friendly empty state messaging, not blank whitespace.

#### Cards

- **Shadow/elevation**: Used to lift interactive cards from background; defined via shadow tokens.
- **Hierarchy**: Title → metadata → value → action; consistent internal padding.
- **Information density**: Key financial figure (balance, amount) displayed large (display/heading type); supporting data smaller.
- **Interaction states**: Hover state on clickable cards; cursor: pointer.
- **Account/product cards**: Colour-coded by account type or status; but never colour-only differentiation.

#### Navigation

- **Bottom navigation (mobile)**: Thumb-accessible; 4–5 items maximum; active state via icon fill + label colour change + optional indicator dot/bar.
- **Side navigation (desktop)**: Hierarchical; collapsible; active state with background highlight.
- **Top navigation**: Used sparingly in fintech apps; more common on marketing sites; breadcrumbs for deep flows.
- **Tab bars**: Used for secondary navigation within a section (e.g., Transactions / Scheduled / History).

---

### 1.4 Trust & Security Signals

Fintech interfaces must make security **visible** without making it feel burdensome. Key patterns:

#### Visual Trust Cues

- **Lock icons** in authentication flows, input focus states, and near sensitive data fields.
- **"Securely encrypted" / "Bank-level security"** labels near form headers or submit buttons.
- **FDIC-insured / FCA-regulated** badges in footers and account summary screens.
- **Padlock + HTTPS indicators** replicated in-app for web-based flows.
- **Verification badges** on account confirmation screens.
- **Brand logo persistence** in headers during checkout/application flows (user knows where they are).

#### Behavioural Trust Patterns

- **Progressive disclosure of risk**: Don't front-load legal disclosures; introduce at relevant steps.
- **Plain-language compliance**: Reframe KYC steps as "protecting you" rather than legal obligations.
- **Soft credit check signposting**: Prominently label "This will not affect your credit score" before eligibility checks.
- **Real-time confirmation messages**: "Payment sent", "Application submitted", "We received your documents" — immediate system feedback.
- **Transaction previews before commitment**: Show full breakdown (amount, recipient, fees, timing) before irreversible actions.
- **Biometric authentication**: Frame as convenience + security benefit; provide alternatives for users without biometrics.

#### Trust Hierarchy in Lending/Personal Loans

1. **Entry trust**: Brand credibility (logos, security badges, regulated entity disclosure).
2. **Process trust**: Progress indicators, step-by-step guidance, estimated completion times.
3. **Data trust**: Explicit consent language, soft-pull disclosure, data minimization messaging.
4. **Decision trust**: Clear approval/decline states with reasons; personalised rate displays.
5. **Ongoing trust**: Repayment reminders, transparent fee display, easy account closure.

**Sources:**
- [FinTech UI Trust Patterns — Phenomenon Studio](https://phenomenonstudio.com/article/fintech-ux-design-patterns-that-build-trust-and-credibility/)
- [Fintech Design Guide — Eleken](https://www.eleken.co/blog-posts/modern-fintech-design-guide)
- [UX Design for Fintech Startups — Tribe Designworks](https://tribedesignworks.com/blog/ux-design-for-fintech)

---

### 1.5 Accessibility Standards

| Brand/System | Stated Standard | Notes |
|---|---|---|
| **Stripe** | WCAG 2.0 AA | Perceptual colour system guarantees contrast ratios by construction |
| **Wise** | WCAG AA + APAC colour standards | Tested against both regional and international standards in 2023 rebrand |
| **Atlassian** | WCAG AA | 3:1 for large text/UI, 4.5:1 for body text |
| **Carbon (IBM)** | WCAG AA | Built into token system; high-contrast themes; inverse token pairs |
| **Klarna** | WCAG (level unspecified) | "Font sizes, contrast settings, and zoom levels without losing functionality" |
| **General Fintech best practice** | WCAG 2.1 AA minimum; WCAG 2.2 for new products | WCAG 2.2 adds enhanced focus visible, target size requirements |

**Key WCAG contrast requirements:**
- Normal text (<24px or <18.67px bold): **4.5:1 minimum**
- Large text (≥24px or ≥18.67px bold): **3:1 minimum**
- UI components and graphical objects: **3:1 minimum** (WCAG 1.4.11)
- WCAG 2.2 adds: visible focus indicator must have 3:1 contrast against adjacent colours

**Fintech-specific accessibility considerations:**
- Numeric data must remain readable under increased font size / zoom (up to 200%).
- Status colours (success/danger/warning) must always be paired with icons and text labels, never colour alone.
- Form error states must meet contrast and be announced to screen readers.
- Touch targets on mobile: minimum 44×44px (Apple HIG); WCAG 2.2 specifies 24×24px CSS minimum.

**Sources:**
- [Stripe Accessible Color Systems](https://stripe.com/blog/accessible-color-systems)
- [Wise Rebrand — Tearsheet](https://tearsheet.co/marketing/from-safe-blue-to-citrus-green-how-wise-rebranded-to-an-identity-that-is-exciting-and-good-for-its-bottom-line/)
- [Atlassian Design Color](https://atlassian.design/foundations/color)
- [Klarna Accessibility Statement](https://www.klarna.com/us/accessibility/)
- [Fintech UX Design Practices 2026 — Onething Design](https://www.onething.design/post/top-10-fintech-ux-design-practices-2026)

---

## 2. Brand-to-Design-System Methodology

### 2.1 Deriving a Semantic Colour System from a Brand Palette

#### Step 1: Establish Primitive Tokens (The Palette)

Start with the brand's hero colour(s) and generate a full tonal scale. Conventions vary, but the most robust approach uses perceptually uniform steps:

```
Primary colour family:   primary-50, primary-100, primary-200 ... primary-900
                         (lightest → darkest; "500" is typically the brand anchor)
Secondary colour:        secondary-50 ... secondary-900
Neutral (grey):          neutral-0 (white) ... neutral-1000 (black)
Semantic families:       green-50...green-900 (success)
                         red-50...red-900    (danger/error)
                         yellow-50...yellow-900 (warning)
                         blue-50...blue-900  (info; may be same as primary)
```

**Key principle**: Ensure colours at 500 and below pass contrast on white backgrounds; colours at 600 and above pass on dark/black backgrounds. This creates predictable pairing rules.

**Avoid impossible colours**: Dark yellows become muddy in HSL; use Lab/Oklch colour space for generating dark variants of warm hues.

#### Step 2: Define Semantic Tokens

Map primitives to roles. Structure by **{Category} / {Subcategory} / {State}**:

```
Colour categories:
  bg/           — backgrounds and surfaces
  text/         — text colours
  icon/         — icon colours
  border/       — borders and dividers
  
Surface hierarchy:
  bg/surface/primary      → neutral-0  (page background)
  bg/surface/secondary    → neutral-50 (card background)
  bg/surface/tertiary     → neutral-100 (elevated card)
  bg/surface/inverse      → neutral-900 (dark inverse surface)

Brand tokens:
  bg/brand/default        → primary-500
  bg/brand/subtle         → primary-50
  bg/brand/hover          → primary-600
  text/brand/default      → primary-700 (darker for text contrast)

Feedback tokens:
  bg/positive/default     → green-500
  bg/positive/subtle      → green-50
  text/positive           → green-700
  bg/danger/default       → red-500
  bg/danger/subtle        → red-50
  text/danger             → red-700
  bg/warning/default      → yellow-500
  bg/warning/subtle       → yellow-50
  text/warning            → yellow-800 (dark because yellow has poor contrast)

Text hierarchy:
  text/primary            → neutral-900
  text/secondary          → neutral-600
  text/tertiary           → neutral-400
  text/placeholder        → neutral-300
  text/disabled           → neutral-250
  text/inverse            → neutral-0

Interactive states:
  bg/interactive/default  → primary-500
  bg/interactive/hover    → primary-600
  bg/interactive/pressed  → primary-700
  bg/interactive/disabled → neutral-200
```

#### Step 3: Validate Accessibility at the Semantic Level

Every text/background semantic token pair must pass WCAG AA:
- `text/primary` on `bg/surface/primary` → verify 4.5:1
- `text/brand/default` on `bg/surface/primary` → verify 4.5:1
- `text/inverse` on `bg/brand/default` → verify 4.5:1

Build a contrast matrix and document it in the design system.

**Sources:**
- [Contentful: Design Token System](https://www.contentful.com/blog/design-token-system/)
- [UX Collective: Scalable Accessible Color System](https://uxdesign.cc/designing-a-scalable-and-accessible-color-system-for-your-design-system-f98207eda166)
- [Design Systems Collective: Building a Colour System](https://www.designsystemscollective.com/building-a-colour-system-a-guide-for-product-designers-b0485d94f5a7)

---

### 2.2 Building a Typography Scale from Brand Fonts

#### The Scale Formula

A type scale provides a predictable progression of sizes. Common approaches:

**Modular scale** (ratio-based):
```
Base: 16px (1rem)
Ratio: 1.25 (Major Third) or 1.333 (Perfect Fourth)
                   
Perfect Fourth (1.333):
  xs:   10px  (0.64rem)
  sm:   13px  (0.813rem)
  md:   16px  (1rem)      ← body / base
  lg:   21px  (1.333rem)
  xl:   28px  (1.777rem)
  2xl:  37px  (2.369rem)
  3xl:  50px  (3.157rem)
```

**Linear scale** (used by Material Design 3, Carbon):
```
Carbon IBM Scale (from formula Xn = Xn-1 + {INT[(n-2)/4]+1}*2, base y₀=12px):
  12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92px
```

**Material Design 3 Type Scale roles (15 roles):**
```
Display Large:     57px / 64px line height / Regular
Display Medium:    45px / 52px
Display Small:     36px / 44px
Headline Large:    32px / 40px
Headline Medium:   28px / 36px
Headline Small:    24px / 32px
Title Large:       22px / 28px
Title Medium:      16px / 24px / Medium (500)
Title Small:       14px / 20px / Medium (500)
Label Large:       14px / 20px / Medium (500)
Label Medium:      12px / 16px / Medium (500)
Label Small:       11px / 16px / Medium (500)
Body Large:        16px / 24px
Body Medium:       14px / 20px
Body Small:        12px / 16px
```

#### Recommended Token Naming for Typography

Structure: `{role}/{attribute}` or flat namespacing:

```
typography tokens:
  font-family/sans      = "Brand Sans, system-ui, sans-serif"
  font-family/mono      = "Brand Mono, monospace"
  
  font-size/xs          = 12px
  font-size/sm          = 14px
  font-size/md          = 16px   ← base
  font-size/lg          = 18px
  font-size/xl          = 20px
  font-size/2xl         = 24px
  font-size/3xl         = 30px
  font-size/4xl         = 36px
  font-size/5xl         = 48px
  
  font-weight/regular   = 400
  font-weight/medium    = 500
  font-weight/semibold  = 600
  font-weight/bold      = 700
  
  line-height/tight     = 1.2  (headings)
  line-height/snug      = 1.4  (subheadings)
  line-height/normal    = 1.5  (body)
  line-height/relaxed   = 1.625 (long-form)

Semantic type tokens (composite):
  text-style/heading-1   = { size: 4xl, weight: bold, line-height: tight }
  text-style/heading-2   = { size: 3xl, weight: bold, line-height: tight }
  text-style/heading-3   = { size: 2xl, weight: semibold, line-height: snug }
  text-style/body-large  = { size: lg, weight: regular, line-height: normal }
  text-style/body        = { size: md, weight: regular, line-height: normal }
  text-style/caption     = { size: sm, weight: regular, line-height: normal }
  text-style/label       = { size: sm, weight: medium, line-height: normal }
  text-style/numeric     = { size: 2xl, weight: semibold, line-height: tight, tabular-nums: true }
```

> **Key fintech note**: Always define `font-variant-numeric: tabular-nums` for financial figures to ensure columns align correctly.

**Sources:**
- [Material Design 3 Typography](https://m3.material.io/styles/typography/overview)
- [Carbon Design System Typography](https://carbondesignsystem.com/elements/typography/overview/)

---

### 2.3 Design Tokens: The Bridge Between Brand and Product

#### What Design Tokens Are

Design tokens are named, reusable variables that encode design decisions. Instead of hardcoding `#3479F6` in a button component, you reference `color.action.primary.default`. This means:
- A brand refresh changes one value in the token file, propagating everywhere.
- Themes (light/dark mode, high-contrast, white-label) swap entire token sets without touching components.
- Designers and developers share a common vocabulary.

As of October 2025, the **W3C Design Tokens Community Group published the first stable specification** (2025.10), standardising the format across Figma, Penpot, Sketch, and other tools. This enables true cross-platform token portability.

**Source:** [W3C Design Tokens Stable Specification — W3C](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)

#### Three-Tier Token Architecture (Industry Standard)

```
Tier 1: Primitive / Global Tokens
  — Raw values ("what exists")
  — e.g., blue-500: #3B82F6
  — No semantic meaning; large set (hundreds)

Tier 2: Semantic / Alias Tokens
  — Role-based references ("how it's used")
  — Reference primitives
  — e.g., color.action.primary.background: {blue-500}
  — Enable light/dark mode via mode-specific aliasing
  — Moderate set (~50–200 tokens)

Tier 3: Component Tokens (optional)
  — Component-specific overrides
  — Reference semantic tokens
  — e.g., button.primary.background: {color.action.primary.background}
  — Useful for multi-brand systems; not always needed
```

#### Token Taxonomy: Naming Convention

The three-tier hierarchy approach for naming:

`{category} / {subcategory} / {state}`

Examples:
- `color / background / brand / default`
- `color / text / feedback / danger`
- `color / border / input / focus`
- `typography / size / body / large`
- `spacing / component / button / padding-x`

#### Tooling

- **Figma**: Native variables (since 2023); supports primitive and semantic tiers
- **Tokens Studio for Figma**: Full three-tier support; JSON export; Style Dictionary integration
- **Style Dictionary**: Token transformation pipeline (JSON → CSS variables, iOS Swift, Android XML)
- **W3C DTCG format**: New stable standard format (2025.10); native support in Penpot, Figma, Sketch

**Sources:**
- [Contentful: Design Token System](https://www.contentful.com/blog/design-token-system/)
- [Penpot: Design Tokens for Designers](https://penpot.app/blog/design-tokens-for-designers/)
- [W3C Design Tokens Stable Specification](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)

---

### 2.4 Best Practices from Leading Design Systems

#### Material Design 3 (Google)

- **Tonal palette system**: Single source colour generates a full palette via the HCT (Hue, Chroma, Tone) algorithm. Any brand hex value can feed into the algorithm to produce a complete, accessible scheme.
- **26+ colour roles**: Primary, secondary, tertiary (accent colours) + neutral, neutral variant (surfaces) + error. Each role has a container variant and an on-colour (text/icon on that surface).
- **Dynamic colour**: On Android 12+, derives scheme from user's wallpaper. For fixed brand contexts (fintech), a static baseline scheme is used.
- **All roles meet WCAG AA by construction** when using the tonal palette system.
- **Typography**: 15 named type roles (Display Large → Body Small); type tokens; responsive scale at breakpoints.

**Key insight for fintech**: MD3's fixed accent colours (`primary-fixed`, `secondary-fixed`) are useful for non-negotiable brand moments that must look the same in both light and dark themes — ideal for logos, brand accents in data visualisation, or CTAs.

#### Apple Human Interface Guidelines

- **Semantic + adaptive colours**: Colours defined by purpose (label, secondary label, system background, separator) and adapt automatically to light/dark mode, accessibility (Increase Contrast), and vibrancy.
- **System colour palette**: 12 system colours (red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown) with automatic light/dark/high-contrast variants.
- **Principle**: Never hardcode values; always use semantic API colours. This ensures forward-compatibility with OS themes.
- **Financial UI insight**: Use the label hierarchy (primary, secondary, tertiary label) for data displays — provides built-in visual hierarchy without custom colour work.

#### Carbon Design System (IBM)

Particularly relevant as a model for enterprise/banking products.

- **Token naming**: `{element}-{role}[-{state}]` e.g., `$text-primary`, `$layer-hover-01`, `$support-error`.
- **Theme model**: Tokens hold fixed roles; themes change values. White, Gray 10, Gray 90, Gray 100 themes.
- **Layering model**: Each theme defines a layering stack (background → layer-01 → layer-02 → layer-03) using alternating light greys. Components automatically pick the right layer token based on nesting context.
- **Productive vs. Expressive type sets**: Productive (condensed, fixed sizes) for product/task interfaces; Expressive (larger, responsive) for editorial/marketing. Fintech products should default to Productive.
- **IBM Plex**: Open-source type family (Sans, Serif, Mono); chosen for technical precision and readability in dense data contexts.

#### Atlassian Design System

- **Colour roles**: Neutral, brand, information, success, warning, danger, discovery, accent, inverse, input. This covers the full semantic vocabulary needed for a fintech app.
- **Emphasis levels**: Each role has subtlest-to-boldest variants — e.g., a `danger` token in `subtle` background vs. `bold` background.
- **WCAG AA compliance**: 3:1 for large text/UI, 4.5:1 for normal text — built into token pairings.
- **Token naming**: `color.{property}.{role}.{emphasis}.{state}` — hierarchical and unambiguous.
- **Brand update propagation**: Token-based updates automatically propagate; Atlassian's 2024 visual refresh changed brand palette values in tokens without requiring component changes.

**Sources:**
- [Material Design 3 Color Roles](https://m3.material.io/styles/color/roles)
- [Apple HIG Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [Carbon Design System Color](https://carbondesignsystem.com/elements/color/overview/)
- [Atlassian Design Color](https://atlassian.design/foundations/color)

---

### 2.5 Fintech/Banking: Adapting Brand Identity for Trust, Clarity, Compliance

#### Colour Strategy for Fintech Products

**Blue dominance and trust psychology**: Blue symbolises trust, security, and reliability — historically the dominant fintech colour. New entrants differentiate (Monzo orange, Wise green, Klarna pink, Revolut deep blue with lime accents) while maintaining trust through design consistency and UX quality rather than colour alone.

**60-30-10 rule adaptation for fintech**:
- **60%**: Neutral surface (white, light grey) — reduces anxiety; clean, professional
- **30%**: Brand colour — CTAs, key data points, active states
- **10%**: Semantic/accent colour — status indicators, highlights

**Colour and compliance**:
- Red for errors/danger must be unambiguous; do not use red for branding in lending products (triggers rejection associations).
- Green for success/positive values (balance increase, payment received, approved).
- Yellow/amber for warnings, late payments, low balance alerts.
- Never use success/error colours decoratively — users have been conditioned to interpret them literally.

**Dark mode in fintech**: Not "inverted light mode" — requires a separate desaturated palette. Financial data under dark mode should use muted tones to prevent eye strain during extended sessions. Dark backgrounds: `neutral-900` or `neutral-950`, not pure black.

#### Typography for Trust and Clarity

- **Clean sans-serif for data**: Fintech product UIs consistently use geometric or humanist sans-serifs (not serif) for data displays. Serifs appear in some premium/wealth management products to signal authority.
- **Tabular numerals mandatory**: All financial figures should use `font-variant-numeric: tabular-nums` to ensure columns align.
- **Size hierarchy for key figures**: Account balances, loan amounts, interest rates displayed at large sizes (32px+) with high contrast. Supporting data (labels, dates, fine print) in secondary/tertiary text colours.
- **Fine print legibility**: Legal disclosures, APR, terms must meet WCAG AA even at small sizes — minimum 12px with sufficient contrast.

**Sources:**
- [Fintech Branding: Colour Strategy — Fintech Branding Studio](https://fintechbranding.studio/revolut-brand-refresh)
- [Fintech Design Guide — Eleken](https://www.eleken.co/blog-posts/modern-fintech-design-guide)
- [Mastering the Palette 2026 — LinkedIn](https://www.linkedin.com/pulse/mastering-palette-2026-guide-uiux-color-selection-chanuka-wasundara--oebkc)

---

## 3. Font Alternatives to Saans

### 3.1 Saans Characteristics

[Saans by Displaay Type Foundry](https://displaay.net/typeface/saans) is described as:

- **"Neutral, no-style grotesque"** — designed as a default system font
- **Character**: Consistent, unobtrusive, universal, calm. Descriptors include "average, basic, common, default, standard."
- **Similar to Swiss typefaces** (Helvetica territory) — universal and untitled
- **Variable font**: 3 axes — Weight, Italic, Mono; 18 weights, 36 styles
- **Use case**: Brand with a no-style aesthetic; internal default; "boring by design"
- **Letterforms**: Low contrast strokes; no expressive quirks; geometric construction with functional neutrality

**What to look for in alternatives**:
1. Low contrast, clean strokes
2. Geometric or lightly humanist construction
3. Neutral character — functional, not decorative
4. Good performance at small UI sizes
5. Variable font preferred for performance
6. Sufficient weight range (at minimum 300–700)

---

### 3.2 Candidate Alternatives Compared

#### Inter
**Designer**: Rasmus Andersson | **Source**: Google Fonts / open source | **License**: OFL-1.1 (free)

| Attribute | Detail |
|---|---|
| Classification | Humanist sans-serif with grotesque influence |
| Design philosophy | Purpose-built for digital screens; optimised for readability at small sizes |
| x-height ratio | 0.546 (high — enhances small-size legibility) |
| Cap height | 0.728 |
| Variable font | Yes (weight + italic axes) |
| Weights | 9 (100–900) |
| File size | 525.2 KB (full variable; subsetting recommended) |
| Language support | Latin, Cyrillic, Greek, Vietnamese |
| Italics | Yes |

**Compared to Saans**: Inter is slightly more humanist than Saans (Saans is more grotesque/neutral). Inter has subtle two-storey 'a' and 'g' giving it more warmth. Higher x-height than Saans. Both share the clean, functional approach. Inter has broader language coverage.

**Best for**: General-purpose fintech UI; excellent for data-dense dashboards; industry standard in enterprise-corporate and financial services.

**Used by**: Linear, Brex (Brex uses Inter with rounded alternates as their primary typeface).

---

#### DM Sans
**Designer**: Colophon Foundry | **Source**: Google Fonts | **License**: OFL-1.1 (free)

| Attribute | Detail |
|---|---|
| Classification | Low-contrast geometric sans-serif |
| Design philosophy | Designed for small text sizes; minimal, modern |
| x-height ratio | 0.504 (slightly lower than Inter) |
| Variable font | Yes (2 axes: weight + italic) |
| Weights | 9 (100–900) |
| File size | 130.5 KB (75% lighter than Inter) |
| Language support | Latin, Latin Extended |
| Italics | Yes |

**Compared to Saans**: DM Sans is the closest geometric match — low contrast, clean, minimal. Slightly more geometric personality than the complete neutrality of Saans. The reduced file size is a meaningful performance advantage for web products. Narrower language support (Latin-only) may be a constraint for international products.

**Best for**: Startup fintech apps; mobile-first products; body text in forms and small-size UI labels. Popular in enterprise-corporate and financial services.

---

#### Plus Jakarta Sans
**Designer**: Gumpita Rahayu (Tokotype) | **Source**: Google Fonts | **License**: OFL-1.1 (free)

| Attribute | Detail |
|---|---|
| Classification | Geometric sans-serif; takes inspiration from Neuzeit Grotesk and Futura |
| Design philosophy | "Fresh take on geometric"; commissioned for Jakarta's City of Collaboration identity |
| Distinctive features | Tall x-height, open counters; stylistic sets (Lancip/sharp, Lurus/slight serifs, Lingkar/swirl) |
| Variable font | Yes |
| Scripts | Latin, Cyrillic, Vietnamese |
| Italics | Yes |

**Compared to Saans**: Plus Jakarta Sans has more personality than Saans — the stylistic sets introduce character that Saans deliberately avoids. The "Lurus" (straight) set is the closest to Saans's neutral register. Taller x-height and more open counters than Saans. For a brand that wants Saans-like neutrality, PJS with default settings (no alternates) works well, but it's not as blank as Saans.

**Best for**: Consumer-facing fintech with a slightly more approachable, modern feel; works well at display sizes.

---

#### General Sans
**Designer**: Frode Helland (Indian Type Foundry) | **Source**: Fontshare (free) | **License**: Free for personal & commercial**

| Attribute | Detail |
|---|---|
| Classification | Geometric sans-serif; slightly quirky |
| Design philosophy | Compact, rational, space-efficient; more personality than pure grotesque |
| Distinctive features | More compact than Montserrat; noticeably more rational and stricter; saves space without condensing |
| x-height | High |
| Variable font | Yes |
| Weights | Variable range |

**Compared to Saans**: General Sans has more distinctive personality than Saans — slightly quirky lowercase characters. Less neutral/generic than Saans. Good choice if you want Saans-like geometry but with slightly more character.

**Best for**: Dense mobile app UI, particularly information-heavy screens; products that want a modern edge without overly trendy letterforms.

---

#### Outfit
**Designer**: Rodrigo Fuenzalida | **Source**: Google Fonts | **License**: OFL-1.1 (free)

| Attribute | Detail |
|---|---|
| Classification | Minimal geometric sans-serif |
| Design philosophy | Simple, clean, distinctive geometric style |
| Distinctive features | No italics (notable limitation); purely geometric; 9 weights |
| Variable font | No (static only) |
| Italics | **No** — significant constraint |
| Weights | 9 |

**Compared to Saans**: Outfit is strongly geometric; Saans has grotesque/Swiss influences. Outfit's lack of italics is a significant limitation for fintech products (legal text, emphasis, editorial sections frequently require italics). The geometric purity is appealing but more expressive than Saans's neutral grotesque. 

**Best for**: Display and branding use; logos; headers. **Not recommended as primary UI font for lending products due to missing italics.**

---

### 3.3 Recommendation Matrix

| | Closest to Saans Neutral | Fintech UI Suitability | Variable Font | Italics | Performance | Language Support |
|---|---|---|---|---|---|---|
| **Inter** | ★★★★☆ | ★★★★★ | ✓ | ✓ | ★★★☆☆ | Excellent (7 scripts) |
| **DM Sans** | ★★★★★ | ★★★★★ | ✓ | ✓ | ★★★★★ | Good (Latin) |
| **Plus Jakarta Sans** | ★★★☆☆ | ★★★★☆ | ✓ | ✓ | ★★★★☆ | Good (Latin, Cyrillic, Vietnamese) |
| **General Sans** | ★★★☆☆ | ★★★★☆ | ✓ | ✓ | ★★★★☆ | Good |
| **Outfit** | ★★★☆☆ | ★★☆☆☆ | ✗ | ✗ | ★★★★☆ | Latin |

**Primary recommendation**: **DM Sans** as the closest geometric-neutral fallback to Saans. Minimal character, low contrast, designed for small UI sizes, lightweight file. Pair with DM Sans at heavier weights for display/headings.

**Secondary recommendation**: **Inter** as the most battle-tested fintech UI font. Slightly more humanist than Saans but universally readable; industry-validated in financial services; excellent language support for international products.

**If character is acceptable**: **Plus Jakarta Sans** offers more personality via its stylistic sets while remaining clean and geometric at default settings.

**Sources:**
- [Saans Typeface — Displaay](https://displaay.net/typeface/saans)
- [DM Sans vs Inter Comparison — FontAlternatives](https://fontalternatives.com/compare/dm-sans-vs-inter/)
- [Best Free UI Fonts 2026 — Untitled UI](https://www.untitledui.com/blog/best-free-fonts)
- [Plus Jakarta Sans — Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Plus Jakarta Sans — Pimp my Type](https://pimpmytype.com/font/plus-jakarta-sans/)
- [Best UI Design Fonts 2026 — Design Monks](https://www.designmonks.co/blog/best-fonts-for-ui-design)

---

## 4. Fintech-Specific UI Patterns: Lending Products

### 4.1 Loan Calculator Interfaces

A loan calculator is often the highest-traffic marketing/acquisition surface — it must balance engagement with accuracy and trust.

#### Core Components

**Input mechanisms:**
- **Dual input**: Both a slider (for discoverability/exploration) AND a numeric text field (for precision). The two stay in sync.
- **Loan amount slider**: Steps should reflect realistic amounts (e.g., £1,000 increments on a £1k–£25k range). Visually prominent; large touch target.
- **Loan term selector**: Tabs or a stepper (e.g., 12 / 24 / 36 / 48 / 60 months). Tabs are faster on mobile; sliders appropriate for continuous ranges.
- **Purpose selector** (if rate varies): Card-select or dropdown; can trigger rate recalculation.

**Output display:**
- **Monthly payment**: Primary/hero display — largest text, highest contrast, most prominent.
- **Total amount repayable**: Secondary display — important for trust, must not be hidden.
- **Total interest**: Derived figure; show it clearly.
- **APR representative rate**: Required by regulation (FCA/FCCA); must be clearly displayed near the calculation result.
- **"Representative example" text**: Required by FCA; typically displayed in a contained block below the calculator.

**UX principles:**
- **Real-time recalculation**: Update on every slider move/input change; no submit button needed for calculation.
- **Personalised rate path**: After initial exploration, CTA leads to soft eligibility check for personalised rate.
- **Loading state**: Brief (≤300ms) loading indicator if calculation requires an API call; avoid stale data displays.
- **Comparison capability**: Some lenders show "if you borrowed £X more / less" comparison rows.

#### Trust signals specific to calculators
- "Your rate may differ based on your circumstances" disclaimer.
- "Representative APR X%" with clear labelling.
- "Check your rate without affecting your credit score" CTA.

---

### 4.2 Multi-Step Application Flows

Fintech application flows for loans follow a well-established pattern. Structured onboarding UX has been shown to **reduce abandonment by 20–40%** versus single-page compliance form flows.

#### Step Architecture

**Recommended flow for personal loan application:**

```
Step 1: Loan configuration
  — Amount + term (pre-filled from calculator if applicable)
  — Purpose (affects rate segmentation)
  
Step 2: Eligibility pre-check (soft pull)
  — Name, date of birth, address
  — "This won't affect your credit score" prominently displayed
  — Instant decision: proceed, refer, or decline with reason
  
Step 3: Personal details
  — Full name, contact info
  — Employment status, income
  — Progressive disclosure: show additional fields only if needed
  
Step 4: Financial details
  — Monthly expenses, existing commitments
  — Affordability assessment questions
  
Step 5: Identity verification
  — Document upload or open banking verification
  — OCR auto-fill where possible
  
Step 6: Review and consent
  — Full loan summary
  — Regulatory disclosures (pre-contract credit information, SECCI)
  — Credit agreement preview
  — Explicit consent capture
  
Step 7: Decision + next steps
  — Approval screen with full terms
  — Or decline with reason + signposting alternatives
  — Or referral to manual review with timeline
```

#### Step Indicator Pattern

- **Step counter**: "Step 3 of 6" with visible completed/current/upcoming states.
- **Progress bar**: Linear progress bar at top of screen; fills as steps complete.
- **Back navigation**: Always available; preserve entered data on back.
- **Save and resume**: Allow users to exit and return; email confirmation of saved application.

#### Form Design Within Steps

- **One primary question per screen** on mobile (progressive disclosure).
- **Single-column layout** on mobile; two-column optional on desktop for related fields.
- **Live validation**: Field-level real-time feedback; do not wait until submit.
- **Smart defaults and pre-fill**: Address lookup (postcode lookup → select address); open banking pre-fill for income; OCR for document data.
- **Estimated time indicator**: "This should take about 5 minutes."
- **Contextual help**: Tooltips (`?` icon) for jargon (e.g., "What is a CCJ?"); expandable FAQs.

**Sources:**
- [Fintech Onboarding UX — Eleken](https://www.eleken.co/blog-posts/fintech-onboarding-simplification)
- [Fintech SaaS Design — WSA Design](https://wsa.design/news/fintech-saas-design-how-to-turn-product-complexity-into-clear-ux)
- [Fintech User Experience — SaaS Factor](https://www.saasfactor.co/blogs/fintech-user-experience)
- [Top 10 Fintech UX Practices 2026 — Onething Design](https://www.onething.design/post/top-10-fintech-ux-design-practices-2026)

---

### 4.3 Dashboard / Account Overview

The loan account dashboard is the primary post-sign-up surface. It must communicate status, upcoming obligations, and available actions at a glance.

#### Information Hierarchy (Dashboard Zones)

**Primary zone (hero):**
- Remaining balance (large display number)
- Next payment amount + due date (prominent; colour-coded by urgency)
- Loan progress indicator (e.g., paid 3 of 24 instalments; visual progress bar)

**Secondary zone (quick actions):**
- Make payment
- View schedule
- Contact support
- Switch to statements

**Tertiary zone (detail):**
- Loan summary: original amount, start date, interest rate, term
- Payment history (recent transactions)

#### Dashboard UX Principles for Lending

- **"3-second rule"**: Key balance and next payment must be scannable in 3 seconds.
- **Urgency signalling**: Next payment within 7 days → amber/warning state. Overdue → red/danger state, but with a helpful "pay now" CTA rather than threatening language.
- **Positive reinforcement**: Show progress clearly ("You're 35% through your loan — great work!").
- **Personalisation**: Contextual tips based on payment history (e.g., "Set up Direct Debit to never miss a payment").

---

### 4.4 Eligibility Check Patterns

Eligibility checks are a critical trust and conversion moment. The primary concern: **users fear affecting their credit score**.

#### Soft Credit Check UI Pattern

**Pre-check screen:**
- Large, confident headline: "Check if you're eligible"
- Explicit soft-pull disclosure: "**This is a soft search — it won't affect your credit score**"
- Plain language about what's checked and why
- Estimated time: "Takes about 2 minutes"

**Data collection (minimal):**
- Name, DOB, address (postcode lookup)
- Optionally: last 4 digits of NI number (for better match rates)
- Do NOT ask for income, bank details, or documents at this stage

**Results display:**
- **Approved**: "You're eligible" — show personalised rate, approved amount, monthly payment; clear CTA to full application.
- **Refer**: "We need a little more information" — avoid "declined"; explain next step.
- **Decline**: Clear, non-judgmental language; signpost alternatives (e.g., "You may be eligible for our credit-builder product"); provide the reason if required by regulation.

**Post-check messaging:**
- Always confirm "Your credit score was not affected."
- Timestamp of check for user records.

**Sources:**
- [Soft Pull Credit APIs — CRS Credit API](https://crscreditapi.com/soft-pull-credit-apis-instant-decision/)
- [Soft Pull Onboarding — LinkedIn](https://www.linkedin.com/pulse/eliminate-hard-credit-inquiries-stepbystep-soft-pull-onboarding-y4hbe)
- [Fintech User Experience 2026 — SaaS Factor](https://www.saasfactor.co/blogs/fintech-user-experience)

---

### 4.5 Document Upload Patterns

Document upload (ID verification, proof of income) is a high-friction, high-drop-off step. Poor design here causes 30–50% abandonment.

#### Inline Verification Architecture

**Preferred pattern (inline, no redirect):**
1. Introduce the step with clear context ("We need to verify your identity to comply with regulations — this keeps your money safe").
2. Offer multiple methods: **Camera capture** (primary on mobile) | **File upload** (fallback).
3. **On camera capture**: Show viewfinder with guide overlay (rectangle for passport/ID card); real-time quality feedback ("Hold still", "Better light needed").
4. **OCR extraction**: Auto-extract name/DOB/document number; show extracted fields for user confirmation.
5. **Immediate feedback**: Checkmark if successfully captured; specific error message if rejected ("Try again — the image is blurry").
6. **Fallback path**: "Having trouble? Try uploading a file instead" or "Continue later".

#### Document Upload Component States

```
Idle:         Upload area with dashed border; cloud upload icon; "Click or drag file here"
              Accepted formats: JPEG, PNG, PDF | Max size: 10MB

Uploading:    Progress indicator (spinner or bar); file name shown; cancel option

Processing:   "Checking document quality..." with animation; estimated wait time

Success:      Green checkmark; document name; "Document accepted"
              Option to re-upload if incorrect document

Error:        Red state with specific message:
              "Document unclear — please retake or upload a higher quality image"
              "File format not supported — please use JPEG, PNG or PDF"
              "File size too large — maximum 10MB"
              
Review:       Yellow/amber state: "Your document is being reviewed — we'll update you within X hours"
```

#### Selfie / Liveness Check

- Frame guide for face positioning
- Progress indicator for liveness steps ("Look left" → "Look right" → "Hold still")
- Immediate pass/fail feedback
- Maximum 2 retries before fallback to manual review

**Sources:**
- [Fintech Onboarding Simplification — Eleken](https://www.eleken.co/blog-posts/fintech-onboarding-simplification)
- [Fintech UX Startups — Tribe Designworks](https://tribedesignworks.com/blog/ux-design-for-fintech)
- [Top 10 Fintech UX Practices 2026 — Onething Design](https://www.onething.design/post/top-10-fintech-ux-design-practices-2026)

---

### 4.6 Repayment Schedule Tables

The repayment schedule is both a regulatory requirement and a trust-building element. Users want to understand exactly what they owe and when.

#### Table Structure

| # | Payment Date | Opening Balance | Payment Amount | Principal | Interest | Closing Balance |
|---|---|---|---|---|---|---|
| 1 | 15 Apr 2026 | £5,000.00 | £227.53 | £186.20 | £41.33 | £4,813.80 |
| 2 | 15 May 2026 | £4,813.80 | £227.53 | £187.74 | £39.79 | £4,626.06 |
| ... | | | | | | |
| 24 | 15 Mar 2028 | £225.87 | £227.53 | £225.88 | £1.65 | £0.00 |

**Totals row** (sticky at bottom or after table):
- Total payments: `£5,460.72`
- Total principal: `£5,000.00`
- Total interest: `£460.72`

#### UI Design Patterns for Repayment Tables

**Layout:**
- **Tabular numerals** (`font-variant-numeric: tabular-nums`) mandatory for all financial columns.
- **Right-align all monetary values** for column alignment.
- **Sticky column headers** for scrollable tables.
- **Highlight current/next payment row**: Use `bg/brand/subtle` or a left border accent.
- **Highlight paid rows**: Reduced opacity or `text/tertiary` colour with a "Paid" badge.
- **Expandable rows** (optional): Show breakdown (principal/interest) on expand for simpler default view.

**Mobile adaptation:**
- Default view: Date | Payment | Balance
- Expandable detail: Full row breakdown on tap
- Sticky "Next Payment" summary card above scrollable table

**Export/download:**
- "Download PDF schedule" button
- "Download CSV" for users who want to track in spreadsheets

**Regulatory requirements:**
- Must show total cost of credit
- Must be accessible at any point (not buried behind account settings)
- APR must be shown near the schedule header

---

## Summary: Key Takeaways

### Design System Architecture
1. Use a **three-tier token system** (Primitive → Semantic → Component) for scalable fintech design.
2. Name semantic tokens by **purpose, not colour**: `bg/danger/subtle`, not `bg/red-100`.
3. Build colour scales in **Lab or Oklch colour space** for perceptually uniform tonal steps (Stripe's approach).
4. **WCAG AA minimum** throughout; build contrast compliance into the token system by design.

### Brand Translation
1. Start with the brand anchor colour; generate full tonal scale via algorithm or manual Lab manipulation.
2. Map primitives to semantic roles systematically; the Atlassian/Material Design 3 role taxonomies provide a complete template.
3. Define **typography tokens as semantic composite styles** (`text-style/heading-1`), not just raw size/weight values.
4. Keep typography and colour tokens in a single source of truth (JSON/W3C DTCG format).

### Fonts
- **DM Sans** is the closest free Google Font to Saans's geometric neutrality.
- **Inter** is the fintech industry standard and more battle-tested across data-dense products.
- Avoid Outfit as a primary UI font due to missing italics.

### Lending UX Patterns
1. **Loan calculators**: Real-time calculation, dual slider/input, prominent monthly payment, visible APR, soft-pull CTA.
2. **Application flows**: 5–7 steps; one question per screen on mobile; live validation; save and resume.
3. **Eligibility checks**: Lead with soft-pull assurance; minimal data collection; instant results; non-judgmental decline messaging.
4. **Document upload**: Inline (no redirect); mobile camera + OCR primary; specific error messages; fallback paths always available.
5. **Repayment tables**: Tabular numerals; sticky headers; current payment highlighted; mobile-expandable rows; always accessible.
