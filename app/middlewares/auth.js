
module.exports = function(jwt,router){
	var secret_key = 'RYIhsd76KJHLKK900HNHGHJHJdfh7412UIQZX0';
	router.use(function(req,res,next){
		var reg_exp 	= 	new RegExp('/.*login*./');
		var login_flag 	= 	reg_exp.test(req.url);
		if(login_flag){
			next();
		} else {
			var token =  req.body.token || req.query.token || req.headers['x-access-token'];
			if(token){
				jwt.verify(token,secret_key,function(err,decoded){
					if(err){
						return res.json({success: false, message: 'Failed to authenticate token.'});
					} else {
						req.decoded = decoded;    
	        			next();
					}

				});
			} else {
				return res.status(403).send({ 
			        success: false, 
			        message: 'No token provided.' 
			    });
			}
		}

	});

	return router;
}
