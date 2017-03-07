var os 		= require('os')
var fs 		= require('fs');
var sslConf = {
    /* SSL Keys Configuration goes here ---  */
    /*key  : fs.readFileSync('./../ssl/'),
    ca : fs.readFileSync('./../ssl/'),
    cert : fs.readFileSync('./../ssl/')*/
};
module.exports = function(app, config,cluster,sslMode,redis){
	if(cluster.isMaster){
	  // Create the worker processes here ---
	  console.log('****  Running on master  ****');
	  var workCounts  = os.cpus().length;
	  console.log('cluster count ===>>> ' + workCounts);

	  for(var index = 0;index < workCounts; index++ ){
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
	  if(!sslMode){
	    var http 		= require('http');
	    var server 		= http.createServer(app).listen(config.port);
	    console.log('express server listening on port  ' + config.port) 
	    http.globalAgent.maxSockets = Infinity;

	  } else {
	    var https 		= require('https');
	    var server 		= https.createServer(sslConf ,app).listen(config.port);
	    https.globalAgent.maxSockets = Infinity; 


	  }
	  var io = require('socket.io')(server);
	  io.adapter(redis({ host: config.redisHost, port: config.redis }));
	  var socketIo    	= require('./sockets')(io,cluster);
	  module.exports 	= require('./express')(app, config);

	}


}