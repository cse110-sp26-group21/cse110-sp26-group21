export function chooseRandomItem(items) {
  if (!items.length) {
    return null;
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
