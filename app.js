
var sslMode       =     false; 
var express       =     require('express'),
    config        =     require('./config/config'),
    glob          =     require('glob'),
    mongoose      =     require('mongoose'),
    fs            =     require('fs'),
    os            =     require('os')
    redisMod      =     require('redis'),
    redisClient   =     redisMod.createClient(),
    cluster       =     require('cluster'),
    redis         =     require('socket.io-redis');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

/* Redis Client Event Listeneres..  */
redisClient
  .on('ready', function () {
    console.log(" REDIS ready ");
  })
  .on('error', function (err) {
    console.log('redis error ------------')
  })
  .on('end', function () {
    console.log('redis end listener -------------------')
  });

var sslConf = {
    /* SSL Keys Configuration goes here ---  */
    /*key  : fs.readFileSync('./ssl/'),
    ca : fs.readFileSync('./ssl/'),
    cert : fs.readFileSync('./ssl/')*/
};

/*  Clustering Section */
if(cluster.isMaster){
  // Create the worker processes here ---
  console.log('****  Running on master  ****');
  var workCounts  = os.cpus().length;
  console.log('cluster count ===>>> ' + workCounts);
  /*if(!sslMode){
      var http = require('http');
      var server =  http.createServer(app).listen(3000, function () {
          console.log('Express server listening on port ' + config.port + ' in ' + config.env + ' mode...');
      });

  } else {
      var https = require('https');
      var server =  https.createServer(sslConf,app).listen(config.port, function () {
          console.log('Express server listening on port ' + config.port + ' in ' + config.env + ' mode...');
      });

  }*/
  /*var io = require('socket.io')(server);
  io.listen(server);
  var socketIo    = require('./config/sockets');
  io.adapter(redis({ host: config.host, port: config.redis }));*/

  for(var index = 1;index < workCounts; index++ ){
    cluster.fork();
  }
  Object.keys(cluster.workers).forEach(function(id) {
      console.log("I am running with ID : "+cluster.workers[id].process.pid);
  });
  // Listen for workers getting online
  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
  });
  // Lesten for dying workers 
  cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
      cluster.fork();  // Starting a new worker
  });



} else {
  console.log('*****  Worker nodes/clusters  *****')
  var app  =  express();
  if(!sslMode){
    var http = require('http');
    var server = http.createServer(app).listen(config.port);
    console.log('express server listening on port  ' + config.port) 
    http.globalAgent.maxSockets = Infinity;

  } else {
    var https = require('https');
    var server = https.createServer(sslConf ,app).listen(config.port);
    https.globalAgent.maxSockets = Infinity; 


  }
  var io = require('socket.io')(server);
  io.adapter(redis({ host: config.host, port: config.redis }));
  var socketIo    = require('./config/sockets')(io,cluster);
  module.exports = require('./config/express')(app, config);

}



/*app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});*/





