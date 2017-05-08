var api = require('./api');

module.exports = [
  {
    method: 'GET',
    path: '/api/players',
    handler: api.players.getAll
  },
  {
    method: 'GET',
    path: '/api/players/{id}',
    handler: api.players.getOne
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  }
];
