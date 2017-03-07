var Customers 				= require('./../models/customersModel');
var customerManager 		= require('./../managers/customerManager');

		/*  ------  API END POINTS ------ */

/*  Fetch all customers data api */
exports.getAllCustomers = function(req,res){
  	customerManager.find(Customers,{},{})
  	.then(function(customers){
  		if(customers.length < 1){
  			return res.json({status:true,data:[],message:'no record found'});
  		} else {
  			return res.json({status:true,data:customers});
  		}
  	})
  	.catch(function(err){
  		return res.json(err);
  	})

}

/* Create a new customerm post api endpoint */
exports.createNewCustomer = function(req,res){
	customerManager.add(Customers,req.body)
	.then(function(data){
		return res.json({status:200,message:'customer created successfully',data:data})
	})
	.catch(function(err){
		return res.json({status:201,message:'failed to create new customer'});
	})
}