function showDistractions() {
  document.body.classList.remove("yf-hide");
}

function hideDistractions() {
  document.body.classList.add("yf-hide");
}
function disableAutoplay() {
  const autoplayOnButton = document.querySelector(
    "paper-toggle-button[aria-pressed='true']"
  );
  if (autoplayOnButton) {
    autoplayOnButton.click();
  }
}

function showElement(elementSelector, display) {
  let selectedElement = document.querySelector(elementSelector);
  if (selectedElement) {
    selectedElement.style.visibility = "visible";
  }
}
// hideElement("body");
window.onload = function () {
  chrome.storage.sync.get({ isShowing: true }, function (result) {
    if (result.isShowing === false) {
      hideDistractions();
      disableAutoplay();
    }
    // Special case because it was popping up on refresh
    showElement("#guide-content");
    showElement("body", "block");
  });
};
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.isShowing.newValue === false) {
    hideDistractions();
    disableAutoplay();
  } else {
    showDistractions();
  }
});
