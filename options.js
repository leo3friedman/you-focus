let hideHomepageVideos = true;
let hideHomepageSidebar = true;
let hidePlayerEndwall = true;
let hidePlayerRelated = true;
let hidePlayerComments = false;
let hidePlayerLiveChat = false;

const defaultSettings = {
  hideMode: false,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
};

function toggleSettings(optionKey) {
  chrome.storage.sync.get(defaultSettings, function (result) {
    chrome.storage.sync.set({
      [optionKey]: !result[optionKey],
    });
  });
}

function editHomepage() {
  homepageContainer.style.display = "block";
  videoplayerContainer.style.display = "none";
  helpContainer.style.display = "none";
  editHomepageButton.className = "switch-modes-selected";
  editVideoplayerButton.className = "switch-modes";
  helpButton.className = "switch-modes";
}

function editVideoplayer() {
  homepageContainer.style.display = "none";
  videoplayerContainer.style.display = "block";
  helpContainer.style.display = "none";
  editVideoplayerButton.className = "switch-modes-selected";
  editHomepageButton.className = "switch-modes";
  helpButton.className = "switch-modes";
}
function help() {
  homepageContainer.style.display = "none";
  videoplayerContainer.style.display = "none";
  helpContainer.style.display = "block";
  editVideoplayerButton.className = "switch-modes";
  editHomepageButton.className = "switch-modes";
  helpButton.className = "switch-modes-selected";
}

function updateHomepageSidebarImage(hide) {
  if (hide) {
    homepageSidebarImage.style.visibility = "hidden";
  } else {
    homepageSidebarImage.style.visibility = "visible";
  }
}

function updateHomepageVideosImage(hide) {
  if (hide) {
    homepageVideosImage.style.visibility = "hidden";
  } else {
    homepageVideosImage.style.visibility = "visible";
  }
}

function updateVideoplayerCommentsImage(hide) {
  if (hide) {
    videoplayerCommentsImage.style.visibility = "hidden";
  } else {
    videoplayerCommentsImage.style.visibility = "visible";
  }
}

function updateVideoplayerEndwallImage(hide) {
  if (hide) {
    videoplayerEndwallImage.style.visibility = "hidden";
  } else {
    videoplayerEndwallImage.style.visibility = "visible";
  }
}

function updateVideoplayerRelatedImage(hide) {
  if (hide) {
    videoplayerRelatedImage.style.visibility = "hidden";
  } else {
    videoplayerRelatedImage.style.visibility = "visible";
  }
}
let refreshButton = document.getElementById("refresh");
let helpContainer = document.getElementById("helpSettings");
let helpButton = document.getElementById("help");
let editVideoplayerButton = document.getElementById("editVideoplayer");
let editHomepageButton = document.getElementById("editHomepage");
let videoplayerContainer = document.getElementById("videoplayerSettings");
let homepageContainer = document.getElementById("homepageSettings");
let homepageVideosImage = document.getElementById("homepageVideos");
let homepageSidebarImage = document.getElementById("homepageSidebar");
let videoplayerCommentsImage = document.getElementById("videoplayerComments");
let videoplayerRelatedImage = document.getElementById("videoplayerRelated");
let videoplayerEndwallImage = document.getElementById("videoplayerEndwall");
let homepageVideosButton = document.getElementById("homepageVideosCheckbox");
let homepageSidebarButton = document.getElementById("homepageSidebarCheckbox");
let playerEndwallButton = document.getElementById("playerEndwallCheckbox");
let playerCommentsButton = document.getElementById("playerCommentsCheckbox");
let playerRelatedButton = document.getElementById("playerRelatedCheckbox");

homepageVideosButton.onclick = () => toggleSettings("hideHomepageVideos");
homepageSidebarButton.onclick = () => toggleSettings("hideHomepageSidebar");
playerEndwallButton.onclick = () => toggleSettings("hidePlayerEndwall");
playerCommentsButton.onclick = () => toggleSettings("hidePlayerComments");
playerRelatedButton.onclick = () => toggleSettings("hidePlayerRelated");
editVideoplayerButton.onclick = () => editVideoplayer();
editHomepageButton.onclick = () => editHomepage();
helpButton.onclick = () => help();
refreshButton.onclick = () => resetSettings();

