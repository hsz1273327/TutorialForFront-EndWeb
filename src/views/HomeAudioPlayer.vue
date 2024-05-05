<template>
  <Frame>
    <Page actionBarHidden="true">
      <StackLayout>
        <Button text="Play" @tap="play" />
        <Button text="Pause" @tap="pause" />
        <Button text="Stop" @tap="stop" />
        <Button text="Toggle x2" @tap="toggleRate" />
        <Button text="Skip Backward" @tap="skipToPrevious" />
        <Button text="Skip Forward" @tap="skipToNext" />
        <Button text="Seek Fix" @tap="seekFix" />
        <Button text="1" @tap="doOne"/>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script lang="ts" setup>
import { knownFolders,path } from "@nativescript/core";
import { onMounted, ref } from 'nativescript-vue'
import {
  MediaTrack,
  Playlist,
  TNSAudioPlayer,
  EventData,
  TimeChangedEventData,
  SleepTimerChangedEventData,
  PlayingEventData,
  PausedEventData,
  PlaybackSuspendEventData,
} from '@nota/nativescript-audioplayer';

let localTestDirPath = path.join(knownFolders.currentApp().path, 'assets');

const player: TNSAudioPlayer = new TNSAudioPlayer()
player.setSeekIntervalSeconds(15)
player.on(TNSAudioPlayer.bufferingEvent, (data: EventData) => {
  console.log(`player event: ${data.eventName}`)
})
player.on(TNSAudioPlayer.timeChangedEvent, (args: TimeChangedEventData) => {
  console.log(`timeChangedEvent: (idx=${args.playlistIndex}) ${args.currentTime} / ${args.duration}`)
})
player.on(TNSAudioPlayer.sleepTimerChangedEvent, (args: SleepTimerChangedEventData) => {
  console.log(`sleepTimerChangedEvent: ${args.remaining}`)
})
player.on(TNSAudioPlayer.playingEvent, (args: PlayingEventData) => {
  console.log(`playingEvent: (idx=${args.playlistIndex}) ${args.currentTime} / ${args.duration}`)
})
player.on(TNSAudioPlayer.pausedEvent, (args: PausedEventData) => {
  console.log(`pausedEvent: (idx=${args.playlistIndex}) ${args.currentTime} / ${args.duration}`)
})
player.on(TNSAudioPlayer.stoppedEvent, (data: EventData) => {
  console.log(`player event: ${data.eventName}`)
})
player.on(TNSAudioPlayer.playbackSuspendEvent, (args: PlaybackSuspendEventData) => {
  console.log(`playbackSuspendEvent: ${args.reason}`)
})
player.on(TNSAudioPlayer.waitingForNetworkEvent, (data: EventData) => {
  console.log(`player event: ${data.eventName}`)
})
player.on(TNSAudioPlayer.endOfPlaylistReachedEvent, (data: EventData) => {
  console.log(`player event: ${data.eventName}`)
})
player.on(TNSAudioPlayer.encounteredErrorEvent, (data: EventData) => {
  console.log(`player event: ${data.eventName}`)
})

const rateToggled = ref(false)
const playlistUID = 'UID_12345'
const playlist = new Playlist(
  playlistUID,
  new MediaTrack(
    path.join(knownFolders.currentApp().path, 'assets/huckfinn_01_twain_apc_64kb.mp3'),
    'Mark Twain',
    'Huckleberry Finn',
    'Album 1/4',
    'http://bookcover.nota.dk/714070_w140_h200.jpg',
  ),
  new MediaTrack(
    path.join(knownFolders.currentApp().path, 'assets/huckfinn_02_twain_apc_64kb.mp3'),
    'Mark Twain',
    'Huckleberry Finn',
    'Album 2/4',
    'http://bookcover.nota.dk/714070_w140_h200.jpg',
  ), new MediaTrack(
    path.join(knownFolders.currentApp().path, 'assets/huckfinn_03_twain_apc_64kb.mp3'),
    'Mark Twain',
    'Huckleberry Finn',
    'Album 3/4',
    null,
  ),
  new MediaTrack(
    path.join(knownFolders.currentApp().path, 'assets/huckfinn_04_twain_apc_64kb.mp3'),
    'Mark Twain',
    'Huckleberry Finn',
    'Album 4/4',
    'http://bookcover.nota.dk/714070_w140_h200.jpg',
  )
)
async function play() {
  console.log('play');
  if (!player.playlist) {
    await loadAndSetupPlaylist();
  }
  try {
    await player.play();
  } catch (error) {
    console.log(`play get error ${error}`)
  }
  
}

function pause() {
  console.log('pause');
  player.pause();
}

function stop() {
  console.log('stop');
  player.stop();
}

function toggleRate() {
  const newRate = rateToggled.value ? 1 : 2;
  console.log(`setRate to ${newRate}`);
  player.setRate(newRate);
  rateToggled.value = !rateToggled.value;
}

function seekSpecific() {
  console.log('Seeking to index 2 @ 15 secs');
  player.skipToPlaylistIndexAndOffset(2, 15000);
}


function skipToPrevious() {
  player.skipToPrevious();
  // let seekTo = this.player.getCurrentTime() - 15000;
  // console.log('demo - seekTo '+ seekTo);
  // this.player.seekTo(Math.max(seekTo, 0));
}

function skipToNext() {
  player.skipToNext();
  // let seekTo = this.player.getCurrentTime() + 15000;
  // console.log('demo - seekTo '+ seekTo);
  // this.player.seekTo(Math.min(seekTo, this.player.getDuration()));
}

function sleep() {
  player.setSleepTimer(5000);
}

function cancelSleep() {
  player.cancelSleepTimer();
}

function reload() {
  player.setSeekIntervalSeconds(60);
}
function logDuration() {
  console.log(`duration: ${player.getDuration()}`);
}

function doOne() {
  try {
    const playlist = new Playlist(
    '1',
      new MediaTrack(path.join(knownFolders.currentApp().path, 'assets/蔡志展-战斗音乐.mp3'), 'CoffeeSteam', 'SoundSnap.com', 'Short Test', null),
    );
    player.loadPlaylist(playlist, 0, 10000);
  } catch (error) {
    console.log(`doOne get error ${error}`)
  }

}

function seekFix() {
  console.log('demo - skipToPlaylistIndexAndOffset 2:100000');
  player.skipToPlaylistIndexAndOffset(2, 100000);
  // console.log('sleep in 5 sec!');
  // this.player.setSleepTimer(5000);
  // console.log(`Player position: ${this.player.getCurrentPlaylistIndex()}@${this.player.getCurrentTime()} / ${this.player.getDuration()}`);
}
async function loadAndSetupPlaylist() {
  if (player.getCurrentPlaylistUID() === playlistUID) {
    console.log(`Player already has playlist: ${player.getCurrentPlaylistUID()}`);
    return;
  }
  await player.loadPlaylist(playlist, 0, 1000)
  console.log(`Player load playlist: ${player.getCurrentPlaylistUID()}`);
}

onMounted(async () => {
  await loadAndSetupPlaylist()
})

</script>
