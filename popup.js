const defaultSettings = {
  hideMode: false,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  isShowing: true,
};

function setPopupState(hideMode){
  document.getElementById("titleWrap").title = hideMode ? "" : "Extension disabled";
  document.querySelector("ol").style.pointerEvents = hideMode ? "auto" : "none";
  document.querySelector("ol").style.opacity = hideMode ? "1.0" : "0.4";
}

function handleClick() {
  const id = this.id;
  let button = this;
  chrome.storage.sync.get(defaultSettings, function (result) {
    const newValue = !result[id];
    chrome.storage.sync.set({[id]: newValue});
    button.className = newValue ? "toggle toggle-on" : "toggle toggle-off";
    if(id === "hideMode") setPopupState(newValue);
  });
}

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (
    result
  ) {
    // alterDistractionsButton.className = result.hideMode ? "toggle toggle-on" : "toggle toggle-off";
    document.querySelectorAll(".toggle").forEach( function (element) {
      element.className = result[element.id] ? "toggle toggle-on" : "toggle toggle-off"
      element.onclick = handleClick;
    })
    setPopupState(result.hideMode)
  });
};
