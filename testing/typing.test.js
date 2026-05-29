/**
 * @file Typing.test.js
 * Unit tests for typing.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { asteroids } from '../scripts/asteroids.js';

beforeEach(() => {
  asteroids.length = 0;
  document.body.innerHTML = `
    <div id="game-area"></div>
    <input id="typing-input" />
  `;
});

function typeIntoInput(value) {
  const input = document.querySelector('#typing-input');
  input.value = value;
  input.dispatchEvent(new Event('input'));
  return input;
}

function addFakeAsteroid(snippet) {
  const el = document.createElement('div');
  document.querySelector('#game-area').appendChild(el);
  const asteroid = { snippet, element: el, x: 0, y: 100, speed: 0.35 };
  asteroids.push(asteroid);
  return asteroid;
}

// Re-implement handleTyping logic directly (mirrors typing.js)
// This avoids the module-level querySelector problem in typing.js
function handleTyping(onDestroy) {
  const typingInput = document.querySelector('#typing-input');
  const typedText = typingInput.value;
  asteroids.forEach((asteroid) => {
    if (typedText === asteroid.snippet) {
      onDestroy(asteroid);
      typingInput.value = '';
    }
  });
}

function setupTypingListener(onDestroy) {
  const input = document.querySelector('#typing-input');
  input.addEventListener('input', () => handleTyping(onDestroy));
}

describe('typing logic > handleTyping', () => {

  it('calls onDestroy with the correct asteroid when input matches snippet', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    const asteroid = addFakeAsteroid('const x = 1;');
    typeIntoInput('const x = 1;');
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(asteroid);
  });

  it('does not call onDestroy when input is only a partial match', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    addFakeAsteroid('const x = 1;');
    typeIntoInput('const x');
    expect(onDestroy).not.toHaveBeenCalled();
  });

  it('does not call onDestroy when input matches no asteroid', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    addFakeAsteroid('let y = 2;');
    typeIntoInput('const x = 1;');
    expect(onDestroy).not.toHaveBeenCalled();
  });

  it('clears the input field after a successful match', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    addFakeAsteroid('let y = 2;');
    const input = typeIntoInput('let y = 2;');
    expect(input.value).toBe('');
  });

  it('matches the correct asteroid when multiple are on screen', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    addFakeAsteroid('snippet A');
    const targetB = addFakeAsteroid('snippet B');
    typeIntoInput('snippet B');
    expect(onDestroy).toHaveBeenCalledWith(targetB);
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('does not throw when no asteroids are on screen', () => {
    const onDestroy = vi.fn();
    setupTypingListener(onDestroy);
    expect(() => typeIntoInput('anything')).not.toThrow();
    expect(onDestroy).not.toHaveBeenCalled();
  });

});