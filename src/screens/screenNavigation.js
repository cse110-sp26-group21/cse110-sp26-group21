const SCREEN_IDS = {
  home: "home-screen",
  play: "play-screen",
  gameOver: "game-over-screen"
};

let currentScreen = "home";

export function showScreen(screenName, doc = document) {
  currentScreen = screenName;
  Object.entries(SCREEN_IDS).forEach(([name, elementId]) => {
    const element = doc.getElementById(elementId);
    if (!element) {
      return;
    }
    element.classList.toggle("screen-active", name === screenName);
  });
}

export function showHomeScreen(doc = document) {
  showScreen("home", doc);
}

export function showPlayScreen(doc = document) {
  showScreen("play", doc);
}

export function showGameOverScreen(doc = document) {
  showScreen("gameOver", doc);
}

export function getCurrentScreen() {
  return currentScreen;
}
