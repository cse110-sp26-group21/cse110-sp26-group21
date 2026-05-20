import { beforeEach, describe, expect, test } from "vitest";
import { getCurrentScreen, showGameOverScreen, showHomeScreen, showPlayScreen } from "../src/screens/screenNavigation.js";

function setupDom() {
  document.body.innerHTML = `
    <section id="home-screen" class="screen"></section>
    <section id="play-screen" class="screen"></section>
    <section id="game-over-screen" class="screen"></section>
  `;
}

describe("screenNavigation", () => {
  beforeEach(() => {
    setupDom();
  });

  test("showHomeScreen makes only the home screen active", () => {
    showHomeScreen();
    expect(document.getElementById("home-screen").classList.contains("screen-active")).toBe(true);
    expect(document.getElementById("play-screen").classList.contains("screen-active")).toBe(false);
  });

  test("showPlayScreen makes only the play screen active", () => {
    showPlayScreen();
    expect(document.getElementById("play-screen").classList.contains("screen-active")).toBe(true);
    expect(document.getElementById("home-screen").classList.contains("screen-active")).toBe(false);
  });

  test("showGameOverScreen makes only the game over screen active", () => {
    showGameOverScreen();
    expect(document.getElementById("game-over-screen").classList.contains("screen-active")).toBe(true);
    expect(document.getElementById("home-screen").classList.contains("screen-active")).toBe(false);
  });

  test("getCurrentScreen returns the expected screen name", () => {
    showPlayScreen();
    expect(getCurrentScreen()).toBe("play");
  });
});
