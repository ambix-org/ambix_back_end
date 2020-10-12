const playButton = document.getElementById('play')
const stopButton = document.getElementById('stop');
const rainButton = document.getElementById('rain');
const fireplaceButton = document.getElementById('fireplace');
const volumeRange = document.getElementById('volume-range');
const volumeUpButton = document.getElementById('volume-up');
const volumeDownButton = document.getElementById('volume-down');


let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api"

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'LlKyGAGHc4c',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    playButton.addEventListener('click', () => {
        console.log('Starting Video');
        player.playVideo();
    });

    stopButton.addEventListener('click', () => {
        console.log('Stopping Video');
        player.stopVideo();
    });

    rainButton.addEventListener('click', () => {
        player.loadVideoById('LlKyGAGHc4c');
    });

    fireplaceButton.addEventListener('click', () => {
        player.loadVideoById('K0pJRo0XU8s');
    });

    volumeRange.addEventListener('change', () => {
        newLevel = volumeRange.value
        player.setVolume(newLevel)
        console.log(`Volume set to ${newLevel}`)
    })

    volumeUpButton.addEventListener('click', () => {
        let currentLevel = player.getVolume();
        let newLevel = currentLevel + 1;
        if (newLevel <= 100) {
            player.setVolume(newLevel);
            volumeRange.value = newLevel;
            console.log(`Volume set to ${currentLevel}`);
        } else {
            console.log('Volume maxxed out.');
        };
    });

    volumeDownButton.addEventListener('click', () => {
        let currentLevel = player.getVolume();
        let newLevel = currentLevel - 1;
        if (newLevel >= 0) {
            player.setVolume(newLevel);
            volumeRange.value = newLevel;
            console.log(`Volume set to ${currentLevel}`);
        } else {
            console.log('Volume minned out.');
        }
    });
}

function onPlayerReady(event) {
    console.log('Video Ready!')
    console.log(`Default volume: ${player.getVolume()}`)
    volumeRange.value = player.getVolume();
}

function onPlayerStateChange(event) {
    console.log('State Changed!')
    console.log(event.data)
}
