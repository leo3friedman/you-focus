let isShowing = true;

let alterDistractionsButton = document.getElementById("alterDistractions");

function doToggle(isShowing) {
  if (isShowing) {
    alterDistractionsButton.className = "toggle toggle-off";
  } else {
    alterDistractionsButton.className = "toggle toggle-on";
  }
}

function handleClick(event) {
  chrome.storage.sync.get({ isShowing: true }, function (result) {
    let isShowing = result.isShowing;
    isShowing = !isShowing;
    chrome.storage.sync.set({ isShowing: isShowing });
    doToggle(isShowing);
  });
}

alterDistractionsButton.onclick = handleClick;

// Working on options page

let openOptionsPageButton = document.getElementById("openOptionsPage");

function openOptionPageOnClick(event) {
  chrome.tabs.create({
    url: "chrome-extension://kdnhalmldomdjpafllbpkanfiihlaclb/options.html",
  });
}

openOptionsPageButton.onclick = openOptionPageOnClick;

// Working on the ad hiding button
let adShowing = true;

let alterAdsButton = document.getElementById("alterAds");

function doAdToggle(adShowing) {
  if (adShowing) {
    alterAdsButton.className = "toggle toggle-off";
  } else {
    alterAdsButton.className = "toggle toggle-on";
  }
}

function handleAdClick(event) {
  chrome.storage.sync.get({ adShowing: true }, function (result) {
    let adShowing = result.adShowing;
    adShowing = !adShowing;
    chrome.storage.sync.set({ adShowing: adShowing });
    doAdToggle(adShowing);
  });
}

alterAdsButton.onclick = handleAdClick;

window.onload = function () {
  chrome.storage.sync.get({ isShowing: true, adShowing: true }, function (
    result
  ) {
    if (result.isShowing) {
      alterDistractionsButton.className = "toggle toggle-off";
    } else {
      alterDistractionsButton.className = "toggle toggle-on";
    }

    // For ad Hiding
    if (result.adShowing) {
      alterAdsButton.className = "toggle toggle-off";
    } else {
      alterAdsButton.className = "toggle toggle-on";
    }
  });
};

// something new
