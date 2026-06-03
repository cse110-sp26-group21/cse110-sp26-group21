import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const setCurrentDifficultyMock = vi.fn();
const loadSnippetsMock = vi.fn().mockResolvedValue();
const startGameMock = vi.fn();

vi.mock("./snippets.js", () => ({
  loadSnippets: loadSnippetsMock,
  setCurrentDifficulty: setCurrentDifficultyMock
}));

vi.mock("./game.js", () => ({
  startGame: startGameMock
}));

function renderApp() {
  document.body.innerHTML = `
    <section id="home-screen" class="screen">
      <div class="home-content">
        <select id="language-select">
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <div class="difficulty-selector">
          <label class="difficulty-label" for="difficulty-slider">
            Difficulty:
            <span id="difficulty-value">Easy</span>
          </label>
          <div class="difficulty-scale" aria-hidden="true">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
          <input
            type="range"
            id="difficulty-slider"
            min="0"
            max="2"
            step="1"
            value="0"
            aria-label="Difficulty slider"
          />
        </div>
        <button id="start-btn">Start Game</button>
      </div>
    </section>
    <section id="game-screen" class="screen hidden"></section>
    <section id="results-screen" class="screen hidden"></section>
    <span id="score"></span>
    <span id="streak"></span>
    <span id="final-score"></span>
    <span id="destroyed-count"></span>
    <span id="longest-streak"></span>
    <div id="game-area"></div>
    <input id="typing-input" />
    <button id="play-again-btn">Play Again</button>
  `;
}

describe("main home screen difficulty selector", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    renderApp();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("updates the difficulty label as the slider moves", async () => {
    await import("../scripts/main.js");

    const slider = document.querySelector("#difficulty-slider");
    const difficultyValue = document.querySelector("#difficulty-value");

    slider.value = "1";
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    expect(difficultyValue.textContent).toBe("Medium");

    slider.value = "2";
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    expect(difficultyValue.textContent).toBe("Hard");
  });

  test("sets difficulty before loading snippets when the game starts", async () => {
    await import("../scripts/main.js");

    const slider = document.querySelector("#difficulty-slider");
    const languageSelect = document.querySelector("#language-select");
    const startButton = document.querySelector("#start-btn");

    slider.value = "2";
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    languageSelect.value = "css";

    startButton.click();

    await Promise.resolve();

    expect(setCurrentDifficultyMock).toHaveBeenCalledWith("hard");
    expect(loadSnippetsMock).toHaveBeenCalledWith("css");
    expect(startGameMock).toHaveBeenCalled();
  });
});
