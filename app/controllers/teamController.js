var   Teams         = require('./../models/teamsModel');
var   teamManager   = require('./../managers/teamManager');

/* --------- APIS  ------------  */

/* Get list of all teams */
exports.getAllTeams = function(req,res){
  teamManager.find(Teams,{},{})
  .then(function(teams){
    if(teams.length < 1){
      return res.json({status:true,message:'no record found',data:[]});
    } else {
      return res.json({status:true,message:'all teams',data:teams});
    }

  })
  .catch(function(err){
    return res.json(err);
  })

};

/* Create a new team */
exports.createNewTeam = function(req,res){
  teamManager.add(Teams,req.body)
  .then(function(data){ 
    return res.json({status:true,message:'team created successfully',data:data});
  })
  .catch(function(err){
    return res.json(err);
  })

};

