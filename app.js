var sslMode       	=     true; 
var express       	=     require('express'),
    config        	=     require('./config/config'),
    redisMod      	=     require('redis'),
    redisClient   	=     redisMod.createClient(config.redis,config.redisHost),
    cluster       	=     require('cluster'),
    app           	=     express(),
    mongoose 		=	  require('mongoose'),
    redis         	=     require('socket.io-redis');

/* Database Connection  */
console.log('=======================================================================================================')
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

/* Redis conf */
module.exports = require('./config/redis')(redisClient);

/* Clustering and server conf */
module.exports = require('./config/cluster')(app, config,cluster,sslMode,redis);




