let hideHomepageVideos = true;
let hideHomepageSidebar = true;
let hidePlayerEndwall = true;
let hidePlayerRelated = true;
let hidePlayerComments = false;
let hidePlayerLiveChat = false;

const defaultSettings = {
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerEndwall: true,
  hidePlayerRelated: true,
  hidePlayerComments: false,
  hidePlayerLiveChat: false,
};

function toggleSettings(optionKey) {
  chrome.storage.sync.get(defaultSettings, function (result) {
    chrome.storage.sync.set({
      [optionKey]: !result[optionKey],
    });
  });
}

function updateHomepageOptionsImage() {
  chrome.storage.sync.get(defaultSettings, function (result) {
    if (result.hideHomepageVideos && result.hideHomepageSidebar) {
      homepageOptionsImage.src = "images/HPhidSBhidSML.png";
    } else if (result.hideHomepageVideos && !result.hideHomepageSidebar) {
      homepageOptionsImage.src = "images/HPhidSBshSML.png";
    } else if (!result.hideHomepageVideos && result.hideHomepageSidebar) {
      homepageOptionsImage.src = "images/HPshSBhidSML.png";
    } else if (!result.hideHomepageVideos && !result.hideHomepageSidebar) {
      homepageOptionsImage.src = "images/HPshSBshSML.png";
    }
  });
}

let homepageOptionsImage = document.getElementById("homepageImage");
let homepageVideosButton = document.getElementById("homepageVideos");
let homepageSidebarButton = document.getElementById("homepageSidebar");
let playerEndwallButton = document.getElementById("playerEndwall");
let playerCommentsButton = document.getElementById("playerComments");
let playerRelatedButton = document.getElementById("playerRelated");
let playerLiveChatButton = document.getElementById("playerLiveChat");

homepageVideosButton.onclick = function () {
  toggleSettings("hideHomepageVideos"), toggleHomepageOptionsImage();
};
homepageSidebarButton.onclick = function () {
  toggleSettings("hideHomepageSidebar"), toggleHomepageOptionsImage();
};
playerEndwallButton.onclick = () => toggleSettings("hidePlayerEndwall");
playerCommentsButton.onclick = () => toggleSettings("hidePlayerRelated");
playerRelatedButton.onclick = () => toggleSettings("hidePlayerComments");
playerLiveChatButton.onclick = () => toggleSettings("hidePlayerLiveChat");
//function(){} is the same as () =>

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (result) {
    homepageVideosButton.checked = result.hideHomepageVideos;
    homepageSidebarButton.checked = result.hideHomepageSidebar;
    playerEndwallButton.checked = result.hidePlayerEndwall;
    playerCommentsButton.checked = result.hidePlayerRelated;
    playerRelatedButton.checked = result.hidePlayerComments;
    playerLiveChatButton.checked = result.hidePlayerLiveChat;
    updateHomepageOptionsImage();
  });
};

// hide-homepage-videos
// hide-homepage-sidebar
// hide-player-endwall
// hide-player-comments
// hide-player-live-chat
// hide-player-related
