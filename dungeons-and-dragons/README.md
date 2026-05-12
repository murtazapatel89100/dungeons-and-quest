# Dice & Codex

An App Router-based TTRPG companion site with a dark fantasy presentation, route-specific landing pages, an interactive character builder, rules content, and Dungeon Master tools.

## What’s Included

- Home page with a cinematic hero carousel, feature cards, process overview, tool highlights, and newsletter section
- `Learn` route with beginner-focused D&D guidance
- `Characters` route with an interactive character wizard
- `Rules` route with core mechanics, conditions, combat, and environment rules
- `Tools` route with dice rolling, loot generation, and name generation utilities
- `Playstyles` route with experience comparisons, quiz flow, and recommendations

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Biome for linting and formatting
- Motion, Radix UI, MUI, lucide-react, and React Three Fiber for interactive UI pieces

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev      # Start the dev server
npm run build    # Create a production build
npm run start    # Run the production server
npm run lint     # Run Biome checks
npm run format   # Format the codebase with Biome
```

## Project Structure

- `src/app` - App Router routes, layouts, metadata, robots, and sitemap
- `src/components` - Shared UI and route-specific feature components
- `src/lib` - Data models and content sources
- `config` - Site and navigation configuration
- `public` - Static assets

## Notes

- The root layout lives in `src/app/layout.tsx` and provides the global shell, metadata, navigation, and footer.
- Route metadata is defined per page with the App Router `metadata` export.
- The project uses remote imagery in several sections, so first-load previews may depend on network access.
- The site is not affiliated with Wizards of the Coast.
