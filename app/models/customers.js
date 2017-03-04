// Model Schema for Customers ---

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Customers = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company_id: {
    type: String
  },
  updated_at: {
    type: Date
  },
  created_at: {
  	type: Date,
  	default: Date.now
  }

});

module.exports = mongoose.model('Customers', Customers);
