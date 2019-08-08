# microauth-spotify

> Spotify oauth for [micro](https://github.com/zeit/micro/)

Add [Spotify OAuth](https://developer.spotify.com/documentation/general/guides/authorization-guide/) to your [micro](https://github.com/zeit/micro/) in few lines of code.

## Installation

```sh
npm install --save microauth-spotify
# or
yarn add microauth-spotify
```

## Usage

app.js
```js
const { send } = require('micro');
const microAuthSpotify = require('microauth-spotify');

const options = {
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  callbackUrl: 'http://localhost:3000/auth/spotify/callback',
  path: '/auth/spotify',
  scope: ''
};

const withSpotifyAuth = microAuthSpotify(options);

// third `auth` argument will provide error or result of authentication
// so it will {err: errorObject} or {result: {
//  provider: 'spotify',
//  accessToken: 'blahblah',
//  info: userInfo,
// }}
module.exports = withSpotifyAuth(async (req, res, auth) => {

  if (!auth) {
    return send(res, 404, 'Not Found');
  }

  if (auth.err) {
    // Error handler
    return send(res, 403, 'Forbidden');
  }

  return `Hello ${auth.result.info.id}`;
});

```

Run:
```sh
micro app.js
```

Now visit `http://localhost:3000/auth/spotify`

## Author
[Andy Cunningham](https://github.com/andycmaj)