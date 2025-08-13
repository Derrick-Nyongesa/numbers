document.addEventListener("DOMContentLoaded", () => {
  const factDisplay = document.getElementById("fact-display");
  const reloadBtn = document.getElementById("reload-btn");

  const number = localStorage.getItem("number");
  const fact = localStorage.getItem("fact");

  if (!number || !fact) {
    factDisplay.textContent = "No trivia found. Please go back and try again.";
    return;
  }

  // Display initial fact
  factDisplay.innerHTML = `<span class="color-yellow">${number}</span> ${fact
    .replace(number, "")
    .trim()}`;

  // Reload button logic
  reloadBtn.addEventListener("click", () => {
    fetch(`http://numbersapi.com/${number}/trivia`)
      .then((res) => res.text())
      .then((newFact) => {
        localStorage.setItem("fact", newFact);
        factDisplay.innerHTML = `<span class="color-yellow">${number}</span> ${newFact
          .replace(number, "")
          .trim()}`;
      })
      .catch((err) => {
        alert("Failed to reload trivia.");
        console.error(err);
      });
  });
});
