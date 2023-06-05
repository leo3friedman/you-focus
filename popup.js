const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  enableSchedule: false,
  scheduleStart: "09:00",
  scheduleEnd: "17:00",
};

function setPopupState(hideMode) {
  document.getElementById("titleWrap").title = hideMode
    ? ""
    : "Extension disabled";
  document.querySelectorAll(".popup-body-section").forEach((el) => {
    el.style.pointerEvents = hideMode ? "auto" : "none";
    el.style.opacity = hideMode ? "1.0" : "0.4";
  });
}

function handleClick() {
  const id = this.id;
  let button = this;
  chrome.storage.sync.get(defaultSettings, function (result) {
    const newValue = !result[id];
    chrome.storage.sync.set({ [id]: newValue });
    button.className = newValue ? "toggle toggle-on" : "toggle toggle-off";
    if (id === "hideMode") setPopupState(newValue);
    if (id === "enableSchedule") {
      chrome.storage.sync.set({
        awake:
          (result.enableSchedule &&
            result.scheduleStart <= Date.now() &&
            Date.now() <= result.scheduleEnd) ||
          !result.enableSchedule,
      });
    }
  });
}

function handleInputChange(input) {
  chrome.storage.sync.set({ [input.target.id]: input.target.value });
}

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (result) {
    document.querySelectorAll(".toggle").forEach(function (element) {
      element.className = result[element.id]
        ? "toggle toggle-on"
        : "toggle toggle-off";
      element.onclick = handleClick;
    });

    document.querySelectorAll(".schedule-input").forEach(function (input) {
      input.value = result[input.id];
      input.addEventListener("change", handleInputChange);
    });
    setPopupState(result.hideMode);
  });
};
