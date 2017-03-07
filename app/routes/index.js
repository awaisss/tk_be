var express 		= 	require('express');
var router  		= 	express.Router();
var jwt 			=	require('jsonwebtoken');
var api_root_url 	= 	'http://localhost:3000/';
var config 			= 	require('./../../config/config');

	/*  -----  API Controllers references start   -------    */
var tasks 			= 	require('./../controllers/taskController');
var teams 			= 	require('./../controllers/teamController');
var customers 		= 	require('./../controllers/customerController');		 
	/*  -----  API Controllers references end   ---------  */
	

/* --- Require and Use All Middlewares/Auth-Mechanism --- */
//module.exports 		= 	require('./../middlewares/auth')(jwt,router);


/*  --- APIs Endpoints for Tasks --- */
router.get('/admin/tasks',tasks.getAllTasks);
router.post('/admin/addTask',tasks.addNewTask);

/* --- APIs Endpoints for Teams ---  */
router.get('/admin/teams',teams.getAllTeams);
router.post('/admin/createTeam',teams.createNewTeam);

/*  ---  APIs Endpoints for Customers ---  */
router.get('/admin/customers',customers.getAllCustomers);
router.post('/admin/createCustomer',customers.createNewCustomer)

		/*  ---------  !!!!!  -------- */	
		
/* api url for chat page */
router.get('/chat',function(req,res){
	res.sendFile(config.root + '/app/views/chat.html');
})			


module.exports = router;
