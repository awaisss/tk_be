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
    /*db: 'mongodb://localhost:27017/tk_dev',*/
    db: 'mongodb://awais:awais@ds035563.mlab.com:35563/tk_dev',
    env: 'development',
    io: 8090,
    redis: 15776,
    host:  '127.0.0.1',
    redisHost: 'pub-redis-15776.us-west-2-1.1.ec2.garantiadata.com'
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
    redis: 15776,
    host:  '127.0.0.1',
    redisHost: 'pub-redis-15776.us-west-2-1.1.ec2.garantiadata.com'
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
    redis: 15776,
    host:  '127.0.0.1',
    redisHost: 'pub-redis-15776.us-west-2-1.1.ec2.garantiadata.com'
  }
};

module.exports = config[env];
