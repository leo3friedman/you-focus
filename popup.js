let alterDistractionsButton = document.getElementById("hideMode");

const defaultSettings = {
  hideMode: false,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  isShowing: true,
};

function handleClick(event) {
  const id = this.id;
  let button = this;
  chrome.storage.sync.get(defaultSettings, function (result) {
    const newValue = !result[id];
    chrome.storage.sync.set({[id]: newValue});
    button.className = newValue ? "toggle toggle-on" : "toggle toggle-off";
    // doToggle(newValue);
  });
}

// alterDistractionsButton.onclick = handleClick;


// Working on options page
let openOptionsPageButton = document.getElementById("openOptionsPage");

function openOptionPageOnClick(event) {
  chrome.tabs.create({
    url: "options.html",
  });
}
openOptionsPageButton.onclick = openOptionPageOnClick;

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (
    result
  ) {
    // alterDistractionsButton.className = result.hideMode ? "toggle toggle-on" : "toggle toggle-off";
    document.querySelectorAll(".toggle").forEach( function (element) {
      element.className = result[element.id] ? "toggle toggle-on" : "toggle toggle-off"
      element.onclick = handleClick;
    })

  });
};
