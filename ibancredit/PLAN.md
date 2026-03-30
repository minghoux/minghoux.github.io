# Goal
Rebrand the Ibancar user journey to align with the new Abound brand identity, utilizing the Abound design system and style guidelines. The final deliverable must be a functional, interactive frontend prototype showcasing the entire flow.

# Execution Steps

## 1. Journey Analysis & Extraction
- Analyze the screenshots of the current Ibancar journey located in the `ibancredit/current-journey` directory.
- Extract all UI text, step sequences, and form field requirements into `ibancredit/current-journey/current-journey.md`.
- Document the logical flow of the application (e.g., from loan purpose -> loan calculator -> personal details -> result).

## 2. Design System Integration
- Reference the Abound design system (`abound-brand-2026/design-system/abound-design-system.html`) for styling, components, colors, and typography.
- **Typography:** Load the primary brand font (`Saans`) with web-safe fallbacks (`DM Sans`, `sans-serif`) as defined in the design system. Ensure fonts load correctly in a no-build environment using `@font-face` and relative paths.
- **Assets:** Utilize brand assets (logos, images) from the local `ibancredit/brand-assest` directory when available. **Crucially**, replace all instances of the old Ibancar wordmark and branding text with the new Abound logo (`wordmark.svg`). If specific icons or assets are missing, use best judgment to find suitable, brand-aligned alternatives or SVG icons.

## 3. Technical Setup & Architecture
- **Tech Stack:** HTML, CSS, JavaScript (Vue 3 via CDN), Tailwind CSS via Tailwind Play CDN. The absolute priority is **no build process**—it must be accessible simply by double-clicking the HTML file.
- **Architecture:** Implement a Single Page Application (SPA) structure. Use Vue.js's reactive state to smoothly transition between journey steps without triggering page reloads.
- **Content-UI Separation:** Extract all UI text, step labels, and option lists into a centralized `journeyContent` JavaScript object. Reference this object within Vue components to ensure the UI is purely a presentation layer that's easily scalable and configurable.
- **Styling:** Configure the Tailwind Play CDN script with the custom Abound theme (colors, typography, spacing, border radius) extracted from the design system so tokens are globally reusable.
- **Componentization:** Keep the architecture modular. Utilize Vue components (e.g., `<script type="text/x-template">` or separate JS files if feasible) to maintain clean and reusable code structure.

## 4. Prototype Development
- Rebuild the journey step-by-step, starting from the initial step.
- Recreate the functional logic of the original Ibancar form, replacing the visual design entirely with a premium, dynamic Abound aesthetic.
- Ensure the layout is responsive, adhering to mobile-first best practices common in consumer lending.
- Incorporate subtle animations and transitions between states to create a modern, high-quality user experience.

## 5. Review & Refinement
- Validate that all original UI text extracted in Step 1 has been accurately incorporated into the new prototype.
- Verify that the prototype remains entirely dependency-free for the end user (no `npm install` needed).
- When encountering ambiguity, prioritize simplicity, rapid prototyping efficiency, and strict adherence to the Abound visual brand.