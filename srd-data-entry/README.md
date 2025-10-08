# D&D 3.5e SRD Data Entry Tool

A web-based application for manually entering D&D 3.5e SRD data into structured JSON format with human-readable markdown generation.

## Features

- ✅ Split-screen interface (source markdown on left, form on right)
- ✅ Real-time validation with Zod schemas
- ✅ Progress tracking by content type
- ✅ Dice roller integration
- ✅ Search and filter existing entries
- ✅ TypeScript throughout for type safety
- ✅ Simple, focused UI for solo data entry

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
/srd-data-entry/
  /src/
    /components/      # React components
      Layout.tsx
      Sidebar.tsx
      SpellForm.tsx
      MonsterForm.tsx
      EquipmentForm.tsx
      ClassForm.tsx
      FeatForm.tsx
      SkillForm.tsx
      DiceRoller.tsx
      MarkdownPreview.tsx
    /schemas/         # Zod validation schemas
      spell.schema.ts
      monster.schema.ts
      equipment.schema.ts
      character.schema.ts
    /types/           # TypeScript types
    /lib/             # Utilities
      dice.ts         # Dice rolling functions
      store.ts        # Zustand state management
    /api/             # Data persistence
      fs-api.ts       # localStorage wrapper (will be replaced with file system API)
  /data/              # Output JSON files
    /spells/
    /monsters/
    /equipment/
    /classes/
    /feats/
    /skills/
    /_indexes/
  /markdown/          # Generated markdown
  /source/            # Source markdown files (symlink to ../04.done)
  /scripts/           # Build scripts
    generate-markdown.ts
    validate-all.ts
```

## Content Types Supported

1. **Spells** - Full spell data with components, levels, effects
2. **Monsters** - Complete stat blocks with abilities
3. **Equipment** - Weapons, armor, goods, magic items
4. **Classes** - Base, prestige, and NPC classes
5. **Feats** - All feat types with prerequisites
6. **Skills** - Skill descriptions and mechanics

## Workflow

1. Select content type from home screen
2. Click "+" to create new entry or select existing
3. Fill out form fields (left side shows source for reference)
4. Use dice roller for quick calculations
5. Save entry (auto-validates)
6. Entry saved to JSON, markdown auto-generated
7. Track progress in dashboard

## Data Format

All data is stored as individual JSON files:

```
/data/spells/fireball.json
/data/spells/magic-missile.json
/data/monsters/aboleth.json
...
```

Indexes track all entries:

```
/data/_indexes/spells.json
/data/_indexes/monsters.json
...
```

## Scripts

```bash
# Generate markdown from all JSON
npm run generate-markdown

# Validate all JSON against schemas
npm run validate

# Development server
npm run dev

# Build for production
npm run build
```

## Dice Roller

Built-in dice roller supports standard D&D notation:
- `1d20` - Single d20
- `2d6+3` - Two d6 plus 3
- `8d6` - Fireball damage

## Status Tracking

Each entry has a status:
- **Draft** - Work in progress
- **Review** - Ready for review
- **Complete** - Verified and complete

## Notes for Development

Currently using `localStorage` for data persistence during development. In production, this will be replaced with actual file system operations via a Node.js backend API.

To integrate with file system:
1. Create Express server in `/api`
2. Implement file read/write endpoints
3. Update `src/api/fs-api.ts` to use fetch instead of localStorage

## Future Enhancements

- Export to various formats (PDF, website, API)
- Multi-user collaboration
- Bulk import from CSV
- Advanced search with filters
- Custom templates
- Backup/restore functionality
