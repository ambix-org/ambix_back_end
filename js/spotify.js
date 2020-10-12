'use strict';

let spotifyPlayer;

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQAnsiyAPRij6q4we5143h0YDCPwpUMBk0ywUH06EOsdc11Wvq0nAVeZfv7lDyIsuV39L1nAh6BtArmIQWyLkXrG4bZekdQDVcEMh5qKIANRxBGsFZt2wpzXQ2YQ29UD5DMtnVFADaB1U6tMq_CREBVEqn58iz8vLyPhl2-mOmK2DW_0oT0LMek';
  spotifyPlayer = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
  spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
  spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
  spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  spotifyPlayer.addListener('player_state_changed', state => {
    console.log('State Change: ', state);
    spotifyPlayer.getVolume()
      .then(currentLevel => {
        volumeRangeSpotify.value = currentLevel * 100;
      });
  });

  // Ready
  spotifyPlayer.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  spotifyPlayer.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  spotifyPlayer.connect();
};


const playSpotifyButton = document.getElementById('play');
playSpotifyButton.addEventListener('click', () => {
  spotifyPlayer.resume().then(() => {
    console.log('Resumed!');
  });
});

const pauseSpotifyButton = document.getElementById('pause');
pauseSpotifyButton.addEventListener('click', () => {
  spotifyPlayer.pause().then(() => {
    console.log('Paused!');
  });
});

const nextSpotifyButton = document.getElementById('next');
nextSpotifyButton.addEventListener('click', () => {
  spotifyPlayer.nextTrack().then(() => {
    console.log('Skipped to next track!');
  });
});

const previousSpotifyButton = document.getElementById('previous');
previousSpotifyButton.addEventListener('click', () => {
  spotifyPlayer.previousTrack().then(() => {
    console.log('Set to previous track!');
  });
});

const volumeDownSpotify = document.getElementById('volume-down-spotify');
volumeDownSpotify.addEventListener('click', () => {
  spotifyPlayer.getVolume()
    .then(currentLevel => {
      const newLevel = currentLevel - 0.01;
      if (newLevel >= 0) {
        spotifyPlayer.setVolume(newLevel)
          .then(() => {
            console.log(`Volume set to ${newLevel}.`);
          });
      }
    });
});

const volumeUpSpotify = document.getElementById('volume-up-spotify');
volumeUpSpotify.addEventListener('click', () => {
  spotifyPlayer.getVolume()
    .then(currentLevel => {
      const newLevel = currentLevel + 0.01;
      if (newLevel <= 1) {
        spotifyPlayer.setVolume(newLevel)
          .then(() => {
            console.log(`Volume set to ${newLevel}.`)
          });
      }
    });
});

const volumeRangeSpotify = document.getElementById('volume-range-spotify');
volumeRangeSpotify.addEventListener('change', () => {
  let newLevel = volumeRangeSpotify.value / 100;
  spotifyPlayer.setVolume(newLevel)
    .then(() => {
      console.log(`Volume set to ${newLevel}.`)
    })
})