import { describe, expect, it } from 'vitest';
import records from './ability-records.json';
import { abilityTable } from './ability-tables';

describe('shared acquisition records', () => {
  it('keeps every reported location consistent across both views', () => {
    const spells = abilityTable('spells');
    for (const drop of abilityTable('drops').rows) {
      expect(spells.rows.find(row => row.cells[0] === drop.cells[0])?.cells[3]).toBe(drop.cells[1]);
    }
    expect(abilityTable('drops').rows.some(row => row.cells[0] === 'Fire Bomb')).toBe(false);
  });
  it('preserves the difference between a recommendation and an equip requirement', () => {
    const fireBomb = records.find(row => row.name === 'Fire Bomb')!;
    expect(fireBomb.className).toBe('Mage (recommended)');
    expect(fireBomb.equipLevel).toBe('Unknown');
    expect(fireBomb.acquisition).toBe('Recommendation only');
  });
});
