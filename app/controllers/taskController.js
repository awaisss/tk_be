var Tasks 			= require('./../models/tasksModel');
var taskManager		= require('./../managers/taskManager');

/* --------- APIS  ------------  */

/* Get list of all tasks */
exports.getAllTasks = function(req,res){
	taskManager.find(Tasks,{},{})
	.then(function(data){
		if(data.length < 1){
			return res.json({status:true,message:'no record found',tasks:[]});
		} else {
			return res.json({status:true,tasks:data});
		}
	})
	.catch(function(err){
		return res.json(err);
	})
};

/* Create a new task */
exports.addNewTask = function(req,res){
	taskManager.add(Tasks,req.body)
	.then(function(data){
		return res.json({status:true,message:'task created successfully',data:data});
	})
	.catch(function(err){
		return res.json(err);
	})

};

