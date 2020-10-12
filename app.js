window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCF-nVv7VBSA7F5zD0t3u9ZXUMjyHKtgEnYJU20r2SRuFcKDQFOM8Kaikm5n2QsrAsTy0FX1RW4zsFwocC7IVi097aSrCqTD4JqvH965jbmE3URlhNxTJenZ9GXCHhVSjOrYj8Jgh8AgZwJC7v4sYJdhK9k22d9U34Rt6dwBaz4hgPQ3YxoG2Q';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
  
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log('State Change: ', state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
    
    // Play Button
    const playButton = document.getElementById('play')
    playButton.addEventListener('click', () => {
      player.resume().then(() => {
        console.log('Resumed!');
      });
    })
    
    // Pause button
    const pauseButton = document.getElementById('pause')
    pauseButton.addEventListener('click', () => {
      player.pause().then(() => {
        console.log('Paused!');
      });
    })

    // Previous Track Button
    const previousButton = document.getElementById('previous')
    previousButton.addEventListener('click', () => {
      player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
    })
    
    // Next Track Button
    const nextButton = document.getElementById('next')
    nextButton.addEventListener('click', () => {
      player.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
    })
  };

  const youTubeButton = document.getElementById('button')
  youTubeButton.addEventListener('click', () => {
    console.log('Playing Youtube video')
    const iframe = document.getElementById('youtube')
    iframe.playVideo()
  })