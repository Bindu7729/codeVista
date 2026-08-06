import { describe, it, expect } from 'vitest';
import { updateWatchlist } from '../variableWatchlist';

describe('Variable Watchlist Service', () => {
  it('records variable history when watched value changes across steps', () => {
    let watched = updateWatchlist(['count', 'missing'], 0, { count: 1 });
    expect(watched.get('count')?.history).toHaveLength(1);
    expect(watched.get('count')?.history[0].value).toBe(1);

    // Step with identical value does not produce duplicate history
    watched = updateWatchlist(['count'], 1, { count: 1 }, watched);
    expect(watched.get('count')?.history).toHaveLength(1);

    // Step with mutated value appends to history
    watched = updateWatchlist(['count'], 2, { count: 2 }, watched);
    expect(watched.get('count')?.history).toHaveLength(2);
    expect(watched.get('count')?.history[1].value).toBe(2);
  });
});
