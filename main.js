const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
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
      alterVisibility(el[0], el[1]);
    });
    // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
    document.querySelector("body").style.visibility = "visible";
    document.querySelector("#guide-content").style.visibility = "visible";
  });
};

chrome.storage.onChanged.addListener(function (changes, areaName) {
  const change = Object.keys(changes)[0];
  const newValue = changes[change].newValue;
  alterVisibility(change, newValue);
});
