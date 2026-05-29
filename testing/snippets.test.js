/**
 * @file snippets.test.js
 * Unit tests for snippets.js
 * Tests: loadSnippets, getRandomSnippet
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadSnippets, getRandomSnippet } from '../scripts/snippets.js';

// ─── Mock fetch ───────────────────────────────────────────────────────────────

const MOCK_SNIPPETS = [
  { snippet: 'const x = 1;', language: 'javascript', difficulty: 'easy' },
  { snippet: 'let y = 2;',   language: 'javascript', difficulty: 'easy' },
  { snippet: 'var z = 3;',   language: 'javascript', difficulty: 'medium' },
];

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: async () => MOCK_SNIPPETS,
  }));
});

// ─── loadSnippets ─────────────────────────────────────────────────────────────

describe('loadSnippets', () => {

  it('fetches javascript snippets at the correct path', async () => {
    await loadSnippets('javascript');
    expect(fetch).toHaveBeenCalledWith('./assets/snippets/javascript.json');
  });

  it('fetches html snippets at the correct path', async () => {
    await loadSnippets('html');
    expect(fetch).toHaveBeenCalledWith('./assets/snippets/html.json');
  });

  it('fetches css snippets at the correct path', async () => {
    await loadSnippets('css');
    expect(fetch).toHaveBeenCalledWith('./assets/snippets/css.json');
  });

  it('defaults to javascript when an unknown mode is passed', async () => {
    await loadSnippets('python');
    expect(fetch).toHaveBeenCalledWith('./assets/snippets/javascript.json');
  });

  it('does not throw when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('network error'));
    await expect(loadSnippets('javascript')).resolves.not.toThrow();
  });

});

// ─── getRandomSnippet ─────────────────────────────────────────────────────────

describe('getRandomSnippet', () => {

  beforeEach(async () => {
    await loadSnippets('javascript');
  });

  it('returns an object with a snippet property', () => {
    const result = getRandomSnippet();
    expect(result).toHaveProperty('snippet');
  });

  it('returns a snippet that exists in the loaded list', () => {
    const result = getRandomSnippet();
    const allSnippets = MOCK_SNIPPETS.map(s => s.snippet);
    expect(allSnippets).toContain(result.snippet);
  });

  it('returns different snippets across multiple calls (randomness check)', () => {
    // Run 20 times — statistically near-impossible to always get index 0
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(getRandomSnippet().snippet);
    }
    expect(results.size).toBeGreaterThan(1);
  });

});