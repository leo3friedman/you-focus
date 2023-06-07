const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  awake: true,
  enableSchedule: false,
  scheduleStart: "09:00",
  scheduleEnd: "17:00",
};

window.onload = function () {
  setAwake();
  setVisibilities();
};

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enableSchedule || changes.scheduleStart || changes.scheduleEnd) {
    setAwake();
  } else {
    setVisibilities();
  }
});

function inRange(start, end) {
  const startHour = Number(start.split(":")[0]);
  const startMin = Number(start.split(":")[1]);
  const endHour = Number(end.split(":")[0]);
  const endMin = Number(end.split(":")[1]);
  const startDate = new Date();
  const endDate = new Date();
  startDate.setHours(startHour, startMin, 0);
  endDate.setHours(endHour, endMin, 59);
  return startDate <= Date.now() && endDate >= Date.now();
}

function isAwake(scheduleStart, scheduleEnd, enableSchedule) {
  return (
    (enableSchedule && inRange(scheduleStart, scheduleEnd)) || !enableSchedule
  );
}

function setAwake() {
  chrome.storage.sync.get(defaultSettings, function (result) {
    chrome.storage.sync.set({
      awake: isAwake(
        result.scheduleStart,
        result.scheduleEnd,
        result.enableSchedule
      ),
    });
  });
}

function setVisibilities() {
  chrome.storage.sync.get(defaultSettings, function (result) {
    [
      "hideMode",
      "hideHomepageVideos",
      "hideHomepageSidebar",
      "hidePlayerRelated",
      "hidePlayerEndwall",
      "hidePlayerComments",
      "awake",
    ].forEach((key) => {
      result[key]
        ? document.body.classList.add(key)
        : document.body.classList.remove(key);
    });
    // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
    document.querySelector("body").style.visibility = "visible";
    document.querySelector("#guide-content").style.visibility = "visible";
  });
}
