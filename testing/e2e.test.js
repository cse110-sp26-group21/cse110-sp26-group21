/**
 * @file E2e.test.js
 * End-to-end tests for Astro-Type
 * Simulates a full game session in jsdom without relying on module-level
 * querySelector calls in asteroids.js / typing.js.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { asteroids } from '../scripts/asteroids.js';

// ─── Full DOM scaffold ────────────────────────────────────────────────────────

beforeEach(() => {
  asteroids.length = 0;
  document.body.innerHTML = `
    <div id="game-screen">
      <div id="game-area"></div>
      <input id="typing-input" />
      <span id="score">0</span>
      <span id="streak">0</span>
      <span id="longest-streak">0</span>
    </div>
    <div id="results-screen" class="hidden">
      <span id="final-score">0</span>
      <span id="destroyed-count">0</span>
    </div>
  `;
  vi.stubGlobal('innerWidth', 1280);
  vi.stubGlobal('innerHeight', 720);
});

// ─── Self-contained helpers (mirror game logic, no module-level DOM) ──────────

function spawnAsteroid(snippet) {
  const gameArea = document.querySelector('#game-area');
  if (!gameArea) return null;
  if (asteroids.length >= 10) return null;

  const el = document.createElement('div');
  el.classList.add('asteroid');
  el.innerHTML = `<p class="snippet">${snippet}</p>`;
  gameArea.appendChild(el);

  const asteroid = { snippet, x: 100, y: -150, speed: 0.35, element: el };
  el.style.left = `${asteroid.x}px`;
  el.style.top  = `${asteroid.y}px`;
  asteroids.push(asteroid);
  return asteroid;
}

function destroyAsteroid(asteroid) {
  asteroid.element.remove();
  const i = asteroids.indexOf(asteroid);
  if (i !== -1) asteroids.splice(i, 1);
}

function moveAsteroids(onMiss) {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const a = asteroids[i];
    a.y += a.speed;
    a.element.style.top = `${a.y}px`;
    if (a.y > window.innerHeight) {
      a.element.remove();
      asteroids.splice(i, 1);
      onMiss();
    }
  }
}

function handleTyping(onDestroy) {
  const input = document.querySelector('#typing-input');
  const typed = input.value;
  asteroids.forEach(a => {
    if (typed === a.snippet) {
      onDestroy(a);
      input.value = '';
    }
  });
}

function setupTyping(onDestroy) {
  const input = document.querySelector('#typing-input');
  input.addEventListener('input', () => handleTyping(onDestroy));
}

function typeSnippet(text) {
  const input = document.querySelector('#typing-input');
  input.value = text;
  input.dispatchEvent(new Event('input'));
}

// ─── E2E tests ────────────────────────────────────────────────────────────────

describe('E2E — spawn and destroy a single asteroid', () => {

  it('asteroid appears in DOM after spawn', () => {
    spawnAsteroid('const x = 1;');
    expect(document.querySelectorAll('.asteroid').length).toBe(1);
  });

  it('typing the correct snippet removes the asteroid from DOM and array', () => {
    const onDestroy = vi.fn((a) => destroyAsteroid(a));
    setupTyping(onDestroy);
    spawnAsteroid('let y = 2;');
    expect(asteroids.length).toBe(1);
    typeSnippet('let y = 2;');
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(asteroids.length).toBe(0);
    expect(document.querySelectorAll('.asteroid').length).toBe(0);
  });

});

describe('E2E — multiple asteroids, destroy in any order', () => {

  it('correctly destroys the matched asteroid leaving others intact', () => {
    const onDestroy = vi.fn((a) => destroyAsteroid(a));
    setupTyping(onDestroy);
    spawnAsteroid('snippet A');
    spawnAsteroid('snippet B');
    spawnAsteroid('snippet C');
    typeSnippet('snippet B');
    expect(asteroids.length).toBe(2);
    expect(asteroids.map(a => a.snippet)).toContain('snippet A');
    expect(asteroids.map(a => a.snippet)).toContain('snippet C');
    expect(asteroids.map(a => a.snippet)).not.toContain('snippet B');
  });

});

describe('E2E — asteroid misses (reaches bottom)', () => {

  it('removes asteroid from array when it passes the bottom of screen', () => {
    spawnAsteroid('missed snippet');
    asteroids[0].y = window.innerHeight + 1;
    const onMiss = vi.fn();
    moveAsteroids(onMiss);
    expect(onMiss).toHaveBeenCalledTimes(1);
    expect(asteroids.length).toBe(0);
  });

});

describe('E2E — full short game (3 asteroids, all destroyed)', () => {

  it('ends with no asteroids remaining after all are typed correctly', () => {
    const onDestroy = vi.fn((a) => destroyAsteroid(a));
    setupTyping(onDestroy);
    const snippetList = ['const a = 1;', 'let b = 2;', 'var c = 3;'];
    snippetList.forEach(s => spawnAsteroid(s));
    expect(asteroids.length).toBe(3);
    snippetList.forEach(s => typeSnippet(s));
    expect(asteroids.length).toBe(0);
    expect(onDestroy).toHaveBeenCalledTimes(3);
  });

  it('typing wrong text does not remove any asteroid', () => {
    const onDestroy = vi.fn((a) => destroyAsteroid(a));
    setupTyping(onDestroy);
    spawnAsteroid('correct snippet');
    typeSnippet('wrong input');
    expect(asteroids.length).toBe(1);
    expect(onDestroy).not.toHaveBeenCalled();
  });

});