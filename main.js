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

const fakeAd = () => {
  const player = document.body.querySelector('.html5-video-player');
  player.classList.add('ad-interrupting');
  setTimeout(() => player.classList.remove('ad-interrupting'), 10000);
};

const getAdDurationText = () => {
  const adText = document.querySelector('.ytp-ad-simple-ad-badge')?.innerText;
  const duration = document.querySelector(
    '.ytp-ad-duration-remaining'
  )?.innerText;
  return `YouFocus is silencing the ads.\n${adText} ${duration}`;
};

const getPlayerDims = () => {
  const playerDims = player.getBoundingClientRect();
  return {
    width: `${playerDims.width}px`,
    height: `${playerDims.height}px`,
    top: `${playerDims.top}px`,
    left: `${playerDims.left}px`,
  };
};

const onDurationMutation = () => {
  const durationInfo = document.querySelector('.duration-info');
  if (durationInfo) durationInfo.innerText = getAdDurationText();
};

const displayBlocker = () => {
  console.log('building blocker');
  const adBlocker = document.createElement('div');
  const durationInfo = document.createElement('div');

  durationInfo.className = 'duration-info';
  durationInfo.innerText = getAdDurationText();
  const durationStyles = {
    color: 'white',
    fontSize: '14px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  adBlocker.className = 'ad-blocker';
  const playerDims = getPlayerDims();
  const blockerStyles = {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: Number.MAX_SAFE_INTEGER,
    opacity: '0.8',
    pointerEvents: 'none',
    borderRadius: '12px',
  };

  Object.assign(durationInfo.style, durationStyles);
  Object.assign(adBlocker.style, blockerStyles);
  Object.assign(adBlocker.style, playerDims);

  adBlocker.appendChild(durationInfo);
  document.body.appendChild(adBlocker);
};

const removeBlocker = () => {
  const adBlocker = document.querySelector('.ad-blocker');
  if (adBlocker) document.body.removeChild(adBlocker);
};

const updateBlocker = () => {
  console.log('updating blocker');

  const adSkip = document.querySelector('.ytp-ad-skip-button');
  // if (adSkip) adSkip.click();

  const durationInfo = document.querySelector('.duration-info');
  if (durationInfo) durationInfo.innerText = getAdDurationText();

  const blocker = document.querySelector('.ad-blocker');
  const playerDims = getPlayerDims();
  if (blocker?.style && playerDims) Object.assign(blocker.style, playerDims);

  muteVideo();
};

// Migrate evenutuall
document.addEventListener('DOMContentLoaded', () => {});

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

  let adShowing = false;
  let adInterval;

  const callback = () => {
    const adSkip = document.querySelector('.ytp-ad-skip-button');
    // if (adSkip) adSkip.click();

    // Show our blocker
    if (!adShowing && player.classList.contains('ad-interrupting')) {
      displayBlocker();
      muteVideo();
      adInterval = setInterval(updateBlocker, 100);
      adShowing = true;
    }

    if (adShowing && !player.classList.contains('ad-interrupting')) {
      adShowing = false;
      if (adInterval) clearInterval(adInterval);
      unmuteVideo();
      removeBlocker();
    }

    if (adShowing) {
      const durationInfo = document.querySelector('.duration-info');
      if (durationInfo) durationInfo.innerText = getAdDurationText();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(player, { attributes: true, childList: true });

  const video = document.querySelector('video');

  video.addEventListener('volumechange', () => {
    if (adShowing) muteVideo();
  });

  // fakeAd();
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
