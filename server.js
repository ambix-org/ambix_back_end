'use strict';

const cors = require('cors');
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const PORT = process.env.PORT || 3001;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const RETURN_URI = process.env.RETURN_URI;

app.get('/authorize', authorize);
app.get('/redirect', redirect)
app.post('/refresh', refresh)

function authorize(_, response) {
  superagent.get('https://accounts.spotify.com/authorize')
    .query({client_id: SPOTIFY_ID})
    .query({response_type: 'code'})
    .query({redirect_uri: REDIRECT_URI})
    .query({scope: 'streaming user-read-private user-read-email'})
    .then(result => {
      response.json({redirectURL: result.redirects[0]})
    })
    .catch(error => console.error('Error while obtaining authorization code:', error));
}

function redirect(request, response) {
  const code = request.query.code;
  const error = request.query.error;

  if (error) {
    response.send(error);
  }

  superagent.post('https://accounts.spotify.com/api/token')
    .type('form')
    .send({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_ID,
      client_secret: SPOTIFY_SECRET
    })
    .then(spotifyResponse => {
      const refreshToken = spotifyResponse.body.refresh_token;
      response.status(200).redirect(`${RETURN_URI}?refresh=${refreshToken}`);
    })
    .catch(error => console.error('Error while obtaining token pair:', error));
}

function refresh(request, response) {
  const refreshToken = request.body.refreshToken;
  const url = `https://accounts.spotify.com/api/token`;

  const buff = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`, 'utf-8');
  const encodedID = buff.toString('base64');

  superagent.post(url)
    .set('Authorization', `Basic ${encodedID}`)
    .type('form')
    .send({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
    .then(spotifyResponse => {
      const accessToken = spotifyResponse.body.access_token;
      response.status(200).json({accessToken});
    })
    .catch(error => {
      console.error('Error in authorization:\n', error);
      response.status(401).send()
    });
}

app.listen(PORT, () => {
  console.log(`Listening on port:`, PORT);
});
