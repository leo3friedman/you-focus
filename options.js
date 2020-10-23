let toggleHomepageOptionsButton = document.getElementById(
  "homepageOptionsButton"
);

let homepageVideos = document.getElementById("homepageVideosButton");
let homepageSidebar = document.getElementById("homepageSidebarButton");

function changeHomepageVideos() {
  if (homepage.src.endsWith("HPshowSBshow.png")) {
    console.log(homepage.src);
    homepage.src = "images/HPhidSBshow.png";
  } else {
    homepage.src = "images/HPshowSBshow.png";
  }
}

toggleHomepageOptionsButton.onclick = changeOptions;
