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
      document.getElementById("setScheduleWrapper").style.display = newValue
        ? "block"
        : "none";
    }
  });
}

function handleInputChange(input) {
  startInput = document.getElementById("scheduleStart");
  endInput = document.getElementById("scheduleEnd");
  if (input.target.id === "scheduleStart") {
    endInput.value =
      input.target.value >= endInput.value
        ? input.target.value
        : endInput.value;
  }
  if (input.target.id === "scheduleEnd") {
    startInput.value =
      startInput.value >= input.target.value
        ? input.target.value
        : startInput.value;
  }

  startInput.value =
    endInput.value <= startInput.value ? endInput.value : startInput.value;
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
    document.getElementById("setScheduleWrapper").style.display =
      result.enableSchedule ? "block" : "none";

    document.querySelectorAll(".schedule-input").forEach(function (input) {
      input.value = result[input.id];
      input.addEventListener("change", handleInputChange);
    });
    setPopupState(result.hideMode);
  });
};
