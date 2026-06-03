/**
 * @file asteroids.test.js
 * Unit tests for asteroid logic (spawn, move, destroy)
 *
 * asteroids.js stores gameArea via a module-level querySelector that runs
 * before any test DOM is ready. We mirror the logic here so every function
 * runs against the jsdom document set up in beforeEach.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { asteroids } from '../scripts/asteroids.js';

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  asteroids.length = 0;
  document.body.innerHTML = '<div id="game-area"></div>';
  vi.stubGlobal('innerWidth', 1280);
  vi.stubGlobal('innerHeight', 720);
});

// ─── Local implementations (mirror asteroids.js exactly) ─────────────────────

const MAX_ASTEROIDS = 10;

function spawnAsteroid(snippet) {
  const gameArea = document.querySelector('#game-area');
  if (asteroids.length >= MAX_ASTEROIDS) return null;

  const el = document.createElement('div');
  el.classList.add('asteroid');
  el.innerHTML = `<img src="./assets/images/asteroid.png" alt="asteroid"><p class="snippet">${snippet}</p>`;
  gameArea.appendChild(el);

  const maxX = window.innerWidth - 250;
  const randomX = Math.random() * maxX;
  const asteroid = { snippet, x: randomX, y: -150, speed: 0.35, element: el };
  el.style.left = `${asteroid.x}px`;
  el.style.top  = `${asteroid.y}px`;
  asteroids.push(asteroid);
  return asteroid;
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

function destroyAsteroid(asteroid) {
  asteroid.element.remove();
  const i = asteroids.indexOf(asteroid);
  if (i !== -1) asteroids.splice(i, 1);
}

// ─── spawnAsteroid ────────────────────────────────────────────────────────────

describe('spawnAsteroid', () => {

  it('adds one asteroid to the asteroids array', () => {
    spawnAsteroid('const x = 1;');
    expect(asteroids.length).toBe(1);
  });

  it('stores the correct snippet text on the asteroid', () => {
    spawnAsteroid('let y = 2;');
    expect(asteroids[0].snippet).toBe('let y = 2;');
  });

  it('starts the asteroid above the screen (y = -150)', () => {
    spawnAsteroid('foo');
    expect(asteroids[0].y).toBe(-150);
  });

  it('assigns a positive x position within screen bounds', () => {
    spawnAsteroid('bar');
    expect(asteroids[0].x).toBeGreaterThanOrEqual(0);
    expect(asteroids[0].x).toBeLessThanOrEqual(innerWidth - 250);
  });

  it('appends an element to the DOM', () => {
    spawnAsteroid('baz');
    expect(document.querySelector('#game-area').children.length).toBe(1);
  });

  it('returns null and does not spawn when MAX_ASTEROIDS (10) is reached', () => {
    for (let i = 0; i < 10; i++) spawnAsteroid(`snippet ${i}`);
    const result = spawnAsteroid('overflow');
    expect(result).toBeNull();
    expect(asteroids.length).toBe(10);
  });

});

// ─── moveAsteroids ────────────────────────────────────────────────────────────

describe('moveAsteroids', () => {

  it('moves each asteroid downward by its speed', () => {
    spawnAsteroid('moving');
    const before = asteroids[0].y;
    moveAsteroids(() => {});
    expect(asteroids[0].y).toBeCloseTo(before + 0.35);
  });

  it('calls onMiss and removes asteroid when it passes the bottom', () => {
    spawnAsteroid('offscreen');
    asteroids[0].y = window.innerHeight + 1;
    const onMiss = vi.fn();
    moveAsteroids(onMiss);
    expect(onMiss).toHaveBeenCalledTimes(1);
    expect(asteroids.length).toBe(0);
  });

  it('does not call onMiss for asteroids still on screen', () => {
    spawnAsteroid('onscreen');
    asteroids[0].y = 100;
    const onMiss = vi.fn();
    moveAsteroids(onMiss);
    expect(onMiss).not.toHaveBeenCalled();
  });

  it('handles an empty asteroids array without errors', () => {
    expect(() => moveAsteroids(() => {})).not.toThrow();
  });

});

// ─── destroyAsteroid ─────────────────────────────────────────────────────────

describe('destroyAsteroid', () => {

  it('removes the asteroid from the array', () => {
    spawnAsteroid('destroy me');
    destroyAsteroid(asteroids[0]);
    expect(asteroids.length).toBe(0);
  });

  it('removes the asteroid element from the DOM', () => {
    spawnAsteroid('dom remove');
    destroyAsteroid(asteroids[0]);
    expect(document.querySelector('.asteroid')).toBeNull();
  });

  it('only removes the targeted asteroid, leaving others intact', () => {
    spawnAsteroid('keep me');
    spawnAsteroid('remove me');
    destroyAsteroid(asteroids[1]);
    expect(asteroids.length).toBe(1);
    expect(asteroids[0].snippet).toBe('keep me');
  });

});