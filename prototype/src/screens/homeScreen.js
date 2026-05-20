export function initializeHomeScreen(config, onStart, doc = document) {
  const select = doc.getElementById("language-select");
  const startButton = doc.getElementById("start-button");

  select.innerHTML = "";
  config.languages.forEach((language) => {
    const option = doc.createElement("option");
    option.value = language;
    option.textContent = language;
    select.append(option);
  });

  startButton.addEventListener("click", () => {
    onStart(select.value);
  });
}
