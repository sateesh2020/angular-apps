var FormData = require('../models/form');
var logger   = require('../config/logger');
function updateUser(user,cb){

}
module.exports.findOneAndUpdate = function(req,res){
  var user      = req.body.user;
  var formData  = req.body.formData;
  var query = {'user':user};
  var data = req.body;
  var updateResponse = {};
  FormData.findOneAndUpdate(query, data, {upsert:true}, function(err, doc){
    if (err){
      updateResponse.status  = false;
      updateResponse.error = err;
      return res.send(500, response);
    }
    updateResponse.status = true;
    updateResponse.message = 'Succesfully Saved';
    return res.send(updateResponse);
  });
}

module.exports.getUserDetails = function (req,res) {
  var user = 'skywalker';
  var getResponse = {};
  FormData.findOne({user:user},function(err,user){
    if(!err){
      getResponse.status = true;
      getResponse.data = user;
      res.json(getResponse)
    }else{
      getResponse.status = false;
      getResponse.message = 'No Details Found';
      logger.error('Error while getting user details',err);
    }
  })
}

module.exports.removeUserDetails = function(req,res){
  var user = req.body.user;
  var deleteResponse = {};
  FormData.findOneAndRemove({
    user: user
  }, function(err) {
    if (err) {
      deleteResponse.status = false;
      deleteResponse.message = 'No user found';
      res.json(deleteResponse);
    }
    deleteResponse.status = true;
    deleteResponse.message = 'User Delete Successfully';
    res.json(deleteResponse);
  });
}
