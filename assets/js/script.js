document.addEventListener("DOMContentLoaded", function () {
  const contents = document.querySelectorAll(".item");
  const loadMoreButton = document.getElementById("loadMore");
  let currentIndex = 4;

  contents.forEach((content, index) => {
    if (index < currentIndex) content.classList.add("visible");
    else content.classList.add("hidden");
  });

  loadMoreButton.addEventListener("click", function (e) {
    e.preventDefault();

    for (let i = currentIndex; i < currentIndex + 5 && i < contents.length; i++) {
      contents[i].classList.remove("hidden");
      contents[i].classList.add("visible");
    }
    currentIndex += 5;

    if (currentIndex >= contents.length) {
      loadMoreButton.textContent = "No Content";
      loadMoreButton.classList.add("noContent");
      loadMoreButton.disabled = true;
    }
  });

  document.addEventListener("click", function (event) {
    // Opening a popup when clicking on a card
    if (event.target.closest(".card")) {
      const card = event.target.closest(".card");
      const cardId = card.getAttribute("data-card");
      const popup = document.querySelector(`.popup[data-popup="${cardId}"]`);

      // Close all other popups
      document.querySelectorAll(".popup").forEach((p) => {
        p.classList.remove("active");
        p.style.opacity = "0";
      });

      // Open the clicked popup
      if (!popup.classList.contains("active")) {
        popup.classList.add("active");
        setTimeout(() => (popup.style.opacity = "1"), 0);
      }

      card.classList.add("active");
    }

    // Closing the popup when clicking the close button
    if (event.target.closest(".close-btn")) {
      const button = event.target.closest(".close-btn");
      const popup = document.querySelector(`.popup[data-popup="${button.getAttribute("data-popup")}"]`);
      const card = document.querySelector(`.card[data-card="${button.getAttribute("data-popup")}"]`);

      // Remove active class and reset opacity for the popup
      popup.classList.remove("active");
      popup.style.opacity = "0";

      // Remove active class from the card
      card.classList.remove("active");
    }

    // Copy text to clipboard when copy button is clicked
    if (event.target.classList.contains("copy-button")) {
      const cardId = event.target.getAttribute("data-tooltip").split("-")[1];
      const textToCopy = event.target.textContent;

      copyCode(cardId, textToCopy);
    }
  });
});

function copyCode(cardId, textToCopy) {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const tooltip = document.getElementById(`tooltip-${cardId}`);
      tooltip.style.display = "block";

      // Hide tooltip after a short delay
      setTimeout(() => {
        tooltip.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
