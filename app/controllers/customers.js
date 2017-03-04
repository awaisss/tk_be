var Customers = require('./../models/customers');


		/*  ------  API END POINTS ------ */

/*  Fetch all customers data api */
exports.getAllCustomers = function(req,res){
	Customers.find().exec(function(err,customers){
	    if(err){
	      console.log('error occured');
	      return res.json(err);
	    } else {
	      return res.json({status:true,data:customers});
	    }
  	});

}

/* Create a new customerm post api endpoint */
exports.createNewCustomer = function(req,res){
	var customer = new Customers(req.body);
	customer.save(customer,function(err,data){
	    if(err){
	      return res.json({status:201,message:'failed to create new customer'});
	    } else {
	      return res.json({status:200,message:'customer created successfully',data:data});
	    }
	})

}