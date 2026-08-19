# Portfolio11-IronMan Execution Plan

## Milestones Overview

### Milestone 1: Exploration & Source Inventory Analysis
- **Goal**: Explore source directory (`c:\Users\dinda\Downloads\Portfolio11-main (1)\Portfolio11-main\Portfolio11-main`) and target directory (`c:\Users\dinda\Downloads\Portfolio11-IronMan`) to catalog files, components, assets, dependencies, and inspect Hero component (`src/pages/Hero/Hero.jsx` and CSS).
- **Subagents**: Explorer (`teamwork_preview_explorer`)

### Milestone 2: Base React + Vite Project Migration & Dependency Setup
- **Goal**: Copy/recreate project structure, files, dependencies, package.json, vite.config.js, index.html, public assets, and components from source to target directory. Run `npm install` and verify base build.
- **Subagents**: Worker (`teamwork_preview_worker`), Reviewer (`teamwork_preview_reviewer`), Challenger (`teamwork_preview_challenger`), Auditor (`teamwork_preview_auditor`)

### Milestone 3: Hero Section Customization
- **Goal**: Update `src/pages/Hero/Hero.jsx` and styling. Replace monster background graphics with Boy image background layer and Iron Man image foreground layer. Ensure responsive layout, smooth visuals, modern aesthetic.
- **Subagents**: Explorer (`teamwork_preview_explorer`), Worker (`teamwork_preview_worker`), Reviewer (`teamwork_preview_reviewer`), Challenger (`teamwork_preview_challenger`), Auditor (`teamwork_preview_auditor`)

### Milestone 4: E2E Build & Dev Verification & Final Audit
- **Goal**: Verify `npm install`, `npm run dev`, and `npm run build` run without errors in target directory. Ensure zero regressions across all components.
- **Subagents**: Worker (`teamwork_preview_worker`), Reviewer (`teamwork_preview_reviewer`), Challenger (`teamwork_preview_challenger`), Auditor (`teamwork_preview_auditor`)
