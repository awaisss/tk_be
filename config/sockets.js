module.exports = function(io,cluster){
	var allConnectiosn = {};

	io.on('connection',function(socket){
		console.log('connection established to app ------ worker id  ' + cluster.worker.id  + '  process  ' + cluster.worker.process.pid);

		/* Require sockets for relevant modules  */
		require('./../app/sockets/tasks.js')(io,socket);
		require('./../app/sockets/teams.js')(io,socket);

		socket.on('connect',function(){
			console.log('user connected ---------------');
		})
		socket.on('disconnect',function(){
			console.log('user disconnedted -------');
		})

		// Chat event handler
		socket.on('chat',function(msgTxt){
			console.log(' chat message ===>> ' + msgTxt);
			io.emit('chat',msgTxt);
		})

	})

	return io;
	/* -----------!!!!---------- */

};


