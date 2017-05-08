const Hapi   = require('hapi'),
      Path   = require('path'),
      Inert  = require('inert'),
      models = require('./models'),
      server = new Hapi.Server({
        connections: {
          routes: {
            files: {
              relativeTo: Path.join(__dirname, 'public')
            }
          }
        }
      });

server.register(Inert, function () {
  server.connection({
    port : 4000,
    routes: {
      cors: true
    }
  });
  server.route(require('./lib/routes'));

  models.sequelize.sync().then(() => {
    server.start(() => {
      console.log('Running on Port 4000');
    });
  });
});
