function showDistractions() {
  document.body.classList.remove("yf-hide");
}

function hideDistractions() {
  document.body.classList.add("yf-hide");
}


function showElement(elementSelector, display) {
  let selectedElement = document.querySelector(elementSelector);
  if (selectedElement) {
    selectedElement.style.visibility = "visible";
  }
}
// hideElement("body");
const defaultSettings = {
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerEndwall: true,
  hidePlayerRelated: true,
  hidePlayerComments: false,
  isShowing: true,
};
window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (result) {
    if (result.isShowing === false) {
      hideDistractions();
    }
    updateHomepageSidebarClass(result.hideHomepageSidebar);
    updateHomepageVideosClass(result.hideHomepageVideos);
    updateVideoplayerRelatedClass(result.hidePlayerRelated);
    updateVideoplayerEndwallClass(result.hidePlayerEndwall);
    updateVideoplayerCommentsClass(result.hidePlayerComments);
    // Special case because it was popping up on refresh
    showElement("#guide-content");
    showElement("body", "block");
  });
};

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.isShowing !== undefined) {
    if (changes.isShowing.newValue === false) {
      hideDistractions();
    } else {
      showDistractions();
    }
  }
});
chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.hideHomepageSidebar) {
    updateHomepageSidebarClass(changes.hideHomepageSidebar.newValue);
  }
  if (changes.hideHomepageVideos) {
    updateHomepageVideosClass(changes.hideHomepageVideos.newValue);
  }
  if (changes.hidePlayerRelated) {
    updateVideoplayerRelatedClass(changes.hidePlayerRelated.newValue);
  }
  if (changes.hidePlayerEndwall) {
    updateVideoplayerEndwallClass(changes.hidePlayerEndwall.newValue);
  }
  if (changes.hidePlayerComments) {
    updateVideoplayerCommentsClass(changes.hidePlayerComments.newValue);
  }
});
function updateHomepageSidebarClass(val) {
  if (val) {
    document.body.classList.add("homepage-sidebar-hide");
  } else {
    document.body.classList.remove("homepage-sidebar-hide");
  }
}
function updateHomepageVideosClass(val) {
  if (val) {
    document.body.classList.add("homepage-videos-hide");
  } else {
    document.body.classList.remove("homepage-videos-hide");
  }
}
function updateVideoplayerRelatedClass(val) {
  if (val) {
    document.body.classList.add("videoplayer-related-hide");
  } else {
    document.body.classList.remove("videoplayer-related-hide");
  }
}
function updateVideoplayerEndwallClass(val) {
  if (val) {
    document.body.classList.add("videoplayer-endwall-hide");
  } else {
    document.body.classList.remove("videoplayer-endwall-hide");
  }
}
function updateVideoplayerCommentsClass(val) {
  if (val) {
    document.body.classList.add("videoplayer-comments-hide");
  } else {
    document.body.classList.remove("videoplayer-comments-hide");
  }
}
