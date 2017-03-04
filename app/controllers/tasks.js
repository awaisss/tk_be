var Tasks = require('./../models/tasks');

/* --------- APIS  ------------  */

/* Get list of all tasks */
exports.getAllTasks = function(req,res){
	Tasks.find().exec(function(err,tasks){
		if(err){
			console.log('error occured');
			return res.json(err);
		} else {
			return res.json({status:true,data:tasks});
		}
	});

};

/* Create a new task */
exports.addNewTask = function(req,res){
	var task = new Tasks(req.body);
	task.save(task,function(err,data){
		if(err){
			return res.json({status:201,message:'failed to add new task'});
		} else {
			return res.json({status:200,message:'task added successfully',data:data});
		}
	})

};

