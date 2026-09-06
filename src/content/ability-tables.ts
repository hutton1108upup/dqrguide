import records from './ability-records.json';
import type { PageSection } from './types';

export function abilityTable(kind: 'spells' | 'drops'): NonNullable<PageSection['table']> {
  return kind === 'spells' ? {
    columns: ['Ability', 'Use case', 'How to use it', 'Reported location', 'Class report', 'Damage attribute', 'Difficulty', 'Equip level', 'Acquisition status', 'Source'],
    rows: records.map(r => ({ cells: [r.name, r.use, r.usage, r.location, r.className, r.attribute, r.difficulty, r.equipLevel, r.acquisition], sourceURL: r.sourceURL, sourceLabel: r.sourceLabel }))
  } : {
    columns: ['Item', 'Reported dungeon', 'Difficulty / probability', 'Evidence', 'Explanation'],
    rows: records.filter(r => r.acquisition === 'Player report').map(r => ({ cells: [r.name, r.location, `Difficulty ${r.difficulty.toLowerCase()} · Rate ${r.rate.toLowerCase()}`, r.evidence], sourceURL: r.dropSourceURL, sourceLabel: r.dropSourceLabel }))
  };
}
