// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Teams = new Schema({
  team_name: {
  	type: String,
  	required: true  // team name is always required
  },
  tags: {
  	type:Array,
  	default: []
  },
  created_at: {
  	type: Date,
  	default: Date.now
  },
  updated_at: {
    tyep: Date
  }

});

module.exports = mongoose.model('Teams', Teams);
