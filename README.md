# Ambix Back End

## What is Ambix?

[Ambix](https://ambix.herokuapp.com/) is a web app for mixing ambient soundscapes on top of Spotify playback.

This back-end server handles the OAuth 2.0 authentication flow required to integrate the Spotify Web Playback SDK into the front-end of Ambix. This allows users to sign in to Spotify and use the Ambix app as a playback device that they can select from their Spotify client (desktop or mobile app).

## Architecture

### External APIs

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)

### Frameworks, Libraries, and Packages
- [**`express`**]
- [**`deotenv`**]
- [**`cors`**]
- [**`superagent`**](https://www.npmjs.com/package/superagent): Package for making HTTP/S requests
