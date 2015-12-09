var formController          = require('../controllers/formController'),
    mongoose                = require('mongoose'),
    express                 = require('express'),
    router                  = express.Router();
var provisions = [
  {"name": "India","value":"india"},
  {"name":"San Jose","value":"san_jose"},
  {"name":"Sydney","value":"sydney"},
  {"name":"New York","value":"new_york"},
  {"name":"Melbourne","value":"melbourne"},
  {"name":"Tokyo","value":"tokyo"},
  {"name":"Beijing","value":"beijing"}
];
module.exports = function (app) {
    // REGISTER OUR ROUTES ---------------
    // All of our routes will be prefixed with /api
    app.use('/api', router);
    // Route to handle all angular requests
    router.get('/',function(req,res){
            res.json({message:'Welcome to API World'});
    });
    router.get('/getProvinces',function(req,res){
      res.json(provisions);
    })
    router.post('/saveCache', formController.findOneAndUpdate);
    router.get('/getCache',formController.getUserDetails);
    router.delete('/removeCache',formController.removeUserDetails);
}
