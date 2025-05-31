const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  hideShorts: true,
  awake: true,
  enableSchedule: false,
  scheduleStart: '09:00',
  scheduleEnd: '17:00',
}

let muteIntervalId // set this when a user tries to visit the /shorts page

window.onload = function () {
  localStorage.setItem('lastEvent', Date.now())
  setAwake()
  setVisibilities()
  document.body.addEventListener('mousemove', () => {
    activeEvent()
  })
  document.body.addEventListener('click', () => {
    activeEvent()
  })
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enableSchedule || changes.scheduleStart || changes.scheduleEnd) {
    setAwake()
  } else {
    setVisibilities()
  }
})

function activeEvent() {
  if (Date.now() - localStorage.getItem('lastEvent') > 5000) {
    console.log('active event')
    localStorage.setItem('lastEvent', Date.now())
    setAwake()
  }
}

function inRange(start, end) {
  const startHour = Number(start.split(':')[0])
  const startMin = Number(start.split(':')[1])
  const endHour = Number(end.split(':')[0])
  const endMin = Number(end.split(':')[1])
  const startDate = new Date()
  const endDate = new Date()
  startDate.setHours(startHour, startMin, 0)
  endDate.setHours(endHour, endMin, 59)
  return startDate <= Date.now() && endDate >= Date.now()
}

function isAwake(scheduleStart, scheduleEnd, enableSchedule) {
  return (
    (enableSchedule && inRange(scheduleStart, scheduleEnd)) || !enableSchedule
  )
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
      })
    }
  })
}

function muteAllVideos() {
  const videos = document.querySelectorAll('video')
  videos.forEach((video) => {
    video.muted = true
  })
}

function unmuteAllVideos() {
  const videos = document.querySelectorAll('video')
  videos.forEach((video) => {
    video.muted = false
  })
}

function setVisibilities() {
  chrome.storage.sync.get(defaultSettings, function (result) {
    const hideOptions = [
      'hideMode',
      'hideHomepageVideos',
      'hideHomepageSidebar',
      'hidePlayerRelated',
      'hidePlayerEndwall',
      'hidePlayerComments',
      'hideShorts',
      'awake',
    ]

    hideOptions.forEach((key) => {
      result[key]
        ? document.body.classList.add(key)
        : document.body.classList.remove(key)
    })

    if ((!result.hideShorts || !result.isAwake) && muteIntervalId) {
      clearInterval(muteIntervalId)
      muteIntervalId = null
      unmuteAllVideos()
    }

    if (
      result.hideMode &&
      result.hideShorts &&
      result.awake &&
      window.location.pathname.startsWith('/shorts')
    ) {
      // Recurrently mute all shorts (YouTube periodically un-mutes)
      muteAllVideos()
      muteIntervalId = window.setInterval(muteAllVideos, 100)
    }
  })

  // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
  document.querySelector('body').style.visibility = 'visible'
  document.querySelector('#guide-content').style.visibility = 'visible'
}
