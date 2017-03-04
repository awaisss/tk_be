var express 		= 	require('express');
var router  		= 	express.Router();
var passport 		=	require('passport');
var api_root_url 	= 	'http://localhost:3000/';

	/*  -----  API Controllers references start   -------    */
var tasks 			= 	require('./../controllers/tasks');
var teams 			= 	require('./../controllers/teams');
var customers 		= 	require('./../controllers/customers');		 
	/*  -----  API Controllers references end   ---------  */
	

/* --- Require and Use All Middlewares/Auth-Mechanism --- */
module.exports 		= 	require('./../middlewares/auth')(passport,router);


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
module.exports = router;
