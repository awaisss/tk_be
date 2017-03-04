var Teams = require('./../models/teams');

/* --------- APIS  ------------  */

/* Get list of all teams */
exports.getAllTeams = function(req,res){
  Teams.find().exec(function(err,teams){
    if(err){
      console.log('error occured');
      return res.json(err);
    } else {
      return res.json({status:true,data:teams});
    }
  });

};

/* Create a new team */
exports.createNewTeam = function(req,res){
  var team = new Teams(req.body);
  team.save(team,function(err,data){
    if(err){
      return res.json({status:201,message:'failed to create new team'});
    } else {
      return res.json({status:200,message:'team created successfully',data:data});
    }
  })

};

