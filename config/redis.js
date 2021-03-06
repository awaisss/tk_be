/* Redis Client Event Listeneres..  */
module.exports  = function(redisClient){
	redisClient
	  .on('ready', function () {
	  	console.log('redis host ',redisClient.host)
	    console.log(" REDIS ready ");
	    /*redisClient.set("language","nodejs")
	    redisClient.set("database","mongo")
	    redisClient.set("server","linux")*/
	  })
	  .on('connect',function(){
	  	console.log('client connected to redis server -----------------------------')
	  })
	  .on('error', function (err) {
	    console.log('redis error ------------')
	    console.log(err)
	    console.log('+++++++++++++++++++++++++++++++++++++');
	  })
	  .on('end', function () {
	    console.log('redis end listener -------------------')
	  });


	return redisClient;
}
