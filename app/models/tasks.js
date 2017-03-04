// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Tasks = new Schema({
  api_key: String,
  order_id: {
  	type: String
  },
  job_description: String,
  pickup_lat: String,
  pickup_lng: String,
  pickup_address: String,
  team_id: {
  	type: String
  },
  fleet_id: {
  	type: String
  },
  created_at: {
  	type: Date,
  	default: Date.now
  },
  updated_at: {
    type: Date
  }

});

module.exports = mongoose.model('Tasks', Tasks);
