function showDistractions() {
  document.body.classList.remove("yf-hide");
}

function hideDistractions() {
  document.body.classList.add("yf-hide");
}
// Work on ad hider
function hideAds() {
  document.body.classList.add("yf-hide-ad");
}
function showAds() {
  document.body.classList.remove("yf-hide-ad");
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
  chrome.storage.sync.get({ isShowing: true, adShowing: true }, function (
    result
  ) {
    if (result.isShowing === false) {
      hideDistractions();
      disableAutoplay();
    }
    if (result.adShowing === false) {
      hideAds();
    }
    // Special case because it was popping up on refresh
    showElement("#guide-content");
    showElement("body", "block");
  });
};
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.isShowing !== undefined) {
    if (changes.isShowing.newValue === false) {
      hideDistractions();
      disableAutoplay();
    } else {
      showDistractions();
    }
  }
  if (changes.adShowing !== undefined) {
    if (changes.adShowing.newValue === false) {
      hideAds();
    } else {
      showAds();
    }
  }
});

// functions for options

function showHomepageVideos() {
  document.body.classList.remove("yf-hide");
}
function hideHomepageVideos() {
  document.body.classList.add("yf-hide");
}
function showHomepageSidebar() {
  document.body.classList.remove("yf-hide");
}
function hideHomepageSidebar() {
  document.body.classList.add("yf-hide");
}
function showPlayerEndwall() {
  document.body.classList.remove("yf-hide");
}
function hidePlayerEndwall() {
  document.body.classList.add("yf-hide");
}
function showPlayerRightVideos() {
  document.body.classList.remove("yf-hide");
}
function hidePlayerRightVideos() {
  document.body.classList.add("yf-hide");
}
function showPlayerComments() {
  document.body.classList.remove("yf-hide");
}
function hidePlayerComments() {
  document.body.classList.add("yf-hide");
}
function showPlayerLiveChat() {
  document.body.classList.remove("yf-hide");
}
function hidePlayerLiveChat() {
  document.body.classList.add("yf-hide");
}
