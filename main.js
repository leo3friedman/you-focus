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
/**
 * Hides/shows certain elements on the page by adding/removing classes to the page. Refer to hide.css to see what added
 * classes hide what elements.
 * @param    {String} change        Class to add/remove to page
 * @param    {Boolean} newValue     True to add class, false to remove
 */
function alterVisibility(change, newValue) {
  newValue
    ? document.body.classList.add(change)
    : document.body.classList.remove(change);
}

window.onload = function () {
  chrome.storage.sync.get(defaultSettings, function (result) {
    Object.entries(result).forEach((el) => {
      key = el[0];
      value = el[1];
      if (
        key !== "enableSchedule" &&
        key !== "scheduleStart" &&
        key !== "scheduleEnd"
      )
        alterVisibility(key, value);
    });
    // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
    document.querySelector("body").style.visibility = "visible";
    document.querySelector("#guide-content").style.visibility = "visible";
  });
};

chrome.storage.onChanged.addListener(function (changes, areaName) {
  const change = Object.keys(changes)[0];
  const newValue = changes[change].newValue;
  if (changes.enableSchedule || changes.scheduleStart || changes.scheduleEnd) {
    chrome.storage.sync.get(defaultSettings, function (result) {
      chrome.storage.sync.set({
        awake:
          (result.enableSchedule &&
            inRange(result.scheduleStart, result.scheduleEnd)) ||
          !result.enableSchedule,
      });
    });
  } else {
    console.log("change vis: " + change);
    alterVisibility(change, newValue);
  }

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
});
