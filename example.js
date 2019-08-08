const { send } = require('micro');
const microAuthSpotify = require('.');

const options = {
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  callbackUrl: 'http://localhost:3000/auth/spotify/callback',
  path: '/auth/spotify',
  scope: '',
};

const spotifyAuth = microAuthSpotify(options);

module.exports = spotifyAuth(async (req, res, auth) => {
  if (!auth) {
    return send(res, 404, 'Not Found');
  }

  if (auth.err) {
    // Error handler
    console.error(auth.err);
    return send(res, 403, 'Forbidden');
  }

  return `Hello ${auth.result.info.id}`;
});
