let adShowing;
chrome.storage.sync.get({ adShowing: true }, function (result) {
  adShowing = result.adShowing;
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.adShowing !== undefined) {
    adShowing = changes.adShowing.newValue;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: !adShowing };
  },
  {
    urls: [
      "*://*.doubleclick.net/*",
      "*://*.youtube.com/*pltype=adhost*",
      "*://*/pagead/*",
    ],
  },
  ["blocking"]
);

// "*://*.ytimg.com/*",
// "*://*.youtube.com/api/stats/qoe?*",
// "*://*.youtube.com/get_video_info?*",
