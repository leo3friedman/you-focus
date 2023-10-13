const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  awake: true,
  enableSchedule: false,
  scheduleStart: '09:00',
  scheduleEnd: '17:00',
};

const muteVideo = () => {
  const video = document.querySelector('video');
  if (video) video.muted = true;
};

const unmuteVideo = () => {
  const video = document.querySelector('video');
  if (video) video.muted = false;
};

const displayBlocker = () => {
  const adBlocker = document.createElement('div');
  adBlocker.className = 'ad-blocker';

  playerDims = player.getBoundingClientRect();

  const blockerStyles = {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: Number.MAX_SAFE_INTEGER,
    width: `${playerDims.width}px`,
    height: `${playerDims.height}px`,
    top: `${playerDims.top}px`,
    left: `${playerDims.left}px`,
    opacity: '0.5',
    pointerEvents: 'none',
    borderRadius: '12px',
  };

  Object.assign(adBlocker.style, blockerStyles);

  document.body.appendChild(adBlocker);
};

const removeBlocker = () => {
  const adBlocker = document.querySelector('.ad-blocker');
  if (adBlocker) document.body.removeChild(adBlocker);
};

window.onload = function () {
  localStorage.setItem('lastEvent', Date.now());
  setAwake();
  setVisibilities();
  document.body.addEventListener('mousemove', () => {
    activeEvent();
  });
  document.body.addEventListener('click', () => {
    activeEvent();
  });

  // ad handling
  const player = document.body.querySelector('.html5-video-player');
  let muter;

  const callback = () => {
    const adSkip = document.querySelector('.ytp-ad-skip-button');
    if (adSkip) adSkip.click();

    if (!muter && player.classList.contains('ad-interrupting')) {
      displayBlocker();
      muter = setInterval(muteVideo, 100);
    }

    if (muter && !player.classList.contains('ad-interrupting')) {
      clearInterval(muter);
      muter = null;
      unmuteVideo();
      removeBlocker();
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(player, { attributes: true, childList: true });
};

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enableSchedule || changes.scheduleStart || changes.scheduleEnd) {
    setAwake();
  } else {
    setVisibilities();
  }
});

function activeEvent() {
  if (Date.now() - localStorage.getItem('lastEvent') > 5000) {
    console.log('active event');
    localStorage.setItem('lastEvent', Date.now());
    setAwake();
  }
}

function inRange(start, end) {
  const startHour = Number(start.split(':')[0]);
  const startMin = Number(start.split(':')[1]);
  const endHour = Number(end.split(':')[0]);
  const endMin = Number(end.split(':')[1]);
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
    if (
      result.awake !==
      isAwake(result.scheduleStart, result.scheduleEnd, result.enableSchedule)
    ) {
      chrome.storage.sync.set({
        awake: isAwake(
          result.scheduleStart,
          result.scheduleEnd,
          result.enableSchedule
        ),
      });
    }
  });
}

function setVisibilities() {
  chrome.storage.sync.get(defaultSettings, function (result) {
    [
      'hideMode',
      'hideHomepageVideos',
      'hideHomepageSidebar',
      'hidePlayerRelated',
      'hidePlayerEndwall',
      'hidePlayerComments',
      'awake',
    ].forEach((key) => {
      result[key]
        ? document.body.classList.add(key)
        : document.body.classList.remove(key);
    });
    // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
    document.querySelector('body').style.visibility = 'visible';
    document.querySelector('#guide-content').style.visibility = 'visible';
  });
}