//function(){} is the same as () =>

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (result) {
    homepageVideosButton.checked = result.hideHomepageVideos;
    homepageSidebarButton.checked = result.hideHomepageSidebar;
    playerEndwallButton.checked = result.hidePlayerEndwall;
    playerCommentsButton.checked = result.hidePlayerComments;
    playerRelatedButton.checked = result.hidePlayerRelated;
    updateHomepageSidebarImage(result.hideHomepageSidebar);
    updateHomepageVideosImage(result.hideHomepageVideos);
    updateVideoplayerRelatedImage(result.hidePlayerRelated);
    updateVideoplayerEndwallImage(result.hidePlayerEndwall);
    updateVideoplayerCommentsImage(result.hidePlayerComments);
    editHomepage();
  });
};

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.hideHomepageSidebar) {
    updateHomepageSidebarImage(changes.hideHomepageSidebar.newValue);
    homepageSidebarButton.checked = changes.hideHomepageSidebar.newValue;
  }
  if (changes.hideHomepageVideos) {
    updateHomepageVideosImage(changes.hideHomepageVideos.newValue);
    homepageVideosButton.checked = changes.hideHomepageVideos.newValue;
  }
  if (changes.hidePlayerRelated) {
    updateVideoplayerRelatedImage(changes.hidePlayerRelated.newValue);
    playerRelatedButton.checked = changes.hidePlayerRelated.newValue;
  }
  if (changes.hidePlayerEndwall) {
    updateVideoplayerEndwallImage(changes.hidePlayerEndwall.newValue);
    playerEndwallButton.checked = changes.hidePlayerEndwall.newValue;
  }
  if (changes.hidePlayerComments) {
    updateVideoplayerCommentsImage(changes.hidePlayerComments.newValue);
    playerCommentsButton.checked = changes.hidePlayerComments.newValue;
  }
});

document
  .querySelector(".hide-videoplayer-endwall")
  .addEventListener("mouseenter", () => {
    document.querySelector(".videoplayer-videos-highlight").style.display =
      "block";
  });
document
  .querySelector(".hide-videoplayer-endwall")
  .addEventListener("mouseleave", () => {
    document.querySelector(".videoplayer-videos-highlight").style.display =
      "none";
  });
document
  .querySelector(".hide-videoplayer-comments")
  .addEventListener("mouseenter", () => {
    document.querySelector(".videoplayer-comments-highlight").style.display =
      "block";
  });
document
  .querySelector(".hide-videoplayer-comments")
  .addEventListener("mouseleave", () => {
    document.querySelector(".videoplayer-comments-highlight").style.display =
      "none";
  });
document
  .querySelector(".hide-videoplayer-related")
  .addEventListener("mouseenter", () => {
    document.querySelector(".videoplayer-related-highlight").style.display =
      "block";
  });
document
  .querySelector(".hide-videoplayer-related")
  .addEventListener("mouseleave", () => {
    document.querySelector(".videoplayer-related-highlight").style.display =
      "none";
  });
document
  .querySelector(".hide-homepage-videos")
  .addEventListener("mouseenter", () => {
    document.querySelector(".homepage-videos-highlight").style.display =
      "block";
  });
document
  .querySelector(".hide-homepage-videos")
  .addEventListener("mouseleave", () => {
    document.querySelector(".homepage-videos-highlight").style.display = "none";
  });
document
  .querySelector(".hide-homepage-sidebar")
  .addEventListener("mouseenter", () => {
    document.querySelector(".homepage-sidebar-highlight").style.display =
      "block";
  });
document
  .querySelector(".hide-homepage-sidebar")
  .addEventListener("mouseleave", () => {
    document.querySelector(".homepage-sidebar-highlight").style.display =
      "none";
  });
function resetSettings() {
  chrome.storage.sync.set(defaultSettings, () => window.location.reload());
}
