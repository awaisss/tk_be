var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tk_be'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://awais:awais@ds035563.mlab.com:35563/tk_dev',
    env: 'development',
    io: 8090,
    redis: 6379,
    host:  'https://sleepy-escarpment-76607.herokuapp.com'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tk_be'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://awais:awais@ds035563.mlab.com:35563/tk_dev',
    env:'test',
    io: 8090,
    redis: 6379,
    host:  'https://sleepy-escarpment-76607.herokuapp.com'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tk_be'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://awais:awais@ds035563.mlab.com:35563/tk_dev',
    env: 'production',
    io: 8090,
    redis: 6379,
    host:  'https://sleepy-escarpment-76607.herokuapp.com'
  }
};

module.exports = config[env];
