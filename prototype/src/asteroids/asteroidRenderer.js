export function createAsteroidSprite(scene, asteroidData) {
  return scene.add.ellipse(0, 0, asteroidData.width, asteroidData.height, 0x5d4a7c, 0.95)
    .setStrokeStyle(3, 0xb6c7ff, 0.8);
}

export function createAsteroidText(scene, asteroidData) {
  const fullCodeText = scene.add.text(
    0,
    -18,
    asteroidData.fullCode,
    {
      fontFamily: "monospace",
      fontSize: "16px",
      align: "center",
      wordWrap: { width: asteroidData.width - 30 }
    }
  ).setOrigin(0.5);

  const targetText = scene.add.text(
    0,
    32,
    `Target: ${asteroidData.targetText}`,
    {
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#8ee0ff",
      backgroundColor: "#1f144b",
      padding: { x: 8, y: 4 }
    }
  ).setOrigin(0.5);

  return { fullCodeText, targetText };
}

export function renderAsteroid(scene, asteroidData) {
  const body = createAsteroidSprite(scene, asteroidData);
  const textObjects = createAsteroidText(scene, asteroidData);
  const container = scene.add.container(asteroidData.x, asteroidData.y, [
    body,
    textObjects.fullCodeText,
    textObjects.targetText
  ]);

  asteroidData.phaserObjects = {
    container,
    body,
    text: textObjects.fullCodeText,
    highlight: textObjects.targetText
  };

  return container;
}

export function syncAsteroidVisuals(asteroidData) {
  if (asteroidData.phaserObjects.container) {
    asteroidData.phaserObjects.container.setPosition(asteroidData.x, asteroidData.y);
  }
}

export function destroyAsteroidVisuals(asteroidData) {
  asteroidData.phaserObjects.container?.destroy(true);
  asteroidData.phaserObjects = {
    container: null,
    body: null,
    text: null,
    highlight: null
  };
}
