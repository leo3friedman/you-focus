let isShowing = true;

let alterDistractionsButton = document.getElementById("alterDistractions");

function doToggle(isShowing) {
  if (isShowing) {
    alterDistractionsButton.className = "toggle-off";
  } else {
    alterDistractionsButton.className = "toggle-on";
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

window.onload = function () {
  chrome.storage.sync.get({ isShowing: true }, function (result) {
    if (result.isShowing) {
      alterDistractionsButton.className = "toggle-off";
    } else {
      alterDistractionsButton.className = "toggle-on";
    }
  });
};
