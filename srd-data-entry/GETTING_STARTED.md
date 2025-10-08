# Getting Started with SRD Data Entry Tool

## What You Have Now

A fully functional web-based data entry tool for converting D&D 3.5e SRD markdown into structured JSON with the following features:

✅ **Working Features:**
- Split-screen UI layout
- Spell entry form with full validation
- Dice roller with D&D notation support (1d20, 2d6+3, etc.)
- Search and filter existing entries
- Progress tracking
- TypeScript schemas for all content types
- Real-time validation with Zod
- localStorage persistence (for development)

🚧 **In Progress (Schemas Ready, Forms Needed):**
- Monster entry form
- Equipment entry forms (weapons, armor, goods, magic items)
- Character option forms (classes, feats, skills)
- Markdown generator
- Progress dashboard

## How to Use Right Now

### 1. Start the Application

The server is already running at **http://localhost:3000/**

Open your browser and navigate to that URL.

### 2. Create Your First Spell

1. Click on "Spells" from the home screen
2. Click the "+" button in the sidebar
3. Fill out the spell form:
   - **ID**: Use lowercase-with-hyphens (e.g., "acid-arrow")
   - **Name**: The spell's display name
   - **School**: Select from dropdown
   - Fill in all required fields (marked with *)
4. Click "Save"

### 3. Use the Dice Roller

While filling out forms, you can use the dice roller at the bottom:
- Type notation like "2d6+3" and click "Roll"
- Or click quick-roll buttons for common dice
- Great for calculating averages and damage

### 4. Search Existing Entries

- Use the search box in the sidebar to find entries by name or ID
- Click on any entry to edit it
- Status indicators show draft (gray), review (yellow), complete (green)

## Current Limitations

**Data Storage**: Currently uses localStorage (browser storage) for development. This means:
- Data persists between page refreshes
- Data is local to your browser
- Not shared between computers
- Limited to ~5-10MB total

**To export your work:**
```javascript
// In browser console
Object.keys(localStorage)
  .filter(k => k.startsWith('srd_'))
  .forEach(k => console.log(k, localStorage[k]));
```

## Next Steps to Complete the Tool

### Priority 1: Monster Form (Most Complex)
Create `src/components/MonsterForm.tsx` following the same pattern as SpellForm.
Monster schema is already complete in `src/schemas/monster.schema.ts`.

### Priority 2: Equipment Forms
- WeaponForm.tsx
- ArmorForm.tsx
- MagicItemForm.tsx

### Priority 3: Character Forms
- ClassForm.tsx
- FeatForm.tsx
- SkillForm.tsx

### Priority 4: Markdown Generator
Create `scripts/generate-markdown.ts` to convert JSON back to markdown:

```typescript
// Example structure
import { readdir, readFile, writeFile } from 'fs/promises';
import type { Spell } from '../src/schemas/spell.schema';

async function generateSpellMarkdown(spell: Spell): string {
  return `# ${spell.name}

**School**: ${spell.school}
**Level**: ${Object.entries(spell.level).map(([cls, lvl]) => `${cls} ${lvl}`).join(', ')}
...
`;
}
```

### Priority 5: File System Backend
Replace localStorage with actual file operations:

1. Create Express API:
```typescript
// api/server.ts
app.post('/api/save/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  await writeFile(`data/${type}/${id}.json`, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});
```

2. Update `src/api/fs-api.ts` to use fetch instead of localStorage

## Development Workflow

```bash
# Development server (already running)
npm run dev

# Stop server
# Ctrl+C in terminal or close this tool

# Build for production (future)
npm run build

# Run markdown generator (once implemented)
npm run generate-markdown

# Validate all JSON (once implemented)
npm run validate
```

## File Structure Reference

```
Your working data:
- Browser localStorage (temporary)

Future data structure:
- /data/spells/*.json (source of truth)
- /data/monsters/*.json
- /data/_indexes/spells.json (listing)
- /markdown/spells/*.md (generated)
```

## Tips for Data Entry

1. **Use consistent IDs**: lowercase-with-hyphens format
2. **Copy from source**: Have markdown open in another window to copy text
3. **Save frequently**: Click save after each section
4. **Use status field**: Mark as "review" when ready for checking
5. **Test dice roller**: Verify damage calculations as you enter
6. **Search before creating**: Check if spell already exists

## Troubleshooting

**Server won't start:**
```bash
# Kill any processes on port 3000
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

**Build errors:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Lost data:**
- Data is in browser localStorage
- Open DevTools > Application > Local Storage
- Look for keys starting with "srd_"

## Future Enhancements

When you're ready to extend the tool:
- Add more form types (currently only spells work)
- Implement file system backend
- Add batch operations
- Create import from CSV
- Add export to different formats
- Implement undo/redo
- Add keyboard shortcuts
- Create templates for common patterns

## Questions?

The codebase is well-structured and documented. Key files to reference:
- `src/schemas/*.schema.ts` - Data validation rules
- `src/components/SpellForm.tsx` - Example form implementation
- `src/lib/dice.ts` - Dice rolling logic
- `src/api/fs-api.ts` - Data persistence layer

Happy data entry! 🎲
