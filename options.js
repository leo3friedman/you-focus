let toggleHomepageOptionsButton = document.getElementById(
  "homepageOptionsButton"
);

let homepage = document.getElementById("homepageImage");

function changeOptions() {
  if (homepage.src.endsWith("HPshowSBshow.png")) {
    console.log(homepage.src);
    homepage.src = "images/HPhidSBshow.png";
  } else {
    homepage.src = "images/HPshowSBshow.png";
  }
}

toggleHomepageOptionsButton.onclick = changeOptions;
