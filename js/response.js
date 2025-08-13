document.addEventListener("DOMContentLoaded", () => {
  const factDisplay = document.getElementById("fact-display");
  const reloadBtn = document.getElementById("reload-btn");

  const number = localStorage.getItem("number");
  let fact = localStorage.getItem("fact");

  if (!number || !fact) {
    factDisplay.textContent = "No trivia found. Please go back and try again.";
    return;
  }

  // Display initial fact
  factDisplay.innerHTML = `<span class="color-yellow">${number}</span> ${fact
    .replace(number, "")
    .trim()}`;

  reloadBtn.addEventListener("click", (e) => {
    e.preventDefault(); // just in case

    const apiURL = `http://numbersapi.com/${number}/trivia`;
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      apiURL
    )}`;

    fetch(proxy)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok.");
        return res.text();
      })
      .then((newFact) => {
        newFact = newFact.trim();
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
