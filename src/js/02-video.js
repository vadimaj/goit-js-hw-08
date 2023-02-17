import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';
playingTimeRestore();

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(e) {
  localStorage.setItem(CURRENT_TIME_KEY, e.seconds);
}

function playingTimeRestore() {
  const savedTime = localStorage.getItem(CURRENT_TIME_KEY);
  if (savedTime) {
    player.setCurrentTime(+savedTime);
  }
}
