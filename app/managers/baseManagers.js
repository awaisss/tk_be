/*  Wrappers for Basic Crud Operations  */

var manager = {
	find: getAllRecords,
	findOne: getOneRecord,
	add   : addRecord
};

/* Get all records */
function getAllRecords(table,object,projection){
	return new Promise(function(resolve,reject){
		table.find(object,projection).exec(function(err,result){
			err ? reject(err) : resolve(result);
		})

	})
}

/* Get One Record */
function getOneRecord(table,object,projection){
	return new Promise(function(resolve,reject){
		table.findOne(object,projection).exec(function(err,result){
			err ? reject(err) : resolve(result);
		})
	})
}

/* Save one item to db */
function addRecord(table,object){
	return new Promise(function(resolve,reject){
		var obj = new table(object);
		obj.save(function(err,result){
			err ? reject(err) : resolve(result);
		})
	})
}

module.exports = manager;


